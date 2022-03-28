const spanArray = document.getElementsByTagName("span");

/*The span are the buttons. h1 is inside the span too. 
The span with empty string is the answer area */
for(let counter=0; counter<spanArray.length; counter++){
    let elementContent = spanArray[counter].innerHTML
    if(elementContent != "<h1>Calculator</h1>" &&
    elementContent !=""){ 
        spanArray[counter].addEventListener("click", operates);
    }
}

let numArray = [];
let operatorArray = [];
// isTemporaryNumber means the number can still be changed ex. 5 to 52.
let isTemporaryNumber = false;
let isNegative = false;

//This function is for the MDAS to work.
function DivideOrMultiply(){
    let isDivideOrMultiply = false;
    do{
        // isDivideOrMultipy will be true if the last operator is times or divide.
        if(operatorArray.length == 0){
            isDivideOrMultiply = false;
        }
        for(let counter = 0; counter<operatorArray.length; counter++){
            if(operatorArray[counter] == "×"){
                let product = 0;
                product = numArray[counter] * numArray[counter+1];
                numArray.splice(counter, 2, product);
                operatorArray.splice(counter, 1);
                isDivideOrMultiply = true;
                break; // it needs to break because the operatorArray.length is changing.
            }
            else if(operatorArray[counter] == "÷"){
                let quotient = 0;
                quotient = numArray[counter] / numArray[counter+1];
                numArray.splice(counter, 2, quotient);
                operatorArray.splice(counter, 1);
                isDivideOrMultiply = true;
                break; // it needs to break because the operatorArray.length is changing.
            }
            else {
                isDivideOrMultiply = false;
            }
        }
    }while(isDivideOrMultiply == true);
}
// This will add or subtract from left to right.
function AddOrSubtract(){
    let sumOrDiff = 0;
    while(operatorArray.length != 0){
        if(operatorArray[0] == "+"){
            sumOrDiff = numArray[0] + numArray[1];
        }
        else {
            sumOrDiff = numArray[0] - numArray[1];
        }
        operatorArray.splice(0, 1);
        numArray.splice(0, 2, sumOrDiff);
    }
}

function getAnswer(){
    DivideOrMultiply();
    AddOrSubtract();
}
function showAnswerArea() {
	let answerArea = document.getElementById("answer");
	answerArea.innerHTML = "";
	for(let counter=0; counter<numArray.length; counter++){
		answerArea.innerHTML += numArray[counter];
		if(operatorArray[counter]){
			answerArea.innerHTML += operatorArray[counter];
		}
	}
}
function operates(e){
    let elementContent = e.target.innerHTML;
    const elementId = e.target.id;
    if(elementId == "clear"){
        numArray = [];
        operatorArray = [];
        isTemporaryNumber = false;
    }
    else if(elementId == "equal") {
        if(operatorArray.length + 1 == numArray.length){ //not equal to sting means there is something to compute 
            getAnswer();
        }
    }
    else if(elementContent == "+" ||
            elementContent == "−" ||
            elementContent == "×" ||
            elementContent == "÷" ){
		if(operatorArray.length != numArray.length){
			operatorArray.push(elementContent);
			isTemporaryNumber = false; //isTemporaryNumber assigned to false meaning there is a new number.
		}
    }
    else if(elementId == "cancel"){
        if(numArray.length !=  0){
            if(numArray.length == operatorArray.length){
                operatorArray.pop();
                isTemporaryNumber = true;
            }
            else {
                numArray[numArray.length - 1] = numArray[numArray.length - 1] / 10;
                numArray[numArray.length - 1] = Math.floor(numArray[numArray.length - 1]);
            }
        }
    }
	else if(elementContent == "+/-"){
		if(numArray.length == operatorArray.length){
            isNegative = true;
        }
        else {
            numArray[numArray.length - 1] *= -1;
        }
	}
    else {
        if(!isNaN(elementContent)){
            if(isTemporaryNumber){ //isTemporaryNumber assigned to true meaning the user is not done to the number.
                //this line will make ex. 2 and 3 to be 23.
                numArray[numArray.length - 1] = numArray[numArray.length - 1] * 10 + Number(elementContent);
            }
            else {
                numArray.push(isNegative ? Number(elementContent) * -1 : Number(elementContent));
				isNegative = false;
                isTemporaryNumber = true;
            }
        }
    }
    showAnswerArea(); 
}