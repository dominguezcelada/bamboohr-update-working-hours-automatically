import { Page } from "puppeteer";

export const addWorkingHoursEntry = async (page: Page) => {
  await page.click(".AddEditEntry__addEntryLink");
};
