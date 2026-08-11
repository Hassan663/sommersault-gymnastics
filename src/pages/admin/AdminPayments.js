import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  faPlus,
  faPenToSquare,
  faTrash,
  faFileCsv,
  faCircleCheck,
  faSackDollar,
  faClockRotateLeft,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';
import {
  useAdminData,
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
  today,
} from '../../context/AdminDataContext';
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
  StatTile,
  useToast,
  exportCsv,
} from '../../components/admin';

const STATUS_TONES = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'danger',
  Refunded: 'neutral',
};

const AdminPayments = () => {
  const { payments, students, studentById, studentName, actions } = useAdminData();
  const toast = useToast();

  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const nextReference = useMemo(() => {
    const nums = payments
      .map((p) => Number(String(p.reference || '').replace(/\D/g, '')))
      .filter(Boolean);
    return `INV-${(nums.length ? Math.max(...nums) : 1000) + 1}`;
  }, [payments]);

  const blank = {
    studentId: '',
    amount: '',
    date: today(),
    method: 'Card',
    status: 'Pending',
    reference: nextReference,
    note: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: blank });

  const openNew = () => {
    reset({ ...blank, reference: nextReference });
    setEditing({});
  };

  const openEdit = (payment) => {
    reset(payment);
    setEditing(payment);
  };

  const onSubmit = (values) => {
    const payload = { ...values, amount: Number(values.amount) };
    if (editing?.id) {
      actions.payments.update(editing.id, payload);
      toast.success('Payment updated');
    } else {
      actions.payments.create(payload);
      toast.success('Payment recorded');
    }
    setEditing(null);
  };

  const markPaid = (payment) => {
    actions.payments.update(payment.id, { status: 'Paid' });
    // Clear the matching amount from the student's outstanding balance.
    const student = studentById[payment.studentId];
    if (student) {
      const next = Math.max(0, Number(student.balance || 0) - Number(payment.amount || 0));
      actions.students.update(student.id, { balance: next });
    }
    toast.success(`${studentName(payment.studentId)} marked paid`);
  };

  const doDelete = () => {
    actions.payments.remove(confirm.id);
    toast.success('Payment deleted');
    setConfirm(null);
  };

  const rows = useMemo(
    () => (statusFilter === 'All' ? payments : payments.filter((p) => p.status === statusFilter)),
    [payments, statusFilter]
  );

  const totals = useMemo(() => {
    const sum = (s) =>
      payments.filter((p) => p.status === s).reduce((t, p) => t + Number(p.amount || 0), 0);
    return {
      paid: sum('Paid'),
      pending: sum('Pending') + sum('Overdue'),
      refunded: sum('Refunded'),
    };
  }, [payments]);

  const columns = [
    {
      key: 'studentId',
      header: 'Student',
      sortValue: (r) => studentName(r.studentId),
      render: (r) => (
        <div>
          <p className="font-bold text-ink">{studentName(r.studentId)}</p>
          <p className="text-xs text-body">{r.reference}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortValue: (r) => Number(r.amount),
      render: (r) => <span className="font-bold text-ink">${r.amount}</span>,
    },
    { key: 'date', header: 'Date' },
    { key: 'method', header: 'Method' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge tone={STATUS_TONES[r.status]}>{r.status}</Badge>,
    },
    {
      key: 'actions',
      header: '',
      sortable: false,
      className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1.5">
          {r.status !== 'Paid' && r.status !== 'Refunded' && (
            <IconButton icon={faCircleCheck} label="Mark as paid" onClick={() => markPaid(r)} />
          )}
          <IconButton icon={faPenToSquare} label="Edit payment" onClick={() => openEdit(r)} />
          <IconButton
            icon={faTrash}
            label="Delete payment"
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
        title="Payments"
        subtitle={`${payments.length} transactions recorded`}
        actions={
          <>
            <Button
              variant="outline"
              icon={faFileCsv}
              onClick={() => {
                exportCsv(
                  'payments.csv',
                  [
                    { header: 'Reference', key: 'reference' },
                    { header: 'Student', value: (r) => studentName(r.studentId) },
                    { header: 'Amount', key: 'amount' },
                    { header: 'Date', key: 'date' },
                    { header: 'Method', key: 'method' },
                    { header: 'Status', key: 'status' },
                    { header: 'Note', key: 'note' },
                  ],
                  rows
                );
                toast.success('CSV exported');
              }}
            >
              Export
            </Button>
            <Button icon={faPlus} onClick={openNew}>
              Record payment
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <StatTile
          label="Collected"
          value={`$${totals.paid.toLocaleString()}`}
          sub={`${payments.filter((p) => p.status === 'Paid').length} paid`}
          tone="magenta"
          icon={faSackDollar}
        />
        <StatTile
          label="Outstanding"
          value={`$${totals.pending.toLocaleString()}`}
          sub={`${payments.filter((p) => ['Pending', 'Overdue'].includes(p.status)).length} awaiting`}
          icon={faClockRotateLeft}
        />
        <StatTile
          label="Refunded"
          value={`$${totals.refunded.toLocaleString()}`}
          sub={`${payments.filter((p) => p.status === 'Refunded').length} refunds`}
          tone="white"
          icon={faReceipt}
        />
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={['studentId', 'method', 'status']}
        searchPlaceholder="Search by student, reference or method…"
        emptyTitle="No payments recorded"
        emptyMessage="Record your first payment to start tracking revenue."
        emptyAction={<Button icon={faPlus} onClick={openNew}>Record payment</Button>}
        toolbar={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="px-4 py-2.5 rounded-full bg-cream text-sm text-ink border-2 border-transparent focus:border-magenta focus:outline-none"
          >
            <option value="All">All statuses</option>
            {PAYMENT_STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        }
      />

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit payment' : 'Record payment'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>
              {editing?.id ? 'Save changes' : 'Record payment'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4 pb-4" noValidate>
          <Field label="Student" required error={errors.studentId?.message} className="sm:col-span-2">
            <Select
              invalid={!!errors.studentId}
              {...register('studentId', { required: 'Choose a student' })}
            >
              <option value="">Select a student…</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Amount ($)" required error={errors.amount?.message}>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="85"
              invalid={!!errors.amount}
              {...register('amount', {
                required: 'Amount is required',
                min: { value: 0, message: 'Cannot be negative' },
              })}
            />
          </Field>
          <Field label="Date" required error={errors.date?.message}>
            <Input type="date" invalid={!!errors.date} {...register('date', { required: 'Date is required' })} />
          </Field>
          <Field label="Method">
            <Select {...register('method')}>
              {PAYMENT_METHODS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select {...register('status')}>
              {PAYMENT_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Reference" hint="Invoice or receipt number" className="sm:col-span-2">
            <Input placeholder="INV-1013" {...register('reference')} />
          </Field>
          <Field label="Note" className="sm:col-span-2">
            <Textarea rows="2" placeholder="Optional note…" {...register('note')} />
          </Field>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={doDelete}
        title="Delete payment"
        message={
          confirm
            ? `Delete the $${confirm.amount} payment for ${studentName(confirm.studentId)}? This cannot be undone.`
            : ''
        }
      />
    </div>
  );
};

export default AdminPayments;
