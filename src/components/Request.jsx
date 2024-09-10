import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useRequestData } from '../Request/hooks/useRequestData';
import AssignmentForm from '../Request/components/AssignmentForm';
import RequestDetails from '../Request/components/RequestDetails';

const Request = () => {
    const { id } = useParams();
    const { requestDetails, requestLoading, requestError, users, assignments } = useRequestData(id);
    const [formData, setFormData] = useState({ usuarioId: '', assignMethod: '', roleId: '' });
    const [assignedUserName, setAssignedUserName] = useState('');

    const getUserWithLeastTasks = (roleId) => {
        const usersWithRole = users.filter(user => user.rol === roleId);
        const userTaskCount = usersWithRole.map(user => ({
            ...user,
            taskCount: assignments.filter(assignment => assignment.usuario === user.id).length
        }));

        return userTaskCount.reduce((minUser, currentUser) => {
            return currentUser.taskCount < minUser.taskCount ? currentUser : minUser;
        }, userTaskCount[0]);
    };

    const existingAssignment = assignments?.find(assignment => assignment.request === parseInt(id, 10));

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let selectedUserId = formData.usuarioId;
        let selectedUserName = '';

        if (formData.assignMethod === 'Aleatorio') {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            selectedUserId = randomUser.id;
            selectedUserName = randomUser.nombre;
        } else if (formData.assignMethod === 'Por Equidad' && formData.roleId) {
            const userWithLeastTasks = getUserWithLeastTasks(parseInt(formData.roleId, 10));
            selectedUserId = userWithLeastTasks.id;
            selectedUserName = userWithLeastTasks.nombre;
        } else {
            const selectedUser = users.find(user => user.id === parseInt(formData.usuarioId, 10));
            selectedUserName = selectedUser ? selectedUser.nombre : '';
        }

        const url = `https://rest-api-prueba-production.up.railway.app/api/requests/${id}/assign`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario: selectedUserId,
                assign_method: formData.assignMethod,
            }),
        });

        if (response.ok) {
            setAssignedUserName(selectedUserName);
            setFormData({ usuarioId: '', assignMethod: '', roleId: '' });
        } else {
            console.error('Error al asignar la solicitud');
        }
    };

    if (requestLoading || !users || !assignments) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Detalles de la Solicitud</h1>
            {requestError && <p>Error: {requestError}</p>}
            {requestDetails && <RequestDetails requestDetails={requestDetails} />}

            {existingAssignment ? (
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Solicitud Asignada a:</h2>
                    {users && (
                        <p className="text-lg">
                            <strong>Usuario Asignado:</strong> {users.find(user => user.id === existingAssignment.usuario)?.nombre || `ID: ${existingAssignment.usuario}`}
                        </p>
                    )}
                    <p className="text-lg">
                        <strong>Método de Asignación:</strong> {existingAssignment.assign_method}
                    </p>
                </div>
            ) : (
                <AssignmentForm
                    users={users}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            )}

            {assignedUserName && (
                <p className="text-green-500 mt-4">
                    Asignación realizada exitosamente a {assignedUserName}
                </p>
            )}
        </div>
    );
};

export default Request;
