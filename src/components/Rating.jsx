import React, { useState } from 'react'
import './Rating.css'
import { FaStar } from 'react-icons/fa'
import $ from 'jquery'

export default function Rating(props) {

    const [rating, setRating] = useState(props.rating)
    const [hover, setHover] = useState(null)
    const url = 'https://cocktail-warehouse.herokuapp.com/product/'
    const urlLocal = 'http://localhost:5000/product/'
    const id = props.id

    // let sum = rating.reduce((previus, current) => {return current += previus})
    // let avg = sum / rating.length

    if (rating != props.rating) {
        $.ajax({
            url: `${urlLocal}${id}`,
            method: 'put',
            data: { rating },
            succes: res => {
                console.log(res)
            },
            error: res => {
                console.log(res)
            }
        })
    }

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            onClick={() => { setRating(ratingValue) }}
                            value={rating}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                )
            })}
        </div>
    )
}