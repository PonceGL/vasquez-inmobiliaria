export const ProgressCircle = ({ width = "100%" }) => {
  return (
    <svg
      width={width}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="Gradient1" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="var(--admin-ring-right)" />
          <stop offset="100%" stopColor="var(--admin-ring-left)" />
        </linearGradient>
        <linearGradient id="Gradient2" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="var(--admin-ring-right)" />
          <stop offset="100%" stopColor="var(--admin-ring-left)" />
        </linearGradient>
        <pattern
          id="Pattern"
          x="0"
          y="0"
          width="600"
          height="600"
          patternUnits="userSpaceOnUse"
        >
          <g transform="rotate(0, 300, 300)">
            <rect
              shapeRendering="crispEdges"
              x="0"
              y="0"
              width="300"
              height="600"
              fill="url(#Gradient1)"
            />
            <rect
              shapeRendering="crispEdges"
              x="300"
              y="0"
              width="300"
              height="600"
              fill="url(#Gradient2)"
            />
          </g>
        </pattern>
      </defs>
      <circle
        cx="250"
        cy="250"
        r="220"
        stroke="var(--admin-bg)"
        strokeWidth="60"
        strokeDasharray="0"
        strokeDashoffset="0"
      />
      <circle
        cx="250"
        cy="250"
        r="220"
        stroke="url(#Pattern)"
        strokeWidth="60"
        strokeDasharray="1400"
        strokeDashoffset="1400"
      />
    </svg>
  );
};
