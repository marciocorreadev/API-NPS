import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppErro'
import SurveysUsersRepository from '../repositories/SurveysUsersRepository'

export default class AnswerController {
    async execute(request: Request, response: Response) {
        const { params: { value }, query: { s: survey } } = request

        try {
            const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

            const [surveyUser] = await surveysUsersRepository.findByIds([String(survey)])
            if (!surveyUser) throw new AppError('Surveys does not exists');

            surveyUser.value = Number(value)
            await surveysUsersRepository.save(surveyUser)

            response.status(200).json(surveyUser)
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }
}
