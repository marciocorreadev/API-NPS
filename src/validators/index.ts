import * as yup from 'yup'
import User from '../models/User';

function userValidate(user: User) {
    return yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required()
    }).validate(user, { abortEarly: false })
}

export { userValidate }