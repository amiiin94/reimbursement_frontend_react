import {useSelector, useDispatch} from "react-redux";
import { increment, decrement, incrementByAmount } from "../../features/counter";
import { useState } from "react";

const NotFound = () => {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    const [data, setData] = useState(0)

    return (
        <>
            <button className="text-4xl mr-4 bg-red-500" onClick={() => dispatch(decrement())}>-</button>
            <label className="text-4xl mr-4 bg-primary-100">{count}</label>
            <button className="text-4xl bg-green-400" onClick={()=> dispatch(increment())}>+</button>
           <input onChange={(e) => setData(e.target.value)}></input>
           <button onClick={()=> dispatch(incrementByAmount(Number(data)))}>Button</button>
        </>
    )
}

export default NotFound