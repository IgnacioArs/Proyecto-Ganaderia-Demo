import React, { useEffect, useState } from 'react'
import { useBussinesMicroservicio } from '@/hooks/bussines';
const ListadoMadre = () => {

    const {obtenerMadreHook} = useBussinesMicroservicio();
    const [madres, setMadres] = useState([]);

    const cargarMadresList = async () => {
      const resMadres = await obtenerMadreHook();
      setMadres(resMadres?.data || []);
    }

    useEffect(() => {
      cargarMadresList();
    }, []);
  
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
         <div className="relative flex flex-col w-full h-full overflow-scroll text-slate-300 bg-slate-800 shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gradient-to-r from-indigo-400 to-indigo-600">Listado de Madres</h2>
        <table className="w-full text-left table-auto min-w-max bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 border-separate border-spacing-0 rounded-lg shadow-2xl">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 border-b border-slate-600 bg-slate-700">ID Madre</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Nombre</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">RP Madre</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Estado</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Observaciones</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Fecha Nacimiento</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700">Padres Inseminacion</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700 rounded-tr-lg">Terneros (Crias Propias)</th>
              <th className="px-4 border-b border-slate-600 bg-slate-700 rounded-tr-lg">Eventos (Eventos Propios)</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {madres?.map((madre) => (
              <tr key={madre.id_madre} className="hover:bg-slate-600 transition-all duration-300">
                <td className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm font-semibold">ID: {madre.id_madre}</p>
                </td>
                <td className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm font-semibold">NOMBRE: {madre.nombre}</p>
                </td>
                <td className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm">RP_MADRE: {madre.rp_madre}</p>
                </td>
                <td className="px-4 py-3 border-b border-slate-700">
                  <p className={`text-sm font-semibold ${madre.estado === 'Seca' ? 'text-green-400' : 'text-red-400'}`}>
                    ESTADO: {madre.estado ==='Seca' ? 'Seca' : 'En Tambo'}
                  </p>
                </td>
                <td className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm">OBSERVACIONES: {madre.observaciones}</p>
                </td>
                <td className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm">FECHA_NACIMIENTO: {madre.fecha_nacimiento}</p>
                </td>
                <td className="px-4 py-3 border-b border-slate-500">
                  <h3 className="text-sm text-green-400">Cantidad De Padres: ({madre?.padres?.length})</h3>
                  <ul className="list-disc pl-5">
                    {madre?.padres?.map((padre) => (
                      <React.Fragment key={padre.id_padre}>
                      <li className="text-sm">NOMBRE: {padre.nombre}</li>
                      <li className="text-sm">RP_PADRE: {padre.rp_padre}</li>
                      <li className="text-sm">
                        <p className={`text-sm font-semibold ${padre.estado ==="Vivo"? 'text-green-400' : 'text-red-400'}`}>
                         ESTADO: {padre.estado ==="Vivo"? 'Vivo' : 'Muerto'}
                      </p>
                      </li>
                      <li className="text-sm">OBSERVACIONES: {padre.observaciones}</li>
                      <li className="text-sm">SEMEN: {padre.semen}</li>
                      <li className="text-sm">FECHA_NACIMIENTO: {padre.fecha_nacimiento}</li>
                      <hr></hr>
                      </React.Fragment>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 border-b border-slate-500 rounded-br-lg">
                  <h3 className="text-sm text-green-400">Cantidad De Crias: ({madre?.terneros?.length})</h3>
                  <ul className="list-disc pl-5">
                    {madre?.terneros?.map((ternero) => (
                      <React.Fragment key={ternero.id_ternero}>
                      <li className="text-sm">RP_TERNERO: {ternero.rp_ternero}</li>
                      <li className="text-sm">SEXO: {ternero.sexo}</li>
                      <li className="text-sm">
                        AQUII
                        <p className={`text-sm font-semibold ${ternero.estado ==='Vivo'? 'text-green-400' : 'text-red-400'}`}>
                         ESTADO: {ternero.estado ==='Vivo'? 'Vivo' : 'Muerto'}
                      </p>
                      </li>
                      <li className="text-sm">PESO_NACER: {ternero.peso_nacer}</li>
                      <li className="text-sm">PESO_15DIAS: {ternero.peso_15d}</li>
                      <li className="text-sm">PESO_13DIAS: {ternero.peso_30d}</li>
                      <li className="text-sm">PESO_45DIAS: {ternero.peso_45d}</li>
                      <li className="text-sm">PESO_LARGADO: {ternero.peso_largado}</li>
                      <li className="text-sm">ESTIMATIVO: {ternero.estimativo}</li>
                      <li className="text-sm">OBSERVACIONES: {ternero.observaciones}</li>
                      <li className="text-sm">FECHA_NACIMIENTO: {ternero.fecha_nacimiento}</li>
                      <hr></hr>
                      </React.Fragment>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 border-b border-slate-500 rounded-br-lg">
                  <h3 className="text-sm text-green-400">Cantidad De Eventos: ({madre?.eventos?.length})</h3>
                  <ul className="list-disc pl-5">
                    {madre?.eventos?.map((evento) => (
                      <React.Fragment key={evento.id_evento}>
                      <li className="text-sm">FECHA_EVENTO:{evento.fecha_evento}</li>
                      <li className="text-sm">OBSERVACION:{evento.observacion}</li>
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
    );
  };

export default ListadoMadre