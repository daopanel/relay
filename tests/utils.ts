//--testing--
import { chromium, ChromiumBrowserContext, Page } from '@playwright/test';
// import { join } from 'path';

// export const EXTENSION_PATH = join(
//   __dirname,
//   '../../node_modules/tab-manager-v2/build/build_chrome'
// );

// export const TAB_QUERY = 'div[draggable="true"] div[tabindex="-1"]';

// export const URLS = [
//   'https://twitter.com/',
//   'http://xcv58.com/',
//   'https://nextjs.org/',
//   'https://twitter.com/',
//   'http://duckduckgo.com/',
//   'https://ops-class.org/',
// ];

// export const isExtensionURL = (url: string) =>
//   url.startsWith('chrome-extension://');

// export const CLOSE_PAGES = async (browserContext: ChromiumBrowserContext) => {
//   const pages = (await browserContext?.pages()) || [];
//   for (const page of pages) {
//     const url = await page.url();
//     if (!isExtensionURL(url)) {
//       await page.close();
//     }
//   }
// };

// export const initBrowserWithExtension = async () => {
//   const userDataDir = `/tmp/test-user-data-${Math.random()}`;
//   const browserContext = (await chromium.launchPersistentContext(userDataDir, {
//     headless: false,
//     args: [
//       // Follow suggestions on https://playwright.dev/docs/ci#docker
//       '--disable-dev-shm-usage',
//       '--ipc=host',
//       `--disable-extensions-except=${EXTENSION_PATH}`,
//       `--load-extension=${EXTENSION_PATH}`,
//     ],
//   })) as ChromiumBrowserContext;

//   const page = await browserContext.pages()[0];
//   await page.bringToFront();
//   await page.goto('chrome://inspect/#extensions');
//   await page.goto('chrome://inspect/#service-workers');
//   const url = await page
//     .locator('#service-workers-list div[class="url"]')
//     .textContent();
//   const s = url as string;
//   const [, , extensionId] = s.split('/');
//   const extensionURL = `chrome-extension://${extensionId}/popup.html?not_popup=1`;
//   await page.waitForTimeout(500);
//   const pages = browserContext.pages();
//   let p = page as Page | undefined;
//   p = pages.find((x) => x.url() === extensionURL);
//   if (!p) {
//     p = pages[0];
//   }

//   return { browserContext, extensionURL, page: p };
// };

// export const openPages = async (
//   browserContext: ChromiumBrowserContext,
//   urls: string[]
// ) => {
//   return await Promise.all(
//     urls.map(async (url) => {
//       const newPage = await browserContext.newPage();
//       await newPage.goto(url);
//       await newPage.waitForLoadState('load');
//     })
//   );
// };
