import { useFetch } from '../../hooks/useFetch';

export const useRequestData = (id) => {
    const { data: requestDetails, loading: requestLoading, error: requestError } = useFetch(`https://rest-api-prueba-production.up.railway.app/api/requests/${id}`, null, true);
    const { data: users, loading: usersLoading, error: usersError } = useFetch('https://rest-api-prueba-production.up.railway.app/api/user', null, true);
    const { data: assignments, loading: assignmentLoading, error: assignmentError } = useFetch('https://rest-api-prueba-production.up.railway.app/api/assignments', null, true);
    return { requestDetails, requestLoading, requestError, users, usersLoading, usersError, assignments, assignmentLoading, assignmentError };
};
