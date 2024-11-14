const chatDisplay = document.getElementById('chatDisplay');
const userInput = document.getElementById('userInput');
const sideMenu = document.getElementById('sideMenu');
let firstMessageSent = false;

/*
function sendMessage() {
    const messageText = userInput.value.trim();
    if (messageText === "") return;

    // Display the chat area on the first message
    if (!firstMessageSent) {
        chatDisplay.classList.add('active');
        firstMessageSent = true;
    }
    
    // Display user's message
    displayMessage(messageText, 'user-message');

    // Clear input field
    userInput.value = "";

    // Simulate bot response
    setTimeout(() => {
        const botResponse = getBotResponse(messageText);
        displayMessage(botResponse, 'bot-message');
    }, 500);
}
*/





async function sendMessage() {
    const userMessage = document.querySelector('input[type="text"]').value;

    const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    displayMessage(data.response, 'bot');
}


function displayMessage(text, className) {
    const message = document.createElement('div');
    message.className = `message ${className}`;
    message.textContent = text;
    chatDisplay.appendChild(message);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scroll to the latest message
}

function getBotResponse(userMessage) {
    // Basic bot responses - placeholder for an actual chatbot API call
    if (userMessage.toLowerCase().includes("legal advice")) {
        return "I'm here to help with legal questions! Could you provide more details?";
    }
    return "I'm here to assist you with legal matters. What can I help you with?";
}

function toggleMenu(event) {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.style.right = sideMenu.style.right === '0px' ? '-250px' : '0px';
    event.stopPropagation();
}

function closeMenuIfOpen(event) {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu.style.right === '0px') {
        sideMenu.style.right = '-250px';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    const chatDisplay = document.querySelector('.chat-display');
    chatDisplay.classList.toggle('dark-mode');
}
