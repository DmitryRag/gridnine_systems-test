import React, { useState, useMemo } from 'react'
import './App.css'
import FlightCards from '../FlightCards/FlightCards'
import SortFilters from '../SortFilters/SortFilters'

export default function App({flightsData}) {
    
    const getFlights = (flightsData) => {
        return flightsData.result.flights.map(({flight, flightToken}) => {
            return {id: flightToken, ...flight}
        })
    }

    const getFlightsForCards = (flightsData) => {
        const flights = getFlights(flightsData)
        return flights.map(({carrier, legs, price, id}) => {
            const {total} = price
            const filteredLegs = legs.map(({duration, segments}) => {
                const startSegment = segments[0]
                let correctAirline = startSegment.operatingAirline || startSegment.airline
                if (segments.length > 1) {
                    const endSegment = segments[segments.length - 1]
                    return {
                        numberOfTransfers: segments.length - 1,
                        duration,
                        airline: correctAirline,
                        departureAirport: startSegment.departureAirport,
                        departureCity: startSegment.departureCity,
                        departureDate: startSegment.departureDate,
                        arrivalAirport: endSegment.arrivalAirport,
                        arrivalCity: endSegment.arrivalCity,
                        arrivalDate: endSegment.arrivalDate
                    }
                } 
                return {
                    numberOfTransfers: 0,
                    duration,
                    airline: correctAirline,
                    arrivalAirport: startSegment.arrivalAirport,
                    arrivalCity: startSegment.arrivalCity,
                    arrivalDate: startSegment.arrivalDate,
                    departureAirport: startSegment.departureAirport,
                    departureCity: startSegment.departureCity,
                    departureDate: startSegment.departureDate
                }
            })
            return {
                airline: filteredLegs[0].airline,
                carrier,
                legs: filteredLegs,
                price: {...total},
                id
            }
        })
    }

    const [flights, setFlights] = useState(getFlightsForCards(flightsData))
    const [cards, setCards] = useState(2)
    const [filteredFlights, setFilteredFlights] = useState(flights)
    const [filterParams, setFilterParams] = useState({
        sortType: -1,
        transferAmount: {
            oneTransfer: false,
            noTransfer: false
        },
        price: {
            from: '',
            to: ''
        },
        airlines: [],
    })

    const sortFlights = (flights, sortType) => {
        let sortFunction
        switch (+sortType) {
            case 1:
                sortFunction = (a, b) => +a.price.amount - +b.price.amount
                break
            case 2:
                sortFunction = (a, b) => +b.price.amount - +a.price.amount
                break
            case 3:
                sortFunction = (a, b) => {
                    const aDuration = a.legs.reduce(
                        (prev, curr) => prev.duration + curr.duration
                    )
                    const bDuration = b.legs.reduce(
                        (prev, curr) => prev.duration + curr.duration
                    )
                    return aDuration - bDuration
                }
                break
    
            default:
                return flights
        }
        const flightsCopy = [...flights]
        return flightsCopy.sort(sortFunction)
    }

    const priceFilter = (flights, priceFrom, priceTo) => {
        let sortedFlights
        for (let i = 0; i < flights.length; i++) {
            if (priceFrom === "" || priceFrom === 0) {
                sortedFlights = flights
                break
            }
            const { price } = flights[i]
            if (priceFrom <= +price.amount) {
                sortedFlights = flights.slice(i)
                break
            }
        }
        for (let i = 0; i < sortedFlights.length; i++) {
            if (priceTo === "" || priceTo === 0) {
                break
            }
            const { price } = sortedFlights[i]
            if (priceTo <= +price.amount) {
                sortedFlights = sortedFlights.slice(0, i)
                break
            }
        }
        return sortedFlights
    }

    const filterTransfers = (flights, transfersFlags) => {
        const {noTransfer, oneTransfer} = transfersFlags    
        if (noTransfer === oneTransfer) return flights
        if (noTransfer) {
            return flights.filter((flight) => {
                const [first, second] = flight.legs
                return first.numberOfTransfers + second.numberOfTransfers === 0
            })
        }
        if (oneTransfer) {
            return flights.filter((flight) => {
                const [first, second] = flight.legs
                return ((first.numberOfTransfers === 1 && second.numberOfTransfers) === 1)
            })
        }
    }

    const airlinesSort = (flights, airlines) => {
        if (airlines.length === 0) return flights
        return flights.filter(({ airline }) =>
            airlines.includes(airline.caption)
        )
    }

    const airlinesList = (flightsAirline) => {
        const flights = flightsAirline.map(({airline, price}) => ({
            name: airline.caption,
            price: +price.amount,
        }))
        const airlinesNames = flightsAirline.map(({airline}) => airline.caption)
        const uniqueAirlinesNames = [...new Set(airlinesNames)]
        return uniqueAirlinesNames.map((uniqueName) => {
            const oneNameAirlines = flights.filter(
                ({name}) => name === uniqueName
            )
            return oneNameAirlines.sort((a, b) => a.price - b.price)[0]
        })
    }

    const onChangeFilter = () => {
        const {sortType, transferAmount, price, airlines} = filterParams
        let flightsSorted = sortFlights(flights, sortType)
        let filteredFromTo = flightsSorted
        if (price.from !== '' || price.to !== '' || price.from !== 0 || price.to !== 0) {
            switch (sortType) {
                case 2:
                    filteredFromTo = priceFilter(
                        flightsSorted.reverse(),
                        price.from,
                        price.to
                    ).reverse()
                    break
                case 3:
                    filteredFromTo = priceFilter(
                        flightsSorted,
                        price.from,
                        price.to
                    )
                    break
                default:
                    flightsSorted = sortFlights(flights, 1)
                    filteredFromTo = priceFilter(
                        flightsSorted,
                        price.from,
                        price.to
                    )
                    break
            }
        }
        const filteredFl = filterTransfers(
            filteredFromTo,
            transferAmount
        )
        const filteredByAirline = airlinesSort(filteredFl, airlines)
        setFilteredFlights(filteredByAirline)
    }

    React.useEffect(() => {
        onChangeFilter()
    }, [filterParams])

    const airlineSort = useMemo(
        () => airlinesList(flights),
        [flightsData]
    )

    return (
        <div className='app'>
            <SortFilters
                filterParams={filterParams}
                setFilterParams={setFilterParams}
                airlineSort={airlineSort}
            />
            <FlightCards
                flights={filteredFlights}
                cards={cards}
                onClick={() => setCards(cards + 2)}
            />
        </div>
    )
}
