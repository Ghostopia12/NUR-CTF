import React from 'react'
import './style/style.css'
import Menu from "../../components/Menu";

export const AboutPage = () => {
    const flag_format = "NURCTF{TEXTO EN MAYUSCULA SIN ACENTOS Y CON ESPACIOS}";
  return (
       <>
       <Menu />
        <div class="container">
            <div>
                <div>
                    <h1 class="title"> About </h1>
                </div>
            </div>
            <div>
                <div>
                    <h3> NurCTF o Capture de Flag</h3>
                    <p>Un NurCTF (Capture The Flag) en Español, «Captura la bandera». Son competiciones gratuitas que nos
                        permiten poner a prueba nuestras habilidades sobre hacking por medio de retos de diferentes
                        modalidades que tendremos que resolver para conseguir el premio, la famosa «flag».</p>
                </div>
            </div>
            <div>
                <div>
                    <h2>Formato de la flag:</h2>
                    <p>La flag tendrá el siguiente formato:
                    </p>
                    <h3>{flag_format}</h3>
                </div>
            </div>
            <footer class="footer">
                <div class="container text-center">
                        <small class="text-muted">Hecho por estudiantes de Auditoria de Sistemas</small>
                </div>
            </footer>
        </div>
       </>
  )
}
export default AboutPage;