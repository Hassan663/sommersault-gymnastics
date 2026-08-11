import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  faPlus,
  faPenToSquare,
  faTrash,
  faUserPlus,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAdminData, TRIAL_STATUSES, today } from '../../context/AdminDataContext';
import {
  PageHeader,
  Button,
  IconButton,
  DataTable,
  Modal,
  ConfirmDialog,
  Field,
  Input,
  Select,
  Textarea,
  useToast,
} from '../../components/admin';

const blank = {
  childName: '',
  childAge: '',
  guardian: '',
  email: '',
  phone: '',
  classId: '',
  requested: today(),
  status: 'New',
  note: '',
};

const AdminTrials = () => {
  const { trials, classes, className, actions } = useAdminData();
  const toast = useToast();

  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [converting, setConverting] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: blank });

  const openNew = () => {
    reset(blank);
    setEditing({});
  };

  const openEdit = (trial) => {
    reset(trial);
    setEditing(trial);
  };

  const onSubmit = (values) => {
    const payload = { ...values, childAge: Number(values.childAge) || null, classId: values.classId || null };
    if (editing?.id) {
      actions.trials.update(editing.id, payload);
      toast.success('Trial request updated');
    } else {
      actions.trials.create(payload);
      toast.success('Trial request added');
    }
    setEditing(null);
  };

  const convert = () => {
    const t = converting;
    const [firstName, ...rest] = t.childName.trim().split(' ');
    actions.students.create({
      firstName,
      lastName: rest.join(' ') || '—',
      dob: '',
      classId: t.classId || null,
      guardian: t.guardian,
      email: t.email,
      phone: t.phone,
      status: 'Active',
      joinDate: today(),
      balance: 0,
      notes: `Converted from trial request on ${t.requested}.`,
    });
    actions.trials.update(t.id, { status: 'Converted' });
    toast.success(`${t.childName} enrolled as a student`);
    setConverting(null);
  };

  const rows = useMemo(
    () => (statusFilter === 'All' ? trials : trials.filter((t) => t.status === statusFilter)),
    [trials, statusFilter]
  );

  const counts = useMemo(
    () =>
      TRIAL_STATUSES.reduce(
        (acc, s) => ({ ...acc, [s]: trials.filter((t) => t.status === s).length }),
        {}
      ),
    [trials]
  );

  const columns = [
    {
      key: 'childName',
      header: 'Child',
      render: (r) => (
        <div>
          <p className="font-bold text-ink">{r.childName}</p>
          <p className="text-xs text-body">
            Age {r.childAge} · {r.guardian}
          </p>
        </div>
      ),
    },
    {
      key: 'contact',
      header: 'Contact',
      sortValue: (r) => r.email,
      render: (r) => (
        <div className="text-xs space-y-0.5">
          <a href={`mailto:${r.email}`} className="flex items-center gap-2 text-ink hover:text-magenta">
            <FontAwesomeIcon icon={faEnvelope} className="text-magenta w-3" />
            {r.email}
          </a>
          <a href={`tel:${r.phone}`} className="flex items-center gap-2 text-body hover:text-magenta">
            <FontAwesomeIcon icon={faPhone} className="text-magenta w-3" />
            {r.phone}
          </a>
        </div>
      ),
    },
    {
      key: 'classId',
      header: 'Interested in',
      sortValue: (r) => className(r.classId),
      render: (r) => className(r.classId),
    },
    { key: 'requested', header: 'Requested' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <Select
          value={r.status}
          onChange={(e) => {
            actions.trials.update(r.id, { status: e.target.value });
            toast.success(`Moved to ${e.target.value}`);
          }}
          aria-label={`Status for ${r.childName}`}
          className="!py-1.5 !px-3 !text-xs !w-auto"
        >
          {TRIAL_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      ),
    },
    {
      key: 'actions',
      header: '',
      sortable: false,
      className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1.5">
          {r.status !== 'Converted' && (
            <IconButton
              icon={faUserPlus}
              label="Convert to student"
              onClick={() => setConverting(r)}
            />
          )}
          <IconButton icon={faPenToSquare} label="Edit request" onClick={() => openEdit(r)} />
          <IconButton
            icon={faTrash}
            label="Delete request"
            variant="dangerSoft"
            onClick={() => setConfirm(r)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Trial requests"
        subtitle={`${trials.length} total · ${counts.New || 0} awaiting first contact`}
        actions={
          <Button icon={faPlus} onClick={openNew}>
            Add request
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {['All', ...TRIAL_STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
              statusFilter === s ? 'bg-magenta text-white' : 'bg-shell text-ink hover:bg-peach-light'
            }`}
          >
            {s}
            {s !== 'All' && ` (${counts[s] || 0})`}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={['childName', 'contact', 'classId']}
        searchPlaceholder="Search by child, guardian or email…"
        emptyTitle="No trial requests"
        emptyMessage="Requests submitted through the website form will land here."
        emptyAction={<Button icon={faPlus} onClick={openNew}>Add request</Button>}
      />

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit trial request' : 'Add trial request'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>
              {editing?.id ? 'Save changes' : 'Add request'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4 pb-4" noValidate>
          <Field label="Child's name" required error={errors.childName?.message}>
            <Input
              invalid={!!errors.childName}
              placeholder="Mia Nguyen"
              {...register('childName', { required: "Child's name is required" })}
            />
          </Field>
          <Field label="Child's age" required error={errors.childAge?.message}>
            <Input
              type="number"
              min="2"
              max="18"
              invalid={!!errors.childAge}
              {...register('childAge', {
                required: 'Age is required',
                min: { value: 2, message: 'We start at age 2' },
                max: { value: 18, message: 'Programmes run to age 18' },
              })}
            />
          </Field>
          <Field label="Guardian" required error={errors.guardian?.message}>
            <Input
              invalid={!!errors.guardian}
              placeholder="Rachel Nguyen"
              {...register('guardian', { required: 'Guardian is required' })}
            />
          </Field>
          <Field label="Phone" required error={errors.phone?.message}>
            <Input
              invalid={!!errors.phone}
              placeholder="555-0148"
              {...register('phone', { required: 'Phone is required' })}
            />
          </Field>
          <Field label="Email" required error={errors.email?.message} className="sm:col-span-2">
            <Input
              type="email"
              invalid={!!errors.email}
              placeholder="parent@email.com"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
              })}
            />
          </Field>
          <Field label="Interested in">
            <Select {...register('classId')}>
              <option value="">Not sure yet</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Requested on">
            <Input type="date" {...register('requested')} />
          </Field>
          <Field label="Status">
            <Select {...register('status')}>
              {TRIAL_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Note" className="sm:col-span-2">
            <Textarea rows="2" placeholder="Preferred times, questions…" {...register('note')} />
          </Field>
        </form>
      </Modal>

      <Modal
        open={!!converting}
        onClose={() => setConverting(null)}
        title="Convert to student"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConverting(null)}>
              Cancel
            </Button>
            <Button icon={faUserPlus} onClick={convert}>
              Enrol student
            </Button>
          </>
        }
      >
        <p className="text-sm text-body leading-relaxed pb-4">
          This creates a student record for <strong className="text-ink">{converting?.childName}</strong>
          {converting?.classId ? (
            <>
              {' '}
              in <strong className="text-ink">{className(converting.classId)}</strong>
            </>
          ) : (
            ' with no class assigned'
          )}
          , carries over the guardian's contact details, and marks this request as Converted.
        </p>
      </Modal>

      <ConfirmDialog
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          actions.trials.remove(confirm.id);
          toast.success('Trial request deleted');
          setConfirm(null);
        }}
        title="Delete trial request"
        message={confirm ? `Delete the request for ${confirm.childName}? This cannot be undone.` : ''}
      />
    </div>
  );
};

export default AdminTrials;
