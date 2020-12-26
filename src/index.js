const puppeteer = require('puppeteer')

const bambooLogin = async (page) => {
  await page.goto(`https://${process.env.COMPANY}.bamboohr.com/login.php`)
  await page.click('.normal-login-link-container')
  await page.type('#lemail', process.env.USER)
  await page.type('input[type="password"]', process.env.PASSWORD)
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('[type="submit"]')
  ])

  return response
}

const addWorkingHoursToDay = async (page) => {
  await page.type('.TimeTrackingWidget__form input', '8')
  await page.click('.js-save-timesheet-button-wrap button')
} 

async function main () {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'google-chrome-unstable',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()
  try {
    const response = await bambooLogin(page)
    console.log(response)

    await addWorkingHoursToDay(page)
    
    browser.close()
  } catch (error) {
    console.error(error)
    process.exit(1);
  }
}

main()
