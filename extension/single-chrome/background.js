// For Whatsapp/Messaging Scraping
  // chrome.action.onClicked.addListener(function (tab) {
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id },
  //     func: function () {
  //       console.clear();
  //       let selectedText = '';
  //       const selection = window.getSelection();
  
  //       if (selection && selection.toString()) {
  //         selectedText = selection.toString();
  //         console.log("Selected text:", selectedText);
  //       } else {
  //         console.log("No text selected.");
  //       }
  //     }
  //   });
  // });

  chrome.action.onClicked.addListener(function (tab) {
    const whatsappUrlPattern = /^https:\/\/web\.whatsapp\.com\//;
    const telegramUrlPattern = /^https:\/\/web\.telegram\.org\//;
  
    if (whatsappUrlPattern.test(tab.url) || telegramUrlPattern.test(tab.url)) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: function () {
          console.clear();
          const selection = window.getSelection();
  
          if (selection && selection.toString()) {
            const selectedText = selection.toString();
  
            const isUrl = /^https?:\/\//.test(selectedText);
  
            if (isUrl) {
              const proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent(selectedText)}`;
              fetch(proxyUrl)
                .then(response => response.text())
                .then(htmlContent => {
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = htmlContent;
  
                  // Select all div elements
                  const divs = tempDiv.querySelectorAll('div');
  
                  let maxContentLength = 0;
                  let selectedDivContent = '';
  
                  // Loop through each div to find the one with the most text content
                  divs.forEach(div => {
                    const textContent = div.innerText || div.textContent;
                    const contentLength = textContent.length;
  
                    if (contentLength > maxContentLength) {
                      maxContentLength = contentLength;
                      selectedDivContent = textContent;
                    }
                  });
  
                  console.log(selectedDivContent);
                })
                .catch(error => {
                  console.error("Error fetching content:", error);
                });
  
            } else {
              console.log("Selected text is :", selectedText);
            }
          } else {
            // console.log("No text selected.");
            alert("No text selected! Please select the text to use this extension in WhatsApp");
          }
        }
      });
    }
  });

// For full-site text
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//      let paragraphs = request.paragraphs;
//      if(paragraphs == null || paragraphs.length == 0) {
//      }
//      else {
//         paragraphs.forEach((paragraph) => {
// 			console.log(paragraph);
//         });
//      }
// })
