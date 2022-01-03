import User from '../../models/User'
import connectDb from '../../utils/connectDb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

connectDb()

export default async (req, res) => {
    const { email, password } = req.body
    try {
        //1. validate email/password values
        if (!isLength(password, { min: 6 })) {
            return res.status(422).send('Password must be at least 6 characters long.')
        } else if (!isEmail(email)) {
            return res.status(422).send('Email must be valid.')
        }
        //2. check to see if user exists in db
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(404).send(`No user exists for '${email}'`)
        }
        //3. check to see if password matches
        const passwordMatch = await bcrypt.compare(password, user.password)
        //4. create token for new user
        if (passwordMatch) {
            const token = jwt.sign(
                { userId: user._id }, 
                process.env.JWT_SECRET,
                { expiresIn: '7d'}
            )   
            //5. send back token
            res.status(200).json(token)
        } else {
            res.status(401).send('Passwords do not match.')
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Error logging in.  Please try again later.")
    }
}