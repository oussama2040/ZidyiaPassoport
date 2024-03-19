import React, { useState } from 'react'
import styles from './whyzidyia.module.css'
import axios from 'axios'

const RequestSubscriptionComponent = ({ handleCancelClick }) => {
    const [formData, setFormData] = useState({
        subscriber_email: '',
        subscriber_name: '',
        location: ''
    });
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^\S+@\S+\.\S+$/;
        const locationRegex = /^[a-zA-Z\s]+,\s*[a-zA-Z\s]+$/;

        if (!formData.subscriber_email || !formData.subscriber_name || !formData.location) {
            setError('Please fill in all required fields.');
            return;
        }

        if (!emailRegex.test(formData.subscriber_email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!locationRegex.test(formData.location)) {
            setError('Please enter a location in the format "city, country".');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/subscribe', formData);
            setSuccess("Request Sent!")
            setTimeout(() => {
                setSuccess("")
            }, 3000)
            setFormData({ subscriber_email: '', subscriber_name: '', location: '' });
            console.log('Response:', response);
        } catch (error) {
            console.error('Error:', error);
            setError("Email Already exists.")
            setTimeout(() => {
                setError("")
            }, 3000)
        }
    };
    return (
        <div className={styles.RequestSubscriptionComponent}>
            <button className={styles.cancelSubsc} onClick={handleCancelClick} >X</button>
            <h2>Subscribe to access our Verification Platform</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="email">Your Email</label>
                <input id="email" placeholder="someone@example.com" name="subscriber_email" value={formData.subscriber_email} onChange={handleChange} autoComplete="off" />
                <label htmlFor="name">Your Institution Name</label>
                <input id="name" name="subscriber_name" placeholder="Organozation Name" value={formData.subscriber_name} onChange={handleChange} autoComplete="off" />

                <label htmlFor="location">Your Location</label>
                <input id="location" name="location" placeholder="City, Country" value={formData.location} onChange={handleChange} autoComplete="off" />
                <button type="submit">Submit</button>

                {error && <p className={styles.validationError}>{error}</p>}
                {success && <p className={styles.successCreate}>{success}</p>}
            </form>

        </div>
    )
}

export default RequestSubscriptionComponent