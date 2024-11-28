const userMessage = [
  ["hi", "hey", "hello"],
  ["sure", "yes", "no"],
  ["where is khwopa secondary school is located", "location", "khwopa location"],
  ["can you tell about khwopa secondary school", "khwopa secondary school"],
  ["how can i apply to Khwopa?"],
  ["khwopa popular", "is khwopa popular in bhaktapur?", "popular"],
  ["are there any annual program", "annual program", "program"],
  ["aim of khwopa"],
  [, "what is khwopa motto", "khwopa motto", "motto of khwopa"],
  ["principal", "khwopa principal", "Principal of khwopa"],
  ["bus services","transportation facility"],
  ["boarding facility","hostel facilities"],
  ["stream offered in higher level","faculties"],
  ["does khwopa offer scholarship","scholarship"],
  ["library facility","library"],

];
const botReply = [
  ["Great to see you here!. <br> What information are you looking for? ask me anything about Khwopa Secondary School."],
  ["Okay"],
  ["Located at the ancient historical and cultural city, Bhaktapur <br> Exactly Dekocha Bhaktapur"],
  ["Khwopa Secondary School was founded by Bhaktapur Municipality on 16th Shrawan, 2056 (1st August, 1999). Buoyed up with the idea of enlightening the whole society and the nation by means of providing quality education, the municipality made an aggressive initiation realizing their long term vision of the over all development of Bhaktapur. In its decade long history, this instiutition has proved itself as one of the well equipped school with national recognition. The motto of Khwopa Secondary School is to produce global leaders with sound theoretical knowledge competence and skill. That is why the institution takes every academic year as a new beginning and tries for something that is beyond attainment. The philosophy has always remained to try for something that has never been done or that other have tried and failed. This very essence is backed by experienced professors, visiting subject experts and lecturers.Along with, we maintain the regular classes, indepth practical assignments, field excursion and report writing which are the recipes for success of each individual student."],
  [
    "By visiting the school during the admission period and taking an entrance exam.    ",
  ],
  ["Yes, Khwopa is one of the most popular schools in Bhaktapur."],

  [
    "Yes, Khwopa hosts annual events like sports day and cultural programs.",
  ],
  ["First Come First Priority"],
  ["Khwopa Secondary School's motto is Knowledge for the Future."],
  ["Laxmi Prasad Karmacharya"],
  ["KSS also serves a very good transportation services in maximum places inside the valley"],
  ["No, Khwopa Secondary School does not have a boarding facility. Students from nearby areas typically commute to the school."],
  [" At the higher secondary level, Khwopa Secondary School offers streams in Science, Management, and Humanities."],
  [" Yes, Khwopa Secondary School offers scholarships to deserving students, particularly those from financially disadvantaged backgrounds, based on academic performance, need, or both."],
  [" Yes, Khwopa Secondary School has a well-equipped library with a wide range of textbooks, reference materials, and novels. The school also provides online resources and study materials for students to enhance their learning"],
];

const alternative = [
  "Extremely Sorry I could not get the information",
  "404 Error",
  "Sorry",
  "Information is out of service try for the other queries "
];

const synth = window.speechSynthesis;

function voiceControl(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-aus";
  u.volume = 1;
  u.rate = 1;
  u.pitch = 1;
  synth.speak(u);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      input != "" && output(input);
      inputField.value = "";
    }
  });
});

function output(input) {
  let product;

  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  text = text
    .replace(/[\W_]/g, " ")
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .trim();

  let comparedText = compare(userMessage, botReply, text);

  product = comparedText
    ? comparedText
    : alternative[Math.floor(Math.random() * alternative.length)];
  addChat(input, product);
}

function compare(triggerArray, replyArray, string) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (triggerArray[x][y] == string) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  //containMessageCheck(string);
  if (item) return item;
  else return containMessageCheck(string);
}

function containMessageCheck(string) {
  let expectedReply = [
    [
      "Good Bye, dude",
      "Bye, See you!",
      "Dude, Bye. Take care of your health in this situation."
    ],
    ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
    ["Have a pleasant evening!", "Good evening too", "Evening!"],
    ["Good morning, Have a great day!", "Morning, dude!"],
    ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
  ];
  let expectedMessage = [
    ["bye", "tc", "take care"],
    ["night", "good night"],
    ["evening", "good evening"],
    ["morning", "good morning"],
    ["noon"]
  ];
  let item;
  for (let x = 0; x < expectedMessage.length; x++) {
    if (expectedMessage[x].includes(string)) {
      items = expectedReply[x];
      item = items[Math.floor(Math.random() * items.length)];
    }
  }
  return item;
}
function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.classList.add("message");
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  var scroll = document.getElementById("message-section");
  scroll.scrollTop = scroll.scrollHeight;
  voiceControl(product);
}
