var queryTab = function(queryInfo) {
  return new Promise(function(resolve, reject) {
    chrome.tabs.query(queryInfo, tabs => {
      resolve(tabs);
    });
  });
}

chrome.commands.onCommand.addListener(command => {
  
  const queryInfo = {
    "currentWindow": true
  };

  queryTab(queryInfo).then(function(data) {
    console.log(data);
  });
  
});

