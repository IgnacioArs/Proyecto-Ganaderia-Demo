import React, { useEffect, useState } from 'react'
import { useBussinesMicroservicio } from '@/hooks/bussines';
const ListadoTratamiento = () => {

  const {obtenerTratamientoHook} = useBussinesMicroservicio();
  const [tratamientos,setTratamientos] = useState([]);

  const cargarTratamientoList = async () => {
      const resTratamiento = await obtenerTratamientoHook();
      setTratamientos(resTratamiento?.data || []);
  }

  useEffect(()=> {
    cargarTratamientoList();
  },[])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className="relative flex flex-col w-full h-full overflow-scroll text-slate-300 bg-slate-800 shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gradient-to-r from-indigo-400 to-indigo-600">Listado de Tratamientos</h2>
        <table className="w-full text-left table-auto min-w-max bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 border-separate border-spacing-0 rounded-lg shadow-2xl">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">
                <p className="text-sm font-medium leading-none">ID Tratamiento</p>
              </th>
              <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">
                <p className="text-sm font-medium leading-none">Nombre</p>
              </th>
              <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">
                <p className="text-sm font-medium leading-none">Descripción</p>
              </th>
              <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">
                <p className="text-sm font-medium leading-none">Fecha Tratamiento</p>
              </th>
              <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">
                <p className="text-sm font-medium leading-none">Tratamientos Terneros</p>
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {tratamientos?.map((tratamiento)=>(
               <tr key={tratamiento.id_tratamiento} className="hover:bg-slate-600 transition-all duration-300">
               <td className="px-4 py-2 border-b border-slate-700">
                 <p className="text-sm font-semibold">{tratamiento.id_tratamiento}</p>
               </td>
               <td className="px-4 py-2 border-b border-slate-700">
                 <p className="text-sm">{tratamiento.nombre}</p>
               </td>
               <td className="px-4 py-2 border-b border-slate-700">
                 <p className="text-sm">{tratamiento.descripcion}</p>
               </td>
               <td className="px-4 py-2 border-b border-slate-700">
                 <p className="text-sm">{tratamiento.fecha_tratamiento}</p>
               </td>
               <td className="px-4 py-2 border-b border-slate-700">
                {tratamiento?.ternerosTratamientos?.map((terneroTratamiento)=>(
                  <React.Fragment key={terneroTratamiento.id_ternero_tratamiento}>
                     <p className="text-sm">{terneroTratamiento.fecha_aplicacion}</p>
                  </React.Fragment>
                ))}
               </td>
             </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>  
  )
}

export default ListadoTratamiento