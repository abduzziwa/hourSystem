import Sidebar from "./Sidebar";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import "../components/component styles/profile.css";
const GProfile = () => {
  const { userid } = useParams();
  return (
    <>
      <div className="full">
        <Sidebar />
        <div className="pro">
          <Profile userId={userid} />
        </div>
      </div>
    </>
  );
};

export default GProfile;
