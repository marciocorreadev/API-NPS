import { Router } from 'express'
import UserController from './controller/UserController'
import SurveysController from './controller/SurveysController'
import SendMailController from './controller/SendMailController'
import AnswerController from './controller/AnswerController'
import NpsController from './controller/NpsController'

const router = Router()
const userController = new UserController()
const surveysController = new SurveysController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NpsController()


router.post('/users', userController.create)

router.post('/surveys', surveysController.create)
router.get('/surveys', surveysController.show)

router.post('/sendMail', sendMailController.execute)

router.get('/answers/:value', answerController.execute)

router.get('/nps/:survey_id', npsController.execute)

export default router