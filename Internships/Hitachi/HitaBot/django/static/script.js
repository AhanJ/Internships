const chatBot = document.getElementById("chatbot-frame");
const botOpen = document.getElementById("open-bot");
const botClose = document.getElementById("close-bot");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-text");
const chatBox = document.getElementById("chatbox");
const rasaURL = "http://localhost:5005/webhooks/rest/webhook";

// Event Listeners
botOpen.addEventListener("click", openChatBot);
botClose.addEventListener("click", closeChatBot);
userInput.addEventListener("input", toggleSendButton);
sendButton.addEventListener("click", handleSubmit);

// Show Chat Bot
function openChatBot() {
  chatBot.classList.add("show-frame");
  botOpen.classList.add("hide-open-bot");
}

// Hide Chat Bot
function closeChatBot() {
  chatBot.classList.remove("show-frame");
  botOpen.classList.remove("hide-open-bot");
}

// Change Colour and Disable Send Button if No Input is Provided
function toggleSendButton() {
  if (userInput.value.trim() === "") {
    sendButton.classList.remove("enabled");
    sendButton.disabled = true;
  } else {
    sendButton.classList.add("enabled");
    sendButton.disabled = false;
  }
}

// Resets Input and Calls addUserMessage to Add User Input to Chat
// Calls getBotReply and Passes User Input
function handleSubmit() {
  const userMessage = userInput.value;

  userInput.value = "";
  sendButton.classList.remove("enabled");
  sendButton.disabled = true;

  addUserMessage(userMessage);
  getBotReply(userMessage);
}

// Add User Message to Chat
function addUserMessage(userMessage) {
  addMessageHeader("user");
  createUserChatBubble(userMessage);
}

// Take User Message and Calls addBotReply to Start Process of Adding Bot Reply to Chat
async function getBotReply(userMessage) {
  try {
    const apiResponse = await fetch(rasaURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const botReply = await apiResponse.json();
    addBotReply(botReply[0]);
  } catch (error) {
    console.error(error);
  }
}

// Add Bot Message to Chat
function addBotReply(botReply) {
  // Check if header has to be added
  if (!chatBox.lastChild.classList.contains("outgoing")) {
    addMessageHeader("bot");
  }
  // Displays a Typing Indicator for 1500ms

  disableInput();
  handleTypingIndicator();
  setTimeout(() => {
    handleTypingIndicator();
    createBotChatBubble(botReply);

    enableInput();
  }, 1000);
}

// Creates Bubble for User Input
function createUserChatBubble(userMessage) {
  let p = document.createElement("p");
  p.innerHTML = userMessage;

  let chatBubble = document.createElement("div");
  chatBubble.classList.add("chat-bubble", "incoming");
  chatBubble.appendChild(p);

  let messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "incoming");
  messageDiv.appendChild(chatBubble);

  chatBox.appendChild(messageDiv);
}

// Creates Bubble for Bot Reply
function createBotChatBubble(botReply) {
  let p = document.createElement("p");
  p.innerHTML = botReply.text;

  let chatBubble = document.createElement("div");
  chatBubble.classList.add("chat-bubble", "outgoing");
  chatBubble.appendChild(p);

  if (botReply.buttons) {
    chatBubble = addButtons(chatBubble, botReply.buttons);
  }

  let messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "outgoing");
  messageDiv.appendChild(chatBubble);

  chatBox.appendChild(messageDiv);
}

// Adds Buttons from Buttons Array (buttonArray) of Bot Reply to chatBubble
function addButtons(chatBubble, buttonArray) {
  buttonArray.forEach((button) => {
    buttonElement = document.createElement("button");
    buttonElement.classList.add("more-info");
    buttonElement.textContent = button.title;
    buttonElement.addEventListener("click", () => {
      handleClick(button.payload);
    });
    chatBubble.appendChild(buttonElement);
  });

  return chatBubble;
}

// Handles Button Clicks
// Opens Page in New Tab if Button is a Link Otherwise Sends Payload as Normal Message to Bot
function handleClick(payload) {
  if (payload.substring(0, 5) === "https") {
    window.open(payload, "_blank");
  } else {
    // addUserMessage(payload);
    getBotReply(payload);
  }
}

// Adds Sender Info Header
function addMessageHeader(sender) {
  let senderInfo = document.createElement("div");
  senderInfo.classList.add("sender-info", sender);
  let p = document.createElement("p");

  if (sender === "user") {
    p.innerHTML = "You";
  } else if (sender === "bot") {
    p.innerHTML = "HitaBot";
    let botIcon = document.createElement("div");
    botIcon.classList.add("bot-icon");
    senderInfo.appendChild(botIcon);
  }

  senderInfo.appendChild(p);
  chatBox.appendChild(senderInfo);
}

// Adds a Typing Indicator and Removes it if Already Present
function handleTypingIndicator() {
  if (chatBox.lastChild.classList.contains("typing-indicator")) {
    chatBox.lastChild.remove();
  } else {
    let typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    chatBox.appendChild(typingIndicator);
  }
}

function disableInput() {
  userInput.classList.add("disable-input");
  const chatBubbles = document.querySelectorAll(".chat-bubble");
  chatBubbles.forEach((chatBubble) => {
    chatBubble.classList.add("disable-bubble");
  });
}

function enableInput() {
  userInput.classList.remove("disable-input");
  const chatBubbles = document.querySelectorAll(".chat-bubble");
  chatBubbles.forEach((chatBubble) => {
    chatBubble.classList.remove("disable-bubble");
  });
}
