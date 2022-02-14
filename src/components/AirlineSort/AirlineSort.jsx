import React from 'react'
import './AirlineSort.css'

export default function AirlineSort({onChange, airlineSort}) {

    return (
        <div className='airlinesort'>
            <h2 className='airlinesort__title'>Авиакомпании</h2>
            <form className='airlinesort__form' onChange={onChange}>
                {airlineSort.map(({name, price}) => { 
                    return (
                        <label className='airlinesort__label'>
                            <input type='checkbox' value={name}/>
                            <p className='airlinesort__name'>{name}</p>
                            <span>от {price}р.</span>
                        </label>
                    )
                })} 
            </form>
        </div>
    )
}