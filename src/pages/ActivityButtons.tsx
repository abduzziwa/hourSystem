import React, { useState } from "react";

type Props = {
  onRecordActivity: (
    activityName: string,
    startTime: Date,
    endTime: Date | null,
    totalHours: number
  ) => void;
};

const ActivityButtons: React.FC<Props> = ({ onRecordActivity }) => {
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [activeActivityStartTime, setActiveActivityStartTime] =
    useState<Date | null>(null);

  const handleClick = (activityName: string) => {
    if (activeActivity === activityName) {
      // End the activity
      const endTime = new Date();
      if (!activeActivityStartTime) return; // Ensure activeActivityStartTime is not null

      const totalHours = calculateTotalHours(activeActivityStartTime, endTime);

      onRecordActivity(
        activeActivity,
        activeActivityStartTime,
        endTime,
        totalHours
      );
      console.log(`Activity "${activeActivity}" ended at ${endTime}`);
      setActiveActivity(null);
      setActiveActivityStartTime(null);
    } else if (!activeActivity) {
      // Start the activity
      const startTime = new Date();
      onRecordActivity(activityName, startTime, null, 0); // Pass 0 as total hours initially
      console.log(`Activity "${activityName}" started at ${startTime}`);
      setActiveActivity(activityName);
      setActiveActivityStartTime(startTime);
    } else {
      // User is already doing an activity, cannot start another one
      alert(
        `You're currently doing "${activeActivity}". Please end it before starting another activity.`
      );
      console.log(
        `You're currently doing "${activeActivity}". Please end it before starting another activity.`
      );
    }
  };

  // Function to calculate total hours
  const calculateTotalHours = (startTime: Date, endTime: Date): number => {
    const timeDiff = endTime.getTime() - startTime.getTime();
    const hours = timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours
    return hours;
  };

  return (
    <div className="container">
      <h2>Choose an activity</h2>
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => handleClick("Userstory")}
          >
            Userstory
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => handleClick("Huiswerk")}
          >
            Huiswerk
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => handleClick("Zelfstading leren")}
          >
            Zelfstading leren
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => handleClick("Lesure")}
          >
            Lesure
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityButtons;

{
  <div>
    <Profile userId={userId} />;
  </div>;
}
