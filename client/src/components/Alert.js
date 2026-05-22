const Alert = ({ message, variant = 'info' }) => {
  const color = variant === 'success' ? 'bg-emerald-100 text-emerald-900' : variant === 'error' ? 'bg-rose-100 text-rose-900' : 'bg-sky-100 text-sky-900';
  return (
    <div className={`${color} rounded-xl border border-current/10 px-4 py-3 text-sm`}>{message}</div>
  );
};

export default Alert;
