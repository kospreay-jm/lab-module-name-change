window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script11 = function()
{
  //Only triggers if 1_DEV_MODE = true
//Set 1_DEV_MODE to *false* in PROD

var player = GetPlayer();

var dev = player.GetVar("1_DEV_MODE");

if (dev === true) {
    var confettiScript = document.createElement('script');
    confettiScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js');
    document.head.appendChild(confettiScript);
}

}

window.Script12 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

// Confetti
var confettiScript = document.createElement('script');
var confettiSrc = `${ targetBackUrl }/vendor/articulate/confetti.min.js`;
//confettiScript.setAttribute('src','https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js');
confettiScript.setAttribute('src',confettiSrc);
document.head.appendChild(confettiScript);
}

window.Script13 = function()
{
  //Get Actor + UserRole from URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);

//Set UserRole
var player = GetPlayer();
player.SetVar( "UserRole",obj['actor'].description.userRole);

//Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle+"("+slideNumber+")";
player.SetVar("SlideId",slideId);
var path = player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);

}

window.Script14 = function()
{
  window.storyLineResetted = true;
}

window.Script15 = function()
{
  //Get parameters for Ajax call
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);

//Get the token,endpoint and email. Check if parameters are present
var token = obj['actor']['description']['token'] ?? '';
var endpoint = obj['actor']['description']['apiEndpoint'] ?? '';

if(token != '' && endpoint != ''){
	var player = GetPlayer();
	var mbox = obj['actor']['mbox'] ?? '';
	var email = mbox.substring(mbox.indexOf(':') + 1, mbox.length);
	
	// Ajax Call
	callApi();
	
	async function callApi(){
	
	    let post_data = JSON.stringify({
	        'activity_id': player.GetVar("AuxActivityId"),
	        'email': email,
	        'status':'started'
	    });
	
	    await fetch(endpoint, {
	        method: 'post',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	            'Authorization': 'Bearer ' + token
	        },
	        body: post_data
	    })
	        .then(response => response.json())
	        .then(jsonData => {
	            console.log("Notication sent correctly"); // Well done! 
	        })
	        .catch((error) => {
	        	console.log("Oops, something went wrong...");
	    	})
	}
}
}

window.Script16 = function()
{
  //Add SFX button to settings

function addCssToHead(cssRules) {
    var styleElement = document.createElement('style');
    styleElement.textContent = cssRules;
    document.head.appendChild(styleElement);
}

var css = `
    .checkbox-container {
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
    .checkbox-label {
        margin-left: 5px;
        font-size: 14px;
        font-family: Arial, sans-serif;
        color: #f8f8f8;
    }
    .checkbox-input {
        cursor: pointer;
    }
`;

addCssToHead(css);

// Create checkbox and label
var checkboxContainer = document.createElement("div");
checkboxContainer.className = "checkbox-container";

var buttonSoundsCheckbox = document.createElement("input");
buttonSoundsCheckbox.type = "checkbox";
buttonSoundsCheckbox.id = "buttonSounds";
buttonSoundsCheckbox.className = "checkbox-input";
buttonSoundsCheckbox.checked = true; // Set to checked by default

var buttonSoundsLabel = document.createElement("label");
buttonSoundsLabel.htmlFor = "buttonSounds";
buttonSoundsLabel.textContent = "Button Sounds";
buttonSoundsLabel.className = "checkbox-label";

checkboxContainer.appendChild(buttonSoundsCheckbox);
checkboxContainer.appendChild(buttonSoundsLabel);

// Insert the checkbox after the existing accessibility controls
var shortcutsSwitch = document.querySelector('[data-ref="acctextSwitch"]');
shortcutsSwitch.insertAdjacentElement('afterend', checkboxContainer);

// Function to update the Storyline variable
function updateSFXVariable() {
    var player = GetPlayer();
    player.SetVar("sfx_Setting", buttonSoundsCheckbox.checked);
}

// Add event listener to the checkbox
buttonSoundsCheckbox.addEventListener("change", updateSFXVariable);

// Initialize the Storyline variable
updateSFXVariable();
}

window.Script17 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script18 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script19 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle+"("+slideNumber+")";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script20 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script21 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script22 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script23 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script24 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle+"("+slideNumber+")";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script25 = function()
{
  var player = GetPlayer();

// Get the current slide name
var slideName = player.GetVar("SlideTitle");

// Initialize the QuestionNumber variable
var questionNumber = 0;

// Check the slide name and set the var_QuestionNumber accordingly
if (slideName === "Q1") {
    questionNumber = 1;
} else if (slideName === "Q2") {
    questionNumber = 2;
} else if (slideName === "Q3") {
    questionNumber = 3;
} else if (slideName === "Q4") {
    questionNumber = 4;
} else if (slideName === "Q5") {
    questionNumber = 5;
} else if (slideName === "Q6") {
    questionNumber = 6;
} else if (slideName === "Q7") {
    questionNumber = 7;
} else if (slideName === "Q8") {
    questionNumber = 8;
} else if (slideName === "Q9") {
    questionNumber = 9;
} else if (slideName === "Q10") {
    questionNumber = 10;
} else if (slideName === "Q11") {
    questionNumber = 11;
} else if (slideName === "Q12") {
    questionNumber = 12;
} else if (slideName === "Q13") {
    questionNumber = 13;
} else if (slideName === "Q14") {
    questionNumber = 14;
} else if (slideName === "Q15") {
    questionNumber = 15;
}

// Set the variable in Storyline
player.SetVar("var_QuestionNumber", questionNumber);
}

window.Script26 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script27 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script28 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script29 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script30 = function()
{
  // Get player and slide information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

// Set global variables to question variables
// should all be `false` upon first load - then saved to Q.lvl value

player.SetVar("var_answered", false);
player.SetVar("var_correct", false);
player.SetVar("var_attempted", false);




}

window.Script31 = function()
{
  // Get player and slide information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

// Set global variables to question variables
// should all be `false` upon first load - then saved to Q.lvl value

var qAnswered = player.GetVar(slideTitle + "_answered");
var qCorrect = player.GetVar(slideTitle + "_correct");
var qAttempted = player.GetVar(slideTitle + "_attempted");

player.SetVar("var_answered", qAnswered);
player.SetVar("var_correct", qCorrect);
player.SetVar("var_attempted", qAttempted);




}

window.Script32 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var clickVars = [
    player.GetVar("var_click_1"),
    player.GetVar("var_click_2"),
    player.GetVar("var_click_3"),
    player.GetVar("var_click_4"),
    player.GetVar("var_click_5")
];

// Build user answer string from selected images (using actual var values)  
var selections = [];  
for (var i = 0; i < clickVars.length; i++) {  
    if (clickVars[i] && clickVars[i].trim() !== "") {  
        selections.push(clickVars[i].trim());  
    }  
}  
var answer1 = "(" + selections.join("/") + ")";  
  
// xAPI grading  
var interaction1 = slideTitle + " type:click(1/4/5):" + answer1;   // Correct answers separated by slash "/"  
var fullInteraction = interaction1;  
player.SetVar("QuizInteraction", fullInteraction);  
  
// Result slide right||wrong  
function compareString(str) {  
    const match = str.match(/\((.*?)\):\((.*?)\)/);  
    if (!match) {  
        return false;  
    }  
    const left = match[1];   // correct answers  
    const right = match[2];  // user answers  
    const leftOptions = left.split("/");  
    const rightOptions = right.split("/");  
  
    // Check if lengths match exactly  
    if (leftOptions.length !== rightOptions.length) return false;  
    
    // Check every correct answer is in user answers  
    for (var i = 0; i < leftOptions.length; i++) {  
        if (!rightOptions.includes(leftOptions[i])) return false;  
    }  
    return true;  
}  
  
// Scoring  
var correct1 = compareString(interaction1);  
var score = Number(correct1);  
var fullCorrect = correct1;  
player.SetVar("score_" + slideTitle, score);  
  
// Set question specific variables to global counterpart    
var correct = fullCorrect;  
  
// Set var_answered based on selections  
var answered = selections.length > 0;  
player.SetVar("var_answered", answered);  
  
player.SetVar(slideTitle + "_correct", correct);    
player.SetVar(slideTitle + "_answered", answered);    
  
// Set Global Assessment Path (incremental)    
var globalassessmentpath = player.GetVar("GlobalAssessmentPath") + "-" + player.GetVar("QuizInteraction");    
player.SetVar("GlobalAssessmentPath", globalassessmentpath);

}

window.Script33 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

//console.log("--------------------");
//console.log(slideTitle+"_correct Pre Check: "+player.GetVar(slideTitle+"_correct"));

// Check if this question has been attempted before
var globalAttempted = player.GetVar("var_attempted");
var globalAnswered = player.GetVar("var_answered");
var globalCorrect = player.GetVar("var_correct");

var questionAttempted = player.GetVar(slideTitle + "_attempted");
var questionAnswered = player.GetVar(slideTitle + "_answered");
var questionCorrect = player.GetVar(slideTitle + "_correct");


// If the question has been attempted before, restore its state
if (questionAttempted === true) {
    player.SetVar("var_attempted", true);
    player.SetVar("var_answered", questionAnswered);
    //player.SetVar("var_correct", questionCorrect);
} else {
    // First time visiting this question - mark as attempted
    player.SetVar(slideTitle + "_attempted", true);
    //player.SetVar("var_correct", questionCorrect);
}

// Update the question-specific variables to match the current state
//player.SetVar(slideTitle + "_answered", globalAnswered);
//player.SetVar(slideTitle + "_correct", globalCorrect);
//player.SetVar(slideTitle + "_attempted", true);

player.SetVar("var_correct", questionCorrect);

//console.log(slideTitle+"_correct Post Check: "+player.GetVar(slideTitle+"_correct"));
}

window.Script34 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

//set global variables to question specific counterparts
var correct = player.GetVar(slideTitle+"_correct");
var answered = player.GetVar(slideTitle+"_answered");
player.SetVar("var_correct", correct);
player.SetVar("var_answered", answered);
}

window.Script35 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script36 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script37 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(C)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script38 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script39 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script40 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(I)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script41 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script42 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script43 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script44 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script45 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script46 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script47 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").1(C)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script48 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script49 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script50 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script51 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script52 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script53 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script54 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").2(I)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script55 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script56 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script57 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script58 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script59 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").3(TA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script60 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script61 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script62 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script63 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script64 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script65 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script66 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script67 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script68 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script69 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script70 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script71 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script72 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script73 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").5(MV)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script74 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle+"("+slideNumber+")";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script75 = function()
{
  var player = GetPlayer();

// Get the current slide name
var slideName = player.GetVar("SlideTitle");

// Initialize the QuestionNumber variable
var questionNumber = 0;

// Check the slide name and set the var_QuestionNumber accordingly
if (slideName === "Q1") {
    questionNumber = 1;
} else if (slideName === "Q2") {
    questionNumber = 2;
} else if (slideName === "Q3") {
    questionNumber = 3;
} else if (slideName === "Q4") {
    questionNumber = 4;
} else if (slideName === "Q5") {
    questionNumber = 5;
} else if (slideName === "Q6") {
    questionNumber = 6;
} else if (slideName === "Q7") {
    questionNumber = 7;
} else if (slideName === "Q8") {
    questionNumber = 8;
} else if (slideName === "Q9") {
    questionNumber = 9;
} else if (slideName === "Q10") {
    questionNumber = 10;
} else if (slideName === "Q11") {
    questionNumber = 11;
} else if (slideName === "Q12") {
    questionNumber = 12;
} else if (slideName === "Q13") {
    questionNumber = 13;
} else if (slideName === "Q14") {
    questionNumber = 14;
} else if (slideName === "Q15") {
    questionNumber = 15;
}

// Set the variable in Storyline
player.SetVar("var_QuestionNumber", questionNumber);
}

window.Script76 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script77 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script78 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script79 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script80 = function()
{
  // Get player and slide information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

// Set global variables to question variables
// should all be `false` upon first load - then saved to Q.lvl value

player.SetVar("var_answered", false);
player.SetVar("var_correct", false);
player.SetVar("var_attempted", false);




}

window.Script81 = function()
{
  // Get player and slide information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

// Set global variables to question variables
// should all be `false` upon first load - then saved to Q.lvl value

var qAnswered = player.GetVar(slideTitle + "_answered");
var qCorrect = player.GetVar(slideTitle + "_correct");
var qAttempted = player.GetVar(slideTitle + "_attempted");

player.SetVar("var_answered", qAnswered);
player.SetVar("var_correct", qCorrect);
player.SetVar("var_attempted", qAttempted);




}

window.Script82 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var vars1 = ["q2_fill_1", "q2_fill_2", "q2_fill_3", "q2_fill_4"];    //CHANGE  
  
//String vars & remove formatting
function processText(vars) {
    var tempVars = [];
    var currentVars = vars;
    
    for (var i = 0; i < currentVars.length; i++) {
        var newValue = player.GetVar(currentVars[i]); 
        if (newValue) {
            var processedValue = newValue.replace(/\s+/g, '').toLowerCase(); 
            tempVars.push(processedValue); 
        } else {
            tempVars.push('');
        }
    }
    return tempVars.join("/");
}  
  
var answer1 = "("+processText(vars1)+")";  
  
//xAPI grading  
var interaction1 = slideTitle + " type:fill(12/16/20/24):" + answer1;        //CHANGE  
var fullInteraction = interaction1;  
player.SetVar("QuizInteraction",fullInteraction);  
  
//Result slide right||wrong  
function compareString(str) {  
    const match = str.match(/\((.*?)\):\((.*?)\)/);  
    if (!match) {  
        return false;  
    }  
    const left = match[1];  
    const right = match[2];  
    const leftOptions = left.split("||");  
    return leftOptions.includes(right);  
}  
  
//Scoring  
var correct1 = compareString(interaction1);  
var score = Number(correct1);
var fullCorrect = correct1;  
player.SetVar("score_"+slideTitle, score); 
  
//set question specific variables to global counterpart    
var correct = fullCorrect;  
var answered = player.GetVar("var_answered");    
player.SetVar(slideTitle+"_correct", correct);    
player.SetVar(slideTitle+"_answered", answered);  
    
//Set Global Assessment Path (incremental)    
var globalassessmentpath=player.GetVar("GlobalAssessmentPath")+"-"+player.GetVar("QuizInteraction");    
player.SetVar("GlobalAssessmentPath",globalassessmentpath);
}

window.Script83 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

//console.log("--------------------");
//console.log(slideTitle+"_correct Pre Check: "+player.GetVar(slideTitle+"_correct"));

// Check if this question has been attempted before
var globalAttempted = player.GetVar("var_attempted");
var globalAnswered = player.GetVar("var_answered");
var globalCorrect = player.GetVar("var_correct");

var questionAttempted = player.GetVar(slideTitle + "_attempted");
var questionAnswered = player.GetVar(slideTitle + "_answered");
var questionCorrect = player.GetVar(slideTitle + "_correct");


// If the question has been attempted before, restore its state
if (questionAttempted === true) {
    player.SetVar("var_attempted", true);
    player.SetVar("var_answered", questionAnswered);
    //player.SetVar("var_correct", questionCorrect);
} else {
    // First time visiting this question - mark as attempted
    player.SetVar(slideTitle + "_attempted", true);
    //player.SetVar("var_correct", questionCorrect);
}

// Update the question-specific variables to match the current state
//player.SetVar(slideTitle + "_answered", globalAnswered);
//player.SetVar(slideTitle + "_correct", globalCorrect);
//player.SetVar(slideTitle + "_attempted", true);

player.SetVar("var_correct", questionCorrect);

//console.log(slideTitle+"_correct Post Check: "+player.GetVar(slideTitle+"_correct"));
}

window.Script84 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

//set global variables to question specific counterparts
var correct = player.GetVar(slideTitle+"_correct");
var answered = player.GetVar(slideTitle+"_answered");
player.SetVar("var_correct", correct);
player.SetVar("var_answered", answered);
}

window.Script85 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script86 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script87 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(C)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script88 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script89 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script90 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(I)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script91 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script92 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script93 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script94 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script95 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script96 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script97 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").1(C)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script98 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script99 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script100 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script101 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script102 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script103 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script104 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").2(I)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script105 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script106 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script107 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script108 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script109 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").3(TA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script110 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script111 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script112 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script113 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script114 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script115 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script116 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script117 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script118 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script119 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script120 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script121 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script122 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script123 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").5(MV)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script124 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle+"("+slideNumber+")";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script125 = function()
{
  var player = GetPlayer();

// Get the current slide name
var slideName = player.GetVar("SlideTitle");

// Initialize the QuestionNumber variable
var questionNumber = 0;

// Check the slide name and set the var_QuestionNumber accordingly
if (slideName === "Q1") {
    questionNumber = 1;
} else if (slideName === "Q2") {
    questionNumber = 2;
} else if (slideName === "Q3") {
    questionNumber = 3;
} else if (slideName === "Q4") {
    questionNumber = 4;
} else if (slideName === "Q5") {
    questionNumber = 5;
} else if (slideName === "Q6") {
    questionNumber = 6;
} else if (slideName === "Q7") {
    questionNumber = 7;
} else if (slideName === "Q8") {
    questionNumber = 8;
} else if (slideName === "Q9") {
    questionNumber = 9;
} else if (slideName === "Q10") {
    questionNumber = 10;
} else if (slideName === "Q11") {
    questionNumber = 11;
} else if (slideName === "Q12") {
    questionNumber = 12;
} else if (slideName === "Q13") {
    questionNumber = 13;
} else if (slideName === "Q14") {
    questionNumber = 14;
} else if (slideName === "Q15") {
    questionNumber = 15;
}

// Set the variable in Storyline
player.SetVar("var_QuestionNumber", questionNumber);
}

window.Script126 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script127 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script128 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script129 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script130 = function()
{
  // Get player and slide information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

// Set global variables to question variables
// should all be `false` upon first load - then saved to Q.lvl value

player.SetVar("var_answered", false);
player.SetVar("var_correct", false);
player.SetVar("var_attempted", false);




}

window.Script131 = function()
{
  // Get player and slide information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

// Set global variables to question variables
// should all be `false` upon first load - then saved to Q.lvl value

var qAnswered = player.GetVar(slideTitle + "_answered");
var qCorrect = player.GetVar(slideTitle + "_correct");
var qAttempted = player.GetVar(slideTitle + "_attempted");

player.SetVar("var_answered", qAnswered);
player.SetVar("var_correct", qCorrect);
player.SetVar("var_attempted", qAttempted);




}

window.Script132 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var clickVars = [
    player.GetVar("var_click_1"),
    player.GetVar("var_click_2"),
    player.GetVar("var_click_3"),
    player.GetVar("var_click_4"),
    player.GetVar("var_click_5")
];

// Build user answer string from selected images (using actual var values)  
var selections = [];  
for (var i = 0; i < clickVars.length; i++) {  
    if (clickVars[i] && clickVars[i].trim() !== "") {  
        selections.push(clickVars[i].trim());  
    }  
}  
var answer1 = "(" + selections.join("/") + ")";  
  
// xAPI grading  
var interaction1 = slideTitle + " type:click(1/2/4):" + answer1;   // Correct answers separated by slash "/"  
var fullInteraction = interaction1;  
player.SetVar("QuizInteraction", fullInteraction);  
  
// Result slide right||wrong  
function compareString(str) {  
    const match = str.match(/\((.*?)\):\((.*?)\)/);  
    if (!match) {  
        return false;  
    }  
    const left = match[1];   // correct answers  
    const right = match[2];  // user answers  
    const leftOptions = left.split("/");  
    const rightOptions = right.split("/");  
  
    // Check if lengths match exactly  
    if (leftOptions.length !== rightOptions.length) return false;  
    
    // Check every correct answer is in user answers  
    for (var i = 0; i < leftOptions.length; i++) {  
        if (!rightOptions.includes(leftOptions[i])) return false;  
    }  
    return true;  
}  
  
// Scoring  
var correct1 = compareString(interaction1);  
var score = Number(correct1);  
var fullCorrect = correct1;  
player.SetVar("score_" + slideTitle, score);  
  
// Set question specific variables to global counterpart    
var correct = fullCorrect;  
  
// Set var_answered based on selections  
var answered = selections.length > 0;  
player.SetVar("var_answered", answered);  
  
player.SetVar(slideTitle + "_correct", correct);    
player.SetVar(slideTitle + "_answered", answered);    
  
// Set Global Assessment Path (incremental)    
var globalassessmentpath = player.GetVar("GlobalAssessmentPath") + "-" + player.GetVar("QuizInteraction");    
player.SetVar("GlobalAssessmentPath", globalassessmentpath);

}

window.Script133 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

//console.log("--------------------");
//console.log(slideTitle+"_correct Pre Check: "+player.GetVar(slideTitle+"_correct"));

// Check if this question has been attempted before
var globalAttempted = player.GetVar("var_attempted");
var globalAnswered = player.GetVar("var_answered");
var globalCorrect = player.GetVar("var_correct");

var questionAttempted = player.GetVar(slideTitle + "_attempted");
var questionAnswered = player.GetVar(slideTitle + "_answered");
var questionCorrect = player.GetVar(slideTitle + "_correct");


// If the question has been attempted before, restore its state
if (questionAttempted === true) {
    player.SetVar("var_attempted", true);
    player.SetVar("var_answered", questionAnswered);
    //player.SetVar("var_correct", questionCorrect);
} else {
    // First time visiting this question - mark as attempted
    player.SetVar(slideTitle + "_attempted", true);
    //player.SetVar("var_correct", questionCorrect);
}

// Update the question-specific variables to match the current state
//player.SetVar(slideTitle + "_answered", globalAnswered);
//player.SetVar(slideTitle + "_correct", globalCorrect);
//player.SetVar(slideTitle + "_attempted", true);

player.SetVar("var_correct", questionCorrect);

//console.log(slideTitle+"_correct Post Check: "+player.GetVar(slideTitle+"_correct"));
}

window.Script134 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

//set global variables to question specific counterparts
var correct = player.GetVar(slideTitle+"_correct");
var answered = player.GetVar(slideTitle+"_answered");
player.SetVar("var_correct", correct);
player.SetVar("var_answered", answered);
}

window.Script135 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script136 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script137 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(C)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script138 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script139 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script140 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(I)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script141 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script142 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script143 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script144 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script145 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script146 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script147 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").1(C)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script148 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script149 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script150 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script151 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script152 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script153 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script154 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").2(I)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script155 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script156 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script157 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script158 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script159 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").3(TA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script160 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script161 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script162 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script163 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script164 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script165 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script166 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script167 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script168 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script169 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script170 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script171 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script172 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script173 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").5(MV)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script174 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle+"("+slideNumber+")";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script175 = function()
{
  var player = GetPlayer();

// Get the current slide name
var slideName = player.GetVar("SlideTitle");

// Initialize the QuestionNumber variable
var questionNumber = 0;

// Check the slide name and set the var_QuestionNumber accordingly
if (slideName === "Q1") {
    questionNumber = 1;
} else if (slideName === "Q2") {
    questionNumber = 2;
} else if (slideName === "Q3") {
    questionNumber = 3;
} else if (slideName === "Q4") {
    questionNumber = 4;
} else if (slideName === "Q5") {
    questionNumber = 5;
} else if (slideName === "Q6") {
    questionNumber = 6;
} else if (slideName === "Q7") {
    questionNumber = 7;
} else if (slideName === "Q8") {
    questionNumber = 8;
} else if (slideName === "Q9") {
    questionNumber = 9;
} else if (slideName === "Q10") {
    questionNumber = 10;
} else if (slideName === "Q11") {
    questionNumber = 11;
} else if (slideName === "Q12") {
    questionNumber = 12;
} else if (slideName === "Q13") {
    questionNumber = 13;
} else if (slideName === "Q14") {
    questionNumber = 14;
} else if (slideName === "Q15") {
    questionNumber = 15;
}

// Set the variable in Storyline
player.SetVar("var_QuestionNumber", questionNumber);
}

window.Script176 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script177 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script178 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script179 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script180 = function()
{
  // Get player and slide information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

// Set global variables to question variables
// should all be `false` upon first load - then saved to Q.lvl value

player.SetVar("var_answered", false);
player.SetVar("var_correct", false);
player.SetVar("var_attempted", false);




}

window.Script181 = function()
{
  // Get player and slide information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

// Set global variables to question variables
// should all be `false` upon first load - then saved to Q.lvl value

var qAnswered = player.GetVar(slideTitle + "_answered");
var qCorrect = player.GetVar(slideTitle + "_correct");
var qAttempted = player.GetVar(slideTitle + "_attempted");

player.SetVar("var_answered", qAnswered);
player.SetVar("var_correct", qCorrect);
player.SetVar("var_attempted", qAttempted);




}

window.Script182 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var vars1 = ["q4_fill_1"];    //CHANGE  
  
//String vars & remove formatting
function processText(vars) {
    var tempVars = [];
    var currentVars = vars;
    
    for (var i = 0; i < currentVars.length; i++) {
        var newValue = player.GetVar(currentVars[i]); 
        if (newValue) {
            var processedValue = newValue.replace(/\s+/g, '').toLowerCase(); 
            tempVars.push(processedValue); 
        } else {
            tempVars.push('');
        }
    }
    return tempVars.join("/");
}  
  
var answer1 = "("+processText(vars1)+")";  
  
//xAPI grading  
var interaction1 = slideTitle + " type:fill(5):" + answer1;        //CHANGE  
var fullInteraction = interaction1;  
player.SetVar("QuizInteraction",fullInteraction);  
  
//Result slide right||wrong  
function compareString(str) {  
    const match = str.match(/\((.*?)\):\((.*?)\)/);  
    if (!match) {  
        return false;  
    }  
    const left = match[1];  
    const right = match[2];  
    const leftOptions = left.split("||");  
    return leftOptions.includes(right);  
}  
  
//Scoring  
var correct1 = compareString(interaction1);  
var score = Number(correct1);
var fullCorrect = correct1;  
player.SetVar("score_"+slideTitle, score); 
  
//set question specific variables to global counterpart    
var correct = fullCorrect;  
var answered = player.GetVar("var_answered");    
player.SetVar(slideTitle+"_correct", correct);    
player.SetVar(slideTitle+"_answered", answered);  
    
//Set Global Assessment Path (incremental)    
var globalassessmentpath=player.GetVar("GlobalAssessmentPath")+"-"+player.GetVar("QuizInteraction");    
player.SetVar("GlobalAssessmentPath",globalassessmentpath);
}

window.Script183 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

//console.log("--------------------");
//console.log(slideTitle+"_correct Pre Check: "+player.GetVar(slideTitle+"_correct"));

// Check if this question has been attempted before
var globalAttempted = player.GetVar("var_attempted");
var globalAnswered = player.GetVar("var_answered");
var globalCorrect = player.GetVar("var_correct");

var questionAttempted = player.GetVar(slideTitle + "_attempted");
var questionAnswered = player.GetVar(slideTitle + "_answered");
var questionCorrect = player.GetVar(slideTitle + "_correct");


// If the question has been attempted before, restore its state
if (questionAttempted === true) {
    player.SetVar("var_attempted", true);
    player.SetVar("var_answered", questionAnswered);
    //player.SetVar("var_correct", questionCorrect);
} else {
    // First time visiting this question - mark as attempted
    player.SetVar(slideTitle + "_attempted", true);
    //player.SetVar("var_correct", questionCorrect);
}

// Update the question-specific variables to match the current state
//player.SetVar(slideTitle + "_answered", globalAnswered);
//player.SetVar(slideTitle + "_correct", globalCorrect);
//player.SetVar(slideTitle + "_attempted", true);

player.SetVar("var_correct", questionCorrect);

//console.log(slideTitle+"_correct Post Check: "+player.GetVar(slideTitle+"_correct"));
}

window.Script184 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

//set global variables to question specific counterparts
var correct = player.GetVar(slideTitle+"_correct");
var answered = player.GetVar(slideTitle+"_answered");
player.SetVar("var_correct", correct);
player.SetVar("var_answered", answered);
}

window.Script185 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script186 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script187 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(C)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script188 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script189 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script190 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(I)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script191 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script192 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script193 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script194 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script195 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script196 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script197 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").1(C)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script198 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script199 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script200 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script201 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script202 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script203 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script204 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").2(I)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script205 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script206 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script207 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script208 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script209 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").3(TA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script210 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script211 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script212 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script213 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script214 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script215 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script216 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script217 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script218 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script219 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script220 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script221 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script222 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script223 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").5(MV)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script224 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle+"("+slideNumber+")";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script225 = function()
{
  var player = GetPlayer();

// Get the current slide name
var slideName = player.GetVar("SlideTitle");

// Initialize the QuestionNumber variable
var questionNumber = 0;

// Check the slide name and set the var_QuestionNumber accordingly
if (slideName === "Q1") {
    questionNumber = 1;
} else if (slideName === "Q2") {
    questionNumber = 2;
} else if (slideName === "Q3") {
    questionNumber = 3;
} else if (slideName === "Q4") {
    questionNumber = 4;
} else if (slideName === "Q5") {
    questionNumber = 5;
} else if (slideName === "Q6") {
    questionNumber = 6;
} else if (slideName === "Q7") {
    questionNumber = 7;
} else if (slideName === "Q8") {
    questionNumber = 8;
} else if (slideName === "Q9") {
    questionNumber = 9;
} else if (slideName === "Q10") {
    questionNumber = 10;
} else if (slideName === "Q11") {
    questionNumber = 11;
} else if (slideName === "Q12") {
    questionNumber = 12;
} else if (slideName === "Q13") {
    questionNumber = 13;
} else if (slideName === "Q14") {
    questionNumber = 14;
} else if (slideName === "Q15") {
    questionNumber = 15;
}

// Set the variable in Storyline
player.SetVar("var_QuestionNumber", questionNumber);
}

window.Script226 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script227 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script228 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script229 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script230 = function()
{
  // Get player and slide information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

// Set global variables to question variables
// should all be `false` upon first load - then saved to Q.lvl value

player.SetVar("var_answered", false);
player.SetVar("var_correct", false);
player.SetVar("var_attempted", false);




}

window.Script231 = function()
{
  // Get player and slide information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

// Set global variables to question variables
// should all be `false` upon first load - then saved to Q.lvl value

var qAnswered = player.GetVar(slideTitle + "_answered");
var qCorrect = player.GetVar(slideTitle + "_correct");
var qAttempted = player.GetVar(slideTitle + "_attempted");

player.SetVar("var_answered", qAnswered);
player.SetVar("var_correct", qCorrect);
player.SetVar("var_attempted", qAttempted);




}

window.Script232 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var vars1 = ["q5_fill_1", "q5_fill_2", "q5_fill_3", "q5_fill_4"];    //CHANGE  
  
//String vars & remove formatting
function processText(vars) {
    var tempVars = [];
    var currentVars = vars;
    
    for (var i = 0; i < currentVars.length; i++) {
        var newValue = player.GetVar(currentVars[i]); 
        if (newValue) {
            var processedValue = newValue.replace(/\s+/g, '').toLowerCase(); 
            tempVars.push(processedValue); 
        } else {
            tempVars.push('');
        }
    }
    return tempVars.join("/");
}  
  
var answer1 = "("+processText(vars1)+")";  
  
//xAPI grading  
var interaction1 = slideTitle + " type:fill(18/24/30/36):" + answer1;        //CHANGE  
var fullInteraction = interaction1;  
player.SetVar("QuizInteraction",fullInteraction);  
  
//Result slide right||wrong  
function compareString(str) {  
    const match = str.match(/\((.*?)\):\((.*?)\)/);  
    if (!match) {  
        return false;  
    }  
    const left = match[1];  
    const right = match[2];  
    const leftOptions = left.split("||");  
    return leftOptions.includes(right);  
}  
  
//Scoring  
var correct1 = compareString(interaction1);  
var score = Number(correct1);
var fullCorrect = correct1;  
player.SetVar("score_"+slideTitle, score); 
  
//set question specific variables to global counterpart    
var correct = fullCorrect;  
var answered = player.GetVar("var_answered");    
player.SetVar(slideTitle+"_correct", correct);    
player.SetVar(slideTitle+"_answered", answered);  
    
//Set Global Assessment Path (incremental)    
var globalassessmentpath=player.GetVar("GlobalAssessmentPath")+"-"+player.GetVar("QuizInteraction");    
player.SetVar("GlobalAssessmentPath",globalassessmentpath);
}

window.Script233 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

//console.log("--------------------");
//console.log(slideTitle+"_correct Pre Check: "+player.GetVar(slideTitle+"_correct"));

// Check if this question has been attempted before
var globalAttempted = player.GetVar("var_attempted");
var globalAnswered = player.GetVar("var_answered");
var globalCorrect = player.GetVar("var_correct");

var questionAttempted = player.GetVar(slideTitle + "_attempted");
var questionAnswered = player.GetVar(slideTitle + "_answered");
var questionCorrect = player.GetVar(slideTitle + "_correct");


// If the question has been attempted before, restore its state
if (questionAttempted === true) {
    player.SetVar("var_attempted", true);
    player.SetVar("var_answered", questionAnswered);
    //player.SetVar("var_correct", questionCorrect);
} else {
    // First time visiting this question - mark as attempted
    player.SetVar(slideTitle + "_attempted", true);
    //player.SetVar("var_correct", questionCorrect);
}

// Update the question-specific variables to match the current state
//player.SetVar(slideTitle + "_answered", globalAnswered);
//player.SetVar(slideTitle + "_correct", globalCorrect);
//player.SetVar(slideTitle + "_attempted", true);

player.SetVar("var_correct", questionCorrect);

//console.log(slideTitle+"_correct Post Check: "+player.GetVar(slideTitle+"_correct"));
}

window.Script234 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

//set global variables to question specific counterparts
var correct = player.GetVar(slideTitle+"_correct");
var answered = player.GetVar(slideTitle+"_answered");
player.SetVar("var_correct", correct);
player.SetVar("var_answered", answered);
}

window.Script235 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script236 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script237 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(C)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script238 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script239 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script240 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(I)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script241 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script242 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script243 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script244 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script245 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script246 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script247 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").1(C)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script248 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script249 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script250 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script251 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script252 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script253 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script254 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").2(I)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script255 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script256 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script257 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script258 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script259 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").3(TA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script260 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script261 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script262 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var boScaff = player.GetVar("1_BOSCAFF");

if ((slideTitle === "Q5" && boScaff === false) ||
    (slideTitle === "S2" && boScaff === true) ||
    (slideTitle === "B2" && boScaff === true)) {
    player.SetVar("var_nextButton", "Finish");
} else {
    player.SetVar("var_nextButton", "Next");
}

}

window.Script263 = function()
{
  // Get player and question information
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

var num = player.GetVar("var_"+slideTitle+"_RN");

messages = [
    "You're a math wiz",
    "Keep up the awesome work",
    "You solved that perfectly",
    "You aced that question",
    "That answer was spot on",
    "You make it look easy",
    "That was amazing",
    "That was out of this world",
    "Excellent work solving that"
]

// console.log(messages[1]);

player.SetVar("correct_message", messages[num]);
player.SetVar("var_emoji", num);
}

window.Script264 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script265 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script266 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").R(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script267 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script268 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}
}

window.Script269 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script270 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script271 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script272 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script273 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").5(MV)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script274 = function()
{
  //Only triggers if 1_DEV_MODE = true
//Set 1_DEV_MODE to *false* in PROD

var player = GetPlayer();

var dev = player.GetVar("1_DEV_MODE");

if (dev === true) {
    var confettiScript = document.createElement('script');
    confettiScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js');
    document.head.appendChild(confettiScript);
}

}

window.Script275 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

// Confetti
var confettiScript = document.createElement('script');
var confettiSrc = `${ targetBackUrl }/vendor/articulate/confetti.min.js`;
//confettiScript.setAttribute('src','https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js');
confettiScript.setAttribute('src',confettiSrc);
document.head.appendChild(confettiScript);
}

window.Script276 = function()
{
  //Get parameters for Ajax call
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);

//Get the token,endpoint and email. Check if parameters are present
var token = obj['actor']['description']['token'] ?? '';
var endpoint = obj['actor']['description']['apiEndpoint'] ?? '';

if(token != '' && endpoint != ''){
	var player = GetPlayer();
	var mbox = obj['actor']['mbox'] ?? '';
	var email = mbox.substring(mbox.indexOf(':') + 1, mbox.length);
	
	// Ajax Call
	callApi();
	
	async function callApi(){
	
	    let post_data = JSON.stringify({
	        'activity_id': player.GetVar("AuxActivityId"),
	        'email': email,
	        'status':'completed'
	    });
	
	    await fetch(endpoint, {
	        method: 'post',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	            'Authorization': 'Bearer ' + token
	        },
	        body: post_data
	    })
	        .then(response => response.json())
	        .then(jsonData => {
	            console.log("Notication sent correctly"); // Well done! 
	        })
	        .catch((error) => {
	        	console.log("Oops, something went wrong...");
	    	})
	}
}

}

window.Script277 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

}

window.Script278 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script279 = function()
{
  var player = GetPlayer();

//Create ScorePercent
var correct = player.GetVar("score_total");
var total = player.GetVar("1_SCORE_OUTOF");
var scorePercent = (correct/total)*100;
player.SetVar("ScorePercent", scorePercent.toFixed(2));


//Create var_todaysDate
var currentDate = new Date();
var monthNames = [
    "January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"];
var month = currentDate.getMonth() + 1;
var day = currentDate.getDate();
var year = currentDate.getFullYear();
var dateString = `${year}-${month}-${day}`;
player.SetVar("var_todaysDate", dateString);


//Create var_timeSpent
function convertMilliseconds(ms) {
    var totalSeconds = Math.floor(ms / 1000);
    var hours = Math.floor(totalSeconds / 3600);
    if (hours >= 1) {
        return "> 1hr";
    }
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    var formatTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formatTime;
}
var timeSpent = convertMilliseconds(player.GetVar("var_elapsedTime"));
player.SetVar("var_timeSpent", timeSpent);

}

window.Script280 = function()
{
  var duration = 15 * 200;
var animationEnd = Date.now() + duration;
var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

var interval = setInterval(function() {
  var timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  var particleCount = 50 * (timeLeft / duration);
  // since particles fall down, start a bit higher than random
  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
}, 250);
}

window.Script281 = function()
{
  var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

window.Script282 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle+"("+slideNumber+")";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);

//Result Extension (Success) 
if (player.GetVar("ScorePercent")>=player.GetVar("PassPercent")) {
	player.SetVar("GlobalAssessmentSuccess","true");
}
else {
	player.SetVar("GlobalAssessmentSuccess","false");
}

var globalassessmentpath="passed="+player.GetVar("GlobalAssessmentSuccess")+"/"+player.GetVar("GlobalAssessmentPath");
player.SetVar("GlobalAssessmentPath",globalassessmentpath);
}

window.Script283 = function()
{
  //Get parameters from URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);

//Get the targetBack and close the section
var targetBack = obj['actor']['description']['targetBack'] ?? '';
if(targetBack != ''){
	window.parent.postMessage('Section finished',targetBack);
}
}

window.Script284 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script285 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script286 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script287 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script288 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script289 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").5(MV)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script290 = function()
{
  // Getting url parameters
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var reset = obj['actor']['description']['reset'];

// Getting Player
var player = GetPlayer();

// Resetting
var alreadyResetted = window.storyLineResetted || false;
if(reset && !alreadyResetted){
window.storyLineResetted = true;
player.SetVar("AuxReset",true);
}

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script291 = function()
{
  var player = GetPlayer();
var textToCopy = player.GetVar("GlobalAssessmentPath");

// Create a temporary textarea element
var tempTextArea = document.createElement("textarea");
tempTextArea.value = textToCopy;
document.body.appendChild(tempTextArea);

// Select and copy the text
tempTextArea.select();
document.execCommand("copy");

// Remove the temporary textarea
document.body.removeChild(tempTextArea);

}

window.Script292 = function()
{
  var player = GetPlayer();
var textToCopy = player.GetVar("GlobalNavigationPath");

// Create a temporary textarea element
var tempTextArea = document.createElement("textarea");
tempTextArea.value = textToCopy;
document.body.appendChild(tempTextArea);

// Select and copy the text
tempTextArea.select();
document.execCommand("copy");

// Remove the temporary textarea
document.body.removeChild(tempTextArea);

}

};
