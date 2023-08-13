const sendBtn = document.querySelector("#send-btn");
const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox ");
const chatbotToggler = document.querySelector(".chatbot-toggle");
const chatbotCloseBtn = document.querySelector(".close");
const container = document.querySelector(".container");

let userMessage;
let chatHistory = [];
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;
const createChatLi = (message, className) => {
    // create chat <li>Element with passed arguements(message and class name)
    const chatLi = document.createElement("li")
    chatLi.classList.add("chat", className);

    let chatContent = className === "outgoing" ? `<p></p> ` : `
     <span class="material-icons">smart_toy</span>
     <p></p> `
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}
// Function to save the chat history in local storage
const saveChatHistory = () => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
};
// Function to load the chat history from local storage
const loadChatHistory = () => {
    const savedChatHistory = localStorage.getItem("chatHistory");
    if (savedChatHistory) {
        chatHistory = JSON.parse(savedChatHistory);
        displayChatHistory();
    }
};
const displayChatHistory = () => {
    chatbox.innerHTML = ""; // Clear existing chatbox
    chatHistory.forEach((chat) => {
        const className = chat.role === "user" ? "outgoing" : "incoming";
        chatbox.appendChild(createChatLi(chat.content, className));
    });
};
// generate response using api(external library)
const generateResponse = (incomingChatLi) => {
    const API_URL = " https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p")
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    };

    // send post request
    fetch(API_URL, requestOptions)
        .then(res => res.json()) 
        .then(data => {
            messageElement.textContent = data.choices[0].message.content;
            chatHistory.push({ role: "bot", content: data.choices[0].message.content }); // Add API response to chat history
            saveChatHistory(); 
        })
        .catch((err) => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong,please try again.";

        });
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) {
        return
    }
    chatInput.value = ""
    chatHistory.push({ role: "user", content: userMessage }); 
    // reset to default
    chatInput.style.height = `${inputInitHeight}px`


    // append message of user to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    // display thinking message while waiting for response
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
    }, 600)
}

document.addEventListener("DOMContentLoaded", () => {
    loadChatHistory();
});
// show chat
const showChat = document.addEventListener("DOMContentLoaded", function () {
    chatbotToggler.addEventListener("click", () => {
        container.classList.toggle("show-chatbot");
    });
}); 
const closeChat = document.addEventListener("DOMContentLoaded", function () {
    chatbotCloseBtn.addEventListener("click", () => {
        container.classList.remove("show-chatbot");
    });
});
// adjust height of textarea
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`
    // chatInput.style.height = `${chatInput.scrollHeight}px`
})
// for enter pressed without shift key pressed and the window width>800px handle chat
chatInput.addEventListener("keyup", (e) => {
    if (e.key === "enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
})
sendBtn.addEventListener("click", handleChat);