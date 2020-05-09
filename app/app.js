const puppeteer = require('puppeteer')
const nodemailer = require('nodemailer')
const aws = require('aws-sdk');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']})
  const page = await browser.newPage()
  const transporter = nodemailer.createTransport({
    SES: new aws.SES({
      region: process.env.AWS_REGION ? process.env.AWS_REGION : 'us-east-1',
      apiVersion: '2010-12-01'
    })
  })

  let urls = process.argv.slice(2)
  if (urls.length == 0) {
    if (!process.env.ESPIONAGE_URLS) {
      console.warn(
        'No URLs found. Pass URLs to the script in the format name::path.'
      )
      await browser.close()
      return
    } else {
      urls = process.env.ESPIONAGE_URLS.split(' ')
    }
  }

  let html = ``
  let attachments = []
  for (const url of urls) {
    const [name, path] = url.split('::')
    try {
      await page.goto(path)
      await page.screenshot({path: `screenshots/${name}.jpg`, fullPage: true})
      html += `${name}: <img src="cid:${name}"/>\n\n`
      attachments.push({filename: `${name}.jpg`, path: `screenshots/${name}.jpg`, cid: name})
    } catch(error) {
      console.log(error)
      await browser.close()
      return
    }
  }

  await transporter.sendMail({
    from: process.env.SES_FROM,
    to: process.env.SES_TO,
    subject: process.env.SES_SUBJECT,
    html,
    attachments,
  })

  await browser.close()
})()
