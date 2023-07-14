export const getEnvVariables = () => {

    //* En caso de error al procesar vite build
    //import.meta.env;

    return {
        //...import.meta.env
        VITE_API_URL: import.meta.env.VITE_API_URL,
    }
}