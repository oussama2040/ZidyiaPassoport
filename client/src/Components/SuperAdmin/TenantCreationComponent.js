import React, { useState } from 'react';
import axios from 'axios';
import styles from './superAdmin.module.css';

const TenantCreationContainer = () => {
    const [formData, setFormData] = useState({
        admin_email: '',
        name: '',
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

        if (!formData.admin_email || !formData.name || !formData.location) {
            setError('Please fill in all required fields.');
            return;
        }

        if (!emailRegex.test(formData.admin_email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!locationRegex.test(formData.location)) {
            setError('Please enter a location in the format "city, country".');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/superadmin/create-tenant', formData);
            setSuccess("Tenant has been created successfully")
            setTimeout(()=> {
                setSuccess("")
            }, 3000)
            setFormData({ admin_email: '', name: '', location: '' });
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
        <div className={styles.TenantCreationContainer}>
            <h2>Create Tenant</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="email">Tenant Email</label>
                <input id="email" placeholder="someone@example.com" name="admin_email" value={formData.admin_email} onChange={handleChange} autoComplete="off" />
                <label htmlFor="name">Tenant Name</label>
                <input id="name" name="name" placeholder="Tenant Name" value={formData.name} onChange={handleChange} autoComplete="off" />

                <label htmlFor="location">Tenant Location</label>
                <input id="location" name="location" placeholder="City, Country" value={formData.location} onChange={handleChange} autoComplete="off" />
                <button type="submit">Submit</button>
                {error && <p className={styles.validationError}>{error}</p>}
                {success && <p className={styles.successCreate}>{success}</p>}
            </form>

        </div>
    );
};

export default TenantCreationContainer;
