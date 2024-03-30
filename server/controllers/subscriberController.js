import connection from '../config/connection.js';



//request subscribtion by anonymous
export const RequestSubscription = async (req, res) => {
    try {
        const { subscriber_email, subscriber_name, location } = req.body;

        const emailExistsQuery = 'SELECT * FROM subscriber WHERE admin_email = ?';
        connection.query(emailExistsQuery, [subscriber_email], async (selectError, selectResults) => {
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
                connection.query(query, [subscriber_email, subscriber_name, location], (insertError, insertResults) => {
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


export const GetSubscriberinfo = async (req, res) => {
    try {
        const subscriberName = req.subscriber.subscribername;
        const subscriberID = req.subscriber.subscriberid;

        const [rows] = await connection.promise().execute(
            'SELECT expiry_date  FROM subscriber WHERE subscriber_id = ?',
            [subscriberID] 
        );

        if (rows.length > 0) {
            const  expirydate  = rows[0].expiry_date;
            res.status(200).json({
                message: "Subscription request added successfully",
                subscriberName: subscriberName,
                expiryDate: expirydate
            });
        } else {
            res.status(404).json({ error: 'Subscriber info not found' });
        }
    } catch (error) {
        console.error('Error retrieving subscriber info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


