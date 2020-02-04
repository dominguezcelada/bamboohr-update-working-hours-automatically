# GitHub Actions for BambooHR Working Hours automation
Github Action to interact with BambooHR API to add/modify Working hours of an employee automatically:
- on [push]
- from Monday to Friday at 9am

### Actions:
* `bamboohr-curl.yml`: Call to BambooHR API to update working hours :warning: NOT WORKING
* `bamboohr-puppeteer.yml`: Manual interaction with the site to add today's hours manually (with Puppeteer)

# Setup
Add the following KEY-VALUES as [I'm an inline-style link](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)secrets on the repository you plan to run this Github Action:

### For bamboohr-curl.yml
* `BAMBOOHR_API_KEY`: API key to interact with BambooHR API

### For bamboohr-puppeteer.yml
* `COMPANY_BAMBOOHR`: Company subdomain to access your company's BambooHR site: https://<COMPANY_BAMHOOHR>.bamboohr.com
* `USER_BAMBOOHR`: Username to log in into your BambooHR account
* `PASSWORD_BAMBOOHR`:	Password to log in into your BambooHR account
