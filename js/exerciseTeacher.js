// Get querystring from URL.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//Check if module, submodule and exercise were provided. Otherwise, reset to 1. Print values on screen.
let module = urlParams.get("module") ? parseInt(urlParams.get("module")) : 1;
document.getElementById("module").innerText = module.toString().padStart(2, "0")
let submodule = urlParams.get("submodule") ? parseInt(urlParams.get("submodule")) : 1;
document.getElementById("submodule").innerText = submodule.toString().padStart(2, "0")
let exercise = urlParams.get("exercise") ? parseInt(urlParams.get("exercise")) : 1;
document.getElementById("exercise").innerText = exercise.toString().padStart(2, "0")

//Next module, submodule or exercise if they exist.
let nextModule, nextSubmodule, nextExercise = null
let previousModule, previousSubmodule, previousExercise = null

//Get cookie with progress.
let progress = getCookie("progress") ? JSON.parse(getCookie("progress")) : []

//Initialize alerts.
let alert = (alertStructure) => {
    Swal.fire(alertStructure)
}

//Structures for different types of alerts.
let alertNoExercises = {
    title: 'Oops!',
    text: 'Lo siento. No hay más ejercicios por ahora.',
    confirmButtonText: 'De acuerdo'
}
//Build exercise items.

//Build exercises with module and submodule associated info.
let exercises_modules = join(exercises, modules, "1_module")
exercises = join(exercises_modules, submodules, "2_submodule")

//Iterate exercises in the array.
exercises.forEach((element) => {
    // If module, submodule and exercise found is the same as the one to show, then check words and possible answers to display on screen.
    if(element["1_module"] == module && element["2_submodule"] == submodule && element["3_exercise"] == exercise){
        //Fillable field index.
        let fillableIndex = 0
        let fillableId = "", answerId = "", progressModule = "", progressSubmodule = "", progressExercise = ""
        
        //Complete module, submodule and exercise information.
        document.querySelector("#module_info").innerHTML = element["1_module_info"]
        document.querySelector("#submodule_info").innerHTML = element["2_submodule_info"]
        document.querySelector("#exercise_info").innerHTML = element["3_exercise_info"]
        //Iterate words in exercise.
        element["4_words"].forEach((word) => {
            //Distinguish between a normal word and a fillable expected answer.
            let isNormalWord = isNaN(+word);
            
            //Create div with the word or ? mark.
            let div = document.createElement("div")
            let divRight, divWrong
            div.className = "p-2 flex justify-center font-bold border-solid border-2 border-black "+(isNormalWord ? "text-white bg-red-500" : "text-black bg-gray-200 fillable")           
            div.innerText = isNormalWord ? word : "?"
            if(!isNormalWord){
                fillableIndex ++
                div.id = "F"+fillableIndex
                divRight = document.createElement("div")
                divRight.className = "hidden p-2 flex justify-center font-bold border-solid border-2 border-black hover:cursor-pointer text-white bg-green-800"
                divRight.innerHTML = "<i class='markable right fa fa-check pt-3'></i>"
                divWrong = document.createElement("div")
                divWrong.className = "hidden p-2 flex justify-center font-bold border-solid border-2 border-black hover:cursor-pointer text-white bg-red-800"
                divWrong.innerHTML = "<i class='markable wrong fa fa-times pt-3'></i>"
            }
            //Put div on screen
            document.getElementById('exerciseFrame').appendChild(div)
            if(!isNormalWord){
                document.getElementById('exerciseFrame').appendChild(divRight)
                document.getElementById('exerciseFrame').appendChild(divWrong)
            }
        })
        //Answer group index.
        let answerGroupIndex = 0
        //Iterate possible answers in exercise.
        element["5_possibleAnswers"].forEach((fillable) => {
            //Create div with the collection of answers.
            let div = document.createElement("div")
            div.className = "w-full answerGroup grid grid-flow-col justify-stretch p-1"
            answerGroupIndex++
            div.id = "answersGroup"+answerGroupIndex
            //Put div on screen
            document.getElementById('answersFrame').appendChild(div)
            //Answer index.
            let answerIndex = 0;
            fillable.forEach((answer) => {
                //Create div with the possible answer.
                let div = document.createElement("div")
                div.className = "p-2 clickable flex justify-center text-white font-bold border-solid border-2 border-black"
                div.innerText = answer
                answerIndex++
                div.id = "A"+answerIndex
                //Put div on screen inside the answerGroup div
                document.getElementById("answersGroup"+answerGroupIndex).appendChild(div)
            })
        })
        //Check if current module, submodule and exercise was answered and saved in progress.
        //If that's the case, update fillable with answer already saved.
        progress.forEach((item) => {
            progressModule = item.substr(1,2)*1 //M[xx]
            progressSubmodule = item.substr(4,2)*1 //MxxS[xx]
            progressExercise = item.substr(7,2)*1 //MxxSxxE[xx]
            if(progressModule == module && progressSubmodule == submodule && progressExercise == exercise){
                fillableId = item.substr(9,2) //MxxSxxExx[Fx]
                answerId = item.substr(11,3) //MxxSxxExxFx[Axx]
                let fillableElem = document.querySelector("#"+fillableId) 
                fillableElem.innerText = document.querySelector("#"+answerId).innerText
                //Correction info available?
                if(item.length > 14){
                    let correction = item.substr(14,2) //MxxSxxExxFxAxx[Rx]
                    let result = correction.substr(1) //1 or 0
                    //Answer corrected wrong?
                    if(item.length > 16){
                        //Mark answer as wrong.
                        fillableElem.classList.remove("bg-green-500", "bg-gray-200")
                        fillableElem.classList.add("bg-red-500")
                        //Show correction tip.
                        document.querySelector("#correctionTip").classList.remove("hidden")
                    } else { //Answer corrected right.
                        fillableElem.classList.remove("bg-red-500", "bg-gray-200")
                        fillableElem.classList.add("bg-green-500")
                    }
                }
                //Show correction buttons
                fillableElem.nextSibling.classList.remove("hidden")
                fillableElem.nextSibling.nextSibling.classList.remove("hidden")
            }
        })
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
                            nextModule = nextModule == null ? element["1_module"] : nextModule
                            nextSubmodule = nextSubmodule == null ? element["2_submodule"] : nextSubmodule
                            nextExercise = nextExercise == null ? element["3_exercise"] : nextExercise
                        }
                    } else {
                        //Submodule is greater than the one to show.
                        nextModule = nextModule == null ? element["1_module"] : nextModule
                        nextSubmodule = nextSubmodule == null ? element["2_submodule"] : nextSubmodule
                        nextExercise = nextExercise == null ? element["3_exercise"] : nextExercise
                    }
                }
            } else {
                //Module is greater than the one to show.
                nextModule = nextModule == null ? element["1_module"] : nextModule
                nextSubmodule = nextSubmodule == null ? element["2_submodule"] : nextSubmodule
                nextExercise = nextExercise == null ? element["3_exercise"] : nextExercise
            }
        }
        //If there exists a module, submodule or exercise inmediately higher than current one, then enable to get to next exercise.
        if(element["1_module"] == module + 1 || element["2_submodule"] == submodule + 1 || element["3_exercise"] == exercise + 1){
            nextModule = element["1_module"]
            nextSubmodule = element["2_submodule"]
            nextExercise = element["3_exercise"]
        }
    }
})

// Fillable item selected
let selectedItem = null;
// Find all fillable item elements.
let fillables = document.querySelectorAll('.fillable');
// Find all markable item elements.
let markables = document.querySelectorAll('.markable');

// Event handler for clicking markable items.
var markableClick = (e) => {
    //Clear if any, previous selected fillable item.
    if(document.querySelector(".fillableSelected")){
        document.querySelector(".fillableSelected").classList.remove("fillableSelected")
    }
    let elementClicked = e.target.parentElement
    let fillableAssociated = elementClicked.previousElementSibling.classList.contains("fillable") ? elementClicked.previousElementSibling : elementClicked.previousElementSibling.previousElementSibling
    fillableAssociated.classList.add("fillableSelected")
    //Hide answers and correction panel if visible.
    document.querySelector("#answers").classList.add("hide");
    //Correct answer?
    if(e.target.classList.contains('fa-check')){
        document.querySelector("#correctionPanel").classList.add("hide")
        //Show options if invisible.
        document.querySelector("#options").classList.remove("hide");
        if(fillableAssociated.classList.contains('bg-gray-200')){
            fillableAssociated.classList.remove("bg-gray-200")
            fillableAssociated.classList.add("bg-green-500")
        } else {
            if(fillableAssociated.classList.contains('bg-red-500')){
                fillableAssociated.classList.remove("bg-red-500")
                fillableAssociated.classList.add("bg-green-500")
            }
        }
        if(fillableAssociated.classList.contains('bg-green-500')){
            //Save correction in progress cookie
            progress.forEach((item, index, object) => {
                progressModule = item.substr(1,2)*1 //M[xx]
                progressSubmodule = item.substr(4,2)*1 //MxxS[xx]
                progressExercise = item.substr(7,2)*1 //MxxSxxE[xx]
                if(progressModule == module && progressSubmodule == submodule && progressExercise == exercise){
                    fillableId = item.substr(9,2) //MxxSxxExx[Fx]Axx
                    if(fillableId == fillableAssociated.id){
                        object[index] = object[index].substr(0, 14)+"R1"
                    }
                }
            })
            //Save progress in cookie.
            setCookie("progress", JSON.stringify(progress), 60)
        }
    } else { //Wrong answer
        if(fillableAssociated.classList.contains('bg-gray-200')){
            fillableAssociated.classList.remove("bg-gray-200")
            fillableAssociated.classList.add("bg-red-500")
        } else {
            fillableAssociated.classList.remove("bg-green-500")
            fillableAssociated.classList.add("bg-red-500")
        }
        //Show or hide incorrect answer correction panel.
        document.querySelector("#correctionPanel").classList.toggle("hide")
        //If correction comment was provided, enable "Grabar" button.
        if(document.querySelector("#inputCorrection").value){
            document.querySelector("#saveCorrection").removeAttribute("disabled")
            document.querySelector("#saveCorrection").classList.remove("bg-gray-300")
            document.querySelector("#saveCorrection").classList.remove("text-gray-600")
            document.querySelector("#saveCorrection").classList.add("bg-blue-500")
            document.querySelector("#saveCorrection").classList.add("text-black")
        }
    }
}

// Event handler for clicking fillable items.s
var fillableClick = (e) => {
    //Clear if any, previous selected fillable item.
    if(document.querySelector(".fillableSelected")){
        document.querySelector(".fillableSelected").classList.remove("fillableSelected")
    }
    e.target.classList.toggle('fillableSelected');
    //If fillable item was previously not selected and now it is, then remember which item is.
    selectedItem = e.target.classList.contains('fillableSelected') ? e.target : null;
    if(selectedItem != null){
        //Hide correction tip if visible.
        document.querySelector("#correctionTip").classList.add("hidden")
        //Answer already marked wrong?
        if(selectedItem.classList.contains("bg-red-500")){
            //Check if current module, submodule, exercise and fillable was corrected and saved in progress.
            //If that's the case, update correction info saved on screen.
            progress.forEach((item) => {
                progressModule = item.substr(1,2)*1 //Mxx
                progressSubmodule = item.substr(4,2)*1 //MxxS[xx]
                progressExercise = item.substr(7,2)*1 //MxxSxxE[xx]
                if(progressModule == module && progressSubmodule == submodule && progressExercise == exercise){
                    progressFillableId = item.substr(9,2) //MxxSxxExx[Fx]
                    progressAnswerId = item.substr(11,3) //MxxSxxExxFx[Axx]
                    //Fillable answered found
                    if(progressFillableId == selectedItem.id){
                        //Correction info available and answer corrected wrong?
                        if(item.length > 16){
                            //Show correction panel with info associated.
                            document.querySelector("#correctionPanel").classList.toggle("hide")
                            let commentString = item.substr(16) //MxxSxxExxFxAxxRx[Cxxxxxxx...]
                            let encodedComment = commentString.substr(1) //MxxSxxExxFxAxxRxC[xxxxxxx...]
                            document.querySelector("#inputCorrection").value = atob(encodedComment)
                            document.querySelector("#saveCorrection").classList.remove("text-gray-600")
                            document.querySelector("#saveCorrection").classList.remove("bg-gray-300")
                            document.querySelector("#saveCorrection").classList.add("text-black")
                            document.querySelector("#saveCorrection").classList.add("bg-blue-500")
                        }
                    }
                }
            })
        } else {
        }
    } else {
        //Hide correction tip if visible.
        document.querySelector("#correctionTip").classList.remove("hidden")
    }

    //Get answerGroup index from fillable id.
    answerGroupIndex = e.target.id.substr(1)
    //Show answers panel.
    document.querySelector("#answers").classList.toggle("hide");
    //Hide all answers groups.
    document.querySelectorAll(".answerGroup").forEach(item => {
        item.classList.add("hide")
        item.classList.remove("grid")
    })
    //Show correct answers group.
    document.querySelector("#answersGroup"+answerGroupIndex).classList.remove("hide")
    document.querySelector("#answersGroup"+answerGroupIndex).classList.add("grid")
}

// Event handler for typing anything inside comment input.
var inputCorrection = (e) => {
    if(e.target.value != ""){
        document.querySelector("#saveCorrection").classList.remove("bg-gray-300")
        document.querySelector("#saveCorrection").classList.remove("text-gray-600")
        document.querySelector("#saveCorrection").classList.add("bg-blue-500")
        document.querySelector("#saveCorrection").classList.add("text-black")
        document.querySelector("#saveCorrection").removeAttribute("disabled")
    } else {
        document.querySelector("#saveCorrection").classList.add("bg-gray-300")
        document.querySelector("#saveCorrection").classList.add("text-gray-600")
        document.querySelector("#saveCorrection").classList.remove("bg-blue-500")
        document.querySelector("#saveCorrection").classList.remove("text-black")
        document.querySelector("#saveCorrection").addAttribute("disabled")
    }
}
document.querySelector("#inputCorrection").addEventListener('keyup', inputCorrection);

// Event handler for clicking button "Grabar".
var saveCorrection = (e) => {
    //Save correction in progress cookie
    progress.forEach((item, index, object) => {
        progressModule = item.substr(1,2)*1 //M[xx]
        progressSubmodule = item.substr(4,2)*1 //MxxS[xx]
        progressExercise = item.substr(7,2)*1 //MxxSxxE[xx]
        if(progressModule == module && progressSubmodule == submodule && progressExercise == exercise){
            fillableId = item.substr(9,2) //MxxSxxExx[Fx]Axx
            fillableSelected = document.querySelector(".fillableSelected")
            if(fillableId == fillableSelected.id){
                object[index] = object[index].substr(0, 14)+"R0"+"C"+btoa(document.querySelector("#inputCorrection").value)
            }
        }
    })
    //Save progress in cookie.
    setCookie("progress", JSON.stringify(progress), 60)
}
document.querySelector("#saveCorrection").addEventListener('click', saveCorrection);

// Iterate over all fillable items and attach click event.
fillables.forEach(item => {
    item.addEventListener('click', fillableClick);
});

// Iterate over all clickable items and attach click event.
markables.forEach(item => {
    item.addEventListener('click', markableClick);
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

// Event handler for clicking submodule number.
var currentSubmoduleClick = (e) => {
    window.location = "submodule_list.html?module="+module
}

document.querySelector("#submodule").addEventListener('click', currentSubmoduleClick);

// Event handler for clicking module number.
var currentModuleClick = (e) => {
    window.location = "module_list.html"
}

document.querySelector("#module").addEventListener('click', currentModuleClick);

// Event handler for clicking correction.
var correctionClick = (e) => {
    window.location = "./correctionTeacher.html"
}

document.querySelector("#correction").addEventListener('click', correctionClick);

// Event handler for clicking home.
var homeClick = (e) => {
    window.location = "./"
}

document.querySelector("#home").addEventListener('click', homeClick);