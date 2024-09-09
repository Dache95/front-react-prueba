import { useState, useEffect } from "react";

export const useFetch = (initialUrl = null, options = null, autoFetch = true) => {
    const [info, setInfo] = useState({
        data: null,
        loading: false,
        error: null
    });

    const [url, setUrl] = useState(initialUrl);  // Estado para manejar la URL

    const fetchData = async (dynamicUrl = null, requestOptions = options) => {
        const finalUrl = dynamicUrl ? dynamicUrl : url;

        if (!finalUrl) {
            throw new Error("URL no proporcionada");
        }

        setInfo({ data: null, loading: true, error: null });

        try {
            const response = await fetch(finalUrl, requestOptions);

            console.log('Response recibido:', response);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} ${response.statusText}. Detalles: ${errorText}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const errorText = await response.text();
                throw new Error(`Error: La respuesta no es JSON. Detalles: ${errorText}`);
            }

            const data = await response.json();
            setInfo({ data, loading: false, error: null });
        } catch (error) {
            setInfo({ data: null, loading: false, error: error.message });
        }
    };

    useEffect(() => {
        if (url && autoFetch) {
            fetchData();
        }
    }, [url, autoFetch]);

    return {
        data: info.data,
        loading: info.loading,
        error: info.error,
        fetchData,  // Ejecutar manualmente cuando sea necesario
        setUrl      // Cambiar la URL manualmente cuando sea necesario
    };
};
