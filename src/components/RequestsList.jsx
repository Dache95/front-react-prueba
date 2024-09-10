import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

const RequestsList = () => {
  const { data, loading, error } = useFetch('https://rest-api-prueba-production.up.railway.app/api/requests');

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!data) {
    return <p>No se encontraron solicitudes</p>;
  }

  if (!Array.isArray(data)) {
    console.log("Invalid data format:", data);  
    return <p>Error en el formato de los datos</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Lista de Solicitudes</h1>
      <div className="space-y-4">
        {data.map(request => (
          <div key={request.id} className="bg-white p-6 shadow-md rounded-lg flex justify-between items-center">
            <p className="text-lg font-medium text-gray-700">{request.titulo}</p>
            <Link 
              to={`/requests/${request.id}/assign`} 
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-200">
              Asignar Solicitud
            </Link>
          </div>
        ))}
      </div>
    </div>

  );
};

export default RequestsList;
