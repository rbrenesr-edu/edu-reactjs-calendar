import { BrowserRouter, HashRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";

export const CalendarApp = () => {
  return (
    <Provider store={store} >


      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      {/** De esta forma, con el HashRouter, contorlamos el despliegue y errores de rura #/auth/login al refrescar la pagina login */}
      {/* <HashRouter>
        <AppRouter />
      </HashRouter> */}
    </Provider>
  );
};
