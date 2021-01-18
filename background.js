
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ 'active': true, "lastFocusedWindow": true },
    function (tabs) {
      chrome.storage.local.set({ "URL": tabs[0].url });
    }
  )
  chrome.windows.create({
    url: "https://gtmetrix.com/",
    type: "popup",
    height: 600,
    width: 1000,
  }, (() => {
    chrome.tabs.executeScript({
      code: `chrome.storage.local.get(['URL'], function (result) {
  document.querySelector("input").value = result.URL
  button = document.querySelector(".analyze-form-button")
  button.firstElementChild.click()
});`
    });
  }))
})

