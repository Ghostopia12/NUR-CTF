import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BuscadorPage from "../pages/BuscadorPage";
import { HOME_URL, LOGIN_URL, DESAFIO_CREATE_URL, REGISTER_URL, TIPO_CREATE_URL, DESAFIO_DETAIL_URL, BUSCADOR_URL, ABOUT_URL, PERFIL_URL, PISTA_CREATE_URL, MARCADOR_URL, DESAFIOS_URL } from "./CONSTANTS";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DesafioFormPage from "../pages/desafio/DesafioFormPage";
import DesafioDetailPage from "../pages/desafio/DesafioDetailPage";
import TipoFormPage from "../pages/TipoFormPage";
import PistaFormPage from "../pages/PistaFormPage";
import MarcadorPage from "../pages/marcador/MarcadorPage";

export const router = createBrowserRouter([
    {
        path: LOGIN_URL,
        element: <LoginPage />,
    },
    {
        path: REGISTER_URL,
        element: <RegisterPage />,
    },
    {
        path: HOME_URL,
        element: <HomePage />,
    },
    {
        path: DESAFIO_CREATE_URL,
        element: <DesafioFormPage />,
    },
    {
        path: '/desafio/editar/:id',
        element: <DesafioFormPage />,
    },
    {
        path: DESAFIO_DETAIL_URL,
        element: <DesafioDetailPage />,
    },
    {
        path: TIPO_CREATE_URL,
        element: <TipoFormPage />,
    },
    {
        path: '/tipo/editar/:id',
        element: <TipoFormPage />,
    },
    {
        path: PISTA_CREATE_URL,
        element: <PistaFormPage />,
    },
    {
        path: '/pista/editar/:id',
        element: <PistaFormPage />,
    },
    {
        path: PERFIL_URL,
        element: <TipoFormPage />,
    },
    {
        path: ABOUT_URL,
        element: <TipoFormPage />,
    },
    {
        path: BUSCADOR_URL,
        element: <BuscadorPage />,
    },



    {
        path: MARCADOR_URL,
        element: <MarcadorPage />,
    },
    {
        path: DESAFIOS_URL,
        element: <DesafioFormPage />,
    }
]);