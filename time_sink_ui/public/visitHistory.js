let awaitDataCollection = async () => {
  console.log(typeof visitHistory=== undefined)
  while ((typeof visitHistory) === "undefined") {
    console.log('waiting')
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  // console.log('recieved visitHistory.');
  // console.log(visitHistory)
}
awaitDataCollection()