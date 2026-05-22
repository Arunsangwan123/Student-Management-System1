const Loading = ({ label = 'Loading...' }) => (
  <div className="flex items-center justify-center rounded-2xl bg-white p-8 shadow-sm">
    <div className="flex items-center gap-3 text-slate-700">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
      <span>{label}</span>
    </div>
  </div>
);

export default Loading;
