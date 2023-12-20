import { acciones } from "./Calculadora";

function Operador({ operador, dispatch }) {
    return ( 
        <button onClick={() => dispatch({ type: acciones.ESCOGER_OPERADOR, payload: { operador } })}>{operador}</button>
     );
}

export default Operador;