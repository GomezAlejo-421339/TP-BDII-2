export function CardSkeleton({ lines = 2 }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 animate-fade-in">
      <div className="skeleton h-4 w-3/4" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-3 w-full" />
      ))}
    </div>
  )
}

export function TableSkeleton({ rows = 5, cols = 3 }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 animate-fade-in">
      <div className="skeleton h-4 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="skeleton h-3 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}
