const ChevronDown = ({ width = 17, height = 9, stroke = "#fff", ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.75 0.75L5 5.25L9.25 0.75"
      stroke={stroke}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default ChevronDown;
