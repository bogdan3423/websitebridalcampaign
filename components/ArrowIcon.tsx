const paths = {
  "up-right": "M5 15 15 5M5 5h10v10",
  right: "M4 10h12m-5-5 5 5-5 5",
  left: "M16 10H4m5-5-5 5 5 5",
  down: "M10 4v12m-5-5 5 5 5-5",
  up: "M10 16V4m-5 5 5-5 5 5",
};

export function ArrowIcon({ direction = "up-right" }: { direction?: keyof typeof paths }) {
  return (
    <svg className="arrow-icon" data-direction={direction} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d={paths[direction]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
