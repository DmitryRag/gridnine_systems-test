import React from 'react'
import FlightCard from '../FlightCard/FlightCard'
import './FlightCards.css'

export default function FlightCards({flights, cards, onClick}) {

    return (
        <div className='flightcards'>
            {flights.length === 0 ? (
                <h2>Нету таких полетов</h2>
            ) : (
                <>
                    <ul className='flightcards__list'>
                        {flights.slice(0, cards).map((flight) => {
                            return <FlightCard {...flight} key={flight.id} />
                        })}
                    </ul>
                    {cards < flights.length - 1 && (
                        <button
                            className='flightcards__button'
                            onClick={onClick}
                        >Показать ещё</button>
                    )}
                </>
            )}
        </div>
    )
}
