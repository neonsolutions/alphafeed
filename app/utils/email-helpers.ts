import sgMail, { MailDataRequired } from "@sendgrid/mail"
import fs from "fs"
import handlebars from "handlebars"

export function sendEmail(
  to: {
    name?: string | undefined
    email: string
  }[],
  subject: string,
  templatePath: string,
  templateData: any,
) {
  fs.readFile(templatePath, "utf8", (err, templateString) => {
    if (err) throw err

    // Compile the template
    const template = handlebars.compile(templateString)

    // Generate HTML using the fetched posts
    const html = template(templateData)

    const message: MailDataRequired = {
      from: {
        email: process.env.EMAIL_FROM!,
        name: "Alpha Feed",
      },
      personalizations: to.map((email) => ({ to: [email] })),
      subject,
      html,
    }

    if (process.env.MOCK) {
      console.log("MOCK MODE: not sending emails")
      return
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    // Send the emails
    sgMail
      .send(message)
      .then(() => console.log("Emails sent successfully"))
      .catch((error) => console.error(error.toString()))
  })
}
