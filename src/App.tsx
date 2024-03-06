// import "./App.css";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TimeEntryForm from "./pages/TimeEntryForm";
// import Gprofile from "./pages/Gprofile";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route index element={<Login />} />
//           <Route path="Dashboard" element={<Dashboard />} />
//           <Route path="Signup" element={<Signup />} />
//           <Route path="profile" element={<Gprofile />} />
//           <Route
//             path="time"
//             element={<TimeEntryForm adminId={"123456"} userId={"123456"} />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimeEntryForm from "./pages/TimeEntryForm"; // Import your Gprofile component
import YourComponent from "./components/Fetching";
import TableUsers from "./components/TableUsers";
import GProfile from "./components/GProfile";
import Don from "./components/Don";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Data" element={<YourComponent />} />
          <Route path="/test" element={<TableUsers />} />
          <Route path="/profile/:userId" element={<GProfile />} />
          <Route path="/Don" element={<Don userId="101" />} />
          <Route
            path="/time"
            element={<TimeEntryForm adminId={"123456"} userId={"123456"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
