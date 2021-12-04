export const Themelight = ({ width = "100%" }) => {
  return (
    <svg
      width={width}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="250" cy="250" r="150" fill="var(--admin-text)" />
      <circle
        cx="250"
        cy="250"
        r="215"
        stroke="var(--admin-main)"
        strokeWidth="60"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 170"
      />
    </svg>
  );
};
