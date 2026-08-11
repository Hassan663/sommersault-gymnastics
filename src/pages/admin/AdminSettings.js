import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { faFloppyDisk, faRotateLeft, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useAdminData } from '../../context/AdminDataContext';
import {
  PageHeader,
  Button,
  Field,
  Input,
  ConfirmDialog,
  useToast,
} from '../../components/admin';

const AdminSettings = () => {
  const { settings, updateSettings, resetData, students, classes, payments, attendance, trials } =
    useAdminData();
  const toast = useToast();
  const [confirmReset, setConfirmReset] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: settings });

  const onSubmit = (values) => {
    updateSettings({
      ...values,
      defaultCapacity: Number(values.defaultCapacity),
    });
    reset(values);
    toast.success('Settings saved');
  };

  const backup = () => {
    const blob = new Blob(
      [JSON.stringify({ students, classes, payments, attendance, trials, settings }, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sommersault-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Backup downloaded');
  };

  const counts = [
    ['Students', students.length],
    ['Classes', classes.length],
    ['Payments', payments.length],
    ['Attendance records', attendance.length],
    ['Trial requests', trials.length],
  ];

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Gym details, defaults and data management."
        actions={
          <Button icon={faFloppyDisk} onClick={handleSubmit(onSubmit)} disabled={!isDirty}>
            Save changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gym details */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 bg-white rounded-4xl shadow-soft p-7"
          noValidate
        >
          <h3 className="text-lg font-extrabold text-ink mb-1">Gym details</h3>
          <p className="text-sm text-body mb-6">
            Used across the admin panel and on printed reports.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Gym name" required error={errors.gymName?.message} className="sm:col-span-2">
              <Input
                invalid={!!errors.gymName}
                {...register('gymName', { required: 'Gym name is required' })}
              />
            </Field>
            <Field label="Email" required error={errors.email?.message}>
              <Input
                type="email"
                invalid={!!errors.email}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                })}
              />
            </Field>
            <Field label="Phone" required error={errors.phone?.message}>
              <Input invalid={!!errors.phone} {...register('phone', { required: 'Phone is required' })} />
            </Field>
            <Field label="Address" className="sm:col-span-2">
              <Input {...register('address')} />
            </Field>
            <Field
              label="Default class capacity"
              error={errors.defaultCapacity?.message}
              hint="Pre-filled when creating a new class"
            >
              <Input
                type="number"
                min="1"
                invalid={!!errors.defaultCapacity}
                {...register('defaultCapacity', { min: { value: 1, message: 'Must be at least 1' } })}
              />
            </Field>
            <Field label="Currency">
              <Input {...register('currency')} />
            </Field>
            <Field label="Term starts">
              <Input type="date" {...register('termStart')} />
            </Field>
            <Field label="Term ends">
              <Input type="date" {...register('termEnd')} />
            </Field>
          </div>
        </form>

        {/* Data management */}
        <div className="space-y-6">
          <div className="bg-white rounded-4xl shadow-soft p-7">
            <h3 className="text-lg font-extrabold text-ink mb-1">Stored data</h3>
            <p className="text-sm text-body mb-5">
              Records are saved in this browser. There is no server yet.
            </p>
            <ul className="divide-y divide-cream mb-6">
              {counts.map(([label, n]) => (
                <li key={label} className="flex justify-between py-2.5 text-sm">
                  <span className="text-body">{label}</span>
                  <span className="font-extrabold text-ink">{n}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" icon={faDownload} onClick={backup} className="w-full">
              Download backup
            </Button>
          </div>

          <div className="bg-white rounded-4xl shadow-soft p-7 border-l-4 border-[#B3261E]">
            <h3 className="text-lg font-extrabold text-ink mb-1">Reset data</h3>
            <p className="text-sm text-body mb-5">
              Restores the original demo records and discards everything you have entered.
            </p>
            <Button
              variant="danger"
              icon={faRotateLeft}
              onClick={() => setConfirmReset(true)}
              className="w-full"
            >
              Reset to demo data
            </Button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        onConfirm={() => {
          resetData();
          setConfirmReset(false);
          toast.success('Data reset to demo records');
        }}
        title="Reset all data"
        confirmLabel="Reset everything"
        message="Every student, class, payment, attendance record and trial request you have entered will be permanently replaced with the original demo data. Download a backup first if you want to keep it."
      />
    </div>
  );
};

export default AdminSettings;
