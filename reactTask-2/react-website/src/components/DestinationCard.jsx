import React from 'react';
import styles from './DestinationCard.module.css';
import { IoCartOutline } from "react-icons/io5";

const DestinationCard = ({ destination }) => {
    const { name, image, price, details } = destination;
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.image} />
            <div className={styles.cardContent}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.price}>Price: {price}</p>
                <p className={styles.details}>{details}</p>
            </div>
            <div className={styles["button-buy"]}>
            <button>Buy</button>
                <IoCartOutline className={styles.icon} />
            </div>
        </div>
    );
};

export default DestinationCard;
