import nodemailer, { Transporter } from 'nodemailer'
import { resolve } from 'path'
import fs from 'fs'
import handlebars from 'handlebars'

class SendMailService {
    private client: Transporter
    constructor() {
        nodemailer.createTestAccount().then(account => {
            const { user, pass, smtp: { host, port, secure } } = account
            this.client = nodemailer.createTransport({ host, port, secure, auth: { user, pass } })
        })
    }

    async execute(to: string, subject: string, variables: object, path: string) {
        const templateFileContent = fs.readFileSync(path).toString("utf8")

        const mailTemplateParse = handlebars.compile(templateFileContent)
        const html = mailTemplateParse(variables)
        const from = 'NPS <noreplay@nps.com.br>'
        const message = await this.client.sendMail({ to, subject, html, from })

        console.log(`Message sent: %s ${message.messageId} \n Preview URL: %s ${nodemailer.getTestMessageUrl(message)}`)
    }
}

export default new SendMailService()