import React, { useEffect, useState } from 'react';
import { useBussinesMicroservicio } from '@/hooks/bussines';
const SeleccionarPadre = ({ padreSeleccionado }) => {

  const {obtenerPadreHook} = useBussinesMicroservicio();

  const [padres, setPadres] = useState([]);
  const [selectedPadreId, setSelectedPadreId] = useState('');

  const cargarPadresList = async () => {
    const resListPadre =await obtenerPadreHook();
    setPadres(resListPadre?.data || []);
  }
  // Función para manejar el cambio de selección
  const handleSelectChange = (event) => {
    setSelectedPadreId(event.target.value);
    padreSeleccionado(event.target.value)
  };


  useEffect(()=> {
        cargarPadresList();
  },[])

  return (
        <>
              {/* Dropdown de selección de padres */}
      <select
        value={selectedPadreId}
        onChange={handleSelectChange}
        className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm"
      >
        <option value="0">Seleccione un Padre</option>
        {padres.map((padre) => (
          <option key={padre.id_padre} value={padre.id_padre}>
            {padre.nombre} (ID: {padre.id_padre})
          </option>
        ))}
      </select>

      {/* Mostrar el id seleccionado */}
      {selectedPadreId && (
        <p className="mt-4 text-gray-700">
          ID del Padre seleccionado: <strong>{selectedPadreId}</strong>
        </p>
      )}
        </>
  )
};

export default SeleccionarPadre;
