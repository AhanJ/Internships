const chatBot = document.getElementById("chatbot-frame");
const botToggle = document.getElementById("toggle-bot");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-text");
const chatBox = document.getElementById("chatbox");
const rasaURL = "http://localhost:5005/webhooks/rest/webhook";

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

function handleSubmit() {
  let senderInfo = document.createElement("div");
  senderInfo.classList.add("sender", "user");
  let p = document.createElement("p");
  p.innerHTML = "You";
  senderInfo.appendChild(p);
  chatBox.appendChild(senderInfo);

  p = document.createElement("p");
  const userMsg = userInput.value;
  p.innerHTML = userMsg;

  let chatBubble = document.createElement("div");
  chatBubble.classList.add("chat-bubble", "incoming");
  chatBubble.appendChild(p);

  let messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "incoming");

  messageDiv.appendChild(chatBubble);
  chatBox.appendChild(messageDiv);

  userInput.value = "";
  sendButton.classList.remove("enabled");
  sendButton.disabled = true;

  processResponse(userMsg);
}

// Add Text to Chat on Clicking Send
sendButton.addEventListener("click", () => {
  handleSubmit();
});

// Function to Process User Message and Get Bot Reply
async function processResponse(userMsg) {
  const botReply = await processInput(userMsg);

  let senderInfo = document.createElement("div");
  senderInfo.classList.add("sender", "bot");

  let botIcon = document.createElement("div");
  botIcon.classList.add("bot-icon");
  senderInfo.appendChild(botIcon);

  let p = document.createElement("p");
  p.innerHTML = "HitaBot";

  senderInfo.appendChild(p);
  chatBox.appendChild(senderInfo);

  p = document.createElement("p");
  p.innerHTML = botReply.text;

  let chatBubble = document.createElement("div");
  chatBubble.classList.add("chat-bubble", "outgoing");
  chatBubble.appendChild(p);

  let messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "outgoing");

  if (botReply.buttons) {
    const buttonArray = botReply.buttons;
    buttonArray.forEach((button) => {
      const buttonElement = document.createElement("button");
      buttonElement.classList.add("more-info");
      buttonElement.textContent = button.title;
      buttonElement.addEventListener("click", () => {
        if (button.payload.substring(0, 5) === "https") {
          window.open(button.payload, "_blank"); // Open the URL in a new tab
        } else {
          processResponse(button.payload);
        }
      });
      chatBubble.appendChild(buttonElement);
    });
  }

  messageDiv.appendChild(chatBubble);
  chatBox.appendChild(messageDiv);
}

// Function Which Sends User Input to Rasa API and Returns Bot Response
async function processInput(userMsg) {
  try {
    const apiResponse = await fetch(rasaURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMsg }),
    });

    const botReply = await apiResponse.json();
    return botReply[0];
  } catch (error) {
    console.error(error);
  }
}
