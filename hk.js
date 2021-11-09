const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "gigeraj271@epeva.com";
const password = "2345678";
const codeObj = require("./code");

let browserOpen = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});
let page;
browserOpen
  .then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let hackerrankOpenPromise = newTab.goto(loginLink);
    return hackerrankOpenPromise;
  })
  .then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 });
    return emailIsEntered;
  })
  .then(function () {
    let passWordIsEntered = page.type("input[id='input-2']", password);
    return passWordIsEntered;
  })
  .then(function () {
    let loginButtonClicked = page.click("button[type='submit']", { delay: 50 });
    return loginButtonClicked;
  })
  .then(function () {
    let clickOnAlgoPromise = waitAndClick(
      '.topic-card  a[data-attr1="algorithms"]',
      page
    );
    return clickOnAlgoPromise;
  })
  .then(function () {
    let getToWarmup = waitAndClick('input[value="warmup"]', page);
    return getToWarmup;
  })
  .then(function () {
    let waitfor3sec = page.waitFor(3000);
    return waitfor3sec;
  })
  .then(function () {
    let allQuesPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-styled"
    );
    return allQuesPromise;
  })
  .then(function (quesArr) {
    console.log("Number of question: ", quesArr.length);
    let quesWillBeSolved = quesSolver(page, quesArr[0], codeObj.answer[0]);
    return quesWillBeSolved;
  });

function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = cPage.waitForSelector(selector);
    waitForModelPromise
      .then(function () {
        let clickModel = cPage.click(selector);
        return clickModel;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}

function quesSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let quesWillBeClicked = question.click();
    quesWillBeClicked
      .then(function () {
        let editorInFocusPromise = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return editorInFocusPromise;
      })
      .then(function () {
        return waitAndClick(".checkbox-input", page);
      })
      .then(function () {
        return page.waitForSelector("#input-1", page);
      })
      .then(function () {
        return page.type("#input-1", answer, { delay: 10 });
      })
      .then(function () {
        let ctrlIsPressed = page.keyboard.down("Control");
        return ctrlIsPressed;
      })
      .then(function () {
        let aIsPressed = page.keyboard.press("A", { delay: 100 });
        return aIsPressed;
      })
      .then(function () {
        let xIsPressed = page.keyboard.press("X", { delay: 100 });
        return xIsPressed;
      })
      .then(function () {
        let controlIsUnpressed = page.keyboard.up("Control");
        return controlIsUnpressed;
      })
      .then(function () {
        let mainEditiorInFocus = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return mainEditiorInFocus;
      })
      .then(function () {
        let ctrlIsPressed = page.keyboard.down("Control");
        return ctrlIsPressed;
      })
      .then(function () {
        let aIsPressed = page.keyboard.press("A", { delay: 100 });
        return aIsPressed;
      })
      .then(function () {
        let vIsPressed = page.keyboard.press("V", { delay: 100 });
        return vIsPressed;
      })
      .then(function () {
        let controlIsUnpressed = page.keyboard.up("Control");
        return controlIsUnpressed;
      })
      .then(function () {
        let submitButtonClicked = waitAndClick(".hr-monaco-submit", page, {
          delay: 50,
        });
        return submitButtonClicked;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}
