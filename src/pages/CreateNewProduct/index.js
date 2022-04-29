import './style.css';
import Swal from "sweetalert2";
import * as Yup from 'yup';
import useAxios from '../../hooks/useAxios';
import { FieldArray, ErrorMessage, Form, Field, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faChevronLeft, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { createBrowserHistory } from "history";
import { useUserContext } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import AutoComplete from '../Home/components/Search/Autocomplete';
import api from '../../services/api';

const CreateNewProduct = () => {

    const { user } = useUserContext();

    const navigate = useNavigate();

    const categories = useAxios('/category');
    const characteristics = useAxios('/characteristic');

    const handleSubmit = async values => {
        let selectedCharacteristics = [];
        values.addedCharacteristics.map(id => selectedCharacteristics.push({ "id": parseInt(id) }));

        let addedImages = [];
        values.images.map(url => addedImages.push({ title: values.name, original: url, thumbnail: url }))

        api.post('/product', {
            name: values.name,
            description: values.description,
            address: values.address,
            images: addedImages,
            category: { id: values.category },
            city: { id: values.city },
            characteristics: selectedCharacteristics,
            houseRulesPolicy: values.houseRulesDescription,
            healthSecurityPolicy: values.healthSecurityDescription,
            cancellationPolicy: values.cancellationDescription
        }, { headers: { "Authorization": `Bearer ${user.token}` }
        }).then((response) => {
            navigate('/produto-criado')
        }).catch((error) => {
            Swal.fire({
                title: "Infelizmente a sua propriedade não pôde ser inserida",
                icon: 'error',
                text: error,
            })
        })
    }

    const history = createBrowserHistory();

    if (user) {
        if (user.role === "admin") {

            return (
                <>
                    <div id="productTitle">

                        <button onClick={() => history.goBack()} id="previousButton">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <div id="informationsTitle">
                            <h3>Administração de produtos</h3>
                        </div>
                    </div>

                    <div id="createNewProductContainer">

                        <div id="createNewProductWrapper">
                            <h4>Criar propriedade</h4>

                            <Formik
                                initialValues={{
                                    name: '',
                                    address: '',
                                    category: '',
                                    city: '',
                                    description: '',
                                    addedCharacteristics: '',
                                    houseRulesDescription: '',
                                    healthSecurityDescription: '',
                                    cancellationDescription: '',
                                    images: ['', '', '', '', '']
                                }}
                                validationSchema={Yup.object({
                                    name: Yup.string().required('Obrigatório'),
                                    address: Yup.string().required('Obrigatório'),
                                    category: Yup.string().required('Obrigatório'),
                                    city: Yup.string().required('Obrigatório'),
                                    description: Yup.string().required('Obrigatório'),
                                    houseRulesDescription: Yup.string().required('Obrigatório'),
                                    healthSecurityDescription: Yup.string().required('Obrigatório'),
                                    cancellationDescription: Yup.string().required('Obrigatório'),
                                    images: Yup.array().of(Yup.string().required('Obrigatório'))
                                })}
                                onSubmit={handleSubmit}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form id="formCreateNewProduct" className="data">
                                        <div id="newProductInfoWrapper">

                                            <div className='dataLeftCol'>
                                                <label htmlFor="name">Nome da propriedade</label>
                                                <Field id="name" className="field" name="name" type="text" />
                                                <div className="errorMessage">
                                                    <ErrorMessage name="name">{msg => msg ? msg : ""}</ErrorMessage>
                                                </div>

                                                <label htmlFor="city">Cidade</label>
                                                <div className="field" id="cityField"><AutoComplete onChange={
                                                    (event, value) => {
                                                        setFieldValue("city", value.selectedItem.id);
                                                    }
                                                }
                                                /></div>
                                                <div className="errorMessage">
                                                    <ErrorMessage name="city">{msg => msg ? msg : ''}</ErrorMessage>
                                                </div>

                                            </div>

                                            <div className='dataRightCol'>
                                                <label htmlFor="category">Categoria</label>
                                                <Field id="category" className="field" name="category" as="select" >
                                                    <option value="" label="Selecione" />

                                                    {categories.map(category => {
                                                        return (
                                                            <option value={category.id} key={category.title} >{category.title}</option>
                                                        )
                                                    })}
                                                </Field>
                                                <div className="errorMessage">
                                                    <ErrorMessage name="category">{msg => msg ? msg : ""}</ErrorMessage>
                                                </div>

                                                <label htmlFor="address">Endereço</label>
                                                <Field id="address" className="field" name="address" type="text" />
                                                <div className="errorMessage">
                                                    <ErrorMessage name="address">{msg => msg ? msg : ""}</ErrorMessage>
                                                </div>

                                            </div>
                                        </div>

                                        <div id="newProductDescriptionWrapper">
                                            <label htmlFor="description">Descrição</label>
                                            <Field id="description" className="textarea" name="description" component="textarea" rows={4} />
                                            <div className="errorMessage">
                                                <ErrorMessage name="description">{msg => msg ? msg : ''}</ErrorMessage>
                                            </div>
                                        </div>

                                        <div id="newProductCharacteristicWrapper">
                                            <h5>Adicionar atributos</h5>
                                            <div className="addCharacteristic">

                                                {
                                                    characteristics.map(({ id, name }) => {
                                                        return (
                                                            <div className="addCharacteristicInfo" key={id}>
                                                                <Field id={name} name="addedCharacteristics" type="checkbox" value={`${id}`} />
                                                                <label htmlFor="addedCharacteristics">{name}</label>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>

                                        <div id="newProductPoliciesWrapper">
                                            <h5>Políticas do produto</h5>

                                            <div id="newProductPolicies">

                                                <div id="newProductHouseRules">
                                                    <h6>Regras da casa</h6>
                                                    <label htmlFor="houseRulesDescription">Descrição</label>
                                                    <Field id="houseRulesDescription" className="textarea" name="houseRulesDescription" component="textarea" rows={4} />
                                                    <div className="errorMessage">
                                                        <ErrorMessage name="houseRulesDescription">{msg => msg ? msg : ''}</ErrorMessage>
                                                    </div>
                                                </div>

                                                <div id="newProductHealthSecurity">
                                                    <h6>Saúde e segurança</h6>
                                                    <label htmlFor="healthSecurityDescription">Descrição</label>
                                                    <Field id="healthSecurityDescription" className="textarea" name="healthSecurityDescription" component="textarea" rows={4} />
                                                    <div className="errorMessage">
                                                        <ErrorMessage name="healthSecurityDescription">{msg => msg ? msg : ''}</ErrorMessage>
                                                    </div>
                                                </div>

                                                <div id="newProductCancellation">
                                                    <h6>Política de cancelamento</h6>
                                                    <label htmlFor="cancellationDescription">Descrição</label>
                                                    <Field id="cancellationDescription" className="textarea" name="cancellationDescription" component="textarea" rows={4} />
                                                    <div className="errorMessage">
                                                        <ErrorMessage name="cancellationDescription">{msg => msg ? msg : ''}</ErrorMessage>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <FieldArray name="images">
                                            {({ insert, remove, push }) => (

                                                <div id="newProductImagesWrapper">
                                                    <h5>Carregar imagens</h5>
                                                    {values.images.length > 0 &&
                                                        values.images.map((image, index) => (
                                                            <div className="row" key={index}>
                                                                <div className="addImage">

                                                                    <Field
                                                                        name={`images.${index}`}
                                                                        type="text"
                                                                        className="field"
                                                                        placeholder="Insira http://"
                                                                    />
                                                                    {index > 4 ?
                                                                        <button
                                                                            type="button"
                                                                            className="btnRemoveImage"
                                                                            onClick={() => remove(index)}
                                                                        >
                                                                            <FontAwesomeIcon icon={faXmark} />
                                                                        </button>
                                                                        :
                                                                        <div />
                                                                    }

                                                                    <ErrorMessage
                                                                        name={`images.${index}`}
                                                                        component="div"
                                                                        className="errorMessage"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}

                                                    <button
                                                        type="button"
                                                        className="btnAddImage"
                                                        onClick={() => {
                                                            push('');
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                            )}
                                        </FieldArray>

                                        <button type='submit' className="buttonForm">
                                            Cadastrar
                                        </button>

                                    </Form >
                                )}
                            </Formik>
                        </div>
                    </div>
                </>
            )
        }

        return (

            <div id='confirmedWrapper'>
                <div id='confirmedBooking'>
                    <FontAwesomeIcon className="forbiddenIcon" icon={faCircleXmark} />
                    <h3>Oops!</h3>
                    <h5>Acesso negado!</h5>
                    <Link to={'/'}><button className='confirmBtn'>Home</button></Link>
                </div>
            </div>
        )
    }
    return (
        <>
            {navigate("/login")};
        </>

        // <div id='confirmedWrapper'>
        //     <div id='confirmedBooking'>
        //         <FontAwesomeIcon className="forbiddenIcon" icon={faCircleXmark} />
        //         <h3>Oops!</h3>
        //         <h5>Você precisa estar logado para acessar esta página!</h5>
        //         <Link to={'/login'}><button className='confirmBtn'>Login</button></Link>
        //     </div>
        // </div>
    )
}

export default CreateNewProduct;