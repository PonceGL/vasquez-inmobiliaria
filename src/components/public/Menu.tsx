"use client";
import { MobileMenuContainer } from "@/components";
// import { useWindowSize } from "@uidotdev/usehooks"; // TODO: implement after
import { usePublicMenu } from "@/hooks";

import React, { useCallback, useState } from "react";
import Link from "next/link";

export function Menu() {
  const { menu } = usePublicMenu();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  if (!Array.isArray(menu)) return null;

  return (
    <>
      <MobileMenuContainer isDisplayed={isOpen} />
      <button
        data-collapse-toggle="navbar-dropdown"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-800 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-dropdown"
        aria-expanded="false"
        onClick={toggleMenu}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </>
  );

  return (
    <nav>
      <ul className="w-fit ">
        {menu.map(({ id, label, path, isDropdown }) => (
          <li key={id}>
            {!isDropdown ? (
              <Link href={path}>{label}</Link>
            ) : (
              <button
                id={`${id}_dropdown`}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 lg:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
              >
                {label}{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
