import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBussinesMicroservicio } from '@/hooks/bussines';

const FormularioTratamiento = ({ setStep }) => {

  const {crearTratamientoHook} = useBussinesMicroservicio();
  const [tratamientoAlert, setTratamientoAlert] = useState({ status: false, message: "",estado:true });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    
    let newTratamiento = {
      "nombre": data.nombre,
      "descripcion": data.descripcion,
      "fecha_tratamiento": data.fecha_tratamiento
    }
    const resCrearTratamiento = await crearTratamientoHook(newTratamiento);
    if(resCrearTratamiento?.status == 201){
        setTratamientoAlert({ status: true, message: "SE HA RESGISTRADO CORRECTAMENTE EL TRATAMIENTO",estado:true });
        reset();
      }else{
        setTratamientoAlert({ status: true, message: "ERROR 401, SESSION CADUCADA", estado:false });
        reset();
    }
/*     console.log(data); */
   /*  setStep(5); */
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-10 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Formulario Tratatamiento</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre del Tratamiento */}
          <div>
            <label className="block text-gray-600" htmlFor="nombre">
              Nombre del Tratamiento
            </label>
            <input
              type="text"
              id="nombre"
              {...register('nombre', { required: 'Este campo es obligatorio' })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300"
            />
            {errors.nombre && <span className="text-red-500">{errors.nombre.message}</span>}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-gray-600" htmlFor="descripcion">
              Descripción
            </label>
            <input
              type="text"
              id="descripcion"
              {...register('descripcion', { required: 'Este campo es obligatorio' })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300"
            />
            {errors.descripcion && <span className="text-red-500">{errors.descripcion.message}</span>}
          </div>

          {/* Fecha de Tratamiento */}
          <div>
            <label className="block text-gray-600" htmlFor="fecha_tratamiento">
              Fecha de Tratamiento
            </label>
            <input
              type="date"
              id="fecha_tratamiento"
              {...register('fechaTratamiento', { required: 'Este campo es obligatorio' })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300"
            />
            {errors.fechaTratamiento && <span className="text-red-500">{errors.fechaTratamiento.message}</span>}
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setStep((prevStep) => prevStep - 1)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Atrás
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Guardar Tratamiento
            </button>
          </div>
        </form>
        {tratamientoAlert.status && (
          <p
            className={`text-white text-center text-sm font-semibold p-2 rounded-md shadow-md mt-2 
              ${tratamientoAlert.estado ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {tratamientoAlert.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormularioTratamiento;


