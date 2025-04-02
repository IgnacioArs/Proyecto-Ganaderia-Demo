import React, { useState } from "react";
import ListadoPadre from "./components/Listado-Padre";
import ListadoMadre from "./components/Listado-Madre";
import ListadoTernero from "./components/Listado-Ternero";
import ListadoEvento from "./components/Listado-Evento";
import ListadoTratamiento from "./components/Listado-Tratamiento";
import ListadoTerneroTratamiento from "./components/Listado-Ternero-Tratamiento";
import ListadoDiarreaTernero from "./components/Listado-Diarrea-Ternero";
import { useSelector } from "react-redux";
import ButtonSelectListado from "./components/Button-Select-Ingreso";


const Listadoseccion = () => {
  const { stateSeccion } = useSelector((state) => state.seccion);
  const [step, setStep] = useState(1);

  return (
    <>
      {stateSeccion === true && (
        <div className="p-12 bg-gray-100">
         <ButtonSelectListado setStep={setStep}/>
          {step === 1 && <ListadoPadre />}
          {step === 2 && <ListadoMadre />}
          {step === 3 && <ListadoTernero />}
          {step === 4 && <ListadoEvento />}
          {step === 5 && <ListadoTratamiento />}
          {step === 6 && <ListadoTerneroTratamiento />}
          {step === 7 && <ListadoDiarreaTernero />}
        </div>
      )}
    </>
  );
};

export default Listadoseccion;






