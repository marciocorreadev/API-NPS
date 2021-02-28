import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import SurveysUsersRepository from '../repositories/SurveysUsersRepository'

class AnswerController {
    async execute(request: Request, response: Response) {
        const { params: { value }, query: { s: survey } } = request

        try {
            const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

            const [surveyUser] = await surveysUsersRepository.findByIds([String(survey)])
            if (!surveyUser) response.status(404).json({ error: "Surveys does not exists" })

            surveyUser.value = Number(value)
            await surveysUsersRepository.save(surveyUser)

            response.status(200).json(surveyUser)
        } catch (error) {
            response.status(500).json({ error })
        }
    }
}

export default AnswerController