export default function AdminLoading() {
  return (
    <div className="space-y-6">
      {/* Page header skeleton */}
      <div className="flex items-center justify-between">
        <div
          className="h-8 w-48 rounded bg-dark-lighter animate-pulse"
        />
        <div
          className="h-10 w-32 rounded bg-dark-lighter animate-pulse"
        />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 rounded-lg bg-dark-lighter animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border border-dark-lighter overflow-hidden">
        {/* Table header */}
        <div className="bg-dark-lighter px-4 py-3 flex gap-4">
          {["20%", "25%", "20%", "15%", "10%", "10%"].map((w, i) => (
            <div
              key={i}
              className="h-4 rounded bg-dark-light animate-pulse"
              style={{ width: w, animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>

        {/* Table rows */}
        {Array.from({ length: 8 }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="px-4 py-3 flex gap-4 border-t border-dark-lighter"
          >
            {["20%", "25%", "20%", "15%", "10%", "10%"].map((w, colIdx) => (
              <div
                key={colIdx}
                className="h-4 rounded bg-dark-lighter animate-pulse"
                style={{
                  width: w,
                  animationDelay: `${(rowIdx * 6 + colIdx) * 0.03}s`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-between items-center pt-2">
        <div className="h-4 w-32 rounded bg-dark-lighter animate-pulse" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-8 w-8 rounded bg-dark-lighter animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
