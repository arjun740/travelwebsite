import React from 'react';
import DestinationCard from './DestinationCard';
import classes from './Destionation.module.css'
import EiffelTower from './../assets/EiffelTower.jpg'
import TajMahal from './../assets/tajMahal.jpg'
import Santorini from './../assets/santorini.jpg'
const destinations = [
    {
        name: 'Eiffel Tower',
        image: EiffelTower,
        price: '$20000',
        details: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.'
    },
    {
        name: 'Taj Mahal',
        image: TajMahal,
        price: '$15000',
        details: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra.'
    },
    {
        name: 'Santorini',
        image: Santorini,
        price: '$30000',
        details: "Santorini is a volcanic island in the Cyclades group of the Greek islands. It is famous for its dramatic views, stunning sunsets, white-washed buildings, and crystal-clear waters."
    }
];

const Destination = () => {
    return (
        <div id={"destination"}>
            <div className={classes.destinationcardscontainer}>
                {destinations.map((destination, index) => (
                    <DestinationCard key={index} destination={destination} />
                ))}
            </div>
        </div>
    );
};

export default Destination;
