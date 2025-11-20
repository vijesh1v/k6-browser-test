import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      vus: 2,
      iterations: 2,
      options: {
        browser: {
          type: 'chromium',  // tell k6 to use a real browser
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://otel-demo.field-eng.grafana.net');
  } finally {
    await page.close();
  }
}
