import { Logo } from "@/components";
import { COMPONNY_NAME } from "@/constants";

import Link from "next/link";

import { Menu } from "./public/Menu";

interface Props {
  showLogo?: boolean;
}

export function Navbar({ showLogo = true }: Props) {
  return (
    <header className="w-full h-16 p-4 flex justify-between items-center bg-white">
      {showLogo && (
        <Link
          href="/"
          className="w-fit grid grid-cols-[1fr_auto] gap-2 items-center"
        >
          <div className="h-12 aspect-square flex justify-center items-center">
            <Logo />
          </div>
          <h1 className="hidden">{COMPONNY_NAME}</h1>
        </Link>
      )}
      <Menu />
    </header>
  );
}
