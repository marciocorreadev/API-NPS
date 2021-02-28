import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { userValidate } from '../validators'
import UsersRepository from '../repositories/UsersRepository'
import User from '../models/User';
import AppError from '../errors/AppErro';
export default class UserController {
    async create(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersRepository)
        const { name, email } = request.body, user = { email, name } as User;

        try {
            await userValidate(user)
        } catch (error) {
            throw new AppError(error.errors);
        }

        try {
            const userAlreadyExists = await usersRepository.findOne({ email })
            if (userAlreadyExists) return response.status(400).json({ message: 'User alteady exists!', email: userAlreadyExists.email })

            const createUser = usersRepository.create(user)
            await usersRepository.save(createUser)

            return response.status(201).json(createUser)
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }
}

