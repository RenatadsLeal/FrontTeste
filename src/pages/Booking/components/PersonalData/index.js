import './style.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUserContext } from '../../../../contexts/UserContext';
import { useUserCityContext } from '../../../../contexts/UserCityContext';

const PersonalData = () => {

  const { user } = useUserContext();

  const { userCity, setUserCity } = useUserCityContext();

  const handleChange = async e => {
    setUserCity(e.target.value);
  }
    return (

        <div id='personalData'>
        <Formik
          initialValues={{ name: `${user.name}`, surName: `${user.lastName}`, email: `${user.email}`, city: ''}}
          validationSchema={Yup.object({
            city: Yup.string().required('Obrigatório'),
          })}
          
        >
          <Form className="data" onChange={handleChange}>
              <div className='dataLeftCol'>
            <label htmlFor="name">Nome</label>
            <Field id="name" className="field" name="name" type="text" disabled="disabled" />
            <div className="errorMessage">
              <ErrorMessage name="name">{msg => msg ? msg : ""}</ErrorMessage>
            </div>

            <label htmlFor="surName">Sobrenome</label>
            <Field id="surName" className="field" name="surName" type="text" disabled="disabled" />
            <div className="errorMessage">
              <ErrorMessage name="surName">{msg => msg ? msg : ""}</ErrorMessage>
            </div>
            </div>

            <div className='dataRightCol'>
            <label htmlFor="email">Email</label>
            <Field id="email" className="field" name="email" type="email" disabled="disabled" />
            <div className="errorMessage">
              <ErrorMessage name="email">{msg => msg ? msg : ""}</ErrorMessage>
            </div>

            <label htmlFor="city">Cidade</label>
            <Field id="city" className="field" name="city" type="text" placeholder="Cidade" />
            <div className="errorMessage">
              <ErrorMessage name="city">{msg => msg ? msg : ''}</ErrorMessage>
            </div>
            </div>
          </Form>
        </Formik>
        </div>
    )

}

export default PersonalData;