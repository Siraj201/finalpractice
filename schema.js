import Joi from "joi";

const validateschema = Joi.object({
    listing: Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().required(),
        price:Joi.number().required(),
        country:Joi.string().required(),
        location:Joi.string().required(),
        category:Joi.string().required(),  
}).required()
})

const validatereview=Joi.object({
    review:Joi.object({
        rating:Joi.number().min(1).max(5).required(),
        comment:Joi.string().required()
    }).required()
})
export {validateschema,validatereview};
