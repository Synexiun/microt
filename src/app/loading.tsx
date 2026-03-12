export default function Loading() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo placeholder */}
        <div className="flex justify-center">
          <div
            className="h-10 w-48 rounded bg-dark-lighter relative overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 25%, rgba(201,169,110,0.15) 50%, transparent 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Hero placeholder */}
        <div className="space-y-4">
          <div
            className="h-8 w-3/4 mx-auto rounded bg-dark-lighter relative overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 25%, rgba(201,169,110,0.15) 50%, transparent 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.5s ease-in-out infinite",
              animationDelay: "0.1s",
            }}
          />
          <div
            className="h-4 w-1/2 mx-auto rounded bg-dark-lighter relative overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 25%, rgba(201,169,110,0.15) 50%, transparent 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.5s ease-in-out infinite",
              animationDelay: "0.2s",
            }}
          />
        </div>

        {/* Content bars */}
        <div className="space-y-3">
          {[100, 90, 75, 85, 60].map((width, i) => (
            <div
              key={i}
              className="h-4 rounded bg-dark-lighter relative overflow-hidden animate-pulse"
              style={{
                width: `${width}%`,
                backgroundImage:
                  "linear-gradient(110deg, transparent 25%, rgba(201,169,110,0.12) 50%, transparent 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2.5s ease-in-out infinite, pulse 2s ease-in-out infinite",
                animationDelay: `${0.3 + i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Card placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-40 rounded-lg bg-dark-lighter relative overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, transparent 25%, rgba(201,169,110,0.12) 50%, transparent 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2.5s ease-in-out infinite",
                animationDelay: `${0.6 + i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
