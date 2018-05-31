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

/**
 * getFromStorage() get data from local storage
 * require "storage" permission enabled in manifest.json
 * @param {array} keys 
 * @return {object} data
 */
const getFromStorage = function(keys) {
  return new Promise(function(resolve, reject){
    chrome.storage.local.get(keys, function(data) {
      resolve(data);
    });
  });
} 

/**
 * clearAllStorage() clear all data from Storage
 */
const clearAllStorage = function() {
  chrome.storage.local.clear(function() {
    console.log('Storage cleared!');
  });
}


/**
 * Clear all storage on button click
 */
let clearStorage = document.getElementById('clearStorage');
clearStorage.addEventListener("click", function() {
  clearAllStorage();
});

/**
 * Display saved tab in popup
 */
let tabList = document.getElementById('tabList');
let savedTabs = new Promise(function(resove, reject) {
  getFromStorage(['data']).then(function(data) {
    let html = '';
    
    for(let value of data.data) {
      html += '<li><a href="' + value.url + '">' + value.title + '</a></li>';
    }
    console.log(html);
    tabList.innerHTML = html;

  });
});