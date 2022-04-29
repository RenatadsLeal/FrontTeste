import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api";

const useAxios = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await api.get(url);
                // const response1 = await api.post(url, JSON.stringify())
                setData(response.data);
            } catch (error) {
                Swal.fire({
                    title: "Ops!",
                    icon: 'error',
                    text: 'Algo deu errado',
                    html: 'Algo deu <b>errado!</b>' +
                        '<br>' +
                        error,
                    confirmButtonColor: '#000000'
                })
            }
        }
        loadData();
    }, [url]);
    return data;
}

export default useAxios;