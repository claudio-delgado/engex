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
let alert = (alertStructure, callback = false) => {
    if(!callback){ 
        Swal.fire(alertStructure)
    } else {
        Swal.fire(alertStructure).then((result) => {
            if (result.isConfirmed) {
                //Delete progress of this fillable inside exercise from cookie.
                let selectedFillable = document.querySelector(".fillableSelected")
                //Check exercise and answer from progress in cookie.
                progress.forEach((item, index, object) => {
                    progressModule = item.substr(1,2)*1 //M[xx]
                    progressSubmodule = item.substr(4,2)*1 //MxxS[xx]
                    progressExercise = item.substr(7,2)*1 //MxxSxxE[xx]
                    if(progressModule == module && progressSubmodule == submodule && progressExercise == exercise){
                        fillableId = item.substr(9,2) //MxxSxxExx[Fx]
                        answerId = item.substr(11,2) //MxxSxxExxFx[Ax]
                        if(fillableId == selectedFillable.id){
                            object.splice(index, 1)
                        }
                    }
                })
                //Save progress in cookie.
                setCookie("progress", JSON.stringify(progress), 60)
                document.querySelector("#correctionInfo").classList.add("hidden")
                selectedFillable.classList.remove("bg-red-600")
                selectedFillable.innerText = "?";
                Swal.fire("Ok!", "Se borró la corrección. Ya podés modificar la respuesta.", "success");
            }
        })
    }
}

//Structures for different types of alerts.
let alertNoExercises = {
    title: 'Oops!',
    text: 'Lo siento. No hay más ejercicios por ahora.',
    confirmButtonText: 'De acuerdo'
}
let alertRetry = {
    title: 'Reintentar',
    text: '¿Segura/o de volver a probar con otra respuesta? Tené en cuenta que la corrección del profesor se quitará.',
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Sí, quiero responder',
    showDenyButton: true,
    denyButtonText: '<i class="fa fa-thumbs-down"></i> No, mejor ver la corrección'
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
            let isNormalWord = typeof(word) == 'string'//isNaN(+word);
            
            //Create div with the word or ? mark.
            let div = document.createElement("div")
            div.className = "py-2 px-0 flex justify-center font-bold border-solid border-2 border-black "+(isNormalWord ? "text-white bg-red-500" : "text-black bg-gray-200 fillable")           
            div.innerText = isNormalWord ? word : "?"
            if(!isNormalWord){
                fillableIndex ++
                div.id = "F"+fillableIndex
            }
            //Put div on screen
            document.getElementById('exerciseFrame').appendChild(div)
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
        progress.forEach((item) => {
            progressModule = item.substr(1,2)*1 //M[xx]
            progressSubmodule = item.substr(4,2)*1 //MxxS[xx]
            progressExercise = item.substr(7,2)*1 //MxxSxxE[xx]
            if(progressModule == module && progressSubmodule == submodule && progressExercise == exercise){
                fillableId = item.substr(9,2) //MxxSxxExx[Fx]
                answerId = item.substr(11,2) //MxxSxxExxFx[Ax]
                document.querySelector("#"+fillableId).innerText = document.querySelector("#"+answerId).innerText
                //Check if answer was corrected by the teacher.
                if(item.length > 13){
                    resultId = item.substr(13,2) //MxxSxxExxFxAx[Rx]
                    resultRight = resultId.substr(1)*1
                    document.querySelector("#"+fillableId).classList.remove("bg-gray-200")
                    document.querySelector("#"+fillableId).classList.add("hover:cursor-pointer", resultRight ? "bg-green-400" : "bg-red-600")
                }
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
// Find all clickable item elements.
let clickables = document.querySelectorAll('.clickable');
//M01S01E02F1A1R1;M01S01E02F2A2R1;M01S01E03F1A1R0CQU0gdmEgc/NsbyBjb24gMWVyYSBwZXJzb25hIEkgKHlvKQ==;M01S01E01F1A2R1
// Event handler for clicking fillable items.
var fillableClick = (e) => {
    e.target.classList.toggle('selected');
    e.target.classList.toggle('fillableSelected');
    //If fillable item was previously not selected and now it is, then remember which item is.
    selectedItem = e.target.classList.contains('fillableSelected') ? e.target : null;
    let previousStateRight = e.target.classList.contains('bg-green-400')
    let previousStateWrong = e.target.classList.contains('bg-red-600')
    if(selectedItem != null){
        let progressChanged = false
        let correctionAvailable = false
        //Check exercise and answer from progress in cookie.
        progress.forEach((item, index, object) => {
            progressModule = item.substr(1,2)*1 //M[xx]
            progressSubmodule = item.substr(4,2)*1 //MxxS[xx]
            progressExercise = item.substr(7,2)*1 //MxxSxxE[xx]
            if(progressModule == module && progressSubmodule == submodule && progressExercise == exercise){
                fillableId = item.substr(9,2) //MxxSxxExx[Fx]
                answerId = item.substr(11,2) //MxxSxxExxFx[Ax]
                //Was the exercise corrected by the teacher?
                if(fillableId == selectedItem.id){
                    if(item.length > 13){
                        e.target.classList.remove('selected');
                        resultId = item.substr(13,2) //MxxSxxExxFxAx[Rx]
                        resultRight = resultId.substr(1)*1
                        //Evaluate correction and prepare special panel
                        document.querySelector("#correctionInfo").classList.remove("hidden", "bg-red-400", "bg-green-200")
                        document.querySelector("#correctionInfo").classList.add(resultRight ? "bg-green-200" : "bg-red-400")
                        document.querySelector("#answerGiven").innerText = document.querySelector("#"+fillableId).innerText.toUpperCase()
                        document.querySelector("#resultValue").innerText = resultRight ? "CORRECTA" : "INCORRECTA"
                        document.querySelector("#resultValue").classList.remove("text-red-800", "text-green-600")
                        document.querySelector("#resultValue").classList.add(resultRight ? "text-green-600" : "text-red-800")
        
                        //Was the exercise marked as wrong?
                        if(!resultRight){
                            commentId = item.substr(15) //MxxSxxExxFxAxRx[Cxxx...]
                            commentValue = commentId.substr(1)
                            document.querySelector("#commentParagraph").classList.remove("hidden")
                            document.querySelector("#retry").classList.remove("hidden")
                            document.querySelector("#commentValue").innerText = atob(commentValue)
                            document.querySelector("#commentValue").classList.remove("bg-green-600")
                            document.querySelector("#commentValue").classList.add("text-red-800")
                        } else {
                            document.querySelector("#commentParagraph").classList.add("hidden")
                            document.querySelector("#retry").classList.add("hidden")
                        }
                        correctionAvailable = true
                    } else { //Not corrected yet, so delete from progress (it's about to be changed for a new answer inmediately)
                        e.target.innerText = "?";
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
        
                        document.querySelector("#correctionInfo").classList.add("hidden")
                        if(fillableId == e.target.id){
                            object.splice(index, 1)
                            progressChanged = true
                        }
                    }
                } 
            }
        })
        if(progressChanged){
            //Save progress in cookie.
            setCookie("progress", JSON.stringify(progress), 60)
        } else {
            //Answers only available if there is no correction on the fillable.
            if(!correctionAvailable){
                //Get answerGroup index from fillable id.
                answerGroupIndex = selectedItem.id.substr(1)
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
        }
    } else { //Selection removed from fillable.
        //Hide correction info and answers panel if visible
        document.querySelector("#correctionInfo").classList.add("hidden")
        document.querySelector("#answers").classList.add("hide")
        if(selectedItem != null){
            if(selectedItem.classList.contains("bg-green-400") || selectedItem.classList.contains("bg-red-600")){
                selectedItem.classList.remove("selected")
            }
        } else {
            if(previousStateRight || previousStateWrong){
                e.target.classList.remove("selected")
            }
        }
    }
}

// Event handler for clicking clickable items.
var clickableClick = (e) => {
    selectedItem.innerText = e.target.innerText;
    selectedItem.classList.remove('selected');
    selectedItem.classList.remove('fillableSelected');
    document.querySelector("#answers").classList.add("hide");
    //Update cookie with new answer to exercise.
    progress.push(  "M"+module.toString().padStart(2, "0")+
                    "S"+submodule.toString().padStart(2, "0")+
                    "E"+exercise.toString().padStart(2, "0")+
                    selectedItem.id+
                    e.target.id)
    //Save progress in cookie.
    setCookie("progress", JSON.stringify(progress), 60)
}

// Iterate over all fillable items and attach click event.
fillables.forEach(item => {
    item.addEventListener('click', fillableClick);
});
// Iterate over all clickable items and attach click event.
clickables.forEach(item => {
    item.addEventListener('click', clickableClick);
});

// Event handler for clicking "reintentar" button.
let reintentarClick = (e) => {
    //window.location = "?module="+previousModule+"&submodule="+previousSubmodule+"&exercise="+previousExercise
    alert(alertRetry, callback = 1) 
}
document.querySelector("#retry").addEventListener("click", reintentarClick)

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

// Event handler for clicking progress.
var progressClick = (e) => {
    window.location = "progress.html"
}

document.querySelector("#progress").addEventListener('click', progressClick);

// Event handler for clicking correction.
var correctionClick = (e) => {
    window.location = "correction.html"
}

document.querySelector("#correction").addEventListener('click', correctionClick);

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