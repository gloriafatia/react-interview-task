export default function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Completed: "bg-[#7ac14d]",
    "In Progress": "bg-[#b3d99b]",
    "On Hold": "bg-[#fe4c4a]",
    "On Road": "bg-[#ecde7c]",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        w-[120px]          
        h-[28px]
        rounded-md
        text-sm
        font-medium
        text-white
        whitespace-nowrap
        ${colors[status]}
      `}
    >
      {status}
    </span>
  );
}
