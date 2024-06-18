const chatBot = document.getElementById("chatbot-frame");
const botToggle = document.getElementById("toggle-bot");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-text");
const chatBox = document.getElementById("chatbox");

// Show and Hide Bot
botToggle.addEventListener("click", () => {
  chatBot.classList.toggle("show-bot");
});

// Change Colour of Send Button if No Input is Provided
userInput.addEventListener("input", () => {
  if (userInput.value.trim() === "") {
    sendButton.classList.remove("enabled");
    sendButton.disabled = true;
  } else {
    sendButton.classList.add("enabled");
    sendButton.disabled = false;
  }
});

// Add Text to Chat on Clicking Send
sendButton.addEventListener("click", () => {
  let p = document.createElement("p");
  const userMsg = userInput.value;
  p.innerHTML = userMsg;

  let li = document.createElement("li");
  li.appendChild(p);
  li.classList.add("chat", "incoming");
  chatBox.appendChild(li);

  userInput.value = "";
  sendButton.classList.remove("enabled");
  sendButton.disabled = true;

  // processInput is passed in a wrapper callback function which is executed after 600ms
  // if we just passed the function as it is, it would call it immediately and return output (none in this case) after 600ms
  setTimeout(() => {
    processInput(userMsg);
  }, 600);
});

// Function Which Sends User Input to Rasa API and
function processInput(userMsg) {
  let p = document.createElement("p");
  p.innerHTML = userMsg;

  let li = document.createElement("li");
  li.appendChild(p);
  li.classList.add("chat", "outgoing");
  chatBox.appendChild(li);
}
