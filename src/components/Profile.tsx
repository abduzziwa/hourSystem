import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../components/component styles/profile.css";
import Don from "./Don";
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  department?: string; // Optional property
  skills?: string[]; // Optional property
  phone?: string; // Optional property
  jobtitle?: string; // Optional property
  avatar?: string; // Optional property
}

interface ProfileProps {
  userId: string | undefined; // The user ID to fetch data for
}

type MyError = {
  message: string; // Error message property
  // Add other properties specific to your error structure
};

const Profile: React.FC<ProfileProps> = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState<MyError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true); // Set loading state
      try {
        const response = await axios.get<UserData[]>(
          `http://localhost/Projects/Backend/users.php?id=${userId}`
        );
        const [user] = response.data;
        setUser(user);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError({ message: err.message });
        } else {
          console.error("Unexpected error:", err);
        }
      } finally {
        setIsLoading(false); // Clear loading state after success or failure
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="profile-container">
      {isLoading ? (
        <div>Loading user data...</div>
      ) : error ? (
        <div className="error">Error: {error.message}</div>
      ) : user ? (
        <UserDataDisplay user={user} /> // Pass user data to UserDataDisplay
      ) : (
        <div>No user found with ID: {userId}</div>
      )}
    </div>
  );
};

const UserDataDisplay: React.FC<{ user: UserData }> = ({ user }) => {
  return (
    <div className="outerdiv">
      <div className="profile-content">
        <div className="card1">
          <div className="card-body">
            {user.avatar && (
              <img src={user.avatar} alt="User Avatar" className="avatar" />
            )}
          </div>
        </div>
        <div className="card2">
          <div className="card-body">
            <p className="text-start">
              Naam: {user.firstName} {user.lastName}
            </p>
            <p className="text-start">Department: {user?.department}</p>
            <p className="text-start">Email: {user.email}</p>
            <p className="text-start">Skills: {user?.skills?.join(", ")}</p>
            <p className="text-start">
              Phone: {user?.phone || "No phone number provided"}
            </p>
            <p className="text-start">
              Job Title: {user?.jobtitle || "Job title not provided"}
            </p>
          </div>
        </div>
      </div>
      {/* <Don userId={userId} /> */}
    </div>
  );
};

export default Profile;
