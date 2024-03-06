// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// // Define Zod schema for form data
// const schema = z.object({
//   studentNo: z
//     .number({
//       required_error: "ID is Verplicht",
//       invalid_type_error: "Het moset a nummber zijn",
//     })
//     .max(10, { message: "maximal 10 cijfers" })
//     .min(5, { message: "Je moet minimaal 5 cijfers schrijven" }),
//   password: z
//     .string()
//     .min(5, { message: "Je moet minimaal 8 tekens schrijven" })
//     .max(40),
// });

// // Define a type alias for form data
// type FormData = z.infer<typeof schema>;

// const Login: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       console.log("Submitting data:", data);

//       // Call sendData function to send data to the server
//       const responseData = await sendData(data);

//       // Optionally handle response data if needed
//       console.log("Response:", responseData);

//       // Reset the form after successful submission
//       reset();
//     } catch (error: Error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const sendData = async (data: FormData) => {
//     try {
//       const response = await fetch(
//         "http://localhost/Projects/Backend/login.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Error: Failed to submit form");
//       }

//       return await response.json();
//     } catch (error) {
//       throw new Error("Error sending data: " + error.message);
//     }
//   };

//   return (
//     <>
//       <div className="form  p-5 mx-auto">
//         <h1>Inloggen</h1>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-3">
//             <span className="form-label-inside">
//               <label className="form-label" htmlFor="studentNo">
//                 ID Nummer:
//               </label>
//             </span>
//             <input
//               type="number"
//               className="form-control w-80"
//               id="studentNo"
//               {...register("studentNo", { valueAsNumber: true })}
//             />
//             <p className="text-danger">
//               {errors.studentNo && <span>{errors.studentNo.message}</span>}
//             </p>
//           </div>
//           <div className="mb-3">
//             <label className="form-label" htmlFor="password">
//               Wachtwoord:
//             </label>
//             <input
//               type="password"
//               className="form-control w-80"
//               id="password"
//               {...register("password")}
//             />
//             <p className="text-danger">
//               {errors.password && <span>{errors.password.message}</span>}
//             </p>
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary"
//             disabled={Object.keys(errors).length > 0}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for form data
const schema = z.object({
  studentNo: z
    .number({
      required_error: "ID is Verplicht",
      invalid_type_error: "Het moet een nummer zijn",
    })
    .min(5, { message: "Je moet minimaal 5 cijfers schrijven" }),
  password: z
    .string()
    .min(5, { message: "Je moet minimaal 8 tekens schrijven" })
    .max(40),
});

// Define a type alias for form data
type FormData = z.infer<typeof schema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
    } catch (error: Error) {
      console.error("Error submitting form:", error);
    }
  };

  const sendData = async (data: FormData) => {
    try {
      const response = await fetch(
        "http://localhost/Projects/Backend/login.php",
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
      <div className="form p-5 mx-auto">
        <h1>Inloggen</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <span className="form-label-inside">
              <label className="form-label" htmlFor="studentNo">
                ID Nummer:
              </label>
            </span>
            <input
              type="number"
              className="form-control w-80"
              id="studentNo"
              {...register("studentNo", {
                valueAsNumber: true,
                onChange: () => handleSubmit(onSubmit),
              })}
            />
            <p className="text-danger">
              {errors.studentNo && <span>{errors.studentNo.message}</span>}
            </p>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Wachtwoord:
            </label>
            <input
              type="password"
              className="form-control w-80"
              id="password"
              {...register("password", {
                onChange: () => handleSubmit(onSubmit),
              })}
            />
            <p className="text-danger">
              {errors.password && <span>{errors.password.message}</span>}
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
    </>
  );
};

export default Login;
