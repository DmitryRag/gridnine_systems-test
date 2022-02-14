import React from 'react'
import './PriceFilter.css'

export default function PriceFilter({onChange}) {
    return (
        <div>
            <h2 className='pricefilter__title'>Цена</h2>
            <form className='pricefilter__form' onChange={onChange}>
                <label className='pricefilter__label'>От<input className='pricefilter__input' type='number' name='from'/></label>
                <label className='pricefilter__label'>До<input className='pricefilter__input' type='number' name='to'/></label>
            </form>
        </div>
    )
}