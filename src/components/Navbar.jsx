import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">Sistema de Asignación de Solicitudes</Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
              Home
            </Link>
            <Link to="/requests" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
              Solicitudes
            </Link>
            <Link to="/requests/create" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
              Crear Solicitud
            </Link>
            <Link to="/users" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
              Usuarios
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-indigo-700 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-600 px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">
            Home
          </Link>
          <Link to="/requests" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">
            Solicitudes
          </Link>
          <Link to="/requests/create" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">
            Crear Solicitud
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
