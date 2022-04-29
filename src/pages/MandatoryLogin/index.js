import './style.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUserContext } from '../../contexts/UserContext';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { createBrowserHistory } from "history";

const sleep = ms => new Promise(r => setTimeout(r, ms))

const MandatoryLogin = ({ onSubmit }) => {

    const { user, setUser } = useUserContext();

    const history = createBrowserHistory();

    const navigate = useNavigate();

    const handleSubmit = async values => {

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
                });
            // localStorage.setItem('signed', JSON.stringify([userData]));
            // setUser([userData])
            // navigate(history.goBack());
            history.goBack();

        }).catch((error) => {
            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'Ops!',
                text: 'Por favor, tente novamente, suas credenciais são inválidas',
                confirmButtonColor: 'var(--primary-color)',
                imageWidth: 100,
                width: 350,
            })
        });
    }

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div id="login">
            <div id='warning'><FontAwesomeIcon className="warningIcon" icon={faCircleExclamation} size="xl" /><p>Para fazer uma reserva você precisa estar logado</p></div>
                <h2 className='formTitle'>Iniciar sessão</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Email inválido').required('Obrigatório'),
                        password: Yup.string()
                            .min(7, 'A senha deve ter no mínimo 7 caracteres')
                            .required('Obrigatório'),
                    })}
                    onSubmit={handleSubmit}
                >
                    <Form className="acessForm">
                        <label htmlFor="email">Email</label>
                        <Field id="email" className="field" name="email" type="email" />
                        <div className="errorMessage">
                            <ErrorMessage name="email">{msg => msg ? msg : ""}</ErrorMessage>
                        </div>

                        <label htmlFor="password">Senha</label>
                        <Field id="password" className="field" name="password" type="password" />
                        <div className="errorMessage">
                            <ErrorMessage name="password">{msg => msg ? msg : ""}</ErrorMessage>
                        </div>

                        <button className="buttonForm" type="submit">Entrar</button>
                        <div className="textNotes"><div><p className='text'>Ainda não tem uma conta?</p></div>
                            <div><Link to="/cadastro"><p className='textLink'>Cadastre-se</p></Link></div></div>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default MandatoryLogin;