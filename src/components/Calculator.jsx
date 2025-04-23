import React from 'react';
import { useState } from 'react';
import './Calculator.css';


const Calculator = () => {

    const [currentValue, setCurrentValue] = useState("0");
    const [pendingOperation, setPendingOperation] = useState(null);
    const [pedingVlaue, setPendingValue] = useState(null);
    const [completeOperation, setCompleteOperation] = useState("");  

    const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const operations = ["+", "-", "*", "/"]

    const handleClick = (val) => { 
       setCurrentValue((prevValue) => {
            if (prevValue === "0") {
                return val;
            } else {
                return prevValue + val;
            }
       });
      
        setCompleteOperation((prevOperation) => prevOperation + val)
    };

    const handleOperation = (operation) => {
        setCompleteOperation(currentValue + " " + operation);
        setPendingOperation(operation);
        setPendingValue(currentValue);
        setCurrentValue("0");
    }


    const handleClear = () => {
        setCurrentValue("0");
        setPendingOperation(null);
        setPendingValue(null);
        setCompleteOperation("");
    }

    const handleCalculateOperations = () => {
        if(!pendingOperation || !pedingVlaue){
            return;
        }

        const num1 = parseFloat(pedingVlaue);
        const num2 = parseFloat(currentValue);
        let result = 0;

        switch (pendingOperation) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                if(num2 === 0) {
                    alert("Cannot divide by zero");
                    return;
                }
                result = num1 / num2;
                break;
            default:
                return; 
        }
        setCompleteOperation(pedingVlaue + " " + pendingOperation + " " + currentValue + " = " + result);
        setCurrentValue(result.toString());
        setPendingOperation(null);  
        setPendingValue(null);
    } 

    return (
        <div className="calculator" >            
            <div className="complete-operation"> {completeOperation}</div>
            <div className="display">{currentValue}</div>
            <div className="buttons">
                <button onClick={handleClear}>AC</button>
                {keypadNumbers.map((number) => (
                    <button key={number} onClick={() => handleClick(number)}>{number}</button>
                ))}
                {operations.map((operation) => (
                    <button key={operation} onClick={ () => handleOperation(operation)}>{operation}</button>
                ))}
                <button onClick={handleCalculateOperations}>=</button>
            </div>
            

        </div>
    );
};

export default Calculator;