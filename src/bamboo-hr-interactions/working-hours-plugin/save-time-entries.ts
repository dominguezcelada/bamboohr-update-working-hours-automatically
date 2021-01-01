import { Page } from 'puppeteer';

export const saveChanges = async (page: Page) => {
    await page.click('div[role=contentinfo] button:nth-of-type(1)');
};
