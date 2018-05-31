/**
 * saveToStorage() save data to local storage
 * require "storage" permission enabled in manifest.json
 * @param {object} data 
 */
const saveToStorage = function(data) {
  chrome.storage.local.set((data), function() {
    console.log('Data is saved');
  });
}

const queryTab = function(queryInfo) {
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

  queryTab(queryInfo).then(function(tabs) {
    
    const santinizedData = [];

    tabs.forEach(tab => {
      let { title, url } = tab;
      let data = {
        title,
        url
      };

      santinizedData.push(data);
    });

    saveToStorage( {data: santinizedData} );

  });
  
});
