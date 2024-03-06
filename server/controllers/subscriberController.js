import db from '../config/connection.js'


//request subscribtion by anonymous
export const RequestSubscription = async (req, res) => {
    try {
        const { email, name, location } = req.body;

        const emailExistsQuery = 'SELECT * FROM subscriber WHERE admin_email = ?';
        db.query(emailExistsQuery, [email], async (selectError, selectResults) => {
            if (selectError) {
                console.error('Error querying database:', selectError);
                return res.status(500).json({ error: 'Database error' });
            }
            //email exists
            if (selectResults.length > 0) {

                return res.status(400).json({ error: 'Email already exists in subscriber table' });
            } else {
                // add request
                const query = 'INSERT INTO subscriptionrequest (subscriber_email, subscriber_name, location) VALUES (?, ?, ?)';
                db.query(query, [email, name, location], (insertError, insertResults) => {
                    if (insertError) {
                        console.error('Error inserting subscription request into database:', insertError);
                        return res.status(500).json({ error: 'Database error' });
                    }

                    res.status(200).json({
                        message: "Subscription request added successfully", insertResults
                    });
                });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};




//access verification platform
//scan qrcode and receive verified certificate
//update profile(pass)