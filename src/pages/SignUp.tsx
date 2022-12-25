// import { Formik, ErrorMessage, Form, Field } from "formik";
// //import { signup } from "../redux/user/userSlice";
// import { useDispatch } from "react-redux";
// import * as yup from "yup";

// const cities = [
//   "ariana",
//   "beja",
//   "ben arous",
//   "bizerte",
//   "gabes",
//   "gafsa",
//   "jendouba",
//   "kairouan",
//   "kasserine",
//   "kebili",
//   "manouba",
//   "kef",
//   "mahdia",
//   "medenine",
//   "monastir",
//   "nabeul",
//   "sfax",
//   "sidi bouzid",
//   "siliana",
//   "sousse",
//   "tataouine",
//   "tozeur",
//   "tunis",
//   "zaghouan",
// ];

// let initialState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   passwordMatch: "",
//   city: "",
//   phone: "",
// };

// // form validation schema
// const validationSchem = yup.object().shape({
//   firstName: yup.string().min(3, "minimum length is 3").required(),
//   lastName: yup.string().min(3, "minimum length is 3").required(),
//   password: yup
//     .string()
//     .min(8, "minimum number of characters is 8")
//     .test(
//       "isValidPassword",
//       "Minimum eight characters, at least one letter and one number",
//       async value => {
//         if (typeof value === "string") {
//           let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//           const found = passwordRegex.test(value);
//           return found;
//         }
//         return false;
//       }
//     )
//     .required(),
//   passwordMatch: yup
//     .string()
//     .oneOf([yup.ref("password")], "your password does not match")
//     .required(),
//   city: yup
//     .string()
//     .test("invalidCity", "please choose a city from the list", value => {
//       if (typeof value === "string")
//         return cities.includes(value.toLowerCase());
//       return false;
//     })
//     .required(),
//   email: yup
//     .string()
//     .test("isValidEmail", "please enter a valid email", value => {
//       if (typeof value === "string") {
//         let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
//         return emailRegex.test(value);
//       }
//       return false;
//     })
//     .required(),
//   phone: yup
//     .string()
//     .min(8, "must have 8 digits")
//     .test("isValideNumber", "please enter an 8 digits number", value => {
//       const numberRegex = /^[0-9]{8}$/;
//       if (typeof value === "string") {
//         return value.length === 8 && numberRegex.test(value);
//       } else {
//         return false;
//       }
//     })
//     .required(),
// });

 function SignUp() {
//   const dispatch = useDispatch();
//   return (
//     <Formik
//       initialValues={initialState}
//       validationSchema={validationSchem}
//       onSubmit={(values, actions) => {
//         console.table(values);
//         //dispatch(signup(values));
//         actions.setSubmitting(false);
//       }}
//     >
//       {props => (
//         <Form>
//           <div>
//             <label htmlFor="firstName : ">First name :</label>
//             <Field type="text" name="firstName" onChange={props.handleChange} />
//             <ErrorMessage component="div" name="firstName" />
//           </div>

//           <div>
//             <label htmlFor="lastName">Last name : </label>
//             <Field type="text" name="lastName" onChange={props.handleChange} />
//             <ErrorMessage component="div" name="lastName" />
//           </div>

//           <div>
//             <label htmlFor="email">Email : </label>
//             <Field type="text" name="email" onChange={props.handleChange} />
//             <ErrorMessage component="div" name="email" />
//           </div>

//           <div>
//             <label htmlFor="password">Password : </label>
//             <Field
//               type="password"
//               name="password"
//               onChange={props.handleChange}
//             />
//             <ErrorMessage component="div" name="password" />
//           </div>

//           <div>
//             <label htmlFor="passwordMatch">Retype password : </label>
//             <Field
//               type="passwordMatch"
//               name="passwordMatch"
//               onChange={props.handleChange}
//             />
//             <ErrorMessage component="div" name="passwordMatch" />
//           </div>

//           <div>
//             <label htmlFor="phone">Phone Number : </label>
//             <Field type="tel" name="phone" onChange={props.handleChange} />
//             <ErrorMessage component="div" name="phone" />
//           </div>

//           <div>
//             <label htmlFor="city">select city : </label>
//             <Field component="select" name="city">
//               {cities.map((city, index) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </Field>
//             <ErrorMessage component="div" name="city" />
//           </div>

//           <Field
//             name="submit"
//             type="submit"
//             value="submit"
//             disabled={!(props.dirty && props.isValid)}
//           />
//         </Form>
//       )}
//     </Formik>
//   );
}

 export default SignUp;