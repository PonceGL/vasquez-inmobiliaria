"use client";
import { Navbar } from "@/components";

import { useWindowSize } from "@uidotdev/usehooks";

interface Props {
  isDisplayed: boolean;
}

export function MobileMenuContainer({ isDisplayed }: Props) {
  const { width } = useWindowSize();
  return (
    <div
      className="w-full h-dvh bg-white flex flex-col justify-start items-start fixed z-50 border border-pink-500"
      style={{
        left: isDisplayed ? 0 : width ?? 500,
      }}
    >
      <Navbar showLogo={false} />
    </div>
  );
}
