const STORE = [{
	question: "In what team did Michael Jordan win 3 titles?",
	answers: {
		a: "Wizards",
		b: "Bulls",
		c: "Lakers",
		d: "Cavaliers",
		e: "Spurs"
	},
	correctAnswer: "Bulls",
}, {
	question: "What University did Michael Jordan attend?",
	answers: {
		a: "USC",
		b: "MIT",
		c: "North Carolina University",
		d: "Columbia University",
		e: "UCLA"
	},
	correctAnswer: "North Carolina University",
}, {
	question: "What other sport did Michael Jordan play?",
	answers: {
		a: "Soccer",
		b: "Football",
		c: "Nascar driver",
		d: "Baseball",
		e: "Tennis"
	},
	correctAnswer: "Baseball",
}, {
	question: "In what movie did Micheal Jordan star?",
	answers: {
		a: "Tranformers",
		b: "Looney Toons",
		c: "Iron Man",
		d: "Space Jam",
		e: "Madagascar"
	},
	correctAnswer: "Space Jam",
}, {
	question: "What year did Michael Jordan win his first NBA championship?",
	answers: {
		a: "1989",
		b: "1990",
		c: "1991",
		d: "1992",
		e: "1993"
	},
	correctAnswer: "1991",
}];
let questionNumberGlobal = 0;
let indexQuestionGlobal = 0;
let scoreGlobal = 0;

function showQuestion() {
	const str = generateQuestion();
	$('.js-question-answer-list').html(str);
	console.log('SUCCESS!`showQuestions` ran');
} //showQuestion
function generateItemElement(item) {
	return ` <li>${item.question}</li>
        <ul>
            <li><input type="radio" name="question-item" id="a" value="${item.answers.a}"><label for="answ"> ${item.answers.a} </label </li>
            <li><input type="radio" name="question-item" id="b" value="${item.answers.b}"<label for="answ"> ${item.answers.b} </label </li>
            <li><input type="radio" name="question-item" id="c" value="${item.answers.c}"<label for="answ"> ${item.answers.c} </label </li>
            <li><input type="radio" name="question-item" id="d" value="${item.answers.d}"<label for="answ"> ${item.answers.d} </label </li>
            <li><input type="radio" name="question-item" id="e" value="${item.answers.e}"<label for="answ"> ${item.answers.e} </label </li>
  
            </ul>
            <button type="submit" class="button submit-button js-submit-button">Submit!</button>
            `;
} //generateItemElement
function generateQuestion() { 
	console.log("Generating question list element");
	const multipleChoiceQuestion = STORE.map( item => generateItemElement(item) );
	return multipleChoiceQuestion[indexQuestionGlobal];
} //generateQuestion
function handleNextButton() {
	$(".js-next-button").on("click", event => {
		event.preventDefault();
		questionNumberGlobal++;
		indexQuestionGlobal++;
		$(".js-next-button").hide();
		$(".js-question-number").text(`Question:${questionNumberGlobal}`);
		showQuestion();
		checked();
		$(".js-wrong-answer").text(" ");
		$(".js-right-answer").text(" ");
		$(".js-tell-user-correct-answer").text("");
		if (indexQuestionGlobal == STORE.length) {
			endOfQuiz();
		}
	});
} //handleNextButton
function handleStartButton() {
	$(".js-ready").text("Ready?");
	$(".js-start-button").on("click", event => {
	  event.preventDefault();
		questionNumberGlobal++;
		$(".js-question-number").text(`Question:${questionNumberGlobal}`);
		console.log(questionNumberGlobal);
		showQuestion();
		checked();
		//hide start button
		$(".js-start-button").hide();
		$(".js-score").text("Score: 0");
		$(".js-ready").hide();
	});
} //handleStartButton
function handleReStartButton() { //in endOfQuiz
	$(".restart-page").show();
	$(".js-restart-button").show();
	$(".js-restart-button").on("click", event => {
		$(".js-quiz").show();
		//reset everything
		scoreGlobal = 0;
		questionNumberGlobal = 1;
		indexQuestionGlobal = 0;
		$(".js-question-number").text(`Question:${questionNumberGlobal}`);
		$(".js-score").text("Score: 0");
		console.log(questionNumberGlobal);
		showQuestion();
		checked();
		$(".restart-page").hide();
	});
} //handleReStartButton
function endOfQuiz() { // in handleNextButton
	//check for STORE.length and restart quiz 
	$(".js-end-of-quiz").text("You have finished the quiz! ");
	if(scoreGlobal == 5){
	  	$(".js-your-score").text(`Score: ${scoreGlobal} / ${questionNumberGlobal-1}`);
	  	$(".js-perfect-score").text("You got a perfect score!! Congrats!!");
	}
	else if (scoreGlobal === 0){
	  	$(".js-your-score").text(`Score: ${scoreGlobal} / ${questionNumberGlobal-1}`);
	  	$(".js-perfect-score").text("What!!!! No, I can't believe it! You have to try harder!");
	}
	else if (scoreGlobal === 1){
	  	$(".js-your-score").text(`Score: ${scoreGlobal} / ${questionNumberGlobal-1}`);
	  	$(".js-perfect-score").text("Only one question right?! Study up! I'll even let you go on google!");
	}
	else if (scoreGlobal === 2){
	  	$(".js-your-score").text(`Score: ${scoreGlobal} / ${questionNumberGlobal-1}`);
	  	$(".js-perfect-score").text("You only had two questions right?? C'mon, try again!");
	}
	else if (scoreGlobal === 3){
	  	$(".js-your-score").text(`Score: ${scoreGlobal} / ${questionNumberGlobal-1}`);
	  	$(".js-perfect-score").text("You were close! I still believe in you! Give it another shot!");
	}
	else{
	  $(".js-your-score").text(`Score: ${scoreGlobal} / ${questionNumberGlobal-1}`);
	  $(".js-perfect-score").text("Ahhhhh! Almost knew everything! See if you can get a perfect score!");
	}
	$(".js-quiz").hide();
	handleReStartButton();
} //endOfQuiz
function handleSubmitButton() {
	$(".multiple-choice-form").submit("click", event => {
		event.preventDefault();
		checkCorrectAnswer();
		$(".js-next-button").show();
		$(".js-submit-button").hide();
	});
} //handleSubmitButton  
function checkCorrectAnswer() { //in handleSubmitButton
	console.log("`SUCCESS checkCorrectAnswer` function ran")
	let userInput = $('input[name=question-item]:checked').val();
	console.log(userInput);
	console.log(`This was question: ${questionNumberGlobal}`)
	if (userInput == STORE[indexQuestionGlobal].correctAnswer) {
		$(".js-right-answer").text("Yay!!! You got it right!!!");
		scoreGlobal++;
		$(".js-score").text(`Score: ${scoreGlobal}`);
		$(".js-wrong-answer").text(" ");
		$(".js-tell-user-correct-answer").text("");
	} //if
	else {
		console.log("WRONG");
		console.log(`The correct answer is: ${STORE[indexQuestionGlobal].correctAnswer}`);
		$(".js-wrong-answer").text("WRONG");
		$(".js-tell-user-correct-answer").text(`The correct answer is: ${STORE[indexQuestionGlobal].correctAnswer}`);
		$(".js-right-answer").text(" ");
	} // else 
} //checkCorrectAnswer
function checked() { //in handleStartButton, handleReStartButton, and handleNextButton
	$("#a").prop("checked", true);
} //checked
function handleEverything() {
	handleStartButton();
	handleSubmitButton();
	handleNextButton();
} //handleEverything
$(handleEverything)