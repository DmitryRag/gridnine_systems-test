import React from 'react'
import { dates } from '../../date'
import './FlightCard.css'

export default function FlightCard({airline, price, legs}) {
    const time = (min) => ((min / 60) ^ 0) + " ч " + (min % 60) + " мин"
    const transfer = (numberOfTransfers) => {
        switch (+numberOfTransfers) {
            case 1:
                return "пересадка"
            case 2:
            case 3:
            case 4:
                return "пересадки"
            default:
                return "пересадок"
        }
    }

    return (
        <li className='flightcard'>
            <div className='flightcard__wrapper'>
                <div className='flightcard__header'>
                    <p className='flightcard__airline-logo'>{airline.caption}</p>
                    <div className='flightcard__price-wrapper'>
                        <p className='flightcard__price'>{price.amount} ₽</p>
                        <p className='flightcard__price-description'>Стоимость для одного взрослого пассажира</p>
                    </div>
                </div>
                <div className='flightcard__content'>
                    <div className='flightcard__segments'>
                        <p>{legs[0].departureCity.caption}, {legs[0].departureAirport.caption} ({legs[0].departureAirport.uid})</p>
                        <span className='flightcard__segments_arrow'>⟶</span>
                        <p>{legs[0].arrivalCity?.caption}, {legs[0].arrivalAirport?.caption} ({legs[0].arrivalAirport.uid})</p>
                    </div>
                    <div className='flightcard__dates'>
                        <div className='flightcard__date'>
                            <p className='flightcard__date_time'>{dates(legs[0].departureDate).time}</p>
                            <p className='flightcard__date_date'>{dates(legs[0].departureDate).date}</p>
                        </div>
                        <p className='flightcard__date_duration'>{time(legs[0].duration)}</p>
                        <div className='flightcard__date'>
                            <p className='flightcard__date_time'>{dates(legs[0].arrivalDate).time}</p>
                            <p className='flightcard__date_date'>{dates(legs[0].arrivalDate).date}</p>
                        </div>
                    </div>
                    <div className='flightcard__transfer'>
                        {legs[0].numberOfTransfers > 0 && `${legs[0].numberOfTransfers} ${transfer(legs[0].numberOfTransfers)}`}
                    </div>
                    <div className='flightcard__airline'>
                        Рейс выполняет: {legs[0].airline.caption}
                    </div>

                    <div className='flightcard__segments flightcard__segments_last'>
                        <p>{legs[1].departureCity?.caption}, {legs[1].departureAirport?.caption} ({legs[1].departureAirport.uid})</p>
                        <span className='flightcard__segments_arrow'>⟶</span>
                        <p>{legs[1].arrivalCity?.caption}, {legs[1].arrivalAirport?.caption} ({legs[1].arrivalAirport.uid})</p>
                    </div>
                    <div className='flightcard__dates'>
                        <div className='flightcard__date'>
                            <p className='flightcard__date_time'>{dates(legs[1].departureDate).time}</p>
                            <p className='flightcard__date_date'>{dates(legs[1].departureDate).date}</p>
                        </div>
                        <p className='flightcard__date_duration'>{time(legs[1].duration)}</p>
                        <div className='flightcard__date'>
                            <p className='flightcard__date_time'>{dates(legs[1].arrivalDate).time}</p>
                            <p className='flightcard__date_date'>{dates(legs[1].arrivalDate).date}</p>
                        </div>
                    </div>
                    <div className='flightcard__transfer'> 
                        {legs[1].numberOfTransfers > 0 && `${legs[1].numberOfTransfers} ${transfer(legs[1].numberOfTransfers)}`}
                    </div>
                    <div className='flightcard__airline'>
                        Рейс выполняет: {legs[1].airline.caption}
                    </div>
                </div> 
                <button className='flightcard__button'>ВЫБРАТЬ</button>
            </div>
        </li>
    )
}