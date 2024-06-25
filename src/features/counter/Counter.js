import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByValue } from './counterSlice';

const Counter=() =>
{
        const count=useSelector( ( state ) => state.counter.count );
        const [ incrementValue, setIncrementValue ]=useState( 0 );
        const addValue=Number( incrementValue )||0;
        const dispatch=useDispatch();

        return (
                <div>
                        <span>{ count }</span>
                        <div className="operations">
                                <button onClick={ () => dispatch( increment() ) }>+</button>
                                <button onClick={ () => dispatch( decrement() ) }>-</button>
                                <input
                                        type="number"
                                        value={ incrementValue }
                                        onChange={ ( e ) => setIncrementValue( Number( e.target.value ) ) }
                                />
                                <button onClick={ () => dispatch( incrementByValue( addValue ) ) }>
                                        Increment by Value
                                </button>
                                <button onClick={ () => dispatch( reset() ) }>Reset</button>
                        </div>
                </div>
        );
};

export default Counter;
