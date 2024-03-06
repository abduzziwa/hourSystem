import Sidebar from "../components/Sidebar";
import TableUsers from "../components/TableUsers";
import "../App.css";

const Dashboard = () => {
  return (
    <div className="Dash">
      <div className="d-flex">
        <Sidebar />
        <div className="card dash">
          <div className="card-body">
            <h5 className="card-title dash-title">
              Dashboard <span>Groep A4</span>
            </h5>
            {/* <div className="d-flex justify-content-evenly">
              {dummyData.slice(0, 1).map((userData) => (
                <Card key={userData.id} userData={userData} />
              ))}
            </div> */}
            <TableUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
