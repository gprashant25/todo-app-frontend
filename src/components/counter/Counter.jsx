import { useState } from 'react'
import './Counter.css'
import CounterButton from './CounterButton'


export default function Counter() {

    // state features
    //[0,f] // 0 is current value and f is a state sunction ie state[0],state[1]
    // const [firstElement, secondElement] = array
    const [count, setCount] = useState(0);
    
    function incrementCounterParentFunction(by) {
        setCount(count + by)
    }

    function decrementCounterParentFunction(by) {
        setCount(count - by)
    }

    function resetCounter(){
        setCount(0)
    }

    return (

        <>
            <span className="totalCount"> {count} </span>
            <CounterButton by={1} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
            <CounterButton by={2} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction} />
            <CounterButton by={5} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction} />
            <button className="resetButton" onClick={resetCounter}> Reset </button>
        </>
    )

}



