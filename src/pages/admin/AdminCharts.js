import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useAdminData } from '../../context/AdminDataContext';

const MAGENTA = '#B01B5E';
const PEACH = '#F7B183';
const GRID = '#FBEDE5';

const RevenueChart = () => {
  const { classes, enrolledByClass } = useAdminData();

  // Enrollment per class, straight from context.
  const enrollment = classes.map((c) => {
    const enrolled = enrolledByClass[c.id] || 0;
    return { name: c.name, enrolled, open: Math.max(0, c.capacity - enrolled) };
  });

  // No historical data exists in the demo context, so this trend is illustrative.
  const revenueTrend = [
    { month: 'Mar', revenue: 2450 },
    { month: 'Apr', revenue: 2680 },
    { month: 'May', revenue: 2610 },
    { month: 'Jun', revenue: 2940 },
    { month: 'Jul', revenue: 3180 },
    { month: 'Aug', revenue: 3405 },
  ];

  const tooltipStyle = {
    borderRadius: '0.75rem',
    border: `2px solid ${GRID}`,
    color: '#1D1D1B',
    fontSize: '0.875rem',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
    >
      {/* Enrollment by class */}
      <div className="bg-white rounded-4xl shadow-soft p-6">
        <h3 className="text-xl font-bold text-ink mb-6">Enrollment by Class</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={enrollment} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#1D1D1B', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: GRID }}
              interval={0}
              angle={-12}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fill: '#1D1D1B', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: GRID }}
              allowDecimals={false}
            />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(176,27,94,0.08)' }} />
            <Bar dataKey="enrolled" name="Enrolled" radius={[6, 6, 0, 0]}>
              {enrollment.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.enrolled / (entry.enrolled + entry.open) > 0.85 ? PEACH : MAGENTA}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-[#1D1D1B] text-opacity-60 mt-2">
          Peach bars are at or near capacity.
        </p>
      </div>

      {/* Revenue trend */}
      <div className="bg-white rounded-4xl shadow-soft p-6">
        <h3 className="text-xl font-bold text-ink mb-6">Monthly Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={revenueTrend} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#1D1D1B', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: GRID }}
            />
            <YAxis
              tick={{ fill: '#1D1D1B', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: GRID }}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${v}`, 'Revenue']} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={PEACH}
              strokeWidth={3}
              dot={{ fill: MAGENTA, r: 4 }}
              activeDot={{ r: 6, fill: MAGENTA }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-[#1D1D1B] text-opacity-60 mt-2">
          *Demo trend data — no historical records in the current dataset.
        </p>
      </div>
    </motion.div>
  );
};

export default RevenueChart;
