import bcrypt from 'bcrypt';
import connection from '../config/connection.js';


//----------------------------------------------------------------------------------------------------

//update password for tenent:

  //==================================update the password=================================================================

  const TenentUpdatePass = async (req, res) => {
    try {
        const { password, verifyPassword } = req.body;
        const { email } = req.query; // Get email from query parameters
        console.log("userEmailBackend",email);

        // Check if newPassword and confirmPassword match
        if (password !== verifyPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await connection.promise().execute('UPDATE tenent SET  password = ?, firstPassUpdate = ? WHERE admin_email = ?', [hashedPassword, 1, email]);

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { TenentUpdatePass };

//----------------------------------------------------------------------------------------------------

//update password for subscriber:

  //==================================update the password=================================================================

  const SubscriberUpdatePass = async (req, res) => {
    try {
        const { password, verifyPassword } = req.body;
        const { email } = req.query; // Get email from query parameters

        // Check if newPassword and confirmPassword match
        if (password !== verifyPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await connection.promise().execute('UPDATE subscriber SET password = ?, firstPassUpdate = ? WHERE admin_email = ?', [hashedPassword, 1, email]);

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { SubscriberUpdatePass };

