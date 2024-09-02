// Get querystring from URL.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//Check if module, submodule and exercise were provided. Otherwise, reset to 1. Print exercise on screen.
let module = urlParams.get("module") ? parseInt(urlParams.get("module")) : 1;
let submodule = urlParams.get("submodule") ? parseInt(urlParams.get("submodule")) : 1;
let exercise = urlParams.get("exercise") ? parseInt(urlParams.get("exercise")) : 1;
document.getElementById("exercise").innerText = exercise.toString().padStart(2, "0")

//Next module, submodule or exercise if they exist.
let nextModule, nextSubmodule, nextExercise = null
let previousModule, previousSubmodule, previousExercise = null

//Get cookie with progress.
let progress = getCookie("progress") ? JSON.parse(getCookie("progress")) : []

//Current vocabulary word index.
let vocabularyWordIndex = 0
//Current vocabulary answers group index.
let vocabularyGroupIndex = 0
let vocabularyMaxGroupIndex = 0
let translation = ""
//Token classes
let selectedWordClasses = "px-1 tokenSelected font-bold border border-2 border-black bg-white text-violet-500"
let unselectedWordClasses = "px-1 hover:cursor-pointer hover:bg-pink-200 tokenUnselected font-bold border border-1 border-gray-800 bg-gray-200 text-black"
let unselectabledWordClasses = "px-1 tokenUnselectabled font-bold text-gray-600"
let completedWordClasses = "px-1 tokenCompleted font-bold border border-1 border-black bg-green-200 text-black"
let wrongWordClasses = "px-1 tokenWrong font-bold border border-1 border-black bg-red-600 text-white"

//Initialize alerts.
let alert = (alertStructure, callback = false, parms = false) => {
    if(!callback){ 
        Swal.fire(alertStructure)
    } else { //Vocabulary answer selected wrong...
        Swal.fire(alertStructure).then((result) => {
            document.querySelector(parms[0]).remove()
            let tokenSelected = document.querySelector(".tokenSelected")
            tokenSelected.classList.remove(...selectedWordClasses.split(" "))
            tokenSelected.classList.add(...wrongWordClasses.split(" "))
            let tokenWord = document.querySelector("#tokenWord")
            tokenWord.classList.remove(...selectedWordClasses.split(" "))
            tokenWord.classList.add(...wrongWordClasses.split(" "))
        })
    }
}

//Structures for different types of alerts.
let alertNoExercises = {
    title: 'Oops!',
    text: 'Lo siento. No hay más ejercicios por ahora.',
    confirmButtonText: 'De acuerdo'
}
const alertRightAnswer = {
    title: 'Correcto!',
    text: 'Sí, #1 #2.',
    confirmButtonText: 'Genial!'
}
const alertWrongAnswer = {
    title: 'Oops!',
    text: 'No, #1 no #2.',
    confirmButtonText: 'Uh, de acuerdo'
}
//Build exercise items.

//Build exercises with module and submodule associated info.
let exercises_modules = join(exercises, modules, "1_module")
exercises = join(exercises_modules, submodules, "2_submodule")

// Find all clickable item elements.
let clickables = document.querySelectorAll('.clickable');
//M01S01E02F1A1R1;M01S01E02F2A2R1;M01S01E03F1A1R0CQU0gdmEgc/NsbyBjb24gMWVyYSBwZXJzb25hIEkgKHlvKQ==;M01S01E01F1A2R1

let tokenReplace = (string, tokens) => {
    //Replace tokens with new values.
    tokens.forEach((elem) => {
        string = string.replace(elem["token"], elem["token"] == "#1" ? elem["newValue"] : elem["newValue"].toLowerCase())
    })
    return string
}
// Event handler for clicking clickable items.
let clickableClick = (e) => {
    let answerId = e.target.id
    //Alert message replacements. 
    let tokens = [
        {"token": "#1", "newValue": document.querySelector("#tokenWord").innerText},
        {"token": "#2", "newValue": e.target.innerText.toLowerCase()}
    ]
    //Check if selected answer is correct.
    let correct = e.target.classList.contains("true")
    if(correct){
        let customAlertRightAnswer = {title: 'Correcto!',
                                      text: 'Sí, #1 #2.',
                                      confirmButtonText: 'Genial!'}
        //Replace words in error message. (Current word and wrong answer)
        customAlertRightAnswer.text = tokenReplace(customAlertRightAnswer.text, tokens)
        alert(customAlertRightAnswer)
        //Turn wrong mark into a selected one.
        document.querySelector(".clicked").classList.remove(...wrongWordClasses.split(" "))
        document.querySelector(".clicked").classList.add(...selectedWordClasses.split(" "))
        document.querySelector("#tokenWord").classList.remove(...wrongWordClasses.split(" "))
        document.querySelector("#tokenWord").classList.add(...selectedWordClasses.split(" "))

        //Remove vocabulary answer selected.
        document.querySelector("#"+answerId).remove()
        //Check if there are no more true answers and then clear wrong ones.
        if(document.querySelector("#answersFrame .true") == null){
            vocabularyGroupIndex++
            if(document.querySelector("#answersFrame .false") != null){
                //Answers group already completed.
                document.querySelector("#answersFrame .false").remove()
                document.getElementById("answersFrame").innerHTML = ""
            }
            //Show info about exercise and vocabulary answers on screen.
            writeExerciseInfo()
        }
        //Add correct answer as text under the question.
        document.querySelector("#vocabularyAnswers").innerHTML+= "<span class=\"text-green-700 font-bold me-2\">"+e.target.innerText+"<i class=\"fa fa-check ms-1\"/>.</span>";
        let tokenSelected = document.querySelectorAll(".tokenSelected").length
        let tokenUnselected = document.querySelectorAll(".tokenUnselected").length
        let tokenWrong = document.querySelectorAll(".tokenWrong").length
        if(vocabularyGroupIndex >= vocabularyMaxGroupIndex && !tokenSelected && !tokenUnselected && !tokenWrong){
            document.querySelector("#vocabularyAnswers").innerHTML+= "<span class=\"text-green-900 font-bold me-2\"><br/>Traducción aproximada: "+translation.toUpperCase()+"</span>"
        }
    } else {
        let customAlertWrongAnswer = {title: 'Oops!',
                                      text: 'No, #1 no #2.',
                                      confirmButtonText: 'Uh, de acuerdo'}
        //Replace words in error message. (Current word and wrong answer)
        customAlertWrongAnswer.text = tokenReplace(customAlertWrongAnswer.text, tokens)
        //Send answer id for removal.
        let parms = ["#"+answerId]
        alert(customAlertWrongAnswer, callback = true, parms)
    }
}

let writeExerciseInfo = () =>{
    //document.querySelector("#exercise_words").innerHTML = ""
    document.querySelector("#answersFrame").innerHTML = ""
    let exerciseWordListBlocked = (document.querySelector("#exercise_words").innerHTML!="")
    //Iterate exercises in the array.
    exercises.forEach((element) => {
        // If module, submodule and exercise found is the same as the one to show, then check words and possible answers to display on screen.
        if(element["1_module"] == module && element["2_submodule"] == submodule && element["3_exercise"] == exercise){
            //Iterate words in exercise.
            let currentWordIndex = 0
            let wordAmount = element["4_words"].length
            element["4_words"].forEach((word, windex) => {
                //Distinguish between a normal word and a fillable expected answer.
                let isNormalWord = typeof(word) == 'string'//isNaN(+word);
                let currentWord = isNormalWord ? word.replace(".", "") : word
                let lastWord = windex+1 == wordAmount
                //Complete exercise words.
                let classes = " "+(!isNormalWord ? unselectabledWordClasses : (currentWordIndex == vocabularyWordIndex ? selectedWordClasses + " clicked" : unselectedWordClasses))
                if(!exerciseWordListBlocked){
                    document.querySelector("#exercise_words").innerHTML+= "<span"+(isNormalWord ? " data-index=\""+currentWordIndex+"\"":"")+" class=\"mx-2"+classes+(lastWord ? " me-0" : "")+"\">"+(isNormalWord ? currentWord : "__?__")+"</span>"+(lastWord ? "." : "")
                }
                if(isNormalWord &&  currentWordIndex == vocabularyWordIndex){
                    let vocabularyFound = false
                    //Iterate vocabulary elements.
                    exercise_vocabulary.forEach((vocElem) => {
                        //Exercise found? Then process each word separately.
                        if(vocElem["1_module"] == module && vocElem["2_submodule"] == submodule && vocElem["3_exercise"] == exercise){
                            vocabularyFound = true
                            translation = vocElem["5_translation"]
                            //Iterate current exercise vocabulary word groups.
                            vocElem["4_words"].forEach((vocToken, tokenIndex) => {
                                if(vocabularyWordIndex == tokenIndex){
                                    let token = vocToken["1_token"]
                                    vocabularyMaxGroupIndex = vocToken["2_translations"].length
                                    if(token == currentWord) {
                                        document.querySelector("#tokenWord").classList.remove(...wrongWordClasses.split(" "))
                                        document.querySelector("#tokenWord").classList.add(...selectedWordClasses.split(" "))
                                        document.querySelector("#tokenWord").innerText = currentWord
                                        //Answer index.
                                        let answerIndex = 0;
                                        let divAnswers = document.createElement("div")
                                        if(vocToken["2_translations"].length > vocabularyGroupIndex){
                                            vocToken["2_translations"][vocabularyGroupIndex].sort( () => .5 - Math.random() );
                                            //Iterate current group of vocabulary answers for the token.
                                            vocToken["2_translations"][vocabularyGroupIndex].forEach((translation) => {
                                                //Create div with the possible answer.
                                                let div = document.createElement("div")
                                                div.className = "px-2 clickable "+translation["correct"].toString()+" flex justify-start text-white font-bold border-solid border-2 border-black"
                                                div.innerText = translation["answer"]
                                                answerIndex++
                                                div.id = "A"+answerIndex
                                                div.addEventListener('click', clickableClick);
                                                //Put div on screen inside the answerGroup div
                                                divAnswers.id = "answersGroup"+(vocabularyGroupIndex)
                                                divAnswers.appendChild(div)
                                            })
                                            document.getElementById("answersFrame").innerHTML+= "<div class=\"w-full px-1 text-3vw\">Seleccioná tu respuesta:</div>"
                                            document.getElementById("answersFrame").appendChild(divAnswers)
                                        } else {
                                            //Mark token as completed.
                                            document.querySelectorAll(".clicked, #tokenWord").forEach((elem) => {
                                                elem.classList.remove(...selectedWordClasses.split(" "))
                                                elem.classList.remove(...wrongWordClasses.split(" "))
                                                elem.classList.add(...completedWordClasses.split(" "))
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    })
                    if(!vocabularyFound){
                        let tokenWord = document.querySelector("#tokenWord")
                        tokenWord.classList.add(...selectedWordClasses.split(" "))
                        tokenWord.innerText = currentWord
                        let vocAnswers = document.querySelector("#vocabularyAnswers")
                        vocAnswers.innerText = "Lo siento. No hay información de vocabulario disponible para el ejercicio."
                        //vocAnswers.classList.remove("text-3vw")
                        vocAnswers.className+= " text-red-500 text-2vw"
                    }
                }
                currentWordIndex+= isNormalWord
            })
            // Clickable all unselected tokens
            let unselectedTokens = document.querySelectorAll(".tokenUnselected");
            // Iterate over all unselectedTokens and attach click event.
            unselectedTokens.forEach(item => {
                item.addEventListener('click', unselectedTokensClick);
            });
        } else {
            //If module found is smaller than the one to show, then update all previous data.
            if(element["1_module"] < module){
                previousModule = element["1_module"]
                previousSubmodule = element["2_submodule"]
                previousExercise = element["3_exercise"]
            } else {
                //Module found is not smaller than the one to show.
                //If module found is the same as the one to show, then check submodules
                if(element["1_module"] == module){
                    //If in same module, submodule found is smaller than the one to show, then update all previous data.
                    if(element["2_submodule"] < submodule){
                        previousModule = element["1_module"]
                        previousSubmodule = element["2_submodule"]
                        previousExercise = element["3_exercise"]
                    } else {
                        //Submodule found is not smaller than the one to show.
                        //If in same module and submodule, then check exercises
                        if(element["2_submodule"] == submodule){
                            //If exercise found is smaller than the one to show, then update all previous data.
                            if(element["3_exercise"] < exercise){
                                previousModule = element["1_module"]
                                previousSubmodule = element["2_submodule"]
                                previousExercise = element["3_exercise"]
                            } else { 
                                //Exercise is greater than the one to show, so update all next data.
                                if(nextModule == null && nextSubmodule == null && nextExercise == null){
                                    nextModule = nextModule == null ? element["1_module"] : nextModule
                                    nextSubmodule = nextSubmodule == null ? element["2_submodule"] : nextSubmodule
                                    nextExercise = nextExercise == null ? element["3_exercise"] : nextExercise
                                }
                            }
                        } else {
                            //Submodule is greater than the one to show.
                            if(nextModule == null && nextSubmodule == null && nextExercise == null){
                                nextModule = nextModule == null ? element["1_module"] : nextModule
                                nextSubmodule = nextSubmodule == null ? element["2_submodule"] : nextSubmodule
                                nextExercise = nextExercise == null ? element["3_exercise"] : nextExercise
                            }
                        }
                    }
                } else {
                    //Module is greater than the one to show.
                    if(nextModule == null && nextSubmodule == null && nextExercise == null){
                        nextModule = nextModule == null ? element["1_module"] : nextModule
                        nextSubmodule = nextSubmodule == null ? element["2_submodule"] : nextSubmodule
                        nextExercise = nextExercise == null ? element["3_exercise"] : nextExercise
                    }
                }
            }
        }
    })
}

//Show info about exercise and vocabulary answers on screen.
writeExerciseInfo()

var unselectedTokensClick = (e) => {
    //Unselect current selected token.
    let lastSelected = document.querySelector(".tokenSelected")
    let lastClicked = document.querySelector(".clicked")
    //Become everything "non selected"
    if(lastSelected != null){
        lastSelected.classList.remove(...selectedWordClasses.split(" "))
        lastSelected.classList.remove(...wrongWordClasses.split(" "))
        lastSelected.classList.remove("clicked")
        lastSelected.classList.add(...unselectedWordClasses.split(" "))
        lastSelected.addEventListener('click', unselectedTokensClick);
    }
    if(lastClicked != null){
        lastClicked.classList.remove("clicked")
        if(!lastClicked.classList.contains("tokenCompleted")){
            lastClicked.classList.remove(...selectedWordClasses.split(" "))
            lastClicked.classList.remove(...wrongWordClasses.split(" "))
            lastClicked.classList.add(...unselectedWordClasses.split(" "))
        }
        lastClicked.addEventListener('click', unselectedTokensClick);
    }
    //Mark as selected new token.
    e.target.classList.remove(...unselectedWordClasses.split(" "))
    e.target.classList.add(...selectedWordClasses.split(" "))
    e.target.classList.add("clicked")
    vocabularyWordIndex = e.target.getAttribute("data-index")*1
    vocabularyGroupIndex = 0
    //Update current token selected on screen.
    document.querySelector("#tokenWord").innerText = e.target.innerText
    document.querySelector("#tokenWord").classList.remove(...selectedWordClasses.split(" "))
    document.querySelector("#tokenWord").classList.remove(...wrongWordClasses.split(" "))
    document.querySelector("#tokenWord").classList.remove(...completedWordClasses.split(" "))
    document.querySelector("#tokenWord").classList.add(...selectedWordClasses.split(" "))
    //Delete previous vocabulary answers.
    document.querySelectorAll("#answersFrame div").forEach((elem) => elem.remove())
    //Delete previous completed answers.
    document.querySelector("#vocabularyAnswers").innerHTML = ""
    //Rebuild vocabulary answers panel.
    writeExerciseInfo()
}
// Clickable all unselected tokens
let unselectedTokens = document.querySelectorAll(".tokenUnselected");
// Iterate over all unselectedTokens and attach click event.
unselectedTokens.forEach(item => {
    item.addEventListener('click', unselectedTokensClick);
});

// Iterate over all clickable items and attach click event.
clickables.forEach(item => {
    item.addEventListener('click', clickableClick);
});

// Event handler for clicking "anterior" button.
let regresarClick = (e) => {
    if(previousExercise){
        window.location = "?module="+previousModule+"&submodule="+previousSubmodule+"&exercise="+previousExercise
    } else { 
        alert(alertNoExercises) 
    }
}
document.querySelector("#regresar").addEventListener("click", regresarClick)

// Event handler for clicking "avanzar" button.
let avanzarClick = (e) => {
    if(nextExercise){
        window.location = "?module="+nextModule+"&submodule="+nextSubmodule+"&exercise="+nextExercise
    } else { 
        alert(alertNoExercises) 
    }
}
document.querySelector("#avanzar").addEventListener("click", avanzarClick)

// Event handler for clicking exercise number.
var currentExerciseClick = (e) => {
    window.location = "exercise_list.html?module="+module+"&submodule="+submodule
}

document.querySelector("#exercise").addEventListener('click', currentExerciseClick);

// Event handler for clicking back.
var backClick = (e) => {
    window.history.back()
}

document.querySelector("#back").addEventListener('click', backClick);

// Event handler for clicking home.
var homeClick = (e) => {
    window.location = "./"
}

document.querySelector("#home").addEventListener('click', homeClick);