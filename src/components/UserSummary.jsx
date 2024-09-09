import { useFetch } from '../hooks/useFetch';

const UserSummary = () => {
    const { data: users, loading: usersLoading, error: usersError } = useFetch('https://rest-api-prueba-production.up.railway.app/api/user', null, true);

    const { data: assignments, loading: assignmentsLoading, error: assignmentsError } = useFetch('https://rest-api-prueba-production.up.railway.app/api/assignments', null, true);

    if (usersLoading || assignmentsLoading) return <p>Cargando...</p>;
    if (usersError || assignmentsError) return <p>Error: {usersError || assignmentsError}</p>;

    if (!users || !assignments) return <p>No se encontraron usuarios o asignaciones.</p>;

    const userAssignments = users.map(user => {
        const assignmentCount = assignments.filter(assignment => assignment.usuario === user.id).length;
        return { ...user, assignmentCount };
    });

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Resumen de Usuarios</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userAssignments.map(user => (
                    <div key={user.id} className="p-4 bg-white rounded-lg shadow">
                        <p className="text-lg font-semibold">Nombre: {user.nombre}</p>
                        <p className="text-sm">Rol: {user.rol === 1 ? 'Employer' : 'Analyst'}</p>
                        <p className="text-sm">Asignaciones: {user.assignmentCount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserSummary;
