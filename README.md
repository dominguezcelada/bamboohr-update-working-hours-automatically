# BambooHR Working Hours automation

Automatically add working hours of an employee in [BambooHR](https://www.bamboohr.com/)

## Context test

The [company](https://www.marfeel.com) I'm currently working for requires to fulfill a form every day of the month with the amount of hours worked in BambooHR platform. This is due the [new law](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2019-3481) the Spanish government created a few months ago.
Apparently BambooHR plugin to add Working Hours does not offer settings to automate or add by default values to this form.

I first tried to interact with [BambooHR API](https://documentation.bamboohr.com/docs) but it requires a Private Key which is not possible to be provided by [my current company](https://www.marfeel.com) right now.

That's why I opt for a headless solution to add the manual interaction a user would do so it can be automated.

## Tools/Language/Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions)
  - from Monday to Friday at 8am (GMT)
- [Puppeteer](https://pptr.dev/)

## Project Structure:

- `.github/workflows/bamboohr-puppeteer.yml`: Simulate UI interactions with BambooHR UI through headless browser solution (Puppeteer)
- `src/index.ts`: File run by Puppeteer to interact with BambooHR UI site to finally register Working Hours on _BambooHR's Working Hours Plugin_
- `src/bamboo-hr-interactions/*`: Different interactions taken over BambooHR UI Components with Puppeteer (click, type...)

# Setup

1. [Fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) this repository in your GitHub Account <sup>\*</sup>

2. Add the following KEY-VALUES as [secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets) on the repository you plan to run this Github Action:

   - `COMPANY_BAMBOOHR`: **Company's subdomain** under BambooHR to access your company's BambooHR site: **https://`<COMPANY_BAMHOOHR>`.bamboohr.com**
   - `USER_BAMBOOHR`: BambooHR's **Username** of the employee you want to automate his/her working hours
   - `PASSWORD_BAMBOOHR`: **Password** associated to previous username

3. Wait until next working day (Monday-Friday) at 8AM GTM<sup>\*\*</sup> to get GitHub Action automatically triggered

<sub>
*This tool is in <i>alpha</i> stage so it is not available in Github Marketplace yet. As soon as it is considered as ready to use, it will be published
</sub>

<sub>

\*\*You can find online converters from your local time to GTM. Also, at www.google.com you can just type: "gmt convert" and magic will happen 😎
</sub>
