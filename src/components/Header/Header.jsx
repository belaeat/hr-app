import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Header.css";

const Header = ({ isLoggedIn, loginHandler }) => {
  const buttonText = isLoggedIn ? "Log out" : "Log in";

  return (
    <header>
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
          {/* <Button onClick={loginHandler} buttonText={buttonText} /> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
