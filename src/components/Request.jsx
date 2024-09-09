import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useRequestData } from '../Request/hooks/useRequestData';
import AssignmentForm from '../Request/components/AssignmentForm';
import RequestDetails from '../Request/components/RequestDetails';

const Request = () => {
    const { id } = useParams();
    const { requestDetails, requestLoading, requestError, users, assignments } = useRequestData(id);
    const [formData, setFormData] = useState({ usuarioId: '', assignMethod: '', roleId: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí agregar lógica para el submit
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Detalles de la Solicitud</h1>
            {requestLoading && <p>Cargando...</p>}
            {requestError && <p>Error: {requestError}</p>}
            {requestDetails && <RequestDetails requestDetails={requestDetails} />}
            <AssignmentForm
                users={users}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default Request;
