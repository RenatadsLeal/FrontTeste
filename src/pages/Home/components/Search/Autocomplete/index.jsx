import './style.css'
import Downshift from 'downshift';
import api from '../../../../../services/api.js';
import useAxios from '../../../../../hooks/useAxios';

// const dataCity = [];

// api(`/city`).then((response) => {
//     dataCity.push(...response.data)
// }).catch((error) => {
//     console.error(error)
// })

const AutoComplete = ({onChange}) => {

    const dataCity = useAxios('/city');

    return (
        <Downshift onChange={onChange} itemToString={dataCity => (dataCity ? dataCity.name : '')}>
            {/* // pass the downshift props into a callback */}
            {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex, selectedItem, getLabelProps }) => (
                <div>
                    {/* // add a label tag and pass our label text to the getLabelProps function */}
                    {/* <label style={{ marginTop: '1rem', display: 'block' }} {...getLabelProps()}>Choose your favourite book</label> <br /> */}
                    {/* // add our input element and pass our placeholder to the getInputProps function */}
                    <input {...getInputProps({ placeholder: "Cidade" })} />
                    {/* // if the input element is open, render the div else render nothing */}
                    {isOpen && inputValue.length > 0 ? (

                        <div className="downshift-dropdown" >
                            {
                                // filter the dataCity and return items that match the inputValue
                                dataCity
                                    .filter(item => !inputValue || item.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, '').trim()
                                        .includes(inputValue.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, '').trim()))
                                    // map the return value and return a div
                                    .map((item, index) => (

                                        <div className="dropdown-item" {...getItemProps({ key: item.name, index, item })}
                                            style={{ backgroundColor: highlightedIndex === index ? 'lightgray' : 'white', fontWeight: selectedItem === item ? 'bold' : 'normal', }}>
                                            {item.name}
                                        </div>
                                    ))
                            }
                        </div>) : null
                    }
                </div>
            )}
        </Downshift>
    )
}

export default AutoComplete;