import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessages, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {


    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());

        try {

            const { data } = await calendarApi.post('/auth', { email, password });
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas.'));

            setTimeout(() => {
                dispatch(clearErrorMessages());
            }, 10);
        }

    }

    const startRegister = async ({ name, email, password }) => {
        dispatch(onChecking());

        try {

            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {

            const message =
                error.response.data?.msg ||
                Object.values(error.response.data?.errores.errors)
                    .map((x) => x.msg)
                    .join();

            dispatch(onLogout(message));

            setTimeout(() => {
                dispatch(clearErrorMessages());
            }, 10);

            /*
                        const { response } = error;
            
                        if (response.data.errores) {
            
                            dispatch(onLogout(response.data.errores.errors[0].msg));
            
                            setTimeout(() => {
                                dispatch(clearErrorMessages());
                            }, 10);
                        } else if (response.data.msg) {
            
                            dispatch(onLogout(response.data.msg));
            
                            setTimeout(() => {
                                dispatch(clearErrorMessages());
                            }, 10);
                        }
            
                        */
        }
    }

    const startLogout = async ({ name, email, password }) => {

        sessionStorage.clear();        
        dispatch(onLogout());
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return dispatch(onLogout());
        }

        try {
            const { data } = await calendarApi.get('auth/renew')
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }

    }

    return {
        status, user, errorMessage,

        startLogin,
        startRegister,
        startLogout,
        checkAuthToken,
    }
}
