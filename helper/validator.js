const Joi = require('joi');

// Login validation
const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), 
    
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

const validateSignin = (req,res,next)=>{
    const {error} = loginSchema.validate(req.body);
    if(error){
        const err = new Error("invalid credentials!!");
        err.statusCode= 400;
        return next(err);
    }
    next();
}

// Sign Up validation
const SignUpSchema = Joi.object({
    firstname: Joi.string()
        .alphanum()
        .required(),

    lastname: Joi.string()
        .alphanum()
        .required(),

    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    age: Joi.number()
        .integer()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })


    const validateSignUp = (req,res,next)=>{
        const {error} = SignUpSchema.validate(req.body);
        if(error){
            const err = new Error("invalid credentials ");
            err.statusCode= 400;
            return next(err);
        }
        next();
    }

module.exports = {
    validateSignin,
    validateSignUp
};