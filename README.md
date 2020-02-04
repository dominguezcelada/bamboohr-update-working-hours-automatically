# GitHub Actions for BambooHR Working Hours automation
Github Action to interact with BambooHR API to add/modify Working hours of an employee automatically:
- on [push]
- from Monday to Friday at 9am

* `bamboohr-curl.yml`: Call to BambooHR API to update working hours :warning: NOT WORKING
* `bamboohr-puppeteer.yml`: Manual interaction with the site to add today's hours manually (with Puppeteer)

# Setup
Add the following KEY-VALUES as _secrets_ on the repository you plan to run this Github Action:

### For bamboohr-curl.yml
* `BAMBOOHR_API_KEY`: API key to interact with BambooHR API

### For bamboohr-puppeteer.yml
* `COMPANY_BAMBOOHR`: Company subdomain to access your company's BambooHR site: https://<COMPANY_BAMHOOHR>.bamboohr.com
* `USER_BAMBOOHR`: Username to log in into your BambooHR account
* `PASSWORD_BAMBOOHR`:	Password to log in into your BambooHR account
