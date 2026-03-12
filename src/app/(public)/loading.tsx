export default function PublicLoading() {
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero skeleton */}
      <div className="h-[60vh] bg-dark-light relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(110deg, transparent 25%, rgba(201,169,110,0.1) 50%, transparent 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2.5s ease-in-out infinite",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-8">
          <div
            className="h-10 w-80 max-w-full rounded bg-dark-lighter/60"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 25%, rgba(201,169,110,0.15) 50%, transparent 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.5s ease-in-out infinite",
            }}
          />
          <div
            className="h-4 w-64 max-w-full rounded bg-dark-lighter/60"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 25%, rgba(201,169,110,0.15) 50%, transparent 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.5s ease-in-out infinite",
              animationDelay: "0.15s",
            }}
          />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-6">
        {/* Section heading */}
        <div className="flex flex-col items-center space-y-3 mb-10">
          <div
            className="h-7 w-56 rounded bg-dark-lighter"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 25%, rgba(201,169,110,0.15) 50%, transparent 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.5s ease-in-out infinite",
              animationDelay: "0.2s",
            }}
          />
          <div
            className="h-[2px] w-16 rounded bg-gold/30"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
        </div>

        {/* Horizontal bars of varying widths */}
        {[
          { w: "100%", delay: "0.3s" },
          { w: "88%", delay: "0.4s" },
          { w: "95%", delay: "0.5s" },
          { w: "70%", delay: "0.6s" },
          { w: "80%", delay: "0.7s" },
          { w: "60%", delay: "0.8s" },
        ].map((bar, i) => (
          <div
            key={i}
            className="h-4 rounded bg-dark-lighter"
            style={{
              width: bar.w,
              backgroundImage:
                "linear-gradient(110deg, transparent 25%, rgba(201,169,110,0.12) 50%, transparent 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.5s ease-in-out infinite, pulse 2s ease-in-out infinite",
              animationDelay: bar.delay,
            }}
          />
        ))}

        {/* Card grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-3">
              <div
                className="h-48 rounded-lg bg-dark-lighter"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, transparent 25%, rgba(201,169,110,0.1) 50%, transparent 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2.5s ease-in-out infinite",
                  animationDelay: `${0.9 + i * 0.15}s`,
                }}
              />
              <div
                className="h-4 w-3/4 rounded bg-dark-lighter"
                style={{
                  animation: "pulse 2s ease-in-out infinite",
                  animationDelay: `${1.0 + i * 0.15}s`,
                }}
              />
              <div
                className="h-3 w-1/2 rounded bg-dark-lighter"
                style={{
                  animation: "pulse 2s ease-in-out infinite",
                  animationDelay: `${1.1 + i * 0.15}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
