import { useState } from "react";
import { useFetch } from '../hooks/useFetch';

const CreateRequest = () => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        estado: ''
    });

    const { data, loading, error, fetchData } = useFetch('https://rest-api-prueba-production.up.railway.app/api/requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }, false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);

        await fetchData(null, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        setFormData({
            titulo: '',
            descripcion: '',
            estado: ''
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Crear Nueva Solicitud</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
      
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
      
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
            <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="">Selecciona un estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Completado">Completado</option>
                <option value="Urgente">Urgente</option>
            </select>
            </div>

      
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
            } transition-all`}
          >
            {loading ? 'Enviando...' : 'Crear Solicitud'}
          </button>
        </form>
      
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {data && <p className="mt-4 text-green-500">Solicitud creada exitosamente.</p>}
      </div>
      
    );
};

export default CreateRequest;
