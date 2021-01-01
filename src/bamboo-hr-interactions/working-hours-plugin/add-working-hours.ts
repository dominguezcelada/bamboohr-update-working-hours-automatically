import { Page } from 'puppeteer';

interface TimeInfo {
    time: string;
    isPostMeridium?: boolean;
}

const applyPostMeridiumInField = async (page: Page, childNumber: number) => {
    await page.click(`.AddEditEntry__clocks:last-child .ClockField:nth-of-type(${childNumber}) [role]`);
    await page.click('.fab-MenuOption:nth-of-type(2)');
};

export const addWorkingHoursToday = async (page: Page, startTime: TimeInfo, endTime: TimeInfo) => {
    await page.type('.AddEditEntry__clocks:last-child .ClockField:nth-of-type(1) input', startTime.time);
    console.log(`✔️ Added Working Hour: ${startTime.time}`);

    if (startTime.isPostMeridium) {
        await applyPostMeridiumInField(page, 1);
        console.log(`✔️ Applied PM to ${startTime.time}`);
    }

    await page.type('.AddEditEntry__clocks:last-child .ClockField:nth-of-type(2) input', endTime.time);
    console.log(`✔️ Added Working Hour: ${endTime.time}`);

    if (endTime.isPostMeridium) {
        await applyPostMeridiumInField(page, 2);
        console.log(`✔️ Applied PM to ${endTime.time}`);
    }
};
