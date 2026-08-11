import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faMagnifyingGlass,
  faSort,
  faSortUp,
  faSortDown,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faInbox,
} from '@fortawesome/free-solid-svg-icons';

/* ────────────────────────────── Page header ───────────────────────────── */

export const PageHeader = ({ title, subtitle, actions }) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
    <div>
      <h2 className="text-2xl font-extrabold text-ink">{title}</h2>
      {subtitle && <p className="text-sm text-body mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

/* ──────────────────────────────── Buttons ─────────────────────────────── */

const BUTTON_VARIANTS = {
  primary: 'bg-magenta text-white hover:bg-magenta-dark',
  secondary: 'bg-shell text-ink hover:bg-peach-light',
  ghost: 'bg-transparent text-body hover:text-ink hover:bg-shell',
  danger: 'bg-[#B3261E] text-white hover:bg-[#8C1D18]',
  dangerSoft: 'bg-[#FBE3E9] text-[#B3261E] hover:bg-[#F7D2DC]',
  outline: 'bg-white text-ink border-2 border-shell hover:border-magenta hover:text-magenta',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...rest
}) => {
  const sizes = { sm: 'px-4 py-2 text-xs', md: 'px-5 py-2.5 text-sm' };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${BUTTON_VARIANTS[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {icon && <FontAwesomeIcon icon={icon} className="text-xs" />}
      {children}
    </button>
  );
};

export const IconButton = ({ icon, label, variant = 'secondary', ...rest }) => (
  <button
    aria-label={label}
    title={label}
    className={`w-9 h-9 rounded-full inline-flex items-center justify-center text-sm transition-colors ${BUTTON_VARIANTS[variant]}`}
    {...rest}
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);

/* ───────────────────────────────── Badge ──────────────────────────────── */

const BADGE_TONES = {
  neutral: 'bg-shell text-ink',
  success: 'bg-[#E6F4EA] text-[#1E6B36]',
  warning: 'bg-peach-light text-[#8A4B12]',
  danger: 'bg-[#FBE3E9] text-[#B3261E]',
  info: 'bg-[#FBEDE5] text-magenta',
  magenta: 'bg-magenta text-white',
};

export const Badge = ({ tone = 'neutral', children }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${BADGE_TONES[tone] || BADGE_TONES.neutral}`}
  >
    {children}
  </span>
);

/* ───────────────────────────────── Toasts ─────────────────────────────── */

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const push = useCallback(
    (message, tone = 'success') => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, message, tone }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const api = useMemo(
    () => ({
      success: (m) => push(m, 'success'),
      error: (m) => push(m, 'error'),
      info: (m) => push(m, 'info'),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24 }}
              role="status"
              className="pointer-events-auto flex items-center gap-3 bg-white rounded-2xl shadow-card px-5 py-3.5 min-w-[16rem] border-l-4 border-magenta"
            >
              <FontAwesomeIcon
                icon={t.tone === 'error' ? faCircleExclamation : faCircleCheck}
                className={t.tone === 'error' ? 'text-[#B3261E]' : 'text-[#1E6B36]'}
              />
              <p className="text-sm font-semibold text-ink flex-1">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="text-body hover:text-ink"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

/* ───────────────────────────────── Modal ──────────────────────────────── */

export const Modal = ({ open, onClose, title, description, children, footer, size = 'md' }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const widths = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[55] bg-black/45 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-4xl w-full ${widths[size]} my-auto shadow-card`}
          >
            <div className="flex items-start justify-between gap-4 px-7 pt-7 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-ink">{title}</h3>
                {description && <p className="text-sm text-body mt-1">{description}</p>}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-body hover:text-ink text-lg shrink-0"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="px-7 pb-2 max-h-[65vh] overflow-y-auto">{children}</div>
            {footer && (
              <div className="flex justify-end gap-2 px-7 py-5 mt-2 border-t border-cream">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ConfirmDialog = ({ open, onClose, onConfirm, title, message, confirmLabel = 'Delete' }) => (
  <Modal
    open={open}
    onClose={onClose}
    title={title}
    size="sm"
    footer={
      <>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </>
    }
  >
    <div className="flex gap-4 pb-4">
      <span className="w-10 h-10 shrink-0 rounded-full bg-[#FBE3E9] flex items-center justify-center">
        <FontAwesomeIcon icon={faTriangleExclamation} className="text-[#B3261E]" />
      </span>
      <p className="text-sm text-body leading-relaxed">{message}</p>
    </div>
  </Modal>
);

/* ────────────────────────────── Form fields ───────────────────────────── */

const controlClass = (invalid) =>
  `w-full px-4 py-2.5 rounded-2xl bg-cream text-sm text-ink border-2 transition focus:outline-none ${
    invalid ? 'border-[#B3261E]' : 'border-transparent focus:border-magenta'
  }`;

export const Field = ({ label, error, hint, required, children, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="block text-xs font-bold text-ink mb-1.5 uppercase tracking-wide">
      {label}
      {required && <span className="text-magenta"> *</span>}
    </span>
    {children}
    {error ? (
      <span className="block text-xs text-[#B3261E] mt-1 font-semibold">{error}</span>
    ) : (
      hint && <span className="block text-xs text-body mt-1">{hint}</span>
    )}
  </label>
);

export const Input = React.forwardRef(({ invalid, className = '', ...rest }, ref) => (
  <input ref={ref} {...rest} className={`${controlClass(invalid)} ${className}`} />
));
Input.displayName = 'Input';

export const Select = React.forwardRef(({ invalid, className = '', children, ...rest }, ref) => (
  <select ref={ref} {...rest} className={`${controlClass(invalid)} ${className}`}>
    {children}
  </select>
));
Select.displayName = 'Select';

export const Textarea = React.forwardRef(({ invalid, className = '', ...rest }, ref) => (
  <textarea ref={ref} {...rest} className={`${controlClass(invalid)} resize-none ${className}`} />
));
Textarea.displayName = 'Textarea';

/* ─────────────────────────────── Empty state ──────────────────────────── */

export const EmptyState = ({ title, message, action }) => (
  <div className="text-center py-16 px-6">
    <span className="w-14 h-14 rounded-full bg-shell flex items-center justify-center mx-auto mb-4">
      <FontAwesomeIcon icon={faInbox} className="text-xl text-magenta" />
    </span>
    <p className="font-extrabold text-ink mb-1">{title}</p>
    {message && <p className="text-sm text-body mb-5 max-w-sm mx-auto">{message}</p>}
    {action}
  </div>
);

/* ───────────────────────────────── Stat tile ──────────────────────────── */

export const StatTile = ({ label, value, sub, tone = 'peach', icon }) => {
  const tones = {
    peach: 'bg-card-warm text-ink',
    magenta: 'bg-magenta text-white',
    white: 'bg-white text-ink',
  };
  const subTone = tone === 'magenta' ? 'text-white/80' : 'text-ink/65';
  return (
    <div className={`rounded-4xl p-6 shadow-soft ${tones[tone]}`}>
      <div className="flex items-start justify-between mb-3">
        <p className={`text-xs font-bold uppercase tracking-wide ${subTone}`}>{label}</p>
        {icon && <FontAwesomeIcon icon={icon} className={`text-sm ${subTone}`} />}
      </div>
      <p className="text-3xl font-extrabold leading-none mb-1.5">{value}</p>
      {sub && <p className={`text-xs ${subTone}`}>{sub}</p>}
    </div>
  );
};

/* ─────────────────────────────── Data table ───────────────────────────── */

/**
 * Sortable, searchable, paginated table with optional row selection.
 *
 * columns: [{ key, header, render?, sortValue?, className?, sortable? }]
 */
export const DataTable = ({
  columns,
  rows,
  rowKey = (r) => r.id,
  searchable = true,
  searchKeys = [],
  searchPlaceholder = 'Search…',
  pageSize = 10,
  selectable = false,
  selected = [],
  onSelectedChange,
  toolbar,
  emptyTitle = 'Nothing here yet',
  emptyMessage,
  emptyAction,
  initialSort,
}) => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(initialSort || null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    const keys = searchKeys.length ? searchKeys : columns.map((c) => c.key);
    return rows.filter((r) =>
      keys.some((k) => {
        const col = columns.find((c) => c.key === k);
        // searchValue wins: sort order (e.g. "Last First") is often not how
        // someone types a name into a search box.
        const raw = col?.searchValue
          ? col.searchValue(r)
          : col?.sortValue
          ? col.sortValue(r)
          : r[k];
        return String(raw ?? '').toLowerCase().includes(q);
      })
    );
  }, [rows, query, searchKeys, columns]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    const get = col?.sortValue || ((r) => r[sort.key]);
    return [...filtered].sort((a, b) => {
      const av = get(a);
      const bv = get(b);
      if (av === bv) return 0;
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av ?? '').localeCompare(String(bv ?? ''));
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sort, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  // Any change to the result set should return the user to the first page.
  useEffect(() => setPage(1), [query, rows.length]);

  const toggleSort = (key) =>
    setSort((s) =>
      s?.key === key
        ? s.dir === 'asc'
          ? { key, dir: 'desc' }
          : null
        : { key, dir: 'asc' }
    );

  const pageIds = pageRows.map(rowKey);
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.includes(id));

  const toggleAll = () =>
    onSelectedChange(
      allOnPageSelected
        ? selected.filter((id) => !pageIds.includes(id))
        : [...new Set([...selected, ...pageIds])]
    );

  const toggleOne = (id) =>
    onSelectedChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);

  const sortIcon = (key) => {
    if (sort?.key !== key) return faSort;
    return sort.dir === 'asc' ? faSortUp : faSortDown;
  };

  return (
    <div>
      {(searchable || toolbar) && (
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {searchable && (
            <div className="relative flex-1 max-w-md">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-body text-xs"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-cream text-sm text-ink border-2 border-transparent focus:border-magenta focus:outline-none transition"
              />
            </div>
          )}
          {toolbar && <div className="flex flex-wrap gap-2 items-center">{toolbar}</div>}
        </div>
      )}

      {sorted.length === 0 ? (
        <EmptyState
          title={query ? 'No matches' : emptyTitle}
          message={query ? `Nothing matched “${query}”.` : emptyMessage}
          action={query ? <Button variant="secondary" onClick={() => setQuery('')}>Clear search</Button> : emptyAction}
        />
      ) : (
        <>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-shell">
                  {selectable && (
                    <th className="px-4 py-3 rounded-l-2xl w-10">
                      <input
                        type="checkbox"
                        checked={allOnPageSelected}
                        onChange={toggleAll}
                        aria-label="Select all rows on this page"
                        className="rounded text-magenta focus:ring-magenta border-ink/25"
                      />
                    </th>
                  )}
                  {columns.map((col, i) => (
                    <th
                      key={col.key}
                      className={`px-4 py-3 text-left text-xs font-extrabold uppercase tracking-wide text-ink whitespace-nowrap ${
                        !selectable && i === 0 ? 'rounded-l-2xl' : ''
                      } ${i === columns.length - 1 ? 'rounded-r-2xl' : ''} ${col.className || ''}`}
                    >
                      {col.sortable === false ? (
                        col.header
                      ) : (
                        <button
                          onClick={() => toggleSort(col.key)}
                          className="inline-flex items-center gap-1.5 hover:text-magenta transition-colors"
                        >
                          {col.header}
                          <FontAwesomeIcon icon={sortIcon(col.key)} className="text-[10px] opacity-60" />
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => {
                  const id = rowKey(row);
                  const isSelected = selected.includes(id);
                  return (
                    <tr
                      key={id}
                      className={`border-b border-cream transition-colors ${
                        isSelected ? 'bg-peach-light/50' : 'hover:bg-cream'
                      }`}
                    >
                      {selectable && (
                        <td className="px-4 py-3.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleOne(id)}
                            aria-label="Select row"
                            className="rounded text-magenta focus:ring-magenta border-ink/25"
                          />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-4 py-3.5 text-sm text-ink align-middle ${col.className || ''}`}
                        >
                          {col.render ? col.render(row) : row[col.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">
            <p className="text-xs text-body">
              Showing <strong className="text-ink">{(safePage - 1) * pageSize + 1}</strong>–
              <strong className="text-ink">{Math.min(safePage * pageSize, sorted.length)}</strong> of{' '}
              <strong className="text-ink">{sorted.length}</strong>
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <IconButton
                  icon={faChevronLeft}
                  label="Previous page"
                  variant="ghost"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((n) => n === 1 || n === totalPages || Math.abs(n - safePage) <= 1)
                  .map((n, i, arr) => (
                    <React.Fragment key={n}>
                      {i > 0 && arr[i - 1] !== n - 1 && <span className="px-1 text-body">…</span>}
                      <button
                        onClick={() => setPage(n)}
                        className={`w-9 h-9 rounded-full text-sm font-bold transition-colors ${
                          n === safePage ? 'bg-magenta text-white' : 'text-ink hover:bg-shell'
                        }`}
                      >
                        {n}
                      </button>
                    </React.Fragment>
                  ))}
                <IconButton
                  icon={faChevronRight}
                  label="Next page"
                  variant="ghost"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

/* ───────────────────────────────── CSV export ─────────────────────────── */

export const exportCsv = (filename, columns, rows) => {
  const escape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const header = columns.map((c) => escape(c.header)).join(',');
  const body = rows
    .map((r) => columns.map((c) => escape(c.value ? c.value(r) : r[c.key])).join(','))
    .join('\n');
  const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
