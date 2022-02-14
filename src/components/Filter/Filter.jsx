import React from 'react'
import './Filter.css'

export default function Filter({onChange}) {
    return (
        <div>
            <h2 className='filter__title'>Фильтровать</h2>
            <form className='filter__form' onChange={onChange}>
                <label><input type='checkbox' value='oneTransfer'/>- 1 пересадка</label>
                <label><input type='checkbox' value='noTransfer'/>- без пересадок</label>
            </form>
        </div>
    )
}