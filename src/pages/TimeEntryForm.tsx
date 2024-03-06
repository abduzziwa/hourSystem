import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar";
import { UserData } from "../components/UserData"; // Importing UserData type
import { dummyData } from "../components/DumyData"; // Importing dummy data
import axios from "axios";

interface FormData {
  selectedUser: string | null; // Changed selectedUser type to string
  startTime: string | null;
  endTime: string | null;
  selectedOption: string | null;
  lateReason: string | null;
  adminId: string;
  userId: string;
  RegTime: string;
  RegDate: string;
}

const TimeEntryForm: React.FC<{ adminId: string; userId: string }> = ({
  adminId,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
    watch,
    reset,
  } = useForm<FormData>();

  const selectedOption = watch("selectedOption");
  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const [isLate, setIsLate] = useState<boolean>(false);

  // Function to check if the start time is after 9:00 AM
  const isLateStart = (time: string | null) => {
    if (!time) return false;

    const hour = parseInt(time.split(":")[0]);
    return hour >= 9;
  };

  // Update isLate state based on the start time
  React.useEffect(() => {
    setIsLate(isLateStart(startTime));
  }, [startTime]);

  const disableAllInputs = (option: string | null, time: string | null) => {
    return option == "absent" && (!time || time === "");
  };

  function Onsubmit(data: FormData) {
    console.log(data);
    reset();
  }
  // const Onsubmit = (data) => {
  //   axios
  //     .post("http://localhost/projectss/backend/timedave.php", data)
  //     .then((response) => {
  //       console.log(response.data);
  //       reset();
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="form p-5" style={{ width: "80%", minHeight: "100vh" }}>
        <form onSubmit={handleSubmit(Onsubmit)}>
          <input type="hidden" {...register("adminId")} value={adminId} />
          <input type="hidden" {...register("userId")} value={userId} />
          <div className="mb-3">
            <label className="form-label">Selecteer gebruiker:</label>
            <select
              className={`form-select ${
                errors.selectedUser ? "is-invalid" : ""
              }`}
              {...register("selectedUser", { required: true })}
            >
              <option value="">Selecteer een gebruiker</option>
              {dummyData.map((user: UserData) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            {errors.selectedUser && (
              <div className="invalid-feedback">Selecteer een gebruker </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Start tijd:</label>
            <input
              type="time"
              className={`form-control ${errors.startTime ? "is-invalid" : ""}`}
              {...register("startTime", {
                required: !disableAllInputs(selectedOption, startTime),
              })}
              disabled={disableAllInputs(selectedOption, startTime)}
            />
            {errors.startTime && (
              <div className="invalid-feedback">Start tijd is vereist</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Eind tijd:</label>
            <input
              type="time"
              className={`form-control ${errors.endTime ? "is-invalid" : ""}`}
              {...register("endTime", {
                required: !disableAllInputs(selectedOption, endTime),
              })}
              disabled={disableAllInputs(selectedOption, endTime)}
            />
            {errors.endTime && (
              <div className="invalid-feedback">Eind tijd is vereist</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Waarom is de persoon absent?</label>
            <select
              className={`form-select ${
                errors.selectedOption ? "is-invalid" : ""
              }`}
              {...register("selectedOption")}
            >
              <option value="">Selecteer een optie</option>
              <option value="absent">Noodzakelijk</option>
              <option value="absent">Ziek</option>
              <option value="absent">Vakantie</option>
              <option value="absent">Absent zonder rede</option>
            </select>
            {errors.selectedOption && (
              <div className="invalid-feedback">Kies een optie</div>
            )}
          </div>
          {/* Display late reason select if start time is after 9:00 AM */}
          {isLate && (
            <div className="mb-3">
              <label className="form-label">Reden voor absentie:</label>
              <select
                className={`form-select ${
                  errors.lateReason ? "is-invalid" : ""
                }`}
                {...register("lateReason", { required: true })}
              >
                <option value="">Select a reason</option>
                <option value="traffic">Traffic</option>
                <option value="overslept">Overslept</option>
                <option value="transport">Public transport delay</option>
              </select>
              {errors.lateReason && (
                <div className="invalid-feedback">Selecteer een reden</div>
              )}
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimeEntryForm;
