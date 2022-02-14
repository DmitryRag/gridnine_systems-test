import React from 'react'
import './Sort.css'

export default function Sort({onChange}) {
    return (
        <div className='sort'>
            <h2 className='sort__title'>Сортировать</h2>
            <form className='sort__form' onChange={onChange}>
                <label className='sort__label'><input type='radio' value='1'/>- по возрастанию цены</label>
                <label className='sort__label'><input type='radio' value='2'/>- по убыванию цены</label>
                <label className='sort__label'><input type='radio' value='3'/>- по времени в пути</label>
            </form>
        </div>
    )
}