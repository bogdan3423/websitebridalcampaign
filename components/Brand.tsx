import Image from "next/image";
import { site } from "@/data/site";
export function Brand() {
  return (
    <a href="#" aria-label={`${site.name} — început`} className="brand">
      {site.logo ? (
        <Image src={site.logo} width={180} height={48} alt={site.name} />
      ) : (
        <>
          <span>
            {site.name.toUpperCase()}
            <span className="brand-period">.</span>
          </span>
        </>
      )}
    </a>
  );
}
