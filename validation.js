import Joi from 'joi';

const registerValidations = (user) => {
    const schema = Joi.object().keys ({
        email: Joi.string().required().email(),
        names: Joi.string().required(),
        password: Joi.string().required().min(6)
    })

    return schema.validate(user)
};

const loginValidations = (user) => {
    const schema = Joi.object().keys ({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    })

    return schema.validate(user)

}
const changeRoleValidations = (user) => {
    const schema = Joi.object().keys ({
        role: Joi.string().required(),
    })
    return schema.validate(user);
}
const changeStatusValidations = (user) => {
    const schema = Joi.object().keys ({
        status: Joi.string().required(),
    })
    return schema.validate(user);
}
export default{ registerValidations , loginValidations, changeRoleValidations, changeStatusValidations};