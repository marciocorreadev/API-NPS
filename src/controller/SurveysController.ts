import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import SurveysRepository from '../repositories/SurveysRepository'

class SurveysController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body

        const surveysRepository = getCustomRepository(SurveysRepository)

        try {
            const survey = surveysRepository.create({ title, description })
            await surveysRepository.save(survey)

            response.status(201).json(survey)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository)

        try {
            const all = await surveysRepository.find()
            response.status(200).json(all)
        } catch (error) {
            response.status(500).json(error)
        }
    }
}

export default SurveysController