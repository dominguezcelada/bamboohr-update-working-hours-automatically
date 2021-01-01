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
  await page.click(".fab-MenuOption:nth-of-type(2)");
};

const addWorkingHoursToDay = async (page, startTime, endTime) => {
  await page.type(
    ".AddEditEntry__clocks:last-child .ClockField:nth-of-type(1) input",
    startTime.time
  );
  console.log(`Added Working Hour: ${startTime.time} Successfuly`);

  if (startTime.isPostMeridium) {
    await applyPostMeridiumInField(page, 1, startTime.menuId);
    console.log(`Applied PM to ${startTime.time} Successfuly`);
  }

  await page.type(
    ".AddEditEntry__clocks:last-child .ClockField:nth-of-type(2) input",
    endTime.time
  );
  console.log(`Added Working Hour: ${endTime.time} Successfuly`);

  if (endTime.isPostMeridium) {
    await applyPostMeridiumInField(page, 2, endTime.menuId);
    console.log(`Applied PM to ${endTime.time} Successfuly`);
  }
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

    console.log("Logged In Successfuly");

    await openWorkingHoursForm(page);

    console.log("Opened Working Hours Modal Successfuly");

    await addWorkingHoursToDay(
      page,
      {
        time: "9",
        menuId: "2",
      },
      {
        time: "2",
        menuId: "4",
        // isPostMeridium: true, NOT NECESSARY
      }
    );

    console.log("Added Working Hours (morning) Successfuly");

    await addNewTimeEntry(page);

    console.log("Added input for Working Hours (afternoon) Successfuly");

    await addWorkingHoursToDay(
      page,
      {
        time: "3",
        isPostMeridium: true,
        menuId: "8",
      },
      {
        time: "6",
        // isPostMeridium: true, NOT NECESSARY
        menuId: "10",
      }
    );

    console.log("Added Working Hours (afternoon) Successfuly");

    await saveChanges(page);

    console.log("Time entry/s saved Successfully");

    browser.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
