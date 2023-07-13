import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessages, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {


    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());

        try {

            //const resp = await calendarApi.post('/auth', { email, password })
            const { data } = await calendarApi.post('/auth', { email, password })
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


console.log(error.response.data);

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

    return {
        status, user, errorMessage,

        startLogin,
        startRegister,
    }
}
