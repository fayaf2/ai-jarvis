const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function speak(text) {
    const textToSpeak = new SpeechSynthesisUtterance(text);
    textToSpeak.rate = 1;
    textToSpeak.volume = 1;
    textToSpeak.pitch = 1;
    window.speechSynthesis.speak(textToSpeak);
}

function wishMe() {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

recognition.onresult = function(event) {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    handleCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function handleCommand(message) {
    if (message.includes('hello') || message.includes('hey')) {
        speak("Hello Sir, how may I help you?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        speak("Here is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        const query = message.replace('wikipedia', '').trim();
        window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
        speak("Here is what I found on Wikipedia about " + query);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        speak("Opening Calculator");
    } else {
        const searchQuery = message.replace(/ /g, "+");
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
        speak("I found some information for " + message + " on Google");
    }
}
