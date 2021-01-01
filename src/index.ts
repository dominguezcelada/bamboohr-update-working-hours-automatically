import puppeteer from "puppeteer";
import {
  login,
  openWorkingHoursForm,
  addWorkingHoursToday,
  saveChanges,
  addWorkingHoursEntry
} from "./bamboo-hr-interactions";

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "google-chrome-unstable",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    await login(page);
    console.log("✅ Logged In");

    await openWorkingHoursForm(page);
    console.log("✅ Opened Working Hours Modal");

    //PostMeridium is not necessary for endTime 2PM here
    await addWorkingHoursToday(page, { time: "9" }, { time: "2" });
    console.log("✅ Added Working Hours (morning)");
    await addWorkingHoursEntry(page);
    console.log("✅ Added input for Working Hours (afternoon)");
    //PostMeridium is not necessary for endTime 6PM here
    await addWorkingHoursToday(page, { time: "3", isPostMeridium: true }, { time: "6" });
    console.log("✅ Added Working Hours (afternoon)");

    await saveChanges(page);
    console.log("🎉 Working Hours saved 🎉");

    browser.close();
  } catch (error) {
    console.error(`🔴 ${error}`);
    process.exit(1);
  }
}

main();
