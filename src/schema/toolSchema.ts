/* eslint-disable max-len */
import Joi from 'joi';

const toolSchema = Joi.object({
    name: Joi.string().required(),
    link: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string())
});


export default toolSchema;