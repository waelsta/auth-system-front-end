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
import Alert, { IAlert } from './Alert';
import {
  selectResponse,
  selectShowAlert
} from '../redux/client/ClientSelectors';

const SignUpForm: React.FC = () => {
  const showAlert: boolean = useSelector(selectShowAlert);
  const response: IAlert | null = useSelector(selectResponse);
  const dispatch = useDispatch();

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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordMatch: '',
    street: '',
    city: '',
    phone: ''
  };

  // form validation schema
  const validationSchema = yup.object().shape({
    firstName: yup.string().min(3, 'minimum length is 3').required(),
    lastName: yup.string().min(3, 'minimum length is 3').required(),
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
      .required(),
    passwordMatch: yup
      .string()
      .oneOf([yup.ref('password')], 'your password does not match')
      .required(),
    city: yup
      .string()
      .test('invalidCity', 'please choose a city from the list', value => {
        if (typeof value === 'string') {
          return cities.includes(value.toLowerCase());
        }
        return false;
      })
      .required(),
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
      .required(),
    phone: yup
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
      .required()
  });

  return (
    <>
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
          <Form className={formStyles}>
            {showAlert && (
              <Alert message={response?.message} error={response?.error} />
            )}
            <div className="">
              <label className={labelStyles} htmlFor="firstName : ">
                First name :
              </label>
              <Field
                className={inputFieldStyles}
                type="text"
                name="firstName"
                onChange={props.handleChange}
              />
              <ErrorMessage
                className={errorMessageStyles}
                component="div"
                name="firstName"
              />
            </div>

            <div>
              <label className={labelStyles} htmlFor="lastName">
                Last name :{' '}
              </label>
              <Field
                className={inputFieldStyles}
                type="text"
                name="lastName"
                onChange={props.handleChange}
              />
              <ErrorMessage
                className={errorMessageStyles}
                component="div"
                name="lastName"
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
              <label className={labelStyles} htmlFor="passwordMatch">
                Retype password :{' '}
              </label>
              <Field
                className={inputFieldStyles}
                type="password"
                name="passwordMatch"
                onChange={props.handleChange}
              />
              <ErrorMessage
                className={errorMessageStyles}
                component="div"
                name="passwordMatch"
              />
            </div>

            <div>
              <label className={labelStyles} htmlFor="phone">
                Phone Number :{' '}
              </label>
              <Field
                className={inputFieldStyles}
                type="tel"
                name="phone"
                onChange={props.handleChange}
              />
              <ErrorMessage
                className={errorMessageStyles}
                component="div"
                name="phone"
              />
            </div>

            <div>
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
            <div>
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
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
