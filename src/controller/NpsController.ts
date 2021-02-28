import { Request, Response } from 'express'
import { getCustomRepository, IsNull, Not } from 'typeorm'
import SurveysUsersRepository from '../repositories/SurveysUsersRepository'

class NpsController {
    async execute(request: Request, response: Response) {
        const { params: { survey_id } } = request
        try {
            const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

            const surveysUsers = await surveysUsersRepository.find({ survey_id, value: Not(IsNull()) })
            const detractors = surveysUsers.filter(survey => survey.value < 7).length
            const promoters = surveysUsers.filter(survey => survey.value > 8).length
            const passive = surveysUsers.filter(survey => survey.value == 7 || survey.value == 8).length
            const totalAnswers = surveysUsers.length
            const calculate = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2)) || 0

            return response.status(200).json({ detractors, promoters, passive, totalAnswers, calculate })
        } catch (error) {
            response.status(500).json({ error })
        }
    }
}

export default NpsController