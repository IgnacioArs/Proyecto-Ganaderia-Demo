import React, { useEffect, useState } from 'react';
import { useBussinesMicroservicio } from '@/hooks/bussines';

const ListadoDiarreaTernero = () => {
  const { obtenerDiarreaTerneroHook } = useBussinesMicroservicio();
  const [diarreasTernero, setDiarreasTerneros] = useState([]);

  const cargarDiarreaTerneroList = async () => {
    const resDiarreaTernero = await obtenerDiarreaTerneroHook();
    setDiarreasTerneros(resDiarreaTernero?.data || []);
  };

  useEffect(() => {
    cargarDiarreaTerneroList();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col w-full h-full overflow-scroll text-slate-300 bg-slate-800 shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gradient-to-r from-indigo-400 to-indigo-600">
          Listado de Diarreas de Terneros
        </h2>
        <table className="w-full text-left table-auto min-w-max bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 border-separate border-spacing-0 rounded-lg shadow-2xl">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">
                <p className="text-sm font-medium leading-none">ID Diarrea Ternero</p>
              </th>
              <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">
                <p className="text-sm font-medium leading-none">Fecha Diarrea</p>
              </th>
              <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">
                <p className="text-sm font-medium leading-none">Severidad</p>
              </th>
              <th className="px-4 py-2 border-b border-slate-600 bg-slate-700">
                <p className="text-sm font-medium leading-none">Ternero</p> {/* Nueva columna */}
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {diarreasTernero.map((diarrea) => (
              <tr key={diarrea.id_diarrea_ternero} className="hover:bg-slate-600 transition-all duration-300">
                <td className="px-4 py-2 border-b border-slate-700">
                  <p className="text-sm font-semibold">{diarrea.id_diarrea_ternero}</p>
                </td>
                <td className="px-4 py-2 border-b border-slate-700">
                  <p className="text-sm">{diarrea.fecha_diarrea_ternero}</p>
                </td>
                <td className="px-4 py-2 border-b border-slate-700">
                  <p className="text-sm">{diarrea.severidad}</p>
                </td>
                {/* Columna Ternero con la información del ternero */}
                <td className="px-4 py-2 border-b border-slate-700">
                  <ul className="list-disc pl-5 text-sm">
                    <li><strong>RP Ternero:</strong> {diarrea.ternero.rp_ternero}</li>
                    <li><strong>Sexo:</strong> {diarrea.ternero.sexo}</li>
                    <li className={`text-sm ${diarrea.ternero.estado === 'Vivo' ? 'text-green-400' : 'text-red-400'}`}>
                      <strong>Estado:</strong> {diarrea.ternero.estado}
                    </li>
                    <li><strong>Peso al Nacer:</strong> {diarrea.ternero.peso_nacer} kg</li>
                    <li><strong>Peso a los 15 días:</strong> {diarrea.ternero.peso_15d} kg</li>
                    <li><strong>Peso a los 30 días:</strong> {diarrea.ternero.peso_30d} kg</li>
                    <li><strong>Peso a los 45 días:</strong> {diarrea.ternero.peso_45d} kg</li>
                    <li><strong>Peso al Largarse:</strong> {diarrea.ternero.peso_largado} kg</li>
                    <li><strong>Estimativo:</strong> {diarrea.ternero.estimativo} kg</li>
                    <li><strong>Observaciones:</strong> {diarrea.ternero.observaciones}</li>
                    <li><strong>Fecha de Nacimiento:</strong> {diarrea.ternero.fecha_nacimiento}</li>
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

export default ListadoDiarreaTernero;

