import './style.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';
import Swal from 'sweetalert2';
import { useUserContext } from '../../contexts/UserContext';

const Register = ({ onSubmit }) => {

    const { setUser } = useUserContext();

    const navigate = useNavigate();

    const sleep = ms => new Promise(r => setTimeout(r, ms))
    const handleSubmit = async (values, { setSubmitting }) => {
        setTimeout(() => {
            api.post('/user', {
                name: values.name,
                lastName: values.surname,
                email: values.email,
                username: values.name,
                password: values.password,
                roles: [
                    {"id": 1 }
                ]
            }).then((response) => {
                api.post('/authenticate', {
                    username: values.email,
                    password: values.password,
                  }).then((response) => {
                    const userToken = response.data;
                    api.get(`/user/email/${values.email}`)
                    .then((response) => {
                      const userData = {
                        id: response.data.id,
                        name: response.data.name,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        role: response.data.roles[0]?.name,
                        token: userToken
                      };
                      localStorage.setItem('signed', JSON.stringify(userData));
                      setUser(userData)
                    })
                    navigate("/");
                  }).catch((error) => {
                    console.error(error);
              
                    Swal.fire({
                      icon: 'error',
                      title: 'Ops!',
                      text: 'Algo deu errado',
                      html: 'Algo deu <b>errado!</b>' +
                      '<br>' +
                      error,
                      confirmButtonColor: 'var(--primary-color)',
                      imageWidth: 100,
                      width: 350,
                    })
                  });

            }).catch((error) => {
                console.error(error);
                Swal.fire({
                    title: "Infelizmente, você não pôde se registrar. Por favor, tente novamente mais tarde.",
                    icon: 'error',
                    text: error,
                })
            });
            setSubmitting(false);
            
        }, 400);
        await sleep(500)
        // onSubmit(values)
    }

    return (
        <>
            <Helmet>
                <title>Cadastro</title>
            </Helmet>
            <div id="register">
                <h2 className='formTitle'>Cadastro</h2>
                <Formik
                    initialValues={{ name: '', surname: '', email: '', emailConfirmation: '', password: '' }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .max(15, 'Deve conter no máximo 15 letras')
                            .required('Obrigatório'),
                        surname: Yup.string()
                            .max(20, 'Deve conter no máximo 20 letras')
                            .required('Obrigatório'),
                        email: Yup.string().email('Email inválido').required('Obrigatório'),
                        emailConfirmation: Yup.string().oneOf([Yup.ref('email'), null], 'Email não coincide')
                            .required('Obrigatório'),
                        password: Yup.string()
                            .min(7, 'A senha deve ter no mínimo 7 caracteres')
                            .required('Obrigatório'),
                    })}
                    onSubmit={handleSubmit}
                >
                    <Form className="acessForm">
                        <label htmlFor="name">Nome</label>
                        <Field className="field" name="name" type="text" id="name"/>
                        <div title="testo" className="errorMessage">
                            <ErrorMessage  name="name">{msg => msg ? msg : ""}</ErrorMessage>
                        </div>

                        <label htmlFor="surname">Sobrenome</label>
                        <Field className="field" name="surname" type="text" id="surname"/>
                        <div title="testo2" className="errorMessage">
                            <ErrorMessage name="surname">{msg => msg ? msg : ""}</ErrorMessage>
                        </div>

                        <label htmlFor="email">Email</label>
                        <Field className="field" name="email" type="email" id="email"/>
                        <div title="testo3" className="errorMessage">
                            <ErrorMessage name="email">{msg => msg ? msg : ""}</ErrorMessage>
                        </div>

                        <label htmlFor="emailConfirmation">Confirmar email</label>
                        <Field className="field" name="emailConfirmation" type="email" id="emailConfirmation"/>
                        <div className="errorMessage">
                            <ErrorMessage name="emailConfirmation">{msg => msg ? msg : ""}</ErrorMessage>
                        </div>

                        <label htmlFor="password">Senha</label>
                        <Field className="field" name="password" type="password" id="password"/>
                        <div className="errorMessage">
                            <ErrorMessage name="password">{msg => msg ? msg : ""}</ErrorMessage>
                        </div>

                        <button className="buttonForm" type="submit">Registrar</button>
                        <div className="textNotes"><p className='text'>Já tem uma conta? Faça</p>
                            <Link to="/login"><p className='textLink'>login</p></Link></div>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default Register;