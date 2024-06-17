const chatBot = document.getElementById("chatbot-frame");
const botToggle = document.getElementById("toggle-bot");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-text");
const chatBox = document.getElementById("chatbox");

// Show and Hide Bot
botToggle.addEventListener("click", () => {
  chatBot.classList.toggle("hide-bot");
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
  p.innerHTML = userInput.value;

  let li = document.createElement("li");
  li.appendChild(p);
  li.classList.add("chat", "incoming");
  chatBox.appendChild(li);

  userInput.value = "";
  sendButton.classList.remove("enabled");
  sendButton.disabled = true;
});

// Function Which Sends User Input to Rasa API and
