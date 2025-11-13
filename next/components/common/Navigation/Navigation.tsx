"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navigation.css";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="navigation">
      <Link
        href="/tasks"
        className={`navigation__link ${
          pathname === "/tasks" ? "navigation__link--active" : ""
        }`}
      >
        Tasks
      </Link>
      <Link
        href="/contacts"
        className={`navigation__link ${
          pathname === "/contacts" ? "navigation__link--active" : ""
        }`}
      >
        Contacts
      </Link>
      <Link
        href="/counter"
        className={`navigation__link ${
          pathname === "/counter" ? "navigation__link--active" : ""
        }`}
      >
        Counter
      </Link>
    </nav>
  );
};

export default Navigation;

