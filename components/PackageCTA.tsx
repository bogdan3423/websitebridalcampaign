"use client";
export function PackageCTA({
  id,
  name,
  recommended,
}: {
  id: string;
  name: string;
  recommended: boolean;
}) {
  return (
    <a
      href="#contact"
      className={`button ${recommended ? "button-dark" : ""}`}
      onClick={() =>
        window.dispatchEvent(new CustomEvent("select-package", { detail: id }))
      }
    >
      Aleg {name}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
