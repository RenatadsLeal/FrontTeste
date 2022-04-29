import './style.css';
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { Formik, Form } from 'formik';
import { useMediaQuery } from 'react-responsive';
import ptBr from "date-fns/locale/pt-BR"
import "react-datepicker/dist/react-datepicker.css";
import AutoComplete from './Autocomplete/index';
import { Link } from 'react-router-dom';
import { useDateRangeContext } from '../../../../contexts/DateRangeContext';
registerLocale("ptBr", ptBr);

const Search = () => {
    const { setDateReservation } = useDateRangeContext();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [selectedCity, setSelectedCity] = useState("");
    const [path, setPath] = useState('')

    const mediaQuery = useMediaQuery({ minWidth: 600 });

    const isValid = (selectedCity) || (startDate && endDate);

    function handleChangeDataPicker(update) {
        setDateRange(update);
        setDateReservation(update);
    }
    
    function handleChangeAutoComplete(value) {
        setSelectedCity(value.name)
    }

    useEffect(() => {
        if (selectedCity && endDate) setPath(`/cidade/${selectedCity}/datas/${startDate?.toDateString()}/${endDate?.toDateString()}`)
        else if (selectedCity) setPath(`/cidade/${selectedCity}`) 
        else setPath(`/datas/${startDate?.toDateString()}/${endDate?.toDateString()}`)
        return;
    }, [selectedCity, endDate, startDate])

    return (
        <div id="search">
            <div id="searchBrowserTitle">
                <h1>Buscar ofertas em hotéis, casas e muito mais</h1>
            </div>

            <Formik initialValues={{ city: '', startDate: null, endDate: null }} >
                <Form className="formSearch" >
                    {/* <Field className="location" name="city" type="text" placeholder="Cidade" /> */}
                    <div className="location"><AutoComplete onChange={handleChangeAutoComplete} /></div>
                    <div className="date">
                        <DatePicker
                            placeholderText="Check in - Check out"
                            selectsRange={true}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            startDate={startDate}
                            endDate={endDate}
                            monthsShown={mediaQuery ? 2 : 1}
                            onChange={handleChangeDataPicker}
                            locale="ptBr"
                            showPopperArrow={false}
                            formatWeekDay={nameOfDay => nameOfDay.toUpperCase().substring(0, 1)}
                        />
                    </div>

                    <Link to={path}><button className="buttonSearch" type="submit" disabled={!isValid}>Buscar</button></Link>
                </Form>
            </Formik>
        </div>
    );
};

export default Search;