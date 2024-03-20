// import React from "react";
// import { Formik, Form, Field } from "formik";
// import "./App.css";

// function MyForm() {
//   const validateEmail = (value) => {
//     let error;
//     if (!value) {
//       error = "Required";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//       error = "Invalid email address";
//     }
//     return error;
//   };

//   const validateUsername = (value) => {
//     let error;
//     if (value === "") {
//       error = "Nice try!";
//     }
//     return error;
//   };

//   const validatePassword = (value) => {
//     let error;
//     if (value.length < 8) {
//       error = "Password must be 8 characters long.";
//     }
//     return error;
//   };

//   const validateConfirmPassword = (password, confirmPassword) => {
//     if (password && confirmPassword && password !== confirmPassword) {
//       return "Passwords do not match";
//     }
//   };

//   return (
//     <div className="form-container">
//       <h1 className="form-heading">Signup</h1>
//       <Formik
//         initialValues={{
//           username: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           acceptTerms: false,
//         }}
//         onSubmit={(values, { resetForm }) => {
//           console.log(values);
//           alert("Form submitted successfully!");
//           resetForm();
//         }}
//         validate={(values) => {
//           const errors = {};

//           return errors;
//         }}
//       >
//         {({ errors, touched }) => (
//           <Form>
//             <div className="form-field">
//               <label htmlFor="email">Email:</label>

//               <Field name="email" validate={validateEmail} />
//               {errors.email && touched.email && (
//                 <div className="error-message">{errors.email}</div>
//               )}
//             </div>

//             <div className="form-field">
//               <label htmlFor="username">Username:</label>
//               <Field name="username" validate={validateUsername} />
//               {errors.username && touched.username && (
//                 <div className="error-message">{errors.username}</div>
//               )}
//             </div>

//             <div className="form-field">
//               <label htmlFor="password">Password:</label>
//               <Field
//                 name="password"
//                 type="password"
//                 validate={validatePassword}
//               />
//               {errors.password && touched.password && (
//                 <div className="error-message">{errors.password}</div>
//               )}
//             </div>

//             <div className="form-field">
//               <Field name="confirmPassword" type="password" />
//               {errors.confirmPassword && touched.confirmPassword && (
//                 <div className="error-message">{errors.confirmPassword}</div>
//               )}
//             </div>

//             <div className="form-field">
//               <Field type="checkbox" name="acceptTerms" />
//               <label htmlFor="acceptTerms">
//                 I accept the terms and conditions
//               </label>
//               {errors.acceptTerms && touched.acceptTerms && (
//                 <div className="error-message">{errors.acceptTerms}</div>
//               )}
//             </div>

//             <button type="submit" className="submit-button">
//               Submit
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default MyForm;
import React from "react";
import { Formik, Field, Form, useField, useFormikContext } from "formik";
import "./App.css";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MyField = (props) => {
  const {
    values: { City, State },
    touched,
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    if (
      City.trim() !== "" &&
      State.trim() !== "" &&
      touched.City &&
      touched.State
    ) {
      setFieldValue(props.name, `City: ${City}, State: ${State}`);
    }
  }, [State, City, touched.City, touched.State, setFieldValue, props.name]);

  return (
    <>
      <input {...props} {...field} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

const App = () => (
  <div className="form-container">
    <h1 className="form-title">Sign Up</h1>
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        toggle: "Information filled by myself",
        checked: [],
        picked: "",
        City: "",
        State: "",
        CurrentLocation: "",
        friends: [
          {
            name: "",
            email: "",
          },
        ],
      }}
      onSubmit={async (values) => {
        await sleep(2000);
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <div className="section">
            <label>
              City
              <Field name="City" />
            </label>
            <br></br>
            <label>
              State
              <Field name="State" />
            </label>
            <br></br>
            <label>
              Current Location
              <MyField name="CurrentLocation" />
            </label>
            <br></br>
          </div>

          <div className="section">
            <label>
              First Name
              <Field name="firstName" placeholder="Jane" />
            </label>
            <label>
              Last Name
              <Field name="lastName" placeholder="Doe" />
            </label>
            <label>
              Email
              <Field name="email" placeholder="jane@acme.com" type="email" />
            </label>
            <br></br>
            <label>
              <Field type="checkbox" name="Information filled by myself" />
              {`${values.toggle}`}
            </label>
            <div id="checkbox-group">Checked</div>
            <div role="group" aria-labelledby="checkbox-group">
              <label>
                <Field type="checkbox" name="checked" value="One" />
                One
              </label>
              <label>
                <Field type="checkbox" name="checked" value="Two" />
                Two
              </label>
              <label>
                <Field type="checkbox" name="checked" value="Three" />
                Three
              </label>
            </div>
            <div id="my-radio-group">Picked</div>
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <Field type="radio" name="picked" value="One" />
                One
              </label>
              <label>
                <Field type="radio" name="picked" value="Two" />
                Two
              </label>
              <div>Picked: {values.picked}</div>
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default App;
