import React, { useMemo, useState } from 'react';
import {
  faPlus,
  faTrash,
  faFileCsv,
  faClipboardCheck,
  faUserCheck,
  faUserXmark,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';
import {
  useAdminData,
  ATTENDANCE_STATUSES,
  today,
} from '../../context/AdminDataContext';
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
  StatTile,
  useToast,
  exportCsv,
  EmptyState,
} from '../../components/admin';

const AdminAttendance = () => {
  const { attendance, students, classes, className, studentName, actions } = useAdminData();
  const toast = useToast();

  const [confirm, setConfirm] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');

  // Register-taking sheet
  const [register, setRegister] = useState(null); // { classId, date, marks: {studentId: status} }

  const openRegister = () => {
    const firstClass = classes[0]?.id || '';
    setRegister({ classId: firstClass, date: today(), marks: {} });
  };

  const registerStudents = useMemo(
    () =>
      register
        ? students.filter((s) => s.classId === register.classId && s.status === 'Active')
        : [],
    [register, students]
  );

  const setMark = (studentId, status) =>
    setRegister((r) => ({ ...r, marks: { ...r.marks, [studentId]: status } }));

  const markAll = (status) =>
    setRegister((r) => ({
      ...r,
      marks: Object.fromEntries(registerStudents.map((s) => [s.id, status])),
    }));

  const saveRegister = () => {
    const entries = registerStudents
      .filter((s) => register.marks[s.id])
      .map((s) => ({
        studentId: s.id,
        classId: register.classId,
        date: register.date,
        status: register.marks[s.id],
        note: '',
      }));

    if (entries.length === 0) {
      toast.error('Mark at least one student first');
      return;
    }

    // Re-taking a register for the same class and date replaces the old marks.
    const supersededIds = attendance
      .filter(
        (a) =>
          a.classId === register.classId &&
          a.date === register.date &&
          entries.some((e) => e.studentId === a.studentId)
      )
      .map((a) => a.id);
    if (supersededIds.length) actions.attendance.remove(supersededIds);

    actions.attendance.createMany(entries);
    toast.success(`Register saved — ${entries.length} marked`);
    setRegister(null);
  };

  const rows = useMemo(
    () =>
      attendance.filter(
        (a) =>
          (statusFilter === 'All' || a.status === statusFilter) &&
          (classFilter === 'All' || a.classId === classFilter)
      ),
    [attendance, statusFilter, classFilter]
  );

  const stats = useMemo(() => {
    const count = (s) => attendance.filter((a) => a.status === s).length;
    const present = count('Present') + count('Late');
    return {
      total: attendance.length,
      present,
      absent: count('Absent'),
      rate: attendance.length ? Math.round((present / attendance.length) * 100) : 0,
    };
  }, [attendance]);

  const columns = [
    {
      key: 'studentId',
      header: 'Student',
      sortValue: (r) => studentName(r.studentId),
      render: (r) => <span className="font-bold text-ink">{studentName(r.studentId)}</span>,
    },
    { key: 'classId', header: 'Class', sortValue: (r) => className(r.classId), render: (r) => className(r.classId) },
    { key: 'date', header: 'Date' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <Select
          value={r.status}
          onChange={(e) => {
            actions.attendance.update(r.id, { status: e.target.value });
            toast.success('Attendance updated');
          }}
          aria-label={`Attendance status for ${studentName(r.studentId)}`}
          className="!py-1.5 !px-3 !text-xs !w-auto"
        >
          {ATTENDANCE_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      ),
    },
    {
      key: 'note',
      header: 'Note',
      render: (r) => <span className="text-xs text-body">{r.note || '—'}</span>,
    },
    {
      key: 'actions',
      header: '',
      sortable: false,
      className: 'text-right',
      render: (r) => (
        <IconButton
          icon={faTrash}
          label="Delete record"
          variant="dangerSoft"
          onClick={() => setConfirm(r)}
        />
      ),
    },
  ];

  const filterSelect =
    'px-4 py-2.5 rounded-full bg-cream text-sm text-ink border-2 border-transparent focus:border-magenta focus:outline-none';

  return (
    <div>
      <PageHeader
        title="Attendance"
        subtitle={`${attendance.length} records · ${stats.rate}% attendance rate`}
        actions={
          <>
            <Button
              variant="outline"
              icon={faFileCsv}
              onClick={() => {
                exportCsv(
                  'attendance.csv',
                  [
                    { header: 'Student', value: (r) => studentName(r.studentId) },
                    { header: 'Class', value: (r) => className(r.classId) },
                    { header: 'Date', key: 'date' },
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
            <Button icon={faClipboardCheck} onClick={openRegister}>
              Take register
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatTile label="Records" value={stats.total} icon={faChartSimple} />
        <StatTile label="Present" value={stats.present} tone="magenta" icon={faUserCheck} />
        <StatTile label="Absent" value={stats.absent} tone="white" icon={faUserXmark} />
        <StatTile label="Attendance rate" value={`${stats.rate}%`} sub="Present or late" />
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={['studentId', 'classId', 'date']}
        searchPlaceholder="Search by student, class or date…"
        emptyTitle="No attendance records"
        emptyMessage="Take a register to start tracking attendance."
        emptyAction={<Button icon={faClipboardCheck} onClick={openRegister}>Take register</Button>}
        toolbar={
          <>
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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
              className={filterSelect}
            >
              <option value="All">All statuses</option>
              {ATTENDANCE_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </>
        }
      />

      {/* Register sheet */}
      <Modal
        open={!!register}
        onClose={() => setRegister(null)}
        title="Take register"
        description="Mark each athlete, then save. Re-taking a register for the same class and date replaces the earlier marks."
        footer={
          <>
            <Button variant="secondary" onClick={() => setRegister(null)}>
              Cancel
            </Button>
            <Button icon={faPlus} onClick={saveRegister}>
              Save register
            </Button>
          </>
        }
      >
        {register && (
          <div className="pb-4">
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <Field label="Class">
                <Select
                  value={register.classId}
                  onChange={(e) => setRegister({ ...register, classId: e.target.value, marks: {} })}
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Date">
                <Input
                  type="date"
                  value={register.date}
                  onChange={(e) => setRegister({ ...register, date: e.target.value })}
                />
              </Field>
            </div>

            {registerStudents.length === 0 ? (
              <EmptyState
                title="No active students"
                message="This class has no active students to mark. Assign students to it first."
              />
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button size="sm" variant="secondary" onClick={() => markAll('Present')}>
                    Mark all present
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => markAll('Absent')}>
                    Mark all absent
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setRegister({ ...register, marks: {} })}
                  >
                    Clear
                  </Button>
                </div>

                <ul className="divide-y divide-cream">
                  {registerStudents.map((s) => (
                    <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                      <span className="font-bold text-ink text-sm">
                        {s.firstName} {s.lastName}
                      </span>
                      <div className="flex gap-1.5">
                        {ATTENDANCE_STATUSES.map((status) => {
                          const active = register.marks[s.id] === status;
                          return (
                            <button
                              key={status}
                              onClick={() => setMark(s.id, status)}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                                active
                                  ? 'bg-magenta text-white'
                                  : 'bg-shell text-ink hover:bg-peach-light'
                              }`}
                            >
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          actions.attendance.remove(confirm.id);
          toast.success('Record deleted');
          setConfirm(null);
        }}
        title="Delete attendance record"
        message={
          confirm
            ? `Delete the ${confirm.date} record for ${studentName(confirm.studentId)}?`
            : ''
        }
      />
    </div>
  );
};

export default AdminAttendance;
