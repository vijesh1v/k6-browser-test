import http from "k6/http";
import exec from 'k6/execution';
import { browser } from "k6/browser";
import { sleep, check, fail } from 'k6';

const BASE_URL = __ENV.BASE_URL || "https://quickpizza.grafana.com";

export const options = {
  scenarios: {
    ui: {
      executor: "shared-iterations",
      vus: 1,
      iterations: 1,
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
};

export function setup() {
  let res = http.get(BASE_URL);
  if (res.status !== 200) {
    exec.test.abort(`Got unexpected status code ${res.status} when trying to setup. Exiting.`);
  }
}

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto(BASE_URL);

    // check 1
    let checkData = await page.locator("h1").textContent();
    check(page, {
      header: checkData === "Looking to break out of your pizza routine?",
    });

    // click button
    await page.locator('//button[. = "Pizza, Please!"]').click();
    await page.waitForTimeout(500);

    // 📸 ensure screenshot directory exists
    try {
      await browser.ensureDir("screenshots");
    } catch (_) {
      // ignore if folder already exists
    }

    // 📸 take screenshot into folder
    await page.screenshot({ path: "screenshots/home.png" });

    // check 2
    checkData = await page.locator("div#recommendations").textContent();
    check(page, {
      recommendation: checkData !== "",
    });

  } catch (error) {
    fail(`Browser iteration failed: ${error.message}`);
  } finally {
    await page.close();
  }

  sleep(1);
}
