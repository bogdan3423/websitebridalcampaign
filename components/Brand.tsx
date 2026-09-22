import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
export function Brand() {
  return (
    <Link href="/" aria-label={`${site.name} — început`} className="brand">
      {site.logo ? (
        <Image src={site.logo} width={180} height={48} alt={site.name} />
      ) : (
        <span>{site.name.toUpperCase()}</span>
      )}
    </Link>
  );
}
