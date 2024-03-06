// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Import Axios
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is included

// // Interface for user data, assuming response structure
// interface UserData {
//   authid: number;
//   firstName: string;
//   lastName: string;
//   department: string;
//   email: string;
//   phone: string;
// }

// // Define a custom interface for potential errors
// interface MyError {
//   message: string;
//   // Add other properties if needed (e.g., status code)
// }

// const TableUsers = () => {
//   const [data, setData] = useState<UserData[]>([]);
//   const [error, setError] = useState<MyError | null>(null);

//   useEffect(() => {
//     axios
//       .get<UserData[]>("http://localhost/Projects/Backend/test.php") // Using .get with type parameter
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         if (axios.isAxiosError(err)) {
//           setError({
//             message: err.message, // Access error message from AxiosError
//           });
//         } else {
//           console.error("Unexpected error:", err);
//         }
//       });
//   }, []);

//   return (
//     <div className="table1">
//       {error ? (
//         <p>Error fetching data: {error.message}</p>
//       ) : (
//         <table className="table table-striped table-hover custom-table">
//           <thead className="thead-dark">
//             <tr>
//               <th scope="col">id</th>
//               <th scope="col">Naam</th>
//               <th scope="col">Department</th>
//               <th scope="col">Email</th>
//               <th scope="col">Phone</th>
//               <th scope="col" className="text-white">
//                 Kijken
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item) => (
//               <tr key={item.authid} className="table-row">
//                 <th scope="row">{item.authid}</th>
//                 <td style={{ paddingLeft: "15px" }}>
//                   {item.firstName} {item.lastName}
//                 </td>
//                 <td>{item.department}</td>
//                 <td>{item.email}</td>
//                 <td>{item.phone}</td>
//                 <td>
//                   <Link to={`/profile/${item.authid}`} className="btn btn-info">
//                     Info
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default TableUsers;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface UserData {
  authid: number;
  firstName: string;
  lastName: string;
  department: string;
  email: string;
  phone: string;
}

interface MyError {
  message: string;
}

const TableUsers = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [error, setError] = useState<MyError | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    axios
      .get<UserData[]>("http://localhost/Projects/Backend/test.php")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(
          err instanceof axios.AxiosError ? err : { message: err.message }
        );
      });
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // Add more fields to search if needed
      false
  );

  return (
    <div className="table1">
      {error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Zoek op naam, afdeling, e-mail, telefoon."
          />
          <table className="table table-striped table-hover custom-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">id</th>
                <th scope="col">Naam</th>
                <th scope="col">Department</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col" className="text-white">
                  Kijken
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.authid} className="table-row">
                  <th scope="row">{item.authid}</th>
                  <td style={{ paddingLeft: "15px" }}>
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{item.department}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Link
                      to={`/profile/${item.authid}`}
                      className="btn btn-info"
                    >
                      Info
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TableUsers;
