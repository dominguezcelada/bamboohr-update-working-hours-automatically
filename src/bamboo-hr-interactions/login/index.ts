import { Page } from "puppeteer";

const checkEnvironmentVariables = () => {
  ["COMPANY", "USER", "PASSWORD"].forEach((envVariable) => {
    if (!process.env[envVariable]) {
      throw new Error(`Environment variable ${envVariable} not defined`);
    }
  });
};

export const login = async (page: Page) => {
  checkEnvironmentVariables();

  await page.goto(`https://${process.env.COMPANY}.bamboohr.com/login.php`);
  await page.click(".normal-login-link-container");
  await page.type("#lemail", process.env.USER as string);
  await page.type('input[type="password"]', process.env.PASSWORD as string);
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('[type="submit"]'),
  ]);

  return response;
};
