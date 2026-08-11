import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { faPlus, faPenToSquare, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useAdminData, CLASS_LEVELS } from '../../context/AdminDataContext';
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
  useToast,
} from '../../components/admin';

const blank = {
  name: '',
  ageRange: '',
  level: 'Recreational',
  coach: '',
  day: '',
  time: '',
  durationMins: 60,
  price: 85,
  capacity: 12,
  active: true,
};

const AdminClasses = () => {
  const { classes, students, enrolledByClass, settings, actions } = useAdminData();
  const toast = useToast();

  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [roster, setRoster] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: blank });

  const openNew = () => {
    reset({ ...blank, capacity: settings.defaultCapacity });
    setEditing({});
  };

  const openEdit = (cls) => {
    reset(cls);
    setEditing(cls);
  };

  const onSubmit = (values) => {
    const payload = {
      ...values,
      durationMins: Number(values.durationMins),
      price: Number(values.price),
      capacity: Number(values.capacity),
      active: values.active === true || values.active === 'true',
    };
    if (editing?.id) {
      actions.classes.update(editing.id, payload);
      toast.success(`${payload.name} updated`);
    } else {
      actions.classes.create(payload);
      toast.success(`${payload.name} created`);
    }
    setEditing(null);
  };

  const doDelete = () => {
    const cls = confirm;
    actions.classes.remove(cls.id);
    toast.success(`${cls.name} deleted`);
    setConfirm(null);
  };

  const rosterStudents = useMemo(
    () => (roster ? students.filter((s) => s.classId === roster.id) : []),
    [roster, students]
  );

  const columns = [
    {
      key: 'name',
      header: 'Class',
      render: (r) => (
        <div>
          <p className="font-bold text-ink">{r.name}</p>
          <p className="text-xs text-body">
            Ages {r.ageRange} · {r.level}
          </p>
        </div>
      ),
    },
    { key: 'coach', header: 'Coach' },
    {
      key: 'schedule',
      header: 'Schedule',
      sortValue: (r) => `${r.day} ${r.time}`,
      render: (r) => (
        <div className="text-xs">
          <p className="text-ink font-semibold">{r.day}</p>
          <p className="text-body">
            {r.time} · {r.durationMins} min
          </p>
        </div>
      ),
    },
    {
      key: 'enrolment',
      header: 'Enrolment',
      sortValue: (r) => (enrolledByClass[r.id] || 0) / (r.capacity || 1),
      render: (r) => {
        const enrolled = enrolledByClass[r.id] || 0;
        const pct = Math.min(100, Math.round((enrolled / (r.capacity || 1)) * 100));
        const full = enrolled >= r.capacity;
        return (
          <div className="min-w-[8rem]">
            <div className="flex justify-between text-xs mb-1.5">
              <span className={`font-bold ${full ? 'text-[#B3261E]' : 'text-ink'}`}>
                {enrolled}/{r.capacity}
              </span>
              {full && <span className="text-[#B3261E] font-semibold">Full</span>}
            </div>
            <div className="h-1.5 rounded-full bg-shell overflow-hidden">
              <div
                className={`h-full rounded-full ${full ? 'bg-[#B3261E]' : 'bg-magenta'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: 'price',
      header: 'Price',
      sortValue: (r) => Number(r.price),
      render: (r) => <span className="font-bold">${r.price}</span>,
    },
    {
      key: 'active',
      header: 'State',
      sortValue: (r) => (r.active ? 1 : 0),
      render: (r) => (
        <Badge tone={r.active ? 'success' : 'neutral'}>{r.active ? 'Running' : 'Archived'}</Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      sortable: false,
      className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1.5">
          <IconButton icon={faUsers} label="View roster" onClick={() => setRoster(r)} />
          <IconButton icon={faPenToSquare} label="Edit class" onClick={() => openEdit(r)} />
          <IconButton
            icon={faTrash}
            label="Delete class"
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
        title="Classes"
        subtitle={`${classes.length} classes · ${Object.values(enrolledByClass).reduce((a, b) => a + b, 0)} active enrolments`}
        actions={
          <Button icon={faPlus} onClick={openNew}>
            Add class
          </Button>
        }
      />

      <DataTable
        columns={columns}
        rows={classes}
        searchKeys={['name', 'coach', 'schedule']}
        searchPlaceholder="Search classes or coaches…"
        pageSize={8}
        emptyTitle="No classes yet"
        emptyMessage="Create your first class to start enrolling students."
        emptyAction={<Button icon={faPlus} onClick={openNew}>Add class</Button>}
      />

      {/* Create / edit */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit class' : 'Add class'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>
              {editing?.id ? 'Save changes' : 'Create class'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4 pb-4" noValidate>
          <Field label="Class name" required error={errors.name?.message} className="sm:col-span-2">
            <Input
              invalid={!!errors.name}
              placeholder="Beginner Gymnastics"
              {...register('name', { required: 'Class name is required' })}
            />
          </Field>
          <Field label="Age range" required error={errors.ageRange?.message}>
            <Input
              invalid={!!errors.ageRange}
              placeholder="5–8"
              {...register('ageRange', { required: 'Age range is required' })}
            />
          </Field>
          <Field label="Level">
            <Select {...register('level')}>
              {CLASS_LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </Select>
          </Field>
          <Field label="Coach" required error={errors.coach?.message}>
            <Input
              invalid={!!errors.coach}
              placeholder="Emily Carter"
              {...register('coach', { required: 'Coach is required' })}
            />
          </Field>
          <Field label="Days" required error={errors.day?.message}>
            <Input
              invalid={!!errors.day}
              placeholder="Tue & Thu"
              {...register('day', { required: 'Days are required' })}
            />
          </Field>
          <Field label="Start time" required error={errors.time?.message}>
            <Input
              invalid={!!errors.time}
              placeholder="4:00 PM"
              {...register('time', { required: 'Time is required' })}
            />
          </Field>
          <Field label="Duration (minutes)" error={errors.durationMins?.message}>
            <Input
              type="number"
              min="15"
              step="5"
              invalid={!!errors.durationMins}
              {...register('durationMins', { min: { value: 15, message: 'At least 15 minutes' } })}
            />
          </Field>
          <Field label="Monthly price ($)" error={errors.price?.message}>
            <Input
              type="number"
              min="0"
              invalid={!!errors.price}
              {...register('price', { min: { value: 0, message: 'Cannot be negative' } })}
            />
          </Field>
          <Field
            label="Capacity"
            error={errors.capacity?.message}
            hint="Maximum athletes in this class"
          >
            <Input
              type="number"
              min="1"
              invalid={!!errors.capacity}
              {...register('capacity', {
                required: 'Capacity is required',
                min: { value: 1, message: 'Must be at least 1' },
              })}
            />
          </Field>
          <Field label="State" className="sm:col-span-2">
            <Select {...register('active')}>
              <option value="true">Running</option>
              <option value="false">Archived</option>
            </Select>
          </Field>
        </form>
      </Modal>

      {/* Roster */}
      <Modal
        open={!!roster}
        onClose={() => setRoster(null)}
        title={roster ? `${roster.name} — roster` : ''}
        description={
          roster
            ? `${rosterStudents.length} enrolled of ${roster.capacity} · Coach ${roster.coach}`
            : ''
        }
        footer={
          <Button variant="secondary" onClick={() => setRoster(null)}>
            Close
          </Button>
        }
      >
        {rosterStudents.length === 0 ? (
          <p className="text-sm text-body py-6">No students are enrolled in this class yet.</p>
        ) : (
          <ul className="divide-y divide-cream pb-4">
            {rosterStudents.map((s) => (
              <li key={s.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-bold text-ink text-sm">
                    {s.firstName} {s.lastName}
                  </p>
                  <p className="text-xs text-body">
                    {s.guardian} · {s.phone}
                  </p>
                </div>
                <Badge tone={s.status === 'Active' ? 'success' : 'neutral'}>{s.status}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Modal>

      <ConfirmDialog
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={doDelete}
        title="Delete class"
        message={
          confirm
            ? `Delete ${confirm.name}? ${
                enrolledByClass[confirm.id] || 0
              } student(s) will be moved to Unassigned and this class's attendance records will be removed.`
            : ''
        }
      />
    </div>
  );
};

export default AdminClasses;
