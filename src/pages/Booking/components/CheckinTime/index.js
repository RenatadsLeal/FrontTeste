import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCheckinTimeContext } from '../../../../contexts/CheckinTimeContext';
import './style.css';

const CheckinTime = () => {

    const hours = [];
    for (let i = 0; i <= 23; i++) {
        hours.push(i);
    }

    const { checkinTime, setCheckinTime } = useCheckinTimeContext();

    function handleChange(e) {
        setCheckinTime(e.target.value);
   }
    

    return (
        <div>
            <h4>Seu horário de chegada</h4>
            <div id="checkinTime">
                <div id="selection">
                    <h5>Seu quarto estará pronto para check-in das 10:00 às 23:00</h5>
                    <p>Indique a hora prevista de sua chegada</p>
                    <Formik
                        initialValues={{ hours: "" }}
                        validationSchema={Yup.object({
                            hours: Yup.string().required('Obrigatório'),
                        })}
                        
                        >
                        <Form onChange={handleChange}>
                            <Field name="hours" as="select" id="hours" >
                                <option value="" label="Selecione"  />
                                
                                {hours.map(hour => {
                                    return (
                                        <option value={`${hour}`} key={`${hour}`}>{hour}:00</option>
                                    )
                                })}
                            </Field>
                            <div className="errorMessage">
                                <ErrorMessage name="hours">{msg => msg ? msg : ""}</ErrorMessage>
                            </div>
                        </Form>

                    </Formik>

                    {/* <select name="hours" id="hours" defaultValue="selected" required>
                    <option value="selected" disabled>Selecione</option>
                    {hours.map(hour => {
                        return (
                            <option value={`${hour}`} key={`${hour}`} placeholder="Selecione">{hour}:00</option>
                        )
                    })} */}


                    {/* </select> */}
                </div>
            </div>
        </div>
    )

}

export default CheckinTime;