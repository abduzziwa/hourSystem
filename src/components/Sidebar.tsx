import { BiSolidDashboard } from "react-icons/bi";
import { IoIosPersonAdd } from "react-icons/io";
import { RiRegisteredFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import "./component styles/Sidebar.css"; // Import CSS file for styling

const Sidebar = () => {
  return (
    <div className="card side style">
      <div className="card-body">
        <h5 className="card-title">
          <span className="admin">
            <a href="/Dashboard">Admin</a>
          </span>
        </h5>
        <div className="links">
          <a href="/Dashboard">
            <span className="icon">
              <BiSolidDashboard />
              <span className="text">Dashboard</span>
            </span>
          </a>
          <a href="/Signup">
            <span className="icon">
              <IoIosPersonAdd />
              <span className="text">Lid toevoegen</span>
            </span>
          </a>
          <a href="/time">
            <span className="icon">
              <RiRegisteredFill />
              <span className="text">Registreer de tijd</span>
            </span>
          </a>
          <a href="/">
            <span className="icon">
              <BiLogOut />
              <span className="text">Afmelden</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
