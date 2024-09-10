import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

const RecentActivity = () => {
    const { data: assignments, loading: assignmentsLoading, error: assignmentsError } = useFetch('https://rest-api-prueba-production.up.railway.app/api/assignments', null, true);

    const { data: users, loading: usersLoading, error: usersError } = useFetch('https://rest-api-prueba-production.up.railway.app/api/user', null, true);

    const [requestDetails, setRequestDetails] = useState(null);
    const [requestLoading, setRequestLoading] = useState(true);
    const [requestError, setRequestError] = useState(null);

    const latestAssignment = assignments && assignments.length > 0 ? assignments[assignments.length - 1] : null;

    const assignedUser = latestAssignment && users ? users.find(user => user.id === latestAssignment.usuario) : null;

    useEffect(() => {
        if (latestAssignment) {
            const fetchRequestDetails = async () => {
                try {
                    const response = await fetch(`https://rest-api-prueba-production.up.railway.app/api/requests/${latestAssignment.request}`);
                    if (!response.ok) {
                        throw new Error('Error al cargar los detalles de la solicitud');
                    }
                    const data = await response.json();
                    setRequestDetails(data);
                    setRequestLoading(false);
                } catch (error) {
                    setRequestError(error.message);
                    setRequestLoading(false);
                }
            };
            fetchRequestDetails();
        }
    }, [latestAssignment]);

    if (assignmentsLoading || usersLoading || requestLoading) {
        return <p>Cargando actividad reciente...</p>;
    }

    if (assignmentsError || usersError || requestError) {
        return <p>Error al cargar la actividad reciente: {assignmentsError || usersError || requestError}</p>;
    }

    if (!latestAssignment || !assignedUser || !requestDetails) {
        return <p>No hay actividad reciente.</p>;
    }

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Actividad Reciente</h3>
            <ul className="space-y-4">
                <li className="p-4 bg-white rounded-lg shadow flex justify-between">
                    <p><strong>Título:</strong> {requestDetails.titulo}</p>
                    <p><strong>Asignado a:</strong> {assignedUser.nombre}</p>
                </li>
            </ul>
        </div>
    );
};

export default RecentActivity;
