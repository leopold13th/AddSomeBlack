document.addEventListener('DOMContentLoaded', function() {
    var css = ".highlight-9b9b5123-c7e7-42b1-865e-7435843ead70 { outline: 3px solid #07C; }";
    chrome.tabs.insertCSS(null, {code: css});
    
    chrome.tabs.executeScript(null, {file: "content_script.js"});
    
    window.close();
    
    // chrome.runtime.openOptionsPage();
});
