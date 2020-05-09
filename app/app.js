const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']})
  const page = await browser.newPage()

  const urls = process.argv.slice(2)

  if (urls.length == 0) {
    console.warn(
      'No URLs found. Pass URLs to the script in the format name::path.'
    )
  }

  for (const url of urls) {
    const [name, path] = url.split('::')
    try {
      await page.goto(path)
      await page.screenshot({path: `screenshots/${name}.jpg`, fullPage: true})
    } catch(error) {
      console.log(error)
    } finally {
    }
  }

  await browser.close()
})()
