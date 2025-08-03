export const MultipleBadges = ({ data }: { data: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {data.map((category, index) => (
      <span key={index} className="inline-block rounded-full bg-black px-2 py-1 text-xs font-semibold text-white">
        {category.trim()}
      </span>
    ))}
  </div>
);

export const SingleBadge = ({ data }: { data: string }) => {
const getStatusColor = (status: string) => {
  const statusLower = status.toLowerCase();

  switch (statusLower) {
    case 'upcoming':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20';
    case 'paused':
      return 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20';
    case 'completed':
      return 'bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-400/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-400/20';
  }
};

  return (
    <div className="flex flex-wrap gap-2">
      <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(data)}`}>
        {data.trim()}
      </span>
    </div>
  );
};
