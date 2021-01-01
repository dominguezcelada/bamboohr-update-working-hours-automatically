const puppeteer = require("puppeteer");

const bambooLogin = async (page) => {
  await page.goto(`https://${process.env.COMPANY}.bamboohr.com/login.php`);
  await page.click(".normal-login-link-container");
  await page.type("#lemail", process.env.USER);
  await page.type('input[type="password"]', process.env.PASSWORD);
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('[type="submit"]'),
  ]);

  return response;
};

const openWorkingHoursForm = async (page) => {
  await page.click(".TimeTrackingWidget button");
};

const applyPostMeridiumInField = async (page, selector, menuId) => {
  await page.click(
    `.AddEditEntry__clocks:last-child .ClockField:nth-of-type(${selector}) [role]`
  );
  await page.click(
    `[data-menu-id="fab-menu${menuId}"].fab-MenuVessel .fab-MenuOption:nth-child(2)`
  );
};

const addWorkingHoursToDay = async (page, startTime, endTime) => {
  [
    { ...startTime, childSelector: 1 },
    { ...endTime, childSelector: 2 },
  ].forEach(async ({ time, childSelector, isPostMeridium, menuId }) => {
    await page.type(
      `.AddEditEntry__clocks:last-child .ClockField:nth-of-type(${childSelector}) input`,
      time
    );
    console.log(`Added Working Hour: ${time} Successfuly`)
    
    if (isPostMeridium) {
      await applyPostMeridiumInField(page, childSelector, menuId);
      console.log(`Applied PM to ${time} Successfuly`)
    }
  });
};

const addNewTimeEntry = async (page) => {
  await page.click(".AddEditEntry__addEntryLink");
};

const saveChanges = async (page) => {
  await page.click("div[role=contentinfo] button:nth-of-type(1)");
};

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "google-chrome-unstable",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  try {
    await bambooLogin(page);

    console.log('Logged In Successfuly')
    
    await openWorkingHoursForm(page);
    
    console.log('Opened Working Hours Modal Successfuly')

    await addWorkingHoursToDay(
      page,
      {
        time: "9",
        menuId: "2",
      },
      {
        time: "2",
        menuId: "4",
        isPostMeridium: true,
      }
    );

    console.log('Added Working Hours (morning) Successfuly')

    // await addNewTimeEntry(page);

    // await addWorkingHoursToDay(
    //   page,
    //   {
    //     time: "3",
    //     isPostMeridium: true,
    //     menuId: "8",
    //   },
    //   {
    //     time: "6",
    //     isPostMeridium: true,
    //     menuId: "10",
    //   }
    // );

    await saveChanges(page);

    console.log('Added Working Hours (morning) Successfuly')

    browser.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
