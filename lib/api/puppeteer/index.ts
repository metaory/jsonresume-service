import core from 'puppeteer-core';
import { getOptions } from './options';
let _page: core.Page | null;

export async function getPage(isDev: boolean) {
    if (_page) {
        return _page;
    }
    const options = await getOptions(isDev);
    const browser = await core.launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getPDF(uri: string, isDev: boolean) {
    const page = await getPage(isDev);
    await page.goto(uri)
    await page.waitForSelector(".loaded", { timeout: 4900 })
    const file = await page.pdf({ format: 'a4' })
    return file;
}