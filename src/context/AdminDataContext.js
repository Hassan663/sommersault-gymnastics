import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

/**
 * Single source of truth for the admin panel.
 *
 * There is no backend yet, so state lives in a reducer and is mirrored to
 * localStorage. Every entity supports create / update / remove through one
 * uniform action shape, and cross-entity integrity (deleting a class that
 * still has students, removing a student's payments) is handled here rather
 * than in the pages.
 */

const STORAGE_KEY = 'sommersault.admin.v2';

const uid = (prefix) => `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

const today = () => new Date().toISOString().split('T')[0];

// ── Seed data ────────────────────────────────────────────────────────────────
const SEED = {
  classes: [
    { id: 'cls_tiny', name: 'Tiny Tumblers', ageRange: '2–4', day: 'Mon & Wed', time: '10:00 AM', durationMins: 45, price: 65, capacity: 10, coach: 'Jessica Brooks', level: 'Preschool', active: true },
    { id: 'cls_beg', name: 'Beginner Gymnastics', ageRange: '5–8', day: 'Tue & Thu', time: '4:00 PM', durationMins: 60, price: 85, capacity: 12, coach: 'Emily Carter', level: 'Recreational', active: true },
    { id: 'cls_int', name: 'Intermediate Gymnastics', ageRange: '9–12', day: 'Mon & Wed', time: '5:30 PM', durationMins: 75, price: 105, capacity: 10, coach: 'Madison Reed', level: 'Recreational', active: true },
    { id: 'cls_adv', name: 'Advanced Training', ageRange: '13+', day: 'Tue & Fri', time: '6:00 PM', durationMins: 90, price: 125, capacity: 8, coach: 'Taylor Morgan', level: 'Advanced', active: true },
    { id: 'cls_tum', name: 'Tumbling & Skills', ageRange: '6–10', day: 'Fri', time: '4:30 PM', durationMins: 60, price: 95, capacity: 12, coach: 'Madison Reed', level: 'Recreational', active: true },
    { id: 'cls_team', name: 'Competitive Team', ageRange: 'Invite', day: 'Mon–Thu', time: '5:00 PM', durationMins: 120, price: 220, capacity: 10, coach: 'Taylor Morgan', level: 'Competitive', active: true },
  ],
  students: [
    { id: 'stu_1', firstName: 'Emma', lastName: 'Johnson', dob: '2017-04-12', classId: 'cls_beg', guardian: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '555-0101', status: 'Active', joinDate: '2025-01-15', balance: 0, notes: '' },
    { id: 'stu_2', firstName: 'Liam', lastName: 'Smith', dob: '2021-08-02', classId: 'cls_tiny', guardian: 'Dana Smith', email: 'dana.smith@email.com', phone: '555-0102', status: 'Active', joinDate: '2025-02-20', balance: 0, notes: '' },
    { id: 'stu_3', firstName: 'Olivia', lastName: 'Brown', dob: '2014-11-30', classId: 'cls_adv', guardian: 'Marcus Brown', email: 'marcus.brown@email.com', phone: '555-0103', status: 'Active', joinDate: '2024-09-10', balance: 125, notes: 'Preparing for regionals.' },
    { id: 'stu_4', firstName: 'Noah', lastName: 'Williams', dob: '2016-02-18', classId: 'cls_beg', guardian: 'Rita Williams', email: 'rita.w@email.com', phone: '555-0104', status: 'Active', joinDate: '2025-03-05', balance: 0, notes: '' },
    { id: 'stu_5', firstName: 'Ava', lastName: 'Garcia', dob: '2013-06-21', classId: 'cls_team', guardian: 'Elena Garcia', email: 'elena.g@email.com', phone: '555-0105', status: 'Active', joinDate: '2023-08-14', balance: 220, notes: 'Team captain.' },
    { id: 'stu_6', firstName: 'Sophia', lastName: 'Miller', dob: '2015-01-09', classId: 'cls_int', guardian: 'Paul Miller', email: 'paul.miller@email.com', phone: '555-0106', status: 'Active', joinDate: '2024-11-02', balance: 0, notes: '' },
    { id: 'stu_7', firstName: 'Mia', lastName: 'Davis', dob: '2018-05-27', classId: 'cls_beg', guardian: 'Nina Davis', email: 'nina.davis@email.com', phone: '555-0107', status: 'Active', joinDate: '2025-04-18', balance: 85, notes: '' },
    { id: 'stu_8', firstName: 'Isabella', lastName: 'Rodriguez', dob: '2012-09-14', classId: 'cls_team', guardian: 'Hugo Rodriguez', email: 'hugo.r@email.com', phone: '555-0108', status: 'Active', joinDate: '2023-01-22', balance: 0, notes: '' },
    { id: 'stu_9', firstName: 'Charlotte', lastName: 'Wilson', dob: '2019-12-03', classId: 'cls_tiny', guardian: 'Beth Wilson', email: 'beth.w@email.com', phone: '555-0109', status: 'Paused', joinDate: '2025-05-30', balance: 0, notes: 'Paused for the summer.' },
    { id: 'stu_10', firstName: 'Amelia', lastName: 'Martinez', dob: '2016-07-19', classId: 'cls_tum', guardian: 'Carla Martinez', email: 'carla.m@email.com', phone: '555-0110', status: 'Active', joinDate: '2025-02-11', balance: 95, notes: '' },
    { id: 'stu_11', firstName: 'Harper', lastName: 'Anderson', dob: '2014-03-08', classId: 'cls_int', guardian: 'Greg Anderson', email: 'greg.a@email.com', phone: '555-0111', status: 'Active', joinDate: '2024-06-25', balance: 0, notes: '' },
    { id: 'stu_12', firstName: 'Evelyn', lastName: 'Thomas', dob: '2017-10-11', classId: 'cls_beg', guardian: 'Joy Thomas', email: 'joy.t@email.com', phone: '555-0112', status: 'Inactive', joinDate: '2024-02-14', balance: 0, notes: 'Left the programme.' },
    { id: 'stu_13', firstName: 'Abigail', lastName: 'Lee', dob: '2015-08-23', classId: 'cls_tum', guardian: 'Sam Lee', email: 'sam.lee@email.com', phone: '555-0113', status: 'Active', joinDate: '2025-06-09', balance: 0, notes: '' },
    { id: 'stu_14', firstName: 'Ella', lastName: 'Nguyen', dob: '2013-12-16', classId: 'cls_adv', guardian: 'Kim Nguyen', email: 'kim.n@email.com', phone: '555-0114', status: 'Active', joinDate: '2024-04-01', balance: 125, notes: '' },
  ],
  payments: [
    { id: 'pay_1', studentId: 'stu_1', amount: 85, date: '2026-08-01', method: 'Card', status: 'Paid', reference: 'INV-1001', note: '' },
    { id: 'pay_2', studentId: 'stu_2', amount: 65, date: '2026-08-01', method: 'Bank Transfer', status: 'Paid', reference: 'INV-1002', note: '' },
    { id: 'pay_3', studentId: 'stu_3', amount: 125, date: '2026-08-03', method: 'Card', status: 'Pending', reference: 'INV-1003', note: 'Card declined once.' },
    { id: 'pay_4', studentId: 'stu_4', amount: 85, date: '2026-08-02', method: 'Card', status: 'Paid', reference: 'INV-1004', note: '' },
    { id: 'pay_5', studentId: 'stu_5', amount: 220, date: '2026-08-04', method: 'Bank Transfer', status: 'Pending', reference: 'INV-1005', note: '' },
    { id: 'pay_6', studentId: 'stu_6', amount: 105, date: '2026-08-01', method: 'Cash', status: 'Paid', reference: 'INV-1006', note: '' },
    { id: 'pay_7', studentId: 'stu_7', amount: 85, date: '2026-08-05', method: 'Card', status: 'Pending', reference: 'INV-1007', note: '' },
    { id: 'pay_8', studentId: 'stu_8', amount: 220, date: '2026-08-01', method: 'Card', status: 'Paid', reference: 'INV-1008', note: '' },
    { id: 'pay_9', studentId: 'stu_10', amount: 95, date: '2026-08-06', method: 'Card', status: 'Pending', reference: 'INV-1009', note: '' },
    { id: 'pay_10', studentId: 'stu_11', amount: 105, date: '2026-08-02', method: 'Bank Transfer', status: 'Paid', reference: 'INV-1010', note: '' },
    { id: 'pay_11', studentId: 'stu_13', amount: 95, date: '2026-08-03', method: 'Card', status: 'Paid', reference: 'INV-1011', note: '' },
    { id: 'pay_12', studentId: 'stu_14', amount: 125, date: '2026-08-07', method: 'Card', status: 'Pending', reference: 'INV-1012', note: '' },
    { id: 'pay_13', studentId: 'stu_1', amount: 85, date: '2026-07-01', method: 'Card', status: 'Paid', reference: 'INV-0901', note: '' },
    { id: 'pay_14', studentId: 'stu_3', amount: 125, date: '2026-07-02', method: 'Card', status: 'Paid', reference: 'INV-0902', note: '' },
    { id: 'pay_15', studentId: 'stu_5', amount: 220, date: '2026-07-01', method: 'Bank Transfer', status: 'Refunded', reference: 'INV-0903', note: 'Missed a full month.' },
  ],
  attendance: [
    { id: 'att_1', studentId: 'stu_1', classId: 'cls_beg', date: '2026-08-06', status: 'Present', note: '' },
    { id: 'att_2', studentId: 'stu_4', classId: 'cls_beg', date: '2026-08-06', status: 'Present', note: '' },
    { id: 'att_3', studentId: 'stu_7', classId: 'cls_beg', date: '2026-08-06', status: 'Absent', note: 'Unwell.' },
    { id: 'att_4', studentId: 'stu_2', classId: 'cls_tiny', date: '2026-08-05', status: 'Present', note: '' },
    { id: 'att_5', studentId: 'stu_9', classId: 'cls_tiny', date: '2026-08-05', status: 'Excused', note: 'Family holiday.' },
    { id: 'att_6', studentId: 'stu_3', classId: 'cls_adv', date: '2026-08-04', status: 'Present', note: '' },
    { id: 'att_7', studentId: 'stu_14', classId: 'cls_adv', date: '2026-08-04', status: 'Present', note: '' },
    { id: 'att_8', studentId: 'stu_5', classId: 'cls_team', date: '2026-08-04', status: 'Present', note: '' },
    { id: 'att_9', studentId: 'stu_8', classId: 'cls_team', date: '2026-08-04', status: 'Late', note: 'Arrived 15 min late.' },
    { id: 'att_10', studentId: 'stu_6', classId: 'cls_int', date: '2026-08-03', status: 'Present', note: '' },
    { id: 'att_11', studentId: 'stu_11', classId: 'cls_int', date: '2026-08-03', status: 'Absent', note: '' },
    { id: 'att_12', studentId: 'stu_10', classId: 'cls_tum', date: '2026-08-07', status: 'Present', note: '' },
    { id: 'att_13', studentId: 'stu_13', classId: 'cls_tum', date: '2026-08-07', status: 'Present', note: '' },
  ],
  trials: [
    { id: 'tri_1', childName: 'Mia Nguyen', childAge: 6, guardian: 'Rachel Nguyen', email: 'rachel@email.com', phone: '555-0148', classId: 'cls_beg', requested: '2026-08-08', status: 'New', note: '' },
    { id: 'tri_2', childName: 'Zara Okafor', childAge: 3, guardian: 'Daniel Okafor', email: 'daniel@email.com', phone: '555-0192', classId: 'cls_tiny', requested: '2026-08-07', status: 'Contacted', note: 'Prefers mornings.' },
    { id: 'tri_3', childName: 'Aarav Shah', childAge: 10, guardian: 'Priya Shah', email: 'priya@email.com', phone: '555-0164', classId: 'cls_int', requested: '2026-08-05', status: 'Booked', note: 'Trial on the 12th.' },
    { id: 'tri_4', childName: 'Ella Doyle', childAge: 7, guardian: 'Megan Doyle', email: 'megan@email.com', phone: '555-0177', classId: 'cls_beg', requested: '2026-08-02', status: 'Converted', note: '' },
    { id: 'tri_5', childName: 'Jonah Patel', childAge: 9, guardian: 'Anil Patel', email: 'anil@email.com', phone: '555-0155', classId: 'cls_tum', requested: '2026-08-09', status: 'New', note: '' },
  ],
  settings: {
    gymName: "Sommersault Gymnastics",
    email: 'hello@sommersault.gym',
    phone: '(555) 123-4567',
    address: '2847 Fitness Boulevard, Your City, State 12345',
    defaultCapacity: 12,
    currency: 'USD',
    termStart: '2026-09-01',
    termEnd: '2026-12-18',
  },
};

export const STUDENT_STATUSES = ['Active', 'Paused', 'Inactive'];
export const PAYMENT_STATUSES = ['Paid', 'Pending', 'Overdue', 'Refunded'];
export const PAYMENT_METHODS = ['Card', 'Bank Transfer', 'Cash', 'Cheque'];
export const ATTENDANCE_STATUSES = ['Present', 'Absent', 'Late', 'Excused'];
export const TRIAL_STATUSES = ['New', 'Contacted', 'Booked', 'Converted', 'Lost'];
export const CLASS_LEVELS = ['Preschool', 'Recreational', 'Advanced', 'Competitive'];

// ── Reducer ──────────────────────────────────────────────────────────────────
const COLLECTIONS = ['students', 'classes', 'payments', 'attendance', 'trials'];

function reducer(state, action) {
  switch (action.type) {
    case 'create': {
      const { collection, item } = action;
      return { ...state, [collection]: [{ ...item, id: item.id || uid(collection.slice(0, 3)) }, ...state[collection]] };
    }
    case 'createMany': {
      const { collection, items } = action;
      const stamped = items.map((i) => ({ ...i, id: i.id || uid(collection.slice(0, 3)) }));
      return { ...state, [collection]: [...stamped, ...state[collection]] };
    }
    case 'update': {
      const { collection, id, changes } = action;
      return {
        ...state,
        [collection]: state[collection].map((i) => (i.id === id ? { ...i, ...changes } : i)),
      };
    }
    case 'remove': {
      const { collection, ids } = action;
      const set = new Set(ids);
      const next = { ...state, [collection]: state[collection].filter((i) => !set.has(i.id)) };

      // Keep dependent records consistent rather than leaving orphans behind.
      if (collection === 'students') {
        next.payments = next.payments.filter((p) => !set.has(p.studentId));
        next.attendance = next.attendance.filter((a) => !set.has(a.studentId));
      }
      if (collection === 'classes') {
        next.students = next.students.map((s) => (set.has(s.classId) ? { ...s, classId: null } : s));
        next.attendance = next.attendance.filter((a) => !set.has(a.classId));
        next.trials = next.trials.map((t) => (set.has(t.classId) ? { ...t, classId: null } : t));
      }
      return next;
    }
    case 'updateSettings':
      return { ...state, settings: { ...state.settings, ...action.changes } };
    case 'reset':
      return structuredClone(SEED);
    default:
      return state;
  }
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(SEED);
    const parsed = JSON.parse(raw);
    // Guard against a partially-written or older payload.
    const ok = COLLECTIONS.every((c) => Array.isArray(parsed[c])) && parsed.settings;
    return ok ? parsed : structuredClone(SEED);
  } catch {
    return structuredClone(SEED);
  }
}

const AdminDataContext = createContext(null);

export const AdminDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable — the app still works for this session */
    }
  }, [state]);

  // Kept under `actions` deliberately: spreading these alongside state would
  // shadow the collections themselves (actions.students vs state.students).
  const actions = useMemo(() => {
    const crud = (collection) => ({
      create: (item) => dispatch({ type: 'create', collection, item }),
      createMany: (items) => dispatch({ type: 'createMany', collection, items }),
      update: (id, changes) => dispatch({ type: 'update', collection, id, changes }),
      remove: (ids) => dispatch({ type: 'remove', collection, ids: [].concat(ids) }),
    });

    return COLLECTIONS.reduce((acc, c) => ({ ...acc, [c]: crud(c) }), {});
  }, []);

  const meta = useMemo(
    () => ({
      updateSettings: (changes) => dispatch({ type: 'updateSettings', changes }),
      resetData: () => dispatch({ type: 'reset' }),
    }),
    []
  );

  // ── Derived data ───────────────────────────────────────────────────────────
  const derived = useMemo(() => {
    const classById = Object.fromEntries(state.classes.map((c) => [c.id, c]));
    const studentById = Object.fromEntries(state.students.map((s) => [s.id, s]));

    const enrolledByClass = state.students.reduce((acc, s) => {
      if (s.classId && s.status === 'Active') acc[s.classId] = (acc[s.classId] || 0) + 1;
      return acc;
    }, {});

    const className = (id) => classById[id]?.name ?? 'Unassigned';
    const studentName = (id) => {
      const s = studentById[id];
      return s ? `${s.firstName} ${s.lastName}` : 'Unknown';
    };

    const activeStudents = state.students.filter((s) => s.status === 'Active');
    const revenuePaid = state.payments
      .filter((p) => p.status === 'Paid')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);
    const revenuePending = state.payments
      .filter((p) => p.status === 'Pending' || p.status === 'Overdue')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    const present = state.attendance.filter((a) => a.status === 'Present' || a.status === 'Late').length;
    const attendanceRate = state.attendance.length
      ? Math.round((present / state.attendance.length) * 100)
      : 0;

    const openTrials = state.trials.filter((t) => t.status !== 'Converted' && t.status !== 'Lost');

    return {
      classById,
      studentById,
      enrolledByClass,
      className,
      studentName,
      activeStudents,
      revenuePaid,
      revenuePending,
      attendanceRate,
      openTrials,
      outstandingBalance: state.students.reduce((s, x) => s + Number(x.balance || 0), 0),
    };
  }, [state]);

  const value = useMemo(
    () => ({ ...state, ...derived, ...meta, actions, today }),
    [state, derived, meta, actions]
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
};

export const useAdminData = () => {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error('useAdminData must be used within AdminDataProvider');
  return ctx;
};

export { uid, today };
