import { useEffect, useState } from 'react'
import Buttons from './components/Buttons'
import Formula from './components/Formula'
import Output from './components/Output'
import './App.css'

export default function App(){
  const [currVal, setCurrVal] = useState("0");
  const [operator, setOperator] = useState("");
  const [formula, setFormula] = useState("");
  const [overwrite, setOverwrite] = useState(false);

  function handleNumbers(value){
    if (overwrite){
      setCurrVal(value);
      setOperator("");
      setFormula(value);
      setOverwrite(false);
    } else{
      if (currVal === "0" && value === "0") return;
      if (currVal === "0" && value === "." && !formula){
        setCurrVal(currVal + value);
        setFormula(formula + currVal + value);
      } else if (currVal === "0" && value === "." && formula){
        setCurrVal(currVal + value);
        setFormula(formula + value);
      } else if (/[+\-*/]/.test(currVal) && value === "." && formula){
        setCurrVal("0" + value);
        setFormula(formula + "0" + value);
      } else if (currVal.includes(".") && value === "."){
        return;
      } else if (currVal === "0" && value !== "0"){
        setCurrVal(value);
        setFormula(formula.slice(0,-1) + value);
      } else if (/[+\-*/]/.test(currVal) && value !== "."){
        setCurrVal(value);
        setFormula(formula + value);
      } else{
        setCurrVal(currVal + value);
        setFormula(formula + value);
      }
    }
  }
  
  function handleOperators(value){
    if (overwrite){
      setOverwrite(false);
    }
    if (/[+\-*/]/.test(currVal)){
      if (currVal !== "-" && value === "-"){
        setOperator(currVal + value);
        setFormula(formula + value);
        setCurrVal(value);
      } else if (/(\*-|\+-|\/-)/.test(operator)){
        setOperator(value);
        setFormula(formula.slice(0,-2) + value);
        setCurrVal(value);
      } else{
        setOperator(value);
        setFormula(formula.slice(0,-1) + value);
        setCurrVal(value);
      }
    } else if (currVal && !formula) {
      setFormula(currVal + value);
      setOperator(value);
      setCurrVal(value);
    } else {
      setOperator(value);
      setFormula(formula + value);
      setCurrVal(value);
    }
  }
  
  useEffect(() => {
    console.log(`currval: ${currVal}`)
  }, [currVal])
  useEffect(() => {
    console.log(`operator: ${operator}`)
  }, [operator])
  useEffect(() => {
    console.log(`formula: ${formula}`)
  }, [formula])
  
  function handleDelete(){
    if (overwrite){
      setCurrVal("0");
      setOperator("");
      setFormula("");
      setOverwrite(false);
    } else{
      if (currVal === "0"){
        return;
      } else if (currVal.length === 1 && currVal !== "0" && !/[+\-*/]/.test(currVal)){
        setCurrVal("0");
        setFormula(formula.slice(0,-1) + "0");
      } else if (currVal.length === 1 && /[+\-*/]/.test(currVal)){
        setCurrVal("0");
        setFormula(formula + "0");
      } else{
        setCurrVal(currVal.slice(0,-1));
        setFormula(formula.slice(0,-1));
      }
    }
  }

  function handleClear(){
    setCurrVal("0");
    setOperator("");
    setFormula("");
    setOverwrite(false);
  }

  function handleEvaluate(){
    setOverwrite(true);
    if (/^[*/]/.test(formula)){
      setCurrVal(String(eval(formula.slice(1))));
      setFormula("");
      setOperator("");
    } else if (/\d$/.test(formula)){
      setCurrVal(String(eval(formula)));
      setFormula("");
      setOperator("")
    } else{
      setCurrVal(String(eval(formula.slice(0,-1))));
      setFormula("");
      setOperator("");
    }
  }
  
  return (
    <>
      <div className="calculator">
        <Formula formula={formula}/>
        <Output currVal={currVal}/>
        <Buttons 
        handleNumbers={handleNumbers}
        handleOperators={handleOperators}
        handleDelete={handleDelete}
        handleClear={handleClear}
        handleEvaluate={handleEvaluate}
        />
      </div>
    </>
  )
}