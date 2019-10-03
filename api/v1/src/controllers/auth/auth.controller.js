const { sendOne, sendResponse } = require('../../middleware/requests-helpers');
const { User } = require('../../models/user/user');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../../config');

const login = async (req, res, next) => {
    const { body: { email, password } } = req;
    try {
        const user = await User.findOne({ email });

        if (user) {
            const match = await user.comparePassword(password, user.password);

            if (match) {
                jwt.sign({
                    id: user._id,
                    name: user.email
                }, SECRET, { expiresIn: 36000 },
                    (err, token) => {

                        if (err) TE(err);

                        return sendOne(res, {
                            login: match,
                            token: `Bearer ${token}`,
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            fullName: user.firstName + ' ' + user.lastName,
                            email: user.email,
                            mobNo: user.mobNo
                        });
                    }
                );
            } else {
                return sendResponse(res, { message: 'Incorrect Password!! Too many attempts, we are counting it :)' }, 204);
            }
        }
        else
            return sendResponse(res, { status: false, message:'User not registered!'});
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    let {body} = req;
    
    try{
        
        let exists = await User.find({
            email: body.email
        })
        
        if(exists.length) {
            throw new Error('User with this email already exists!');
        }
        
        if(body.password !== body.repeatPassword) {
            throw new Error('Passwords not matching!');
        }
        
        let created = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password
        });

        if(!created) {
            throw new Error('Something went wrong!')
        }

        return res.json({
            status:true,
            message: 'Registered successfully!'
        });

    } catch(err) {
        return next(err, 422);
    }
}

module.exports = { login, register };