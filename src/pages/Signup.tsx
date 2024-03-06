import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

// Define Zod schema for form data
const schema = z.object({
  employeeId: z
    .number({ invalid_type_error: "ID moet een nummer zijn" })
    .positive({ message: "ID kan niet negatief zijn" })
    .min(3, { message: "Je moet minimaal 3 cijfers schrijven" }),
  firstName: z
    .string()
    .min(3, { message: "schrijf een correcte voornaam" })
    .max(150),
  lastName: z
    .string()
    .min(3, { message: "schrijf een correcte achternaam" })
    .max(150),
  gender: z.string().min(1, { message: "Je moet iets kiezen" }).max(2),
  department: z
    .string()
    .min(3, { message: "schrijf een correcte afdeling" })
    .max(150),
  jobTitle: z
    .string()
    .min(3, { message: "schrijf een correcte functie" })
    .max(150),

  phoneNo: z
    .string()
    .min(3, { message: "schrijf een juiste telefoonnummer" })
    .max(150),
  email: z.string().min(3, { message: "schrijf een correcte e-mail" }).max(150),
});

// Define a type alias for form data
type FormData = z.infer<typeof schema>;

const Login: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // const onSubmit = (data: FormData) => {
  //   console.log(data);
  // };

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Submitting data:", data);
      console.log("json: " + JSON.stringify(data));
      // Call sendData function to send data to the server
      const responseData = await sendData(data);

      // Optionally handle response data if needed
      console.log("Response:", responseData);

      // Reset the form after successful submission
      reset();
      setSuccessMessage("Data inserted successfully!");
    } catch (error: Error) {
      console.error("Error submitting form:", error);
    }
  };

  const sendData = async (data: FormData) => {
    try {
      const response = await fetch(
        "http://localhost/Projects/Backend/newuser.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.text(); // Get response as text

      console.log("Server Response:", responseData); // Log the response

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${responseData}`);
      }

      // If authentication is successful, redirect to Dashboard
      if (response.redirected) {
        window.location.href = response.url;
      }

      return responseData; // Return text response
    } catch (error) {
      throw new Error("Error sending data: " + error.message);
    }
  };

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="form p-5" style={{ width: "80%", minHeight: "100vh" }}>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              <h2 className="alert-success">{successMessage}</h2>
            </div>
          )}
          <h1>Lid toevoegen</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label" htmlFor="employeeId">
                Werknemer ID :
              </label>
              <input
                type="number"
                className="form-control"
                id="employeeId"
                {...register("employeeId", { valueAsNumber: true })}
              />
              <p className="text-danger">
                {errors.employeeId && <span>{errors.employeeId.message}</span>}
              </p>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="firstName">
                Voornaam:
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                {...register("firstName")}
              />
              <p className="text-danger">
                {errors.firstName && <span>{errors.firstName.message}</span>}
              </p>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="lastName">
                Achternaam:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                {...register("lastName")}
              />
              <p className="text-danger">
                {errors.lastName && <span>{errors.lastName.message}</span>}
              </p>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="gender">
                  Gender
                </label>
                <select
                  className="form-select"
                  id="gender"
                  {...register("gender")}
                >
                  <option value="">Choose...</option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="department">
                Afdeling:
              </label>
              <input
                type="text"
                className="form-control"
                id="department"
                {...register("department")}
              />
              <p className="text-danger">
                {errors.department && <span>{errors.department.message}</span>}
              </p>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="jobTitle">
                functietitel:
              </label>
              <input
                type="text"
                className="form-control"
                id="jobTitle"
                {...register("jobTitle")}
              />
              <p className="text-danger">
                {errors.jobTitle && <span>{errors.jobTitle.message}</span>}
              </p>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email")}
              />
              <p className="text-danger">
                {errors.email && <span>{errors.email.message}</span>}
              </p>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="phoneNo">
                Telefoon nr:
              </label>
              <input
                type="phoneNo"
                className="form-control"
                id="phoneNo"
                {...register("phoneNo")}
              />
              <p className="text-danger">
                {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={Object.keys(errors).length > 0}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
