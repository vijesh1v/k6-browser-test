# k6 Browser Testing Framework
A lightweight browser testing setup using k6 with browser automation. 
This project helps testers automate performance and UI workflows using Chromium.
for documentations link https://grafana.com/docs/k6/latest/using-k6-browser/
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)

## Installation

1. Install k6:

```bash
brew install k6      # macOS
winget install k6    # Windows

## Usage

Run the test:

```bash
K6_BROWSER_HEADLESS=false k6 run browser-test.js (for headed mode)
k6 run browser-test.js (headless mode)

---

## 8. **Examples**

```md
## Example Script

```js
import { browser } from 'k6/browser';

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.close();
}


