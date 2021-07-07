import React from 'react';
import UpdateCard from '../components/UpdateCard.jsx'

export default function UpdateCocktail(props) {
    return (
        <UpdateCard id={props.location.data[0]} name={props.location.data[1]} ingredients={props.location.data[2]} description={props.location.data[3]} picture={props.location.data[4]}/>
    );
}