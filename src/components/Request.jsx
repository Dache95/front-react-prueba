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

    // Función para obtener el usuario con menos tareas asignadas para un rol específico
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let selectedUserId = formData.usuarioId;
        let selectedUserName = '';

        if (formData.assignMethod === 'Aleatorio') {
            // Si el método de asignación es "Aleatorio", seleccionamos un usuario al azar
            const randomUser = users[Math.floor(Math.random() * users.length)];
            selectedUserId = randomUser.id;
            selectedUserName = randomUser.nombre;
        } else if (formData.assignMethod === 'Por Equidad' && formData.roleId) {
            // Si el método de asignación es "Por Equidad", seleccionamos el usuario con menos tareas del rol seleccionado
            const userWithLeastTasks = getUserWithLeastTasks(parseInt(formData.roleId, 10));
            selectedUserId = userWithLeastTasks.id;
            selectedUserName = userWithLeastTasks.nombre;
        } else {
            // Para el método "Directamente" seleccionamos el usuario directamente
            const selectedUser = users.find(user => user.id === parseInt(formData.usuarioId, 10));
            selectedUserName = selectedUser ? selectedUser.nombre : '';
        }

        // Construimos la URL para asignar la solicitud
        const url = `https://rest-api-prueba-production.up.railway.app/api/requests/${id}/assign`;

        // Ejecutamos fetch para hacer la asignación
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
            {assignedUserName && (
                <p className="text-green-500 mt-4">Asignación realizada exitosamente a {assignedUserName}</p>
            )}
        </div>
    );
};

export default Request;
