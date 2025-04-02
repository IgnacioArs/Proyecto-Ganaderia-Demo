import { useBussinesMicroservicio } from '@/hooks/bussines';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SeleccionarMadre from './Select-Madre';
import SeleccionarPadre from './Select-Padre';

const FormularioTernero = ({ setStep }) => {
  
  const {crearTerneroHook} = useBussinesMicroservicio();
  
  const { register, handleSubmit, formState: { errors }, setValue,reset } = useForm();
  const [terneroAlert, setTerneroAlert] = useState({ status: false, message: "",estado:true });
  const [padreId,setPadreId] = useState(0);
  const [madreId,setMadreId] = useState(0);



  const onSubmit = async (data) => {

    let newTernero={
      "rp_ternero": data.rp_ternero,
      "sexo": data.sexo,
      "estado": data.estado,
      "peso_nacer": data.peso_nacer,
      "peso_15d": data.peso_15d,
      "peso_30d": data.peso_30d,
      "peso_45d": data.peso_45d,
      "peso_largado": data.peso_largado,
      "estimativo": data.estimativo,
      "observaciones": data.observaciones,
      "fecha_nacimiento": data.fecha_nacimiento,
      "id_madre": madreId,
      "id_padre": padreId
    }
    
    if(newTernero.id_madre ===0){
      setTerneroAlert({ status: true, message: "POR FAVOR, SELECCIONE LA MADRE",estado:false });
    }else if(newTernero.id_padre ===0){
      setTerneroAlert({ status: true, message: "POR FAVOR, SELECCIONE AL PADRE",estado:false });
    }else{
      const resTerneroCreado = await crearTerneroHook(newTernero);
      if(resTerneroCreado?.status == 201){
          setTerneroAlert({ status: true, message: "SE HA RESGISTRADO EL TERNERO",estado:true });
          reset();
          setPadreId(0)
          setMadreId(0)
      }else{
          setTerneroAlert({ status: true, message: "ERROR 401, SESSION CADUCADA", estado:false });
          reset();
          setPadreId(0)
          setMadreId(0)
      }
    }
    
   // Aquí puedes procesar los datos del formulario
   /*  setStep(3); */ // Ir al siguiente formulario de Evento
  };


  const handleObetenerMadre = (id) => {
    var idMadre = parseInt(id);
    setMadreId(idMadre);
  }

  const handleObetenerPadre = (id) => {
    var idMadre = parseInt(id);
    setPadreId(idMadre);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-10 mt-10">
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Formulario Ternero</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="rp_ternero" className="block text-sm font-medium text-gray-700">RP Ternero</label>
              <input
                type="number"
                id="rp_ternero"
                {...register("rp_ternero", { required: "Este campo es obligatorio" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.rp_ternero && <span className="text-red-500 text-sm">{errors.rp_ternero.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">Sexo</label>
              <select
                id="sexo"
                {...register("sexo")}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                id="estado"
                {...register("estado")}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Vivo">Vivo</option>
                <option value="Muerto">Muerto</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="peso_nacer" className="block text-sm font-medium text-gray-700">Peso al Nacer</label>
              <input
                type="number"
                id="peso_nacer"
                {...register("peso_nacer", { required: "Este campo es obligatorio" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.peso_nacer && <span className="text-red-500 text-sm">{errors.peso_nacer.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="peso_15d" className="block text-sm font-medium text-gray-700">Peso a los 15 Días</label>
              <input
                type="number"
                id="peso_15d"
                {...register("peso_15d", { required: "Este campo es obligatorio" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.peso_15d && <span className="text-red-500 text-sm">{errors.peso_15d.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="peso_30d" className="block text-sm font-medium text-gray-700">Peso a los 30 Días</label>
              <input
                type="number"
                id="peso_30d"
                {...register("peso_30d", { required: "Este campo es obligatorio" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.peso_30d && <span className="text-red-500 text-sm">{errors.peso_30d.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="peso_45d" className="block text-sm font-medium text-gray-700">Peso a los 45 Días</label>
              <input
                type="number"
                id="peso_45d"
                {...register("peso_45d", { required: "Este campo es obligatorio" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.peso_45d && <span className="text-red-500 text-sm">{errors.peso_45d.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="peso_largado" className="block text-sm font-medium text-gray-700">Peso al Largado</label>
              <input
                type="number"
                id="peso_largado"
                {...register("peso_largado", { required: "Este campo es obligatorio" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.peso_largado && <span className="text-red-500 text-sm">{errors.peso_largado.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="estimativo" className="block text-sm font-medium text-gray-700">Estimativo</label>
              <input
                type="number"
                id="estimativo"
                {...register("estimativo", { required: "Este campo es obligatorio" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.estimativo && <span className="text-red-500 text-sm">{errors.estimativo.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">Observaciones</label>
              <textarea
                id="observaciones"
                {...register("observaciones", { required: "Este campo es obligatorio" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
              {errors.observaciones && <span className="text-red-500 text-sm">{errors.observaciones.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fecha_nacimiento"
                {...register("fecha_nacimiento", { required: "Este campo es obligatorio" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.fecha_nacimiento && <span className="text-red-500 text-sm">{errors.fecha_nacimiento.message}</span>}
            </div>

            {/* Relación con Madre */}
            <div className="mb-4">
              <label htmlFor="madre" className="block text-sm font-medium text-gray-700">Seleccionar Madre</label>
              <SeleccionarMadre madreSeleccionada={handleObetenerMadre}/>
            </div>

             {/* Relación con Padre */}
            <div className="mb-4">
              <label htmlFor="madre" className="block text-sm font-medium text-gray-700">Seleccionar Padre</label>
              <SeleccionarPadre padreSeleccionado={handleObetenerPadre} />
            </div>
  
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Guardar Ternero
              </button>
            </div>
          </form>
          {terneroAlert.status && (
          <p
            className={`text-white text-center text-sm font-semibold p-2 rounded-md shadow-md mt-2 
              ${terneroAlert.estado ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {terneroAlert.message}
          </p>
        )}
        </div>
      </div>
    </div>
  );
};

export default FormularioTernero;

