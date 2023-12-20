import { acciones } from "./Calculadora";

function Digito({ value, setClass, dispatch }) {
    return ( 
        <button className={setClass} onClick={() => dispatch({ type: acciones.AGREGAR_DIGITO, payload: { value } })}>{value}</button>
     );
}

export default Digito;