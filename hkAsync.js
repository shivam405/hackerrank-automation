const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "xyz@abc.com";
const password = "2345678";
const codeObj = require("./code");



(async function(){
    try {
        let browserInstance = await puppeteer.launch({
          headless: false,
          defaultViewport: null,
          args: ["--start-maximized"],
        })

        let newTab=await browserInstance.newPage();

        await newTab.goto(loginLink)

        await newTab.type("input[id='input-1']", email, { delay: 50 })
        await newTab.type("input[id='input-2']", password)
        await newTab.click("button[type='submit']", { delay: 50 })
        await waitAndClick('.topic-card  a[data-attr1="algorithms"]',newTab)
        await waitAndClick('input[value="warmup"]', newTab)
        let allQues=await newTab.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-styled")
        console.log(allQues.length)
        await quesSolver(newTab,allQues[0],codeObj.answer[0])

    } catch (error) {
        console.log(error)
    }
})()



async function waitAndClick(selector, cPage) {
  await cPage.waitForSelector(selector)
  let selectorClicked=cPage.click(selector)
  return selectorClicked
}

async function quesSolver(page,question,answer){
    await question.click();
    await waitAndClick(".monaco-editor.no-user-select.vs",page)
    await waitAndClick(".checkbox-input", page)
    await page.waitForSelector("#input-1", page)
    await page.type("#input-1", answer, { delay: 10 });
    await page.keyboard.down("Control")
    await page.keyboard.press("A", { delay: 100 })
    await page.keyboard.press("X", { delay: 100 })
    await page.keyboard.up("Control")
    await waitAndClick(".monaco-editor.no-user-select.vs",page)
    await page.keyboard.down("Control")
    await page.keyboard.press("A", { delay: 100 })
    await page.keyboard.press("V", { delay: 100 })
    await page.keyboard.up("Control")
    await waitAndClick(".hr-monaco-submit", page, {delay: 50})
}





