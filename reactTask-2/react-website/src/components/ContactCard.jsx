import React from 'react';
import styles from './ContactCard.module.css';
const ContactCard = () => {
    return (
        <div className={styles.contactContainer}>
            <div className={styles.contactCard}>
                <h2>Contact Us</h2>
                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" placeholder="Enter your message"></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ContactCard;
