// // export default Don;
// import React, { useState, useEffect } from "react";
// import DonutChart from "react-donut-chart";
// import axios, { AxiosError } from "axios"; // Assuming you're using axios for API calls

// // Interface to define the expected data structure
// interface WorkdayData {
//   id: string;
//   memberId: string;
//   startTime: string;
//   endTime: string;
//   // ... other properties (optional)
// }

// // convert a time sting from the server to a number
// const convertTimeStringToDecimal = (timeString: string): number => {
//   const [hoursStr, minutesStr] = timeString.split(":");
//   const hours = parseInt(hoursStr);
//   const minutes = parseInt(minutesStr) / 60;

//   return hours + minutes;
// };

// // get the current time in decimal forrmat
// function getCurrentTimeAsDecimal(): number {
//   const currentTime = new Date();
//   const hours = currentTime.getHours();
//   const minutes = currentTime.getMinutes();
//   const seconds = currentTime.getSeconds();
//   const timeString = `${hours}:${minutes}:${seconds}`;

//   const decimalTime = convertTimeStringToDecimal(timeString);
//   return Number(decimalTime.toFixed(2));
// }

// const Don: React.FC<{ userId: string | undefined }> = ({ userId }) => {
//   const [hoursPresent, setHoursPresent] = useState(0); // Hours worked (initially 0)
//   const [hoursUnworked, setHoursUnworked] = useState(0); // Hours unworked (late arrival)
//   const [hoursRemaining, setHoursRemaining] = useState(8); // Hours remaining (initially full day)
//   const [isLoading, setIsLoading] = useState(false); // Flag to indicate data loading
//   const [isRegistered, setIsRegistered] = useState(false); // Flag to indicate registration
//   const [error, setError] = useState<AxiosError>(); // Placeholder for errors

//   // Function to fetch and calculate present, unworked, remaining hours
//   const fetchData = async () => {
//     try {
//       if (!userId) {
//         console.error("Missing userId prop in Don component");
//         return; // Or display an error message
//       }

//       setIsLoading(true); // Set loading state

//       const response = await axios.get<WorkdayData[]>( // Expecting an array of WorkdayData
//         `http://localhost/Projects/Backend/getTimeId.php?id=${userId}`
//       );
//       const data = response.data;

//       if (data.length > 0) {
//         const { startTime, endTime } = data[0]; // Destructure first element

//         setIsRegistered(true);
//         const currentTime = getCurrentTimeAsDecimal();
//         console.log("c : " + currentTime);

//         // **Handle potential parsing errors:**
//         try {
//           const parsedStartTime = convertTimeStringToDecimal(startTime);
//           const parsedEndTime = convertTimeStringToDecimal(endTime);

//           const totalHours = parsedEndTime - parsedStartTime;

//           console.log("t : " + totalHours);
//           // Calculate worked hours (ensure it doesn't exceed total hours)
//           const elapsedHours = Math.min(
//             Math.floor(
//               (currentTime.getTime() - parsedStartTime.getTime()) /
//                 (1000 * 60 * 60)
//             ),
//             totalHours
//           );
//           setHoursPresent(elapsedHours);

//           // Calculate unworked hours (late arrival)
//           const unworkedMinutes = Math.max(
//             parsedStartTime.getMinutes() - currentTime.getMinutes(),
//             0
//           );
//           setHoursUnworked(Math.floor(unworkedMinutes / 60));

//           // Calculate remaining hours (ensure it's non-negative)
//           const remainingMinutes = Math.max(
//             parsedEndTime.getMinutes() - currentTime.getMinutes(),
//             0
//           );
//           setHoursRemaining(Math.floor(remainingMinutes / 60));
//         } catch (err) {
//           console.error("Error parsing date/time:", err);
//           setError({ message: "Invalid data format received" }); // Handle parsing errors gracefully
//         }
//       } else {
//         setIsRegistered(false); // No data found
//       }
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         setError(err); // Update error handling if needed
//       } else {
//         console.error("Unexpected error:", err);
//       }
//     } finally {
//       setIsLoading(false); // Clear loading state
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [userId]); // Run effect whenever userId changes

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return (
//       <div className="error">Error: {error.message || "An error occurred"}</div>
//     ); // Handle errors
//   }

//   if (!isRegistered) {
//     return <p>Not Yet Registered</p>;
//   }

//   // **Handle potential NaN values before rendering the chart:**
//   const totalValue = hoursPresent + hoursUnworked + hoursRemaining;

//   const chartData = [
//     { label: "Unworked Hours", value: hoursUnworked || 0, color: "#9c27b0" }, // Late arrival (red)
//     { label: "Worked Hours", value: hoursPresent || 0, color: "#FF4500" }, // Worked hours (orange)
//     { label: "Remaining Hours", value: hoursRemaining || 0, color: "#32CD32" }, // Remaining hours (green)
//   ];

//   // **Conditional rendering for the chart:**
//   return (
//     <div>
//       {!isNaN(totalValue) ? (
//         <DonutChart
//           data={chartData}
//           className="donut-chart"
//           height={700}
//           width={700}
//           colors={chartData.map((item) => item.color)} // Dynamically set colors
//         />
//       ) : (
//         <p>Error: Invalid data received. Please check API response.</p>
//       )}
//     </div>
//   );
// };

// export default Don;

import React, { useState, useEffect } from "react";
import DonutChart from "react-donut-chart";
import axios, { AxiosError } from "axios"; // Assuming you're using axios for API calls

// Interface to define the expected data structure
interface WorkdayData {
  id: string;
  memberId: string;
  startTime: string;
  endTime: string;
  // ... other properties (optional)
}

// convert a time string from the server to a number
const convertTimeStringToDecimal = (timeString: string): number => {
  const [hoursStr, minutesStr, secondsStr] = timeString.split(":");
  const hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr) / 60;
  const seconds = parseInt(secondsStr) / 3600;

  return hours + minutes + seconds;
};

// get the current time in decimal format
function getCurrentTimeAsDecimal(): number {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const timeString = `${hours}:${minutes}:${seconds}`;

  const decimalTime = convertTimeStringToDecimal(timeString);
  return Number(decimalTime.toFixed(2));
}

const Don: React.FC<{ userId: string | undefined }> = ({ userId }) => {
  const [hoursPresent, setHoursPresent] = useState(0); // Hours worked (initially 0)
  const [hoursUnworked, setHoursUnworked] = useState(0); // Hours unworked (late arrival)
  const [hoursRemaining, setHoursRemaining] = useState(8); // Hours remaining (initially full day)
  const [isLoading, setIsLoading] = useState(false); // Flag to indicate data loading
  const [isRegistered, setIsRegistered] = useState(false); // Flag to indicate registration
  const [error, setError] = useState<AxiosError>(); // Placeholder for errors

  // Function to fetch and calculate present, unworked, remaining hours
  const fetchData = async () => {
    try {
      if (!userId) {
        console.error("Missing userId prop in Don component");
        return; // Or display an error message
      }

      setIsLoading(true); // Set loading state

      const response = await axios.get<WorkdayData[]>( // Expecting an array of WorkdayData
        `http://localhost/Projects/Backend/getTimeId.php?id=${userId}`
      );
      const data = response.data;

      if (data.length > 0) {
        const { startTime, endTime } = data[0]; // Destructure first element

        setIsRegistered(true);
        const currentTime = getCurrentTimeAsDecimal();

        // **Handle potential parsing errors:**
        try {
          const parsedStartTime = convertTimeStringToDecimal(startTime);
          const parsedEndTime = convertTimeStringToDecimal(endTime);

          const totalHours = parsedEndTime - parsedStartTime;

          // Calculate worked hours (ensure it doesn't exceed total hours)
          const elapsedHours = Math.min(
            currentTime - parsedStartTime,
            totalHours
          );
          setHoursPresent(elapsedHours);

          // Calculate unworked hours (late arrival)
          const unworkedHours = Math.max(parsedStartTime - currentTime, 0);
          setHoursUnworked(unworkedHours);

          // Calculate remaining hours (ensure it's non-negative)
          const remainingHours = Math.max(parsedEndTime - currentTime, 0);
          setHoursRemaining(remainingHours);
        } catch (err) {
          console.error("Error parsing date/time:", err);
          setError({ message: "Invalid data format received" }); // Handle parsing errors gracefully
        }
      } else {
        setIsRegistered(false); // No data found
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err); // Update error handling if needed
      } else {
        console.error("Unexpected error:", err);
      }
    } finally {
      setIsLoading(false); // Clear loading state
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]); // Run effect whenever userId changes

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="error">Error: {error.message || "An error occurred"}</div>
    ); // Handle errors
  }

  if (!isRegistered) {
    return <p>Not Yet Registered</p>;
  }

  // **Handle potential NaN values before rendering the chart:**
  const totalValue = hoursPresent + hoursUnworked + hoursRemaining;

  const chartData = [
    { label: "Unworked Hours", value: hoursUnworked || 0, color: "#9c27b0" }, // Late arrival (red)
    { label: "Worked Hours", value: hoursPresent || 0, color: "#FF4500" }, // Worked hours (orange)
    { label: "Remaining Hours", value: hoursRemaining || 0, color: "#32CD32" }, // Remaining hours (green)
  ];

  // **Conditional rendering for the chart:**
  return (
    <div>
      {!isNaN(totalValue) ? (
        <DonutChart
          data={chartData}
          className="donut-chart"
          height={700}
          width={700}
          colors={chartData.map((item) => item.color)} // Dynamically set colors
        />
      ) : (
        <p>Error: Invalid data received. Please check API response.</p>
      )}
    </div>
  );
};

export default Don;

// Interface to define the expected data structure
