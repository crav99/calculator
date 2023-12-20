function Pantalla({ prev, op, curr }) {
    return ( 
        <div className="pantalla">
            <div className="prevOp">
                {prev} {op}
            </div>
            <div className="currOp">
                {curr}
            </div>
        </div>
     );
}

export default Pantalla;