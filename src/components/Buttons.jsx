import App from '../App'

export default function Buttons({ handleNumbers, handleOperators, handleDelete, handleClear, handleEvaluate}) {
    return (
        <div>
            <button id="clear" className="large-btn" onClick={() => handleClear()}>AC</button>
            <button id="delete" value="DEL" onClick={() => handleDelete()}>DEL</button>
            <button id="divide" onClick={() => handleOperators("/")}>/</button>
            <button id="seven" onClick={() => handleNumbers("7")}>7</button>
            <button id="eight" onClick={() => handleNumbers("8")}>8</button>
            <button id="nine" onClick={() => handleNumbers("9")}>9</button>
            <button id="multiply" onClick={() => handleOperators("*")}>*</button>
            <button id="four" onClick={() => handleNumbers("4")}>4</button>
            <button id="five" onClick={() => handleNumbers("5")}>5</button>
            <button id="six" onClick={() => handleNumbers("6")}>6</button>
            <button id="subtract" onClick={() => handleOperators("-")}>-</button>
            <button id="one" onClick={() => handleNumbers("1")}>1</button>
            <button id="two" onClick={() => handleNumbers("2")}>2</button>
            <button id="three" onClick={() => handleNumbers("3")}>3</button>
            <button id="add" onClick={() => handleOperators("+")}>+</button>
            <button id="decimal" onClick={() => handleNumbers(".")}>.</button>
            <button id="zero" onClick={() => handleNumbers("0")}>0</button>
            <button id="equals" className="large-btn" value="=" onClick={() => handleEvaluate()}>=</button>
        </div>
    )
}