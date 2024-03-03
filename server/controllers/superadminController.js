import db from '../config/connection.js'


//view analytics

// Count students
export const getUsersCount = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS studentCount FROM student';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const studentCount = results[0].studentCount;
            res.status(200).json({ studentCount });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Count tenants
export const getTenantsCount = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS tenantCount FROM tenent';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const tenantCount = results[0].tenantCount;
            res.status(200).json({ tenantCount });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Count subscribers

export const getSubscribersCount = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS subscriberCount FROM subscriber';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const subscriberCount = results[0].subscriberCount;
            res.status(200).json({ subscriberCount });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Count issued certificates
export const getIssuedCertificatesCount = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS IssuedCertCount FROM certificate WHERE status = "verified"';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const IssuedCertCount = results[0].IssuedCertCount;
            res.status(200).json({ IssuedCertCount });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};


// number of requests // skipped to verify requirements 
//number of pending documnets

export const countPendingDocs = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS PendingDocs FROM document WHERE status = "pending"';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const PendingDocsCount = results[0].PendingDocs;
            res.status(200).json({ PendingDocsCount });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};


//number of approved documnets
export const countApprovedDocs = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS ApprovedDocs FROM document WHERE status = "approved"';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const countApprovedDocs = results[0].ApprovedDocs;
            res.status(200).json({ countApprovedDocs });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

//number of rejected documnets
export const countRejectedDocs = async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS RejectedDocs FROM document WHERE status = "rejected"';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            const countRejectedDocs = results[0].RejectedDocs;
            res.status(200).json({ countRejectedDocs });
        });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error' });
    }
};


//create tenent



//receive request and create subscriber

//create subscriber





