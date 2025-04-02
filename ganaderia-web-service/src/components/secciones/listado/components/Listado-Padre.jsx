import React, { useEffect, useState } from 'react'
import { useBussinesMicroservicio } from '@/hooks/bussines';
const ListadoPadre = () => {

    const {obtenerPadreHook} = useBussinesMicroservicio();

    const [padres, setPadres] = useState([]);   

    const cargarPadreList = async() => {
        const resPadreList = await obtenerPadreHook();
        setPadres(resPadreList?.data || []);
    }


    useEffect(() => {
        cargarPadreList();
    }, []);
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="relative flex flex-col w-full h-full overflow-hidden text-slate-300 bg-slate-800 shadow-lg rounded-xl p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gradient-to-r from-indigo-400 to-indigo-600">
              Listado de padres
            </h2>
      
            {/* Contenedor con barras de desplazamiento */}
            <div className="overflow-auto max-h-[70vh]"> {/* max-h ajusta la altura visible de la tabla */}
              <table className="w-full text-left table-auto min-w-max bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 border-separate border-spacing-0 rounded-lg shadow-2xl">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="px-4 border-b border-slate-600 bg-slate-700">ID Padre</th>
                    <th className="px-4 border-b border-slate-600 bg-slate-700">Nombre</th>
                    <th className="px-4 border-b border-slate-600 bg-slate-700">RP Padre</th>
                    <th className="px-4 border-b border-slate-600 bg-slate-700">Estado</th>
                    <th className="px-4 border-b border-slate-600 bg-slate-700">Observaciones</th>
                    <th className="px-4 border-b border-slate-600 bg-slate-700">Semen</th>
                    <th className="px-4 border-b border-slate-600 bg-slate-700">Fecha Nacimiento</th>
                    <th className="px-4 border-b border-slate-600 bg-slate-700">Madres Inseminadas</th>
                    <th className="px-4 border-b border-slate-600 bg-slate-700 rounded-tr-lg">Terneros (Crias Propias)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {padres.map((padre) => (
                    <tr key={padre.id_padre} className="hover:bg-slate-600 transition-all duration-300">
                      <td className="px-4 py-3 border-b border-slate-700">
                        <p className="text-sm font-semibold">{padre.id_padre}</p>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-700">
                        <p className="text-sm font-semibold">{padre.nombre}</p>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-700">
                        <p className="text-sm">{padre.rp_padre}</p>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-700">
                        <p className={`text-sm font-semibold ${padre.estado === "Vivo" ? 'text-green-400' : 'text-red-400'}`}>
                          {padre.estado}
                        </p>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-700">
                        <p className="text-sm">{padre.observaciones}</p>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-700">
                        <p className={`text-sm font-semibold ${padre.semen ? 'text-green-400' : 'text-red-400'}`}>
                          {padre.semen}
                        </p>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-700">
                        <p className="text-sm">{padre.fecha_nacimiento}</p>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-500">
                        <h3 className="text-green-400">Cantidad De Madres: ({padre?.madres.length})</h3> 
                        <ul className="list-disc pl-5">
                        {padre.madres.map((madre) => (
                          <React.Fragment key={madre.id_madre}>
                            <li className="text-sm">
                              <strong>Nombre:</strong> {madre.nombre}
                            </li>
                            <li className="text-sm">
                              <strong>RP Madre:</strong> {madre.rp_madre}
                            </li>
                            <li className={`text-sm ${madre.estado} ==='Seca' ? 'text-green-400' : 'text-red-400'}`}>
                              <strong>Estado:</strong>
                              <p className={`text-sm font-semibold ${madre.estado ==='Seca' ? 'text-green-400' : 'text-red-400'}`}>
                              {madre.estado}
                              </p>  
                            </li>
                            <li className="text-sm">
                              <strong>Observaciones:</strong> {madre.observaciones}
                            </li>
                            <li className="text-sm">
                              <strong>Fecha de Nacimiento:</strong> {madre.fecha_nacimiento}
                            </li>
                            <hr></hr>
                          </React.Fragment>
                        ))}
                        </ul>
                      </td>
      
                      <td className="px-4 py-3 border-b border-slate-500 rounded-br-lg">
                        <h3 className="text-green-400">Cantidad De Crias: ({padre?.terneros?.length})</h3> 
                        <ul className="list-disc pl-5">
                        {padre.terneros.map((ternero) => (
                          <React.Fragment key={ternero.id_ternero}>
                            <li className="text-sm">
                              <strong>RP Ternero:</strong> {ternero.rp_ternero}
                            </li>
                            <li className="text-sm">
                              <strong>Sexo:</strong> {ternero.sexo}
                            </li>
                            <li className={`text-sm ${ternero.estado} ==='Vivo' ? 'text-green-400' : 'text-red-400'}`}>
                              <strong>Estado:</strong>
                              <p className={`text-sm font-semibold ${ternero.estado ==='Vivo' ? 'text-green-400' : 'text-red-400'}`}>
                              {ternero.estado}
                              </p>  
                            </li>
                            <li className="text-sm">
                              <strong>Peso al Nacer:</strong> {ternero.peso_nacer} kg
                            </li>
                            <li className="text-sm">
                              <strong>Peso a los 15 días:</strong> {ternero.peso_15d} kg
                            </li>
                            <li className="text-sm">
                              <strong>Peso a los 30 días:</strong> {ternero.peso_30d} kg
                            </li>
                            <li className="text-sm">
                              <strong>Peso a los 45 días:</strong> {ternero.peso_45d} kg
                            </li>
                            <li className="text-sm">
                              <strong>Peso al Largarse:</strong> {ternero.peso_largado} kg
                            </li>
                            <li className="text-sm">
                              <strong>Estimativo:</strong> {ternero.estimativo} kg
                            </li>
                            <li className="text-sm">
                              <strong>Observaciones:</strong> {ternero.observaciones}
                            </li>
                            <li className="text-sm">
                              <strong>Fecha de Nacimiento:</strong> {ternero.fecha_nacimiento}
                            </li>
                            <hr></hr>
                          </React.Fragment>
                        ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }      

export default ListadoPadre