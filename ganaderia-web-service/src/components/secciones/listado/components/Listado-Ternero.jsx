import { useBussinesMicroservicio } from '@/hooks/bussines'
import React, { useEffect, useState } from 'react'

const ListadoTernero = () => {
  
  const {obtenerTerneroHook} = useBussinesMicroservicio();
  const [terneros,setTerneros] = useState([]);

  const cargarTerneroLista = async () => {
      const resTerneros = await obtenerTerneroHook()
      setTerneros(resTerneros?.data || []);
  }

  useEffect(()=> {
    cargarTerneroLista();
  },[])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
       <div className="relative flex flex-col w-full h-full overflow-scroll text-slate-300 bg-slate-800 shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gradient-to-r from-indigo-400 to-indigo-600">
          Listado de Terneros
        </h2>
        <table className="w-full text-left table-auto min-w-max bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 border-separate border-spacing-0 rounded-lg shadow-2xl">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 border-b border-slate-600 bg-slate-700">ID Ternero</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">RP Ternero</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Sexo</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Estado</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Peso Nacer</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Peso 15d</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Peso 30d</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Peso 45d</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Peso Largado</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Estimativo</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Observaciones</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Fecha Nacimiento</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Padre</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Madre</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700 rounded-tr-lg">Eventos</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Diarreas</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700 rounded-br-lg">Tratamientos</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {/* Ejemplo de una fila de datos */}
             {terneros.map((ternero)=>(
                 <tr  key={ternero.id_ternero} className="hover:bg-slate-600 transition-all duration-300">
                 <td className="px-4 py-3 border-b border-slate-700">
                   <p  className="text-sm font-semibold">{ternero.id_ternero}1</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                   <p className="text-sm font-semibold">{ternero.rp_ternero}123456</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                   <p className="text-sm">{ternero.sexo}</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                      <p className={`text-sm font-semibold ${ternero.estado ==='Vivo' ? 'text-green-400' : 'text-red-400'}`}>
                              {ternero.estado}
                      </p>  
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                   <p className="text-sm">{ternero.peso_nacer}</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                   <p className="text-sm">{ternero.peso_15d}</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                   <p className="text-sm">{ternero.peso_30d}</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                   <p className="text-sm">{ternero.peso_45d}</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                   <p className="text-sm">{ternero.peso_largado}</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                   <p className="text-sm">{ternero.estimativo}</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                   <p className="text-sm">{ternero.observaciones}</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                   <p className="text-sm">{ternero.fecha_nacimiento}</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-700">
                     <React.Fragment key={ternero?.padre?.id_padre}>
                      <p className="text-sm">RP_PADRE: {ternero?.padre?.rp_padre}</p>
                      <p className={`text-sm font-semibold ${ternero?.padre?.estado === "Vivo" ? 'text-green-400' : 'text-red-400'}`}>
                          {ternero?.padre?.estado}
                        </p>
                      <p className="text-sm">OBSERVACIONES: {ternero?.padre?.observaciones}</p>
                      <p className="text-sm">SEMEN: {ternero?.padre?.semen}</p>
                      <p className="text-sm">FECHA_NACIMIENTO: {ternero?.padre?.fecha_nacimiento}</p>
                     </React.Fragment>
                   <p className="text-sm">Madre A</p>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-500">
                   <ul className="list-disc pl-5">
                      <React.Fragment key={ternero?.madre?.id_madre}>
                          <li className="text-sm">{ternero?.madre?.nombre}</li>
                          <li className="text-sm">{ternero?.madre?.rp_madre}</li>
                          <p className={`text-sm font-semibold ${ternero?.madre?.estado === 'Seca' ? 'text-green-400' : 'text-red-400'}`}>
                             {ternero?.madre?.estado ==='Seca' ? 'Seca' : 'En Tambo'}
                          </p>
                          <li className="text-sm">{ternero?.madre?.observaciones}</li>
                          <li className="text-sm">{ternero?.madre?.fecha_nacimiento}</li>
                      </React.Fragment> 
                   </ul>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-500">
                 <h3 className="text-green-400">Cantidad De Eventos: ({ternero?.eventos.length})</h3> 
                 <ul className="list-disc pl-5">
                 {ternero?.eventos?.map((evento)=>(
                    <React.Fragment key={evento.id_evento}>
                        <li className="text-sm">{evento.fecha_evento}</li>
                        <li className="text-sm">{evento.observacion}</li>
                        <hr></hr>
                    </React.Fragment> 
                 ))}              
                 </ul>
               </td>
                 <td className="px-4 py-3 border-b border-slate-500">
                   <ul className="list-disc pl-5">
                     <li className="text-sm">Diarrea 1</li>
                     <li className="text-sm">Diarrea 2</li>
                   </ul>
                 </td>
                 <td className="px-4 py-3 border-b border-slate-500 rounded-br-lg">
                   <ul className="list-disc pl-5">
                     <li className="text-sm">Tratamiento 1</li>
                     <li className="text-sm">Tratamiento 2</li>
                   </ul>
                 </td>
               </tr>
             ))}
            {/* Puedes agregar más filas de datos aquí */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListadoTernero