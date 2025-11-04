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
  
// Group A: var_click to var_click_12
var groupA_names = ["var_click"];
for (var i = 1; i <= 12; i++) {
    groupA_names.push("var_click_" + i);
}

// Group B: var_click_00 and var_click_13 to var_click_24
var groupB_names = ["var_click_00"];
for (var i = 13; i <= 24; i++) {
    groupB_names.push("var_click_" + i);
}

// Collect selected values
function getSelections(varNames) {
    return varNames
        .map(name => player.GetVar(name))
        .filter(val => val && val.toString().trim() !== "")
        .map(val => val.toString().trim());
}

var selectionsA = getSelections(groupA_names);
var selectionsB = getSelections(groupB_names);

// Build full answer string
var allSelections = selectionsA.concat(selectionsB);
var answer1 = "(" + allSelections.join("/") + ")";

// xAPI grading — update with your correct answer
var interaction1 = slideTitle + " type:click(1/4/7/10/13/14/20/26):" + answer1;
player.SetVar("QuizInteraction", interaction1);

// Answer comparison logic
function compareString(str) {
    const match = str.match(/\((.*?)\):\((.*?)\)/);
    if (!match) return false;
    const left = match[1].split("/").sort();
    const right = match[2].split("/").sort();
    if (left.length !== right.length) return false;
    for (let i = 0; i < left.length; i++) {
        if (left[i] !== right[i]) return false;
    }
    return true;
}

// Score calculation
var correct1 = compareString(interaction1);
player.SetVar("score_" + slideTitle, Number(correct1));

// Group-based answered logic: must select at least one from A and one from B
var answered = selectionsA.length > 0 && selectionsB.length > 0;
player.SetVar("var_answered", answered);
player.SetVar(slideTitle + "_correct", correct1);
player.SetVar(slideTitle + "_answered", answered);

// Global assessment path
var globalassessmentpath = player.GetVar("GlobalAssessmentPath") + "-" + interaction1;
player.SetVar("GlobalAssessmentPath", globalassessmentpath);


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

window.Script54 = function()
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

window.Script55 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script56 = function()
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

window.Script57 = function()
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

window.Script58 = function()
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

window.Script59 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script60 = function()
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

window.Script61 = function()
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

window.Script62 = function()
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script69 = function()
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

window.Script70 = function()
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

window.Script71 = function()
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

window.Script72 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script73 = function()
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

window.Script74 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script75 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script76 = function()
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

window.Script77 = function()
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

window.Script78 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var vars1 = ["q2_fill_1", "q2_fill_2", "q2_fill_3"];    //CHANGE  
  
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
var interaction1 = slideTitle + " type:fill(0/6/12):" + answer1;        //CHANGE  
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

window.Script79 = function()
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

window.Script80 = function()
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
}

window.Script82 = function()
{
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
var slideId = slideTitle + "(" + slideNumber + ").R(I)";
player.SetVar("SlideId",slideId);
var path = player.GetVar("Path")+"-"+player.GetVar("SlideId");
player.SetVar("Path",path);
var globalpath=player.GetVar("SlideId")+"/"+player.GetVar("Path");
player.SetVar("GlobalNavigationPath",globalpath);
}

window.Script84 = function()
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

window.Script85 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script86 = function()
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

window.Script90 = function()
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

window.Script91 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script92 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script93 = function()
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

window.Script94 = function()
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

window.Script95 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script96 = function()
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

window.Script97 = function()
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

window.Script98 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script99 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script100 = function()
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

window.Script106 = function()
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

window.Script107 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script108 = function()
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

window.Script109 = function()
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script116 = function()
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

window.Script117 = function()
{
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script119 = function()
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

window.Script122 = function()
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

window.Script123 = function()
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

window.Script124 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script125 = function()
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

window.Script126 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script127 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script128 = function()
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

window.Script129 = function()
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

window.Script130 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var vars1 = ["q3_fill_1", "q3_fill_2", "q3_fill_3", "q3_fill_4", "q3_fill_5", "q3_fill_6", "q3_fill_7", "q3_fill_8", "q3_fill_9", "q3_fill_10", "q3_fill_11",  "q3_fill_12", "q3_fill_13", "q3_fill_14", "q3_fill_15", "q3_fill_16", "q3_fill_17", "q3_fill_18"];    //CHANGE  
  
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
var interaction1 = slideTitle + " type:fill(0/4/8/12/16/20/24/28/0/5/10/15/20/25/30/35/0/20):" + answer1;        //CHANGE  
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

window.Script131 = function()
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

window.Script132 = function()
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

window.Script133 = function()
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

window.Script134 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script135 = function()
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
}

window.Script137 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script138 = function()
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

window.Script139 = function()
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

window.Script140 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script141 = function()
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

window.Script142 = function()
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

window.Script143 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script144 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script145 = function()
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

window.Script146 = function()
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

window.Script147 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script148 = function()
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

window.Script149 = function()
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

window.Script150 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script151 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script152 = function()
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

window.Script153 = function()
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

window.Script154 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script155 = function()
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

window.Script156 = function()
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

window.Script157 = function()
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

window.Script158 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script159 = function()
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

window.Script160 = function()
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

window.Script161 = function()
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script163 = function()
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

window.Script164 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script165 = function()
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

window.Script166 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script167 = function()
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

window.Script168 = function()
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

window.Script169 = function()
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
  
var vars1 = ["q4_fill_1", "q4_fill_2", "q4_fill_3", "q4_fill_4", "q4_fill_5", "q4_fill_6", "q4_fill_7", "q4_fill_8", "q4_fill_9", "q4_fill_10", "q4_fill_11",  "q4_fill_12", "q4_fill_13", "q4_fill_14", "q4_fill_15", "q4_fill_16", "q4_fill_17", "q4_fill_18"];    //CHANGE  
  
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
var interaction1 = slideTitle + " type:fill(0/3/6/9/12/15/18/21/0/7/14/21/28/35/42/49/0/21):" + answer1;        //CHANGE  
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
var slideId = slideTitle + "(" + slideNumber + ").R(I)";
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
var slideId = slideTitle + "(" + slideNumber + ").R(C)";
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
var slideId = slideTitle + "(" + slideNumber + ").2(I)";
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
var slideId = slideTitle + "(" + slideNumber + ").1(C)";
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

window.Script210 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script211 = function()
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

window.Script212 = function()
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

window.Script213 = function()
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script215 = function()
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

window.Script216 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
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
}

window.Script218 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script219 = function()
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

window.Script220 = function()
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

window.Script221 = function()
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

window.Script224 = function()
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

window.Script225 = function()
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

window.Script226 = function()
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

window.Script227 = function()
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

window.Script228 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script229 = function()
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

window.Script230 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script231 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script232 = function()
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

window.Script233 = function()
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

window.Script234 = function()
{
  // Set scene  
var player = GetPlayer();  
var slideTitle = player.GetVar("SlideTitle");  
var score = 0;  
  
var vars1 = ["q5_fill_1", "q5_fill_2", "q5_fill_3", "q5_fill_4", "q5_fill_5", "q5_fill_6", "q5_fill_7", "q5_fill_8", "q5_fill_9", "q5_fill_10", "q5_fill_11",  "q5_fill_12", "q5_fill_13", "q5_fill_14", "q5_fill_15"];    //CHANGE  
  
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
var interaction1 = slideTitle + " type:fill(0/2/4/6/8/10/0/4/8/12/16/20/0/4/8):" + answer1;        //CHANGE  
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

window.Script235 = function()
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

window.Script236 = function()
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

window.Script237 = function()
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

window.Script238 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script239 = function()
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
}

window.Script241 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script242 = function()
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

window.Script243 = function()
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

window.Script244 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script245 = function()
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

window.Script246 = function()
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

window.Script247 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script248 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script249 = function()
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

window.Script250 = function()
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

window.Script251 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script252 = function()
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

window.Script253 = function()
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

window.Script254 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script255 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script256 = function()
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

window.Script257 = function()
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

window.Script258 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script259 = function()
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

window.Script260 = function()
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

window.Script261 = function()
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

window.Script262 = function()
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

window.Script263 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script264 = function()
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

window.Script265 = function()
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
}

window.Script273 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script274 = function()
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

window.Script275 = function()
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

window.Script276 = function()
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

window.Script277 = function()
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

window.Script278 = function()
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

window.Script279 = function()
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

window.Script280 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script281 = function()
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

window.Script282 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script283 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script284 = function()
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

window.Script285 = function()
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

window.Script286 = function()
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

window.Script287 = function()
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

window.Script288 = function()
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

window.Script289 = function()
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

window.Script290 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script291 = function()
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
}

window.Script293 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script294 = function()
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

window.Script295 = function()
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

window.Script296 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script297 = function()
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

window.Script298 = function()
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

window.Script299 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script300 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script301 = function()
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

window.Script302 = function()
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

window.Script303 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script304 = function()
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

window.Script305 = function()
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

window.Script306 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script307 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script308 = function()
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

window.Script309 = function()
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

window.Script310 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script311 = function()
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

window.Script312 = function()
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

window.Script313 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script314 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script315 = function()
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

window.Script316 = function()
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

window.Script317 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script318 = function()
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

window.Script319 = function()
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

window.Script320 = function()
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

window.Script321 = function()
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

window.Script322 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script323 = function()
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

window.Script324 = function()
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script326 = function()
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

window.Script327 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script328 = function()
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

window.Script329 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script330 = function()
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

window.Script331 = function()
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

window.Script332 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script333 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script334 = function()
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

window.Script338 = function()
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

window.Script339 = function()
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

window.Script340 = function()
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

window.Script341 = function()
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

window.Script344 = function()
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

window.Script345 = function()
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

window.Script346 = function()
{
  //Hide built-in lightbox close (x) button
var player = GetPlayer();
document.getElementById("light-box-close").style.display = "none";
}

window.Script347 = function()
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

window.Script348 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}

}

window.Script349 = function()
{
  //Getting targetBack URL
var params=decodeURIComponent(window.location.search);
var jsonparams=params.substring(8);
var obj=JSON.parse(jsonparams);
var targetBackUrl = obj['actor']['description']['targetBack'];

}

window.Script350 = function()
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

window.Script351 = function()
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

window.Script352 = function()
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

window.Script353 = function()
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

window.Script354 = function()
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

window.Script355 = function()
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

window.Script356 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script357 = function()
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

window.Script358 = function()
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

window.Script359 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script360 = function()
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

window.Script361 = function()
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

window.Script362 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script363 = function()
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

window.Script364 = function()
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

window.Script365 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script366 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script367 = function()
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

window.Script368 = function()
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

window.Script369 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script370 = function()
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

window.Script371 = function()
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

window.Script372 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script373 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script374 = function()
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

window.Script375 = function()
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

window.Script376 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script377 = function()
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

window.Script378 = function()
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

window.Script379 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script380 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script381 = function()
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

window.Script382 = function()
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

window.Script383 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script384 = function()
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

window.Script385 = function()
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

window.Script386 = function()
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

window.Script387 = function()
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

window.Script388 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script389 = function()
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

window.Script390 = function()
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script392 = function()
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

window.Script393 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script394 = function()
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

window.Script395 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script396 = function()
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

window.Script397 = function()
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

window.Script398 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");
var qSound = player.GetVar(slideTitle+"_soundPlayed");


player.SetVar("var_soundPlayed", qSound);
}

window.Script399 = function()
{
  //Set scene
var player = GetPlayer();
var slideTitle = player.GetVar("SlideTitle");

player.SetVar(slideTitle+"_soundPlayed", true);
}

window.Script400 = function()
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

window.Script401 = function()
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

window.Script402 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script403 = function()
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

window.Script404 = function()
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

window.Script405 = function()
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

window.Script406 = function()
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

window.Script407 = function()
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

//Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script409 = function()
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

window.Script410 = function()
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

window.Script411 = function()
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

window.Script412 = function()
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

window.Script413 = function()
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

window.Script414 = function()
{
  //Prevent autofill suggestions
var els = document.getElementsByTagName('input');

for (var i=0; i < els.length; i++)
{
els[i].setAttribute("autocomplete", "off");
}
}

window.Script415 = function()
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

window.Script416 = function()
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

window.Script417 = function()
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

window.Script418 = function()
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

window.Script419 = function()
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

window.Script420 = function()
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

window.Script421 = function()
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

window.Script422 = function()
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

window.Script423 = function()
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

window.Script428 = function()
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
