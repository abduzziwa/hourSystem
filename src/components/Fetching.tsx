import { useState, useEffect } from "react";
import { UserData } from "./UserData"; // Import the UserData interface

function YourComponent() {
  const [userData, setUserData] = useState<UserData[]>([]); // Specify UserData[] as the type for userData state

  useEffect(() => {
    // Make a POST request to the userDataEndpoint
    fetch("http://localhost:5173/Data")
      .then((response) => response.json())
      .then((data: UserData[]) => {
        // Specify UserData[] as the type for received data
        // Update the state with the received data
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to execute the effect only once when the component mounts

  return (
    <div>
      {/* Display your fetched data here */}
      {userData.map((user) => (
        <div key={user.id}>
          {/* Render user information */}
          <p>
            Name: {user.firstName} {user.lastName}
          </p>
          <p>Email: {user.email}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
}

export default YourComponent;
