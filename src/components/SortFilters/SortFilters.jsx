import React from 'react'
import Sort from '../Sort/Sort'
import Filter from '../Filter/Filter'
import PriceFilter from '../PriceFilter/PriceFilter'
import AirlineSort from '../AirlineSort/AirlineSort'
import './SortFilters.css'

export default function SortFilters({airlineSort, filterParams, setFilterParams}) {
    const onChangeFilter = ({target}) => {
        const {checked, value} = target
        setFilterParams({
            ...filterParams,
            transferAmount: {
                ...filterParams.transferAmount,
                [value]: checked,
            }
        })
    }

    const onChangePrice = ({target}) => {
        const {name, value} = target
        setFilterParams({
            ...filterParams,
            price: {
                ...filterParams.price,
                [name]: +value,
            },
        })
    }

    const onChangeAirline = ({target}) => {
        const {checked, value} = target
        let newAirlines
        if (checked) {
            newAirlines = [...filterParams.airlines, value]
        } else {
            newAirlines = filterParams.airlines.filter(
                (airline) => airline !== value
            )
        }
        setFilterParams({
            ...filterParams,
            airlines: newAirlines,
        })
    }

    return (
        <aside className='sortfilters'>
            <Sort 
                onChange={(e) => {setFilterParams({ ...filterParams, sortType: +e.target.value })}}
            />
            <Filter
                onChange={onChangeFilter}
            />
            <PriceFilter
                onChange={onChangePrice}
            />
            <AirlineSort
                onChange={onChangeAirline}
                airlineSort={airlineSort}
            />
        </aside>
    )
}