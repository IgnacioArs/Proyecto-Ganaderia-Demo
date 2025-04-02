import React, { useEffect, useState } from 'react'
import { useBussinesMicroservicio } from '@/hooks/bussines';
const ListadoEvento = () => {

  const {obtenerEventoHook} = useBussinesMicroservicio();

  const [eventos,setEventos] =useState([]);

  const cargarEventosList = async () => {
    const resEventos = await obtenerEventoHook();
    setEventos(resEventos?.data || []);
  }

  useEffect(()=> {
    cargarEventosList();
  },[])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
    <div className="relative flex flex-col w-full h-full overflow-scroll text-slate-300 bg-slate-800 shadow-lg rounded-xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gradient-to-r from-indigo-400 to-indigo-600">
        Listado de Eventos
      </h2>
      <table className="w-full text-left table-auto min-w-max bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 border-separate border-spacing-0 rounded-lg shadow-2xl">
        <thead className="bg-slate-900">
          <tr>
            <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">ID Evento</th>
            <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">Fecha Evento</th>
            <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">Observación</th>
            <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">Terneros</th>
            <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">Madres</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {eventos.map((evento) => (
            <tr key={evento.id_evento} className="hover:bg-slate-600 transition-all duration-300">
              <td className="px-4 py-2 border-b border-slate-700">{evento.id_evento}</td>
              <td className="px-4 py-2 border-b border-slate-700">{evento.fecha_evento}</td>
              <td className="px-4 py-2 border-b border-slate-700">{evento.observacion}</td>
              <td className="px-4 py-2 border-b border-slate-700">
              <h3 className="text-sm text-green-400">Cantidad De Terneros: ({evento?.terneros?.length})</h3>
                {evento.terneros.length > 0 ? (
                  <ul>
                      {evento.terneros.map((ternero) => (
                        <li key={ternero.id_ternero} className="text-sm">
                          <p><strong>RP Ternero:</strong> {ternero.rp_ternero}</p>
                          <p><strong>Sexo:</strong> {ternero.sexo}</p>
                          <p className={`text-sm font-semibold ${ternero.estado ==='Vivo' ? 'text-green-400' : 'text-red-400'}`}><strong>Estado:</strong> {ternero.estado}</p>
                          <p><strong>Peso al nacer:</strong> {ternero.peso_nacer} kg</p>
                          <p><strong>Peso a los 15 días:</strong> {ternero.peso_15d} kg</p>
                          <p><strong>Peso a los 30 días:</strong> {ternero.peso_30d} kg</p>
                          <p><strong>Peso a los 45 días:</strong> {ternero.peso_45d} kg</p>
                          <p><strong>Peso largado:</strong> {ternero.peso_largado} kg</p>
                          <p><strong>Estimativo:</strong> {ternero.estimativo} kg</p>
                          <p><strong>Observaciones:</strong> {ternero.observaciones}</p>
                          <p><strong>Fecha de nacimiento:</strong> {ternero.fecha_nacimiento}</p>
                          <hr></hr>
                        </li>
                       
                      ))}
                    </ul>

                ) : (
                  "Sin terneros"
                )}
              </td>
              <td className="px-4 py-2 border-b border-slate-700">
              <h3 className="text-sm text-green-400">Cantidad De Madres: ({evento?.madres?.length})</h3>
              {evento.madres.length > 0 ? (
                      <ul>
                        {evento.madres.map((madre) => (
                          <li key={madre.id_madre} className="text-sm">
                            <p><strong>Nombre:</strong> {madre.nombre}</p>
                            <p><strong>RP Madre:</strong> {madre.rp_madre}</p>
                            <p className={`text-sm font-semibold ${madre.estado === 'Seca' ? 'text-green-400' : 'text-red-400'}`}><strong>Estado:</strong> {madre.estado}</p>
                            <p><strong>Observaciones:</strong> {madre.observaciones}</p>
                            <p><strong>Fecha de nacimiento:</strong> {madre.fecha_nacimiento}</p>
                            <hr></hr>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400">No hay madres registradas</p>
                    )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  )
}

export default ListadoEvento