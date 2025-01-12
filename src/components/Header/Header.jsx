import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ isLoggedIn, loginHandler }) => {
  const buttonText = isLoggedIn ? "Log out" : "Log in";

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>Employee Dashboard</h1>
      </Link>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="new">Add New</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
