import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'
import SurveysRepository from '../repositories/SurveysRepository'
import SurveysUsersRepository from '../repositories/SurveysUsersRepository'
import SendMailService from '../services/SendMailService'
import { resolve } from 'path';

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body
        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        try {
            const user = await usersRepository.findOne({ email })
            if (!user) response.status(400).json({ error: 'User does not exists' })

            const survey = await surveysRepository.findOne({ id: survey_id })
            if (!survey) response.status(400).json({ error: 'Surveys does not exists' })

            const { name, id: user_id } = user
            const { title, description } = survey
            const link = process.env.URL_MAIL
            const variables = { name, title, description, surveyUsers: null, link }
            const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')
            const sendMail = async () => await SendMailService.execute(email, title, variables, npsPath)

            const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
                where: { user_id, value: null }, relations: ['user', 'survey']
            })
            if (surveyUserAlreadyExists) {
                variables.surveyUsers = surveyUserAlreadyExists.id
                await sendMail()
                return response.status(200).json(surveyUserAlreadyExists)
            }

            const surveyUser = surveysUsersRepository.create({ user_id, survey_id })
            await surveysUsersRepository.save(surveyUser)

            variables.surveyUsers = surveyUser.id
            await sendMail()
            response.status(201).json(surveyUser)
        } catch (error) {
            response.status(500).json({ error })
        }
    }
}

export default SendMailController