import { Link } from "react-router-dom"

export const ButtonsHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/requests/create"
          className="block bg-indigo-600 text-white text-center py-6 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          <h2 className="text-2xl font-semibold">Crear Nueva Solicitud</h2>
        </Link>
        
        <Link
          to="/requests"
          className="block bg-green-600 text-white text-center py-6 px-4 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        >
          <h2 className="text-2xl font-semibold">Ver Todas las Solicitudes</h2>
        </Link>

        <Link
          to="/users"
          className="block bg-yellow-500 text-white text-center py-6 px-4 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300"
        >
          <h2 className="text-2xl font-semibold">Ver Todos los Usuarios</h2>
        </Link>
      </div>
  )
}
