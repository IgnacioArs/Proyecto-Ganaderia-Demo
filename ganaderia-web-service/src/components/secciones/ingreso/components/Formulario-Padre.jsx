import { useForm } from 'react-hook-form';
import { useBussinesMicroservicio } from '@/hooks/bussines';
import React, { useState } from 'react';

const FormularioPadre = ({ setStep }) => {

  const {crearPadreHook} = useBussinesMicroservicio();

  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const [padreAlert, setPadreAlert] = useState({ status: false, message: "",estado:true });
 
  const handleNext = async (data) => {

    let newPadre = {
        "nombre": data?.nombre,
        "rp_padre": data?.rp_padre,
        "estado": data?.estado,
        "observaciones": data?.observaciones,
        "semen": data?.semen,
        "fecha_nacimiento": data?.fecha_nacimiento
    }
    
    const resPadre = await crearPadreHook(newPadre);
    if(resPadre?.status == 201){
        setPadreAlert({ status: true, message: "SE HA RESGISTRADO CORRECTAMENTE EL PADRE",estado:true });
        reset();
      }else{
        setPadreAlert({ status: true, message: "ERROR 401, SESSION CADUCADA", estado:false });
        reset();
    }
   /*  setStep(2); */ // Ir al siguiente formulario

  };





  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-10 mt-10">
          <form onSubmit={handleSubmit(handleNext)}>
            <h2 className="text-2xl font-bold text-center mb-6">Formulario Padre</h2>

            <div className="mb-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                {...register('nombre', { required: 'El nombre es obligatorio' })}
                placeholder="Nombre"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="rp_padre" className="block text-sm font-medium text-gray-700">RP Padre</label>
              <input
                type="number"
                {...register('rp_padre', { required: 'El RP Padre es obligatorio' })}
                placeholder="RP Padre"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.rp_padre && <span className="text-red-500 text-sm">{errors.rp_padre.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                {...register('estado')}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Vivo">Vivo</option>
                <option value="Muerto">Muerto</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">Observaciones</label>
              <textarea
                {...register('observaciones', { required: 'Las observaciones son obligatorias' })}
                placeholder="Observaciones"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.observaciones && <span className="text-red-500 text-sm">{errors.observaciones.message}</span>}
            </div>


            <div className="mb-4">
              <label htmlFor="semen" className="block text-sm font-medium text-gray-700">Semen</label>
              <textarea
                {...register('semen', { required: 'El semen del padre es obligatorio' })}
                placeholder="semen"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.semen && <span className="text-red-500 text-sm">{errors.semen.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                {...register('fecha_nacimiento', { required: 'La fecha de nacimiento es obligatoria' })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.fecha_nacimiento && <span className="text-red-500 text-sm">{errors.fecha_nacimiento.message}</span>}
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Guardar Padre
              </button>
            </div>
          </form>
          {padreAlert.status && (
          <p
            className={`text-white text-center text-sm font-semibold p-2 rounded-md shadow-md mt-2 
              ${padreAlert.estado ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {padreAlert.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormularioPadre;