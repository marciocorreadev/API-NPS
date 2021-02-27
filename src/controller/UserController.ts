import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'

class UserController {
    async create(req: Request, res: Response) {
        const usersRepository = getCustomRepository(UsersRepository)
        const { name, email } = req.body

        try {
            const userAlreadyExists = await usersRepository.findOne({ email })
            if (userAlreadyExists) return res.status(400).json({
                message: 'User alteady exists!',
                email: userAlreadyExists.email
            })

            const user = usersRepository.create({ name, email })
            await usersRepository.save(user)

            return res.status(201).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default UserController
