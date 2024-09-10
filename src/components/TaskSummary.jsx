import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';

const TaskSummary = () => {
    const [counts, setCounts] = useState({
        pendientes: 0,
        completadas: 0,
        urgentes: 0
    });

    const { data: requests, loading, error } = useFetch('https://rest-api-prueba-production.up.railway.app/api/requests', null, true);

    useEffect(() => {
        if (requests && Array.isArray(requests)) {
            const pendientes = requests.filter(request => request.estado === 'Pendiente').length;
            const completadas = requests.filter(request => request.estado === 'Completado').length;
            const urgentes = requests.filter(request => request.estado === 'Urgente').length;

            setCounts({ pendientes, completadas, urgentes });
        }
    }, [requests]);

    if (loading) {
        return <p>Cargando resumen...</p>;
    }

    if (error) {
        return <p>Error al cargar el resumen: {error}</p>;
    }

    return (
        <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Resumen Rápido</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow">
                    <p className="text-xl font-bold text-indigo-600">{counts.pendientes}</p>
                    <p className="text-gray-600">Solicitudes Pendientes</p>
                </div>

                <div className="p-4 bg-white rounded-lg shadow">
                    <p className="text-xl font-bold text-green-600">{counts.completadas}</p>
                    <p className="text-gray-600">Solicitudes Completadas</p>
                </div>

                <div className="p-4 bg-white rounded-lg shadow">
                    <p className="text-xl font-bold text-red-600">{counts.urgentes}</p>
                    <p className="text-gray-600">Solicitudes Urgentes</p>
                </div>
            </div>
        </div>
    );
};

export default TaskSummary;
