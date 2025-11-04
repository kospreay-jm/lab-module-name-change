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
window.Script5 = function()
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

window.Script6 = function()
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

window.Script7 = function()
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

window.Script8 = function()
{
  window.storyLineResetted = true;
}

window.Script9 = function()
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

window.Script10 = function()
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

window.Script11 = function()
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

window.Script12 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script13 = function()
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

window.Script14 = function()
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

window.Script15 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script16 = function()
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script18 = function()
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

window.Script19 = function()
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

window.Script20 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script21 = function()
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

window.Script22 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script23 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script24 = function()
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

window.Script25 = function()
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

window.Script26 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  

console.log("Q1_Correct Pre Submit: "+player.GetVar("Q1_correct")); 

var vars1 = player.GetVar("var_MC");        //CHANGE  
var answer1 = "("+vars1+")";  
  
//xAPI grading  
var interaction1 = slideTitle + " type:mchoice(A):" + answer1;        //CHANGE  
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
player.SetVar("var_correct", correct);    
player.SetVar(slideTitle+"_correct", correct);    
player.SetVar(slideTitle+"_answered", answered);  
    
//Set Global Assessment Path (incremental)    
var globalassessmentpath=player.GetVar("GlobalAssessmentPath")+"-"+player.GetVar("QuizInteraction");    
player.SetVar("GlobalAssessmentPath",globalassessmentpath);

console.log("Q1_Correct Post Submit: "+player.GetVar("Q1_correct")); 
}

window.Script27 = function()
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

window.Script28 = function()
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

window.Script29 = function()
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

window.Script30 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script31 = function()
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

window.Script32 = function()
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

window.Script33 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script34 = function()
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

window.Script38 = function()
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

window.Script39 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script40 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script41 = function()
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

window.Script42 = function()
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

window.Script43 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script44 = function()
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

window.Script45 = function()
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

window.Script46 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script47 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script48 = function()
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

window.Script49 = function()
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

window.Script50 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script51 = function()
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

window.Script52 = function()
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

window.Script53 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script54 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script55 = function()
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

window.Script56 = function()
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

window.Script57 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script58 = function()
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

window.Script59 = function()
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

window.Script60 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script61 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script62 = function()
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

window.Script63 = function()
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

window.Script64 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script65 = function()
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

window.Script66 = function()
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

window.Script67 = function()
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

window.Script71 = function()
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
}

window.Script73 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script74 = function()
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

window.Script75 = function()
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

window.Script76 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").4(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script78 = function()
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

window.Script79 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script80 = function()
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

window.Script81 = function()
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

window.Script82 = function()
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

window.Script83 = function()
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

window.Script84 = function()
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

window.Script85 = function()
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

window.Script86 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script87 = function()
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

window.Script88 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script89 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script90 = function()
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

window.Script91 = function()
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

window.Script92 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var vars1 = ["q2_fill_1", "q2_fill_2",  "q2_fill_3"];    //CHANGE  
  
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
var interaction1 = slideTitle + " type:fill(18/24/30):" + answer1;        //CHANGE  
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

window.Script93 = function()
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

window.Script94 = function()
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

window.Script95 = function()
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

window.Script96 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script97 = function()
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

window.Script101 = function()
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

window.Script102 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script103 = function()
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

window.Script104 = function()
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

window.Script105 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script106 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script107 = function()
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

window.Script108 = function()
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

window.Script109 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script110 = function()
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

window.Script111 = function()
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

window.Script112 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script113 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script114 = function()
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

window.Script115 = function()
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

window.Script116 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script117 = function()
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

window.Script118 = function()
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

window.Script119 = function()
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
}

window.Script121 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script122 = function()
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

window.Script123 = function()
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

window.Script124 = function()
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

window.Script125 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script126 = function()
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

window.Script127 = function()
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

window.Script128 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").4(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script129 = function()
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

window.Script130 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script131 = function()
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

window.Script132 = function()
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

window.Script133 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script134 = function()
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script136 = function()
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

window.Script137 = function()
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

window.Script138 = function()
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

window.Script139 = function()
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

window.Script140 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
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
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script144 = function()
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

window.Script145 = function()
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

window.Script146 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var vars1 = ["q3_fill_1"];    //CHANGE  
  
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
var interaction1 = slideTitle + " type:fill(12):" + answer1;        //CHANGE  
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

window.Script147 = function()
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

window.Script148 = function()
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

window.Script149 = function()
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

window.Script150 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script151 = function()
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

window.Script152 = function()
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

window.Script153 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script154 = function()
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
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script160 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script161 = function()
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

window.Script162 = function()
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

window.Script163 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script164 = function()
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

window.Script165 = function()
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

window.Script166 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script167 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script168 = function()
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
}

window.Script170 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script171 = function()
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

window.Script172 = function()
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

window.Script173 = function()
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

window.Script174 = function()
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

window.Script175 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script176 = function()
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

window.Script177 = function()
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

window.Script178 = function()
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

window.Script179 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script180 = function()
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

window.Script181 = function()
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

window.Script182 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").4(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script183 = function()
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

window.Script184 = function()
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

window.Script185 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script186 = function()
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

window.Script187 = function()
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script189 = function()
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

window.Script190 = function()
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

window.Script191 = function()
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

window.Script192 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script193 = function()
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

window.Script194 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script195 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script196 = function()
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

window.Script197 = function()
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

window.Script198 = function()
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
var interaction1 = slideTitle + " type:fill(10):" + answer1;        //CHANGE  
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

window.Script199 = function()
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

window.Script200 = function()
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

window.Script201 = function()
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

window.Script202 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script203 = function()
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

window.Script204 = function()
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

window.Script205 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script206 = function()
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

window.Script207 = function()
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

window.Script208 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script209 = function()
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

window.Script210 = function()
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

window.Script211 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script212 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script213 = function()
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

window.Script217 = function()
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

window.Script218 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script219 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script220 = function()
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
}

window.Script222 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script223 = function()
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

window.Script224 = function()
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

window.Script225 = function()
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

window.Script226 = function()
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

window.Script227 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script228 = function()
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

window.Script229 = function()
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

window.Script230 = function()
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

window.Script231 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script232 = function()
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

window.Script233 = function()
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

window.Script234 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").4(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script236 = function()
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

window.Script237 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script239 = function()
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

window.Script240 = function()
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

window.Script241 = function()
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

window.Script242 = function()
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

window.Script243 = function()
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

window.Script244 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script245 = function()
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

window.Script246 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script247 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script248 = function()
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

window.Script249 = function()
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

window.Script250 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var vars1 = ["q5_fill_1"];    //CHANGE  
  
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
var interaction1 = slideTitle + " type:fill(30):" + answer1;        //CHANGE  
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

window.Script251 = function()
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

window.Script252 = function()
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

window.Script253 = function()
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

window.Script254 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script255 = function()
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

window.Script256 = function()
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

window.Script257 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script258 = function()
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

window.Script259 = function()
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

window.Script260 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script261 = function()
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

window.Script262 = function()
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

window.Script263 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script264 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script265 = function()
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

window.Script266 = function()
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

window.Script267 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script268 = function()
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

window.Script269 = function()
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

window.Script270 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script271 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script272 = function()
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

window.Script273 = function()
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

window.Script274 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script275 = function()
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

window.Script276 = function()
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

window.Script277 = function()
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

window.Script278 = function()
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

window.Script279 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script280 = function()
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

window.Script281 = function()
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

window.Script282 = function()
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

window.Script283 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script284 = function()
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

window.Script285 = function()
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

window.Script286 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").4(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
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
}

window.Script289 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
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

window.Script292 = function()
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

window.Script293 = function()
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

window.Script294 = function()
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

window.Script295 = function()
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

window.Script296 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script297 = function()
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

window.Script298 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script299 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script300 = function()
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

window.Script301 = function()
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

window.Script302 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var vars1 = ["q6_fill_1"];    //CHANGE  
  
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
var interaction1 = slideTitle + " type:fill(28):" + answer1;        //CHANGE  
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

window.Script303 = function()
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

window.Script304 = function()
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

window.Script305 = function()
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

window.Script306 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script307 = function()
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

window.Script308 = function()
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

window.Script309 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script310 = function()
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

window.Script311 = function()
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

window.Script312 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script313 = function()
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

window.Script314 = function()
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

window.Script315 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script316 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script317 = function()
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

window.Script318 = function()
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

window.Script319 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script320 = function()
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

window.Script321 = function()
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

window.Script322 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script323 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script324 = function()
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

window.Script325 = function()
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

window.Script326 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script327 = function()
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

window.Script328 = function()
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

window.Script329 = function()
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

window.Script330 = function()
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

window.Script331 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script332 = function()
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

window.Script333 = function()
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

window.Script334 = function()
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

window.Script335 = function()
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

window.Script336 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script337 = function()
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

window.Script338 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script339 = function()
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

window.Script340 = function()
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

window.Script341 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").4(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script342 = function()
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

window.Script343 = function()
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

window.Script344 = function()
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

window.Script345 = function()
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

window.Script346 = function()
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

window.Script347 = function()
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

window.Script348 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script349 = function()
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

window.Script350 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script351 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script352 = function()
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

window.Script353 = function()
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

window.Script354 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  

console.log("Q1_Correct Pre Submit: "+player.GetVar("Q1_correct")); 

var vars1 = player.GetVar("var_MC");        //CHANGE  
var answer1 = "("+vars1+")";  
  
//xAPI grading  
var interaction1 = slideTitle + " type:mchoice(B):" + answer1;        //CHANGE  
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
player.SetVar("var_correct", correct);    
player.SetVar(slideTitle+"_correct", correct);    
player.SetVar(slideTitle+"_answered", answered);  
    
//Set Global Assessment Path (incremental)    
var globalassessmentpath=player.GetVar("GlobalAssessmentPath")+"-"+player.GetVar("QuizInteraction");    
player.SetVar("GlobalAssessmentPath",globalassessmentpath);

console.log("Q1_Correct Post Submit: "+player.GetVar("Q1_correct")); 
}

window.Script355 = function()
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

window.Script356 = function()
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

window.Script357 = function()
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

window.Script358 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script359 = function()
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

window.Script360 = function()
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

window.Script361 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script362 = function()
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

window.Script363 = function()
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

window.Script364 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script365 = function()
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

window.Script366 = function()
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

window.Script367 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script368 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script369 = function()
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

window.Script370 = function()
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

window.Script371 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script372 = function()
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

window.Script373 = function()
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

window.Script374 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script375 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script376 = function()
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

window.Script377 = function()
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

window.Script378 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script379 = function()
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

window.Script380 = function()
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

window.Script381 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script382 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script383 = function()
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

window.Script384 = function()
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

window.Script385 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script386 = function()
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

window.Script387 = function()
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

window.Script388 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script389 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script390 = function()
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

window.Script391 = function()
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

window.Script392 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script393 = function()
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

window.Script394 = function()
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

window.Script395 = function()
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

window.Script396 = function()
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

window.Script397 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script398 = function()
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

window.Script399 = function()
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

window.Script400 = function()
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

window.Script401 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script402 = function()
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

window.Script403 = function()
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

window.Script404 = function()
{
  //Set Object Description (SlideId/Path)
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var slideNumber = player.GetVar("SlideNumber");
var slideId = slideTitle + "(" + slideNumber + ").4(SA)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script405 = function()
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

window.Script406 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script407 = function()
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

window.Script408 = function()
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

window.Script409 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script410 = function()
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

window.Script411 = function()
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

window.Script412 = function()
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

window.Script413 = function()
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

window.Script414 = function()
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

window.Script415 = function()
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

window.Script416 = function()
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

window.Script417 = function()
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

window.Script418 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script419 = function()
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

window.Script420 = function()
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

window.Script421 = function()
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

window.Script422 = function()
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

window.Script423 = function()
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

window.Script424 = function()
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

window.Script425 = function()
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

window.Script426 = function()
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

window.Script427 = function()
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

window.Script428 = function()
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

window.Script429 = function()
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

window.Script430 = function()
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

window.Script431 = function()
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

window.Script432 = function()
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
