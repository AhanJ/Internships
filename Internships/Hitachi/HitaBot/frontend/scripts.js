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

  processResponse(userMsg);
});

async function processResponse(userMsg) {
  const botReply = await processInput(userMsg);
  console.log(botReply);

  let li = document.createElement("li");
  let p = document.createElement("p");
  p.innerHTML = botReply.text;
  li.appendChild(p);

  li.classList.add("chat", "outgoing");
  chatBox.appendChild(li);

  if (botReply.buttons) {
    const buttonArray = botReply.buttons;
    buttonArray.forEach((button) => {
      const buttonElement = document.createElement("button");
      buttonElement.textContent = button.title;
      buttonElement.addEventListener("click", () => {
        if (button.payload.substring(0, 5) === "https") {
          window.open(button.payload, "_blank"); // Open the URL in a new tab
        } else {
          processResponse(button.payload);
        }
      });
      li.appendChild(buttonElement);
    });
  }

  li.classList.add("chat", "outgoing");
  chatBox.appendChild(li);
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
    console.log(botReply[0]);
    return botReply[0];
  } catch (error) {
    console.error(error);
  }
}

function handleButtonClick(payload) {}
