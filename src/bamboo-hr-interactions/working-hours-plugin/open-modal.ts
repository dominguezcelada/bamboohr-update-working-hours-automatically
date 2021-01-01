import { Page } from 'puppeteer';

export const openWorkingHoursForm = async (page: Page) => {
    await page.click('.TimeTrackingWidget button');
};
