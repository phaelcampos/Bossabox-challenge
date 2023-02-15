/* eslint-disable max-len */
import Joi from 'joi';

const userSchema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password'),
});


export default userSchema;