export function SectionLabel({
  number,
  children,
  light = false,
}: {
  number: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-label${light ? " label-light" : ""}`}>
      <span className="eyebrow">{children}</span>
      <span className="eyebrow">/ {number}</span>
    </div>
  );
}
