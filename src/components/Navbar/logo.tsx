import freshCartLogo from "@/assets/freshcart-logo.49f1b44d.svg";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <Link
    aria-label="FreshCart home"
    className="flex shrink-0 items-center"
    href="/"
  >
    <Image
      alt="FreshCart"
      className="h-auto w-36"
      height={31}
      priority
      src={freshCartLogo}
      width={160}
    />
  </Link>
);
