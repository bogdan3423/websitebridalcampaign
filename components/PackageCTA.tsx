"use client";
import { ArrowIcon } from "./ArrowIcon";

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
      Alege {name}
      <ArrowIcon />
    </a>
  );
}
