import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  faPlus,
  faPenToSquare,
  faTrash,
  faFileCsv,
} from '@fortawesome/free-solid-svg-icons';
import { useAdminData, STUDENT_STATUSES, today } from '../../context/AdminDataContext';
import {
  PageHeader,
  Button,
  IconButton,
  Badge,
  DataTable,
  Modal,
  ConfirmDialog,
  Field,
  Input,
  Select,
  Textarea,
  useToast,
  exportCsv,
} from '../../components/admin';

const STATUS_TONES = { Active: 'success', Paused: 'warning', Inactive: 'neutral' };

const blank = {
  firstName: '',
  lastName: '',
  dob: '',
  classId: '',
  guardian: '',
  email: '',
  phone: '',
  status: 'Active',
  joinDate: today(),
  balance: 0,
  notes: '',
};

const AdminStudents = () => {
  const { students, classes, className, actions } = useAdminData();
  const toast = useToast();

  const [editing, setEditing] = useState(null); // student object, or {} for "new"
  const [confirm, setConfirm] = useState(null); // { ids, message }
  const [selected, setSelected] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');

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

  const openEdit = (student) => {
    reset(student);
    setEditing(student);
  };

  const onSubmit = (values) => {
    const payload = {
      ...values,
      balance: Number(values.balance) || 0,
      classId: values.classId || null,
    };
    if (editing?.id) {
      actions.students.update(editing.id, payload);
      toast.success(`${payload.firstName} ${payload.lastName} updated`);
    } else {
      actions.students.create(payload);
      toast.success(`${payload.firstName} ${payload.lastName} added`);
    }
    setEditing(null);
  };

  const doDelete = () => {
    const { ids } = confirm;
    actions.students.remove(ids);
    setSelected((s) => s.filter((id) => !ids.includes(id)));
    toast.success(ids.length > 1 ? `${ids.length} students deleted` : 'Student deleted');
    setConfirm(null);
  };

  const rows = useMemo(
    () =>
      students.filter(
        (s) =>
          (statusFilter === 'All' || s.status === statusFilter) &&
          (classFilter === 'All' || s.classId === classFilter)
      ),
    [students, statusFilter, classFilter]
  );

  const columns = [
    {
      key: 'name',
      header: 'Student',
      sortValue: (r) => `${r.lastName} ${r.firstName}`,
      searchValue: (r) => `${r.firstName} ${r.lastName} ${r.lastName} ${r.firstName} ${r.guardian}`,
      render: (r) => (
        <div>
          <p className="font-bold text-ink">
            {r.firstName} {r.lastName}
          </p>
          <p className="text-xs text-body">{r.guardian}</p>
        </div>
      ),
    },
    { key: 'classId', header: 'Class', sortValue: (r) => className(r.classId), render: (r) => className(r.classId) },
    {
      key: 'contact',
      header: 'Contact',
      sortValue: (r) => r.email,
      render: (r) => (
        <div className="text-xs">
          <a href={`mailto:${r.email}`} className="block text-ink hover:text-magenta">
            {r.email}
          </a>
          <a href={`tel:${r.phone}`} className="block text-body hover:text-magenta">
            {r.phone}
          </a>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge tone={STATUS_TONES[r.status]}>{r.status}</Badge>,
    },
    {
      key: 'balance',
      header: 'Balance',
      sortValue: (r) => Number(r.balance) || 0,
      render: (r) =>
        Number(r.balance) > 0 ? (
          <span className="font-bold text-[#B3261E]">${r.balance}</span>
        ) : (
          <span className="text-body">$0</span>
        ),
    },
    { key: 'joinDate', header: 'Joined' },
    {
      key: 'actions',
      header: '',
      sortable: false,
      className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1.5">
          <IconButton icon={faPenToSquare} label="Edit student" onClick={() => openEdit(r)} />
          <IconButton
            icon={faTrash}
            label="Delete student"
            variant="dangerSoft"
            onClick={() =>
              setConfirm({
                ids: [r.id],
                message: `Delete ${r.firstName} ${r.lastName}? Their payment and attendance records will be removed too. This cannot be undone.`,
              })
            }
          />
        </div>
      ),
    },
  ];

  const filterSelect = 'px-4 py-2.5 rounded-full bg-cream text-sm text-ink border-2 border-transparent focus:border-magenta focus:outline-none';

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle={`${students.length} on the roll · ${students.filter((s) => s.status === 'Active').length} active`}
        actions={
          <>
            <Button
              variant="outline"
              icon={faFileCsv}
              onClick={() => {
                exportCsv(
                  'students.csv',
                  [
                    { header: 'First name', key: 'firstName' },
                    { header: 'Last name', key: 'lastName' },
                    { header: 'Class', value: (r) => className(r.classId) },
                    { header: 'Guardian', key: 'guardian' },
                    { header: 'Email', key: 'email' },
                    { header: 'Phone', key: 'phone' },
                    { header: 'Status', key: 'status' },
                    { header: 'Balance', key: 'balance' },
                    { header: 'Joined', key: 'joinDate' },
                  ],
                  rows
                );
                toast.success('CSV exported');
              }}
            >
              Export
            </Button>
            <Button icon={faPlus} onClick={openNew}>
              Add student
            </Button>
          </>
        }
      />

      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={['name', 'contact', 'classId']}
        searchPlaceholder="Search by name, guardian or email…"
        selectable
        selected={selected}
        onSelectedChange={setSelected}
        emptyTitle="No students yet"
        emptyMessage="Add your first student to start building the roll."
        emptyAction={<Button icon={faPlus} onClick={openNew}>Add student</Button>}
        toolbar={
          <>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
              className={filterSelect}
            >
              <option value="All">All statuses</option>
              {STUDENT_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              aria-label="Filter by class"
              className={filterSelect}
            >
              <option value="All">All classes</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {selected.length > 0 && (
              <Button
                variant="danger"
                icon={faTrash}
                size="sm"
                onClick={() =>
                  setConfirm({
                    ids: selected,
                    message: `Delete ${selected.length} selected students? Their payment and attendance records will be removed too.`,
                  })
                }
              >
                Delete {selected.length}
              </Button>
            )}
          </>
        }
      />

      {/* Create / edit */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit student' : 'Add student'}
        description={editing?.id ? 'Update this student’s details.' : 'Add a new student to the roll.'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>
              {editing?.id ? 'Save changes' : 'Add student'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4 pb-4" noValidate>
          <Field label="First name" required error={errors.firstName?.message}>
            <Input
              invalid={!!errors.firstName}
              placeholder="Emma"
              {...register('firstName', { required: 'First name is required' })}
            />
          </Field>
          <Field label="Last name" required error={errors.lastName?.message}>
            <Input
              invalid={!!errors.lastName}
              placeholder="Johnson"
              {...register('lastName', { required: 'Last name is required' })}
            />
          </Field>
          <Field label="Date of birth" error={errors.dob?.message}>
            <Input type="date" invalid={!!errors.dob} {...register('dob')} />
          </Field>
          <Field label="Class">
            <Select {...register('classId')}>
              <option value="">Unassigned</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Guardian" required error={errors.guardian?.message}>
            <Input
              invalid={!!errors.guardian}
              placeholder="Sarah Johnson"
              {...register('guardian', { required: 'Guardian name is required' })}
            />
          </Field>
          <Field label="Phone" required error={errors.phone?.message}>
            <Input
              invalid={!!errors.phone}
              placeholder="555-0101"
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
          <Field label="Status">
            <Select {...register('status')}>
              {STUDENT_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Join date">
            <Input type="date" {...register('joinDate')} />
          </Field>
          <Field
            label="Outstanding balance"
            error={errors.balance?.message}
            hint="Amount currently owed, in dollars"
          >
            <Input
              type="number"
              min="0"
              step="1"
              invalid={!!errors.balance}
              {...register('balance', { min: { value: 0, message: 'Cannot be negative' } })}
            />
          </Field>
          <Field label="Notes" className="sm:col-span-2">
            <Textarea rows="3" placeholder="Anything the coaches should know…" {...register('notes')} />
          </Field>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={doDelete}
        title="Delete student"
        message={confirm?.message}
      />
    </div>
  );
};

export default AdminStudents;
