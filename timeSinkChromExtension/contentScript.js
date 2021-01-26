chrome.runtime.sendMessage({ type: "getData" }, response => {
  let script = document.createElement('script');
  script.textContent = `var visitHistory = ${JSON.stringify(response.visitHistory)};`;

  (document.head || document.documentElement).appendChild(script);
  console.log('chrome history data appended')
});