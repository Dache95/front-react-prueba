import { useState } from 'react';

const AssignmentForm = ({ users, handleSubmit, formData, handleChange, assignLoading, getUserWithLeastTasks }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="assignMethod" className="block text-sm font-medium text-gray-700">
                    Método de Asignación
                </label>
                <select
                    id="assignMethod"
                    name="assignMethod"
                    value={formData.assignMethod}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Selecciona un método</option>
                    <option value="Aleatorio">Aleatorio</option>
                    <option value="Por Equidad">Por Equidad</option>
                    <option value="Directamente">Directamente</option>
                </select>
            </div>

            {formData.assignMethod === 'Por Equidad' && (
                <div className="mb-4">
                    <label htmlFor="roleId" className="block text-sm font-medium text-gray-700">
                        Selecciona el Rol
                    </label>
                    <select
                        id="roleId"
                        name="roleId"
                        value={formData.roleId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Selecciona un rol</option>
                        <option value="1">Employer</option>
                        <option value="2">Analyst</option>
                    </select>
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="usuarioId" className="block text-sm font-medium text-gray-700">
                    Usuario
                </label>
                {users && (
                    <select
                        id="usuarioId"
                        name="usuarioId"
                        value={formData.usuarioId}
                        onChange={handleChange}
                        required={formData.assignMethod !== 'Aleatorio' && formData.assignMethod !== 'Por Equidad'}
                        disabled={formData.assignMethod === 'Aleatorio' || formData.assignMethod === 'Por Equidad'}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Selecciona un usuario</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.nombre}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <button 
                type="submit" 
                disabled={assignLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    assignLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                } transition-all`}
            >
                {assignLoading ? 'Enviando...' : 'Asignar Solicitud'}
            </button>
        </form>
    );
};

export default AssignmentForm;
