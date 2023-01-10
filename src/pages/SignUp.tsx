import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { clientSignUp } from '../redux/client/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  classicButtonStyles,
  inputFieldStyles,
  labelStyles,
  errorMessageStyles,
  formStyles
} from '../styles/common-styles';
import Alert, { IAlert } from '../components/Alert';
import {
  selectCurrentClient,
  selectIsSignedUp,
  selectResponse,
  selectShowAlert
} from '../redux/client/ClientSelectors';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IClient } from '../types/client';

const SignUp: React.FC = () => {
  const showAlert: boolean = useSelector(selectShowAlert);
  const isFirstTime: boolean = useSelector(selectIsSignedUp);
  const response: IAlert | null = useSelector(selectResponse);
  const dispatch = useDispatch();
  const client: IClient | null = useSelector(selectCurrentClient);
  const cities = [
    'ariana',
    'beja',
    'ben arous',
    'bizerte',
    'gabes',
    'gafsa',
    'jendouba',
    'kairouan',
    'kasserine',
    'kebili',
    'manouba',
    'kef',
    'mahdia',
    'medenine',
    'monastir',
    'nabeul',
    'sfax',
    'sidi bouzid',
    'siliana',
    'sousse',
    'tataouine',
    'tozeur',
    'tunis',
    'zaghouan'
  ];

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_match: '',
    street: '',
    city: '',
    phone_number: ''
  };
  const navigate = useNavigate();

  // form validation schema
  const validationSchema = yup.object().shape({
    first_name: yup
      .string()
      .min(3, 'minimum length is 3')
      .required('first name required'),
    last_name: yup
      .string()
      .min(3, 'minimum length is 3')
      .required('last name required'),
    password: yup
      .string()
      .min(8, 'minimum number of characters is 8')
      .test(
        'isValidPassword',
        'Minimum eight characters, at least one letter and one number',
        async value => {
          if (typeof value === 'string') {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            const found = passwordRegex.test(value);
            return found;
          }
          return false;
        }
      )
      .required('password required'),
    password_match: yup
      .string()
      .oneOf([yup.ref('password')], 'your password does not match')
      .required('password confirmation required'),
    city: yup
      .string()
      .test('invalidCity', 'please choose a city from the list', value => {
        if (typeof value === 'string') {
          return cities.includes(value.toLowerCase());
        }
        return false;
      })
      .required('city required'),
    street: yup.string().min(3, 'minimum length is 3').required(),
    email: yup
      .string()
      .test('isValidEmail', 'please enter a valid email', value => {
        if (typeof value === 'string') {
          const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
          return emailRegex.test(value);
        }
        return false;
      })
      .required('email required'),
    phone_number: yup
      .string()
      .min(8, 'must have 8 digits')
      .test('isValideNumber', 'please enter an 8 digits number', value => {
        const numberRegex = /^[0-9]{8}$/;
        if (typeof value === 'string') {
          return value.length === 8 && numberRegex.test(value);
        } else {
          return false;
        }
      })
      .required('phone number required')
  });
  useEffect(() => {
    if (isFirstTime && client) {
      navigate('/uploads/profile_picture');
    }
  }, [isFirstTime, client]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.table(values);
        dispatch(clientSignUp(values));
        actions.setSubmitting(false);
      }}
    >
      {(props: FormikProps<any>) => (
        <div id="signup-page" className="h-screen p-12">
          <Form className="w-7/12 mx-auto bg-white/30 backdrop-blur-xl p-5 rounded-md my-20">
            {showAlert && (
              <Alert message={response?.message} error={response?.error} />
            )}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="">
                <label className={labelStyles} htmlFor="first_name : ">
                  First name :
                </label>
                <Field
                  className={inputFieldStyles}
                  type="text"
                  name="first_name"
                  onChange={props.handleChange}
                />
                <ErrorMessage
                  className={errorMessageStyles}
                  component="div"
                  name="first_name"
                />
              </div>
              <div>
                <label className={labelStyles} htmlFor="last_name">
                  Last name :{' '}
                </label>
                <Field
                  className={inputFieldStyles}
                  type="text"
                  name="last_name"
                  onChange={props.handleChange}
                />
                <ErrorMessage
                  className={errorMessageStyles}
                  component="div"
                  name="lasst_name"
                />
              </div>
              <div>
                <label className={labelStyles} htmlFor="email">
                  Email :{' '}
                </label>
                <Field
                  className={inputFieldStyles}
                  type="text"
                  name="email"
                  onChange={props.handleChange}
                />
                <ErrorMessage
                  className={errorMessageStyles}
                  component="div"
                  name="email"
                />
              </div>
              <div>
                <label className={labelStyles} htmlFor="password">
                  Password :{' '}
                </label>
                <Field
                  className={inputFieldStyles}
                  type="password"
                  name="password"
                  onChange={props.handleChange}
                />
                <ErrorMessage
                  className={errorMessageStyles}
                  component="div"
                  name="password"
                />
              </div>
              <div>
                <label className={labelStyles} htmlFor="password_match">
                  Retype password :{' '}
                </label>
                <Field
                  className={inputFieldStyles}
                  type="password"
                  name="password_match"
                  onChange={props.handleChange}
                />
                <ErrorMessage
                  className={errorMessageStyles}
                  component="div"
                  name="password_match"
                />
              </div>
              <div>
                <label className={labelStyles} htmlFor="phone_number">
                  Phone Number :{' '}
                </label>
                <Field
                  className={inputFieldStyles}
                  type="tel"
                  name="phone_number"
                  onChange={props.handleChange}
                />
              </div>
              <ErrorMessage
                className={errorMessageStyles}
                component="div"
                name="phone_number"
              />
            </div>
            <div className="mb-6">
              <label className={labelStyles} htmlFor="city">
                select city :{' '}
              </label>
              <Field
                className={inputFieldStyles}
                component="select"
                name="city"
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                className={errorMessageStyles}
                component="div"
                name="city"
              />
            </div>
            <div className="mb-1">
              <label className={labelStyles} htmlFor="Street">
                Street :{' '}
              </label>
              <Field
                className={inputFieldStyles}
                type="text"
                name="street"
                onChange={props.handleChange}
              />
              <ErrorMessage
                className={errorMessageStyles}
                component="div"
                name="street"
              />
            </div>
            <Field
              name="submit"
              type="submit"
              value="submit"
              className={classicButtonStyles}
              disabled={!(props.dirty && props.isValid)}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
