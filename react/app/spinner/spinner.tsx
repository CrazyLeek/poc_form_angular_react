export function Spinner() {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      aria-hidden="true"
      className="inline animate-spin w-4 ml-2"
    >
      <circle cx="25" cy="25" r="20" stroke="#cfcccc" strokeWidth="5" />
      <path
        d="M45 25a20 20 0 0 1-20 20"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
