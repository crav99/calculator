import { useReducer, useState } from "react";
import Pantalla from "./Pantalla";
import Digito from "./Digito";
import Operador from "./Operador";
import imagen from "../image/FC_Barcelona.png";

export const acciones = {
    AGREGAR_DIGITO: 'agregar-digito',
    ESCOGER_OPERADOR: 'escoger-operador',
    LIMPIAR: 'limpiar',
    BORRAR_DIGITO: 'borrar-digito',
    EVALUAR: 'evaluar'
}

function reducer(state, { type, payload }) {
    switch(type) {
        case acciones.AGREGAR_DIGITO:
            if(state.overwrite) {
                return {
                    ...state,
                    curr: payload.value,
                    overwrite: false
                }
            }
            if(payload.value == "0" && state.curr == "0") {
                return state;
            }
            if(payload.value == "." && state.curr.includes(".")) {
                return state;
            }
            if(state.curr === "0") {
                return {
                    ...state, curr: payload.value
                }
            }
            return {
                ...state, curr: `${state.curr || ""}${payload.value}`
            }
        case acciones.BORRAR_DIGITO:
            if(state.overwrite) {
                return {
                    ...state,
                    curr: "0",
                    overwrite: false
                }
            }
            if (state.curr.length == 1 || state.curr == "0" ) {
                return {
                    ...state, curr: "0"
                }
            }
            return {
                ...state, curr: state.curr.slice(0, -1)
            }
        case acciones.ESCOGER_OPERADOR:
            if(state.curr == "0" && state.prev == null) {
                return state
            }
            if(state.curr == "0") {
                return state
            }
            if(state.prev == null) {
                return {
                    ...state, op: payload.operador, prev: state.curr, curr: "0"
                }
            }

            return {
                ...state, op: payload.operador, prev: evaluar(state), curr: "0"
            }
        case acciones.EVALUAR:
            if(state.op == null || state.prev == null || state.curr == null) {
                return state
            }
            return {
                ...state, op: null, prev: null, curr: evaluar(state), overwrite: true
            }
        case acciones.LIMPIAR:
            return {
                ...state, op: null, prev: null, curr: "0", overwrite: false
            }
    }
}

function evaluar({ prev, curr, op }) {
    const prevTemp = parseFloat(prev);
    const currTemp = parseFloat(curr);
    if(isNaN(prevTemp) || isNaN(currTemp)) {
        return ""
    }
    let resultado = ""
    switch(op) {
        case '+':
            resultado = prevTemp + currTemp;
            break;
        case '-':
            resultado = prevTemp - currTemp;
            break;
        case 'x':
            resultado = prevTemp * currTemp;
            break;
        case '÷':
            resultado = prevTemp / currTemp;
            break;
    }
    return resultado.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
});

function formatNum(num) {
    if (num == null) {
        return;
    }
    const [integer, decimal] = num.split(".");
    if(decimal == null) {
        return INTEGER_FORMATTER.format(integer);
    }
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function Calculadora() {
    const [{ prev, curr, op }, dispatch] = useReducer(reducer, {curr:"0"})

    return ( 
        <div className="calculadora">
            <img src={imagen} alt="" />
            <Pantalla prev={formatNum(prev)} op={op} curr={curr} />
            <button onClick={() => dispatch({ type: acciones.LIMPIAR })}>ac</button>
            <button onClick={() => dispatch({ type: acciones.BORRAR_DIGITO })}>del</button>
            <Operador operador="÷" dispatch={dispatch} />
            <Operador operador="x" dispatch={dispatch} />
            <Digito value={7} dispatch={dispatch} />
            <Digito value={8} dispatch={dispatch} />
            <Digito value={9} dispatch={dispatch} />
            <Operador operador="+" dispatch={dispatch} />
            <Digito value={4} dispatch={dispatch} />
            <Digito value={5} dispatch={dispatch} />
            <Digito value={6} dispatch={dispatch} />
            <Operador operador="-" dispatch={dispatch} />
            <Digito value={1} dispatch={dispatch} />
            <Digito value={2} dispatch={dispatch} />
            <Digito value={3} dispatch={dispatch} />
            <button className="span-two-ver" onClick={() => dispatch({ type: acciones.EVALUAR })}>=</button>
            <Digito value={0} setClass="span-two-hor" dispatch={dispatch} />
            <Digito value={"."} dispatch={dispatch} />
        </div>
     );
}

export default Calculadora;