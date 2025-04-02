import React from 'react'

const ButtonSelectListado = ({ setStep }) => {
    
    
    const handleNext = (data) => {
        setStep(data); 
    };
    
    
return (


<div className="mx-auto flex items-center justify-center gap-6 px-6 py-5 flex-wrap">

<ul className="border-green-600 hover:border-green-400 hover:bg-green-600 group flex-1 sm:flex-none -skew-x-[30deg] transform border mb-4 hover:shadow-xl hover:scale-105 transition-all duration-300">
    <li className="m-4 skew-x-[30deg] transform bg-transparent px-9 py-4 text-center first-letter:uppercase cursor-pointer">
      <b className="block text-lg group-hover:text-white" onClick={() => handleNext(1)}>Padres Listado</b>
    </li>
  </ul>


  <ul className="border-green-600 hover:border-green-400 hover:bg-green-600 group flex-1 sm:flex-none -skew-x-[30deg] transform border mb-4 hover:shadow-xl hover:scale-105 transition-all duration-300">
    <li className="m-4 skew-x-[30deg] transform bg-transparent px-9 py-4 text-center first-letter:uppercase cursor-pointer">
      <b className="block text-lg group-hover:text-white" onClick={() => handleNext(2)}>Madres Listado</b>
    </li>
  </ul>

 
  <ul className="border-green-600 hover:border-green-400 hover:bg-green-600 group flex-1 sm:flex-none -skew-x-[30deg] transform border mb-4 hover:shadow-xl hover:scale-105 transition-all duration-300">
    <li className="m-4 skew-x-[30deg] transform bg-transparent px-9 py-4 text-center first-letter:uppercase cursor-pointer">
      <b className="block text-lg group-hover:text-white" onClick={() => handleNext(3)}>Terneros Listado</b>
    </li>
  </ul>


  <ul className="border-green-600 hover:border-green-400 hover:bg-green-600 group flex-1 sm:flex-none -skew-x-[30deg] transform border mb-4 hover:shadow-xl hover:scale-105 transition-all duration-300">
    <li className="m-4 skew-x-[30deg] transform bg-transparent px-9 py-4 text-center first-letter:uppercase cursor-pointer">
      <b className="block text-lg group-hover:text-white" onClick={() => handleNext(4)}>Evento Listado</b>
    </li>
  </ul>


  <ul className="border-green-600 hover:border-green-400 hover:bg-green-600 group flex-1 sm:flex-none -skew-x-[30deg] transform border mb-4 hover:shadow-xl hover:scale-105 transition-all duration-300">
    <li className="m-4 skew-x-[30deg] transform bg-transparent px-9 py-4 text-center first-letter:uppercase cursor-pointer">
      <b className="block text-lg group-hover:text-white" onClick={() => handleNext(5)}>Tratamiento Listado</b>
    </li>
  </ul>


  <ul className="border-green-600 hover:border-green-400 hover:bg-green-600 group flex-1 sm:flex-none -skew-x-[30deg] transform border mb-4 hover:shadow-xl hover:scale-105 transition-all duration-300">
    <li className="m-4 skew-x-[30deg] transform bg-transparent px-9 py-4 text-center first-letter:uppercase cursor-pointer">
      <b className="block text-lg group-hover:text-white" onClick={() => handleNext(6)}>Tratamiento Ternero Listado</b>
    </li>
  </ul>


  <ul className="border-green-600 hover:border-green-400 hover:bg-green-600 group flex-1 sm:flex-none -skew-x-[30deg] transform border mb-4 hover:shadow-xl hover:scale-105 transition-all duration-300">
    <li className="m-4 skew-x-[30deg] transform bg-transparent px-9 py-4 text-center first-letter:uppercase cursor-pointer">
      <b className="block text-lg group-hover:text-white" onClick={() => handleNext(7)}>Tratamiento Ternero Listado</b>
    </li>
  </ul>
</div>



  )
}

export default ButtonSelectListado