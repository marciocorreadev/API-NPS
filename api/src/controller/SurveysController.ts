import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import SurveysRepository from '../repositories/SurveysRepository'
import AppError from '../errors/AppErro';

export default class SurveysController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body

        const surveysRepository = getCustomRepository(SurveysRepository)

        try {
            const survey = surveysRepository.create({ title, description })
            await surveysRepository.save(survey)

            response.status(201).json(survey)
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository)

        try {
            const all = await surveysRepository.find()
            response.status(200).json(all)
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }
}
