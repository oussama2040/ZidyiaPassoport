import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import connection from '../config/connection.js';
import jwt from 'jsonwebtoken';

// login student
const loginStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const [studentRows] = await connection.promise().execute('SELECT * FROM student WHERE email = ? ', [email]);

    // Check if the user exists
    if (studentRows.length > 0) {
        const student = studentRows[0]; // Assuming there's only one user per email

        // Verify password and status
        const passwordMatch = await bcrypt.compare(password, student.password); // comparing plaintext password with hashed password
        const status = student.status;

        if (passwordMatch && status == 1) {
            // Generate access token and refresh token for the student
            const accessToken = jwt.sign({
                student: {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email,
                    id: student.student_id,
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3m" });

            const refreshToken = jwt.sign({
                student: {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email,
                    id: student.student_id,
                }
            }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })

            // Save the refresh token and the access token in a secure cookie
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: true});
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days in milliseconds

            res.status(200).json({
                student: {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email,
                    id: student.student_id,
                },
                success: true,
                message: "Login successful!"
            });
        } else {
            res.status(401);
            throw new Error("Email or password is not valid!");
        }
    } else {
        res.status(401);
        throw new Error("User not found!");
    }
});

export { loginStudent };
