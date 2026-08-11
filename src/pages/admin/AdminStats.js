import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faGraduationCap,
  faSackDollar,
  faClockRotateLeft,
  faTriangleExclamation,
  faCalendarCheck,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useAdminData } from '../../context/AdminDataContext';
import { StatTile, Badge, Button, EmptyState } from '../../components/admin';
import AdminCharts from './AdminCharts';

const AdminStats = ({ onNavigate }) => {
  const {
    students,
    classes,
    payments,
    attendance,
    trials,
    enrolledByClass,
    className,
    studentName,
    activeStudents,
    revenuePaid,
    revenuePending,
    attendanceRate,
    outstandingBalance,
  } = useAdminData();

  const attention = useMemo(() => {
    const items = [];

    const overdue = payments.filter((p) => p.status === 'Overdue' || p.status === 'Pending');
    if (overdue.length) {
      items.push({
        icon: faClockRotateLeft,
        title: `${overdue.length} payment${overdue.length > 1 ? 's' : ''} outstanding`,
        detail: `$${revenuePending.toLocaleString()} awaiting collection`,
        target: 'payments',
      });
    }

    const newTrials = trials.filter((t) => t.status === 'New');
    if (newTrials.length) {
      items.push({
        icon: faCalendarCheck,
        title: `${newTrials.length} trial request${newTrials.length > 1 ? 's' : ''} to contact`,
        detail: newTrials.map((t) => t.childName).slice(0, 3).join(', '),
        target: 'trials',
      });
    }

    const full = classes.filter((c) => (enrolledByClass[c.id] || 0) >= c.capacity);
    if (full.length) {
      items.push({
        icon: faTriangleExclamation,
        title: `${full.length} class${full.length > 1 ? 'es' : ''} at capacity`,
        detail: full.map((c) => c.name).join(', '),
        target: 'classes',
      });
    }

    const unassigned = students.filter((s) => !s.classId && s.status === 'Active');
    if (unassigned.length) {
      items.push({
        icon: faUsers,
        title: `${unassigned.length} active student${unassigned.length > 1 ? 's' : ''} unassigned`,
        detail: 'Not currently in any class',
        target: 'students',
      });
    }

    return items;
  }, [payments, trials, classes, students, enrolledByClass, revenuePending]);

  const recentStudents = useMemo(
    () => [...students].sort((a, b) => (b.joinDate || '').localeCompare(a.joinDate || '')).slice(0, 5),
    [students]
  );

  const recentAttendance = useMemo(
    () => [...attendance].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5),
    [attendance]
  );

  return (
    <div>
      {/* Key numbers */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8"
      >
        <StatTile
          label="Active students"
          value={activeStudents.length}
          sub={`${students.length} on the roll`}
          tone="magenta"
          icon={faUsers}
        />
        <StatTile
          label="Classes running"
          value={classes.filter((c) => c.active).length}
          sub={`${Object.values(enrolledByClass).reduce((a, b) => a + b, 0)} enrolments`}
          icon={faGraduationCap}
        />
        <StatTile
          label="Collected"
          value={`$${revenuePaid.toLocaleString()}`}
          sub={`$${revenuePending.toLocaleString()} outstanding`}
          tone="white"
          icon={faSackDollar}
        />
        <StatTile
          label="Attendance rate"
          value={`${attendanceRate}%`}
          sub={`${attendance.length} records`}
          icon={faCalendarCheck}
        />
      </motion.div>

      {/* Needs attention */}
      <div className="bg-white rounded-4xl shadow-soft p-6 mb-8">
        <h3 className="text-lg font-extrabold text-ink mb-1">Needs attention</h3>
        <p className="text-sm text-body mb-5">Things worth acting on today.</p>

        {attention.length === 0 ? (
          <EmptyState title="All clear" message="No outstanding payments, unread trials or full classes." />
        ) : (
          <ul className="space-y-2.5">
            {attention.map((item) => (
              <li
                key={item.title}
                className="flex items-center gap-4 p-4 rounded-2xl bg-cream hover:bg-shell transition-colors"
              >
                <span className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center shadow-soft">
                  <FontAwesomeIcon icon={item.icon} className="text-magenta text-sm" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-ink text-sm">{item.title}</p>
                  <p className="text-xs text-body truncate">{item.detail}</p>
                </div>
                {onNavigate && (
                  <Button size="sm" variant="ghost" onClick={() => onNavigate(item.target)}>
                    View
                    <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Charts */}
      <AdminCharts />

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-4xl shadow-soft p-6">
          <h3 className="text-lg font-extrabold text-ink mb-5">Newest students</h3>
          {recentStudents.length === 0 ? (
            <p className="text-sm text-body py-6">No students yet.</p>
          ) : (
            <ul className="divide-y divide-cream">
              {recentStudents.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-9 h-9 shrink-0 rounded-full bg-card-warm flex items-center justify-center text-xs font-extrabold text-ink">
                      {s.firstName[0]}
                      {s.lastName[0]}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-ink text-sm truncate">
                        {s.firstName} {s.lastName}
                      </p>
                      <p className="text-xs text-body truncate">{className(s.classId)}</p>
                    </div>
                  </div>
                  <Badge tone={s.status === 'Active' ? 'success' : 'neutral'}>{s.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-4xl shadow-soft p-6">
          <h3 className="text-lg font-extrabold text-ink mb-5">Latest attendance</h3>
          {recentAttendance.length === 0 ? (
            <p className="text-sm text-body py-6">No attendance recorded yet.</p>
          ) : (
            <ul className="divide-y divide-cream">
              {recentAttendance.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="font-bold text-ink text-sm truncate">{studentName(a.studentId)}</p>
                    <p className="text-xs text-body truncate">
                      {className(a.classId)} · {a.date}
                    </p>
                  </div>
                  <Badge
                    tone={
                      a.status === 'Present'
                        ? 'success'
                        : a.status === 'Absent'
                        ? 'danger'
                        : a.status === 'Late'
                        ? 'warning'
                        : 'info'
                    }
                  >
                    {a.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {outstandingBalance > 0 && (
        <p className="text-xs text-body mt-6">
          Total outstanding balance across all students:{' '}
          <strong className="text-ink">${outstandingBalance.toLocaleString()}</strong>
        </p>
      )}
    </div>
  );
};

export default AdminStats;
