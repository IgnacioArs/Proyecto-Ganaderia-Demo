import businessApi from '@/api/bussines-api';
import logAuthMethod from '@/utils/logAuth';
import sessionLogOutMethod from '@/utils/sessionLogOut';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';


export const useBussinesMicroservicio = () => {
    
    const dispatch = useDispatch();
    const router = useRouter();
    //SECCION PADRE
    const crearPadreHook = async (objectPadre) => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.post(`/padres/crear-padre`, objectPadre);
            
            return { data, config, headers, status, statusText, request };
        } catch (error) {
                sessionLogOutMethod(dispatch);
                logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };

    const obtenerPadreHook = async () => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.get(`/padres/obtener-listado-padres`);

            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };
     //seccion PADRE

     //seccion MADRE
     const crearMadreHook = async (objectMadre) => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.post(`/madres/crear-madre`, objectMadre);
            
            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };

    const obtenerMadreHook = async () => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.get(`/madres/obtener-listado-madres`);

            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };
    
    //seccion TERNERO
    const crearTerneroHook = async (objectTernero) => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.post(`/terneros/crear-ternero`, objectTernero);
            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };

    const obtenerTerneroHook = async () => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.get(`/terneros/obtener-listado-terneros`);
            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };

    //seccion Ternero


     //seccion EVENTO
      const crearEventoHook = async (objectEvento) => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.post(`/eventos/crear-evento`, objectEvento);
            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };

    const obtenerEventoHook = async () => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.get(`/eventos/obtener-listado-eventos`);
            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };

    //seccion EVENTO 

    //seccion TRATAMIENTO
    const crearTratamientoHook = async (objectTratamiento) => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.post(`/tratamientos/crear-tratamiento`, objectTratamiento);
            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };

    const obtenerTratamientoHook = async () => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.get(`/tratamientos/obtener-listado-tratamientos`);
            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };

    //seccion TRATAMIENTO TERNERO
    const crearTratamientoTerneroHook = async (objectTratamiento) => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.post(`/terneros-tratamientos/crear-tratamiento-ternero`, objectTratamiento);
            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };

    const obtenerTratamientoTerneroHook = async () => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.get(`/terneros-tratamientos/obtener-listado-tratamientos-terneros`);
            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };

    //seccion DIARREA TERNERO
    const crearDiarreTerneroHook = async (objectTratamiento) => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.post(`/diarrea-terneros/crear-diarrea-ternero`, objectTratamiento);
            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };

    const obtenerDiarreaTerneroHook = async () => {
      
        try {
            const { data, config, headers, status, statusText, request } = await businessApi.get(`/diarrea-terneros/obtener-listado-diarrea-terneros`);
            return { data, config, headers, status, statusText, request };
        } catch (error) {
            sessionLogOutMethod(dispatch);
            logAuthMethod(dispatch, router);
            return error.response.status;
        }
    };


    return { 
        //seccion PADRES
        crearPadreHook,
        obtenerPadreHook, 
        //seccion MADRES
        crearMadreHook,
        obtenerMadreHook,
        //seccion TERNERO
        crearTerneroHook,
        obtenerTerneroHook,
        //seccion EVENTO
        crearEventoHook,
        obtenerEventoHook,
        //seccion TRATAMIENTO
        crearTratamientoHook,
        obtenerTratamientoHook,
        // seccion  TRATAMIENTO TERNERO
        crearTratamientoTerneroHook,
        obtenerTratamientoTerneroHook,
         // seccion  DIARREA TERNERO
        crearDiarreTerneroHook,
        obtenerDiarreaTerneroHook


    };
};