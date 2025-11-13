import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <Link
        to="/tasks"
        className={`navigation__link ${
          location.pathname === "/tasks" ? "navigation__link--active" : ""
        }`}
      >
        Tasks
      </Link>
      <Link
        to="/contacts"
        className={`navigation__link ${
          location.pathname === "/contacts" ? "navigation__link--active" : ""
        }`}
      >
        Contacts
      </Link>
      <Link
        to="/counter"
        className={`navigation__link ${
          location.pathname === "/counter" ? "navigation__link--active" : ""
        }`}
      >
        Counter
      </Link>
    </nav>
  );
};

export default Navigation;
