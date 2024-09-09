const RequestDetails = ({ requestDetails }) => {
    return (
        <div className="mb-4">
            <p className="text-lg"><strong>Título:</strong> {requestDetails.titulo}</p>
            <p className="text-lg"><strong>Descripción:</strong> {requestDetails.descripcion}</p>
            <p className="text-lg"><strong>Estado:</strong> {requestDetails.estado}</p>
        </div>
    );
};

export default RequestDetails;
