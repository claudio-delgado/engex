// Get querystring from URL.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//Check if module and submodule were provided. Otherwise, reset to 1.
let module = urlParams.get("module") ? parseInt(urlParams.get("module")) : 1;
document.getElementById("module").innerText = module.toString().padStart(2, "0")
let moduleObject = selectWhere(modules, "1_module", module)[0]
document.querySelector("#module_info").innerHTML = moduleObject["1_module_info"]
let submodule = urlParams.get("submodule") ? parseInt(urlParams.get("submodule")) : 1;
let submoduleObject = selectWhere(submodules, "2_submodule", submodule)[0]
document.querySelector("#submodule_info").innerHTML = submoduleObject["2_submodule_info"]
document.getElementById("submodule").innerText = submodule.toString().padStart(2, "0")

//Get cookie with progress.
let progress = getCookie("progress") ? JSON.parse(getCookie("progress")) : []

//Event handler after clicking a collapse icon
let clickCollapse = (e) => {
    let buttonClicked = e.target.closest("button")
    let svgClasses = buttonClicked.querySelector("svg").classList
    if(svgClasses.contains("rotate-180")){
        document.querySelectorAll(".collapseIcon").forEach((element) => {
            element.classList.add("bg-pink-600") 
            element.classList.remove("bg-pink-800")
        })
        document.querySelectorAll("#exercise-collapse .exerciseBody").forEach((element) => {
            element.classList.add("hidden")
        })
        document.querySelectorAll("#exercise-collapse svg").forEach((element) => {
            element.classList.add("rotate-180")
        })
    }
    svgClasses.toggle("rotate-180")
    buttonClicked.classList.toggle("bg-pink-600")
    buttonClicked.classList.toggle("bg-pink-800")
    let bodyId = buttonClicked.getAttribute("data-accordion-target")
    document.querySelector(bodyId).classList.toggle("hidden")
}

let exerciseNbr = 1
exercises.forEach((item) => {
    if(item["1_module"] == module && item["2_submodule"] == submodule){
        let H2 = document.createElement("H2")
        H2.id = "exercise-heading-"+exerciseNbr
        H2.className = "mt-1"
        let button = document.createElement("button")
        button.setAttribute("type", "button")
        button.setAttribute("data-accordion-target", "#exercise-body-"+exerciseNbr)
        button.className = "collapseIcon text-3vw flex items-center justify-between w-full px-3 p-1 text-white border border-b-0 border-pink-800 bg-pink-600 gap-3"
        let p = document.createElement("p")
        p.className = "flex items-center justify-start p-0"
        let img = document.createElement("img")
        img.setAttribute("src", "images/kitty2.png")
        img.setAttribute("width", "4%")
        img.className = "me-3"
        p.appendChild(img)
        p.innerHTML+= "<span><strong>Exercise "+exerciseNbr+"</strong>: "+item["3_exercise_info"]+"</span>"
        button.appendChild(p)
        button.innerHTML += "<svg data-accordion-icon class=\"w-3 h-3 rotate-180 shrink-0\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 10 6\">"+
                                "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5 5 1 1 5\"/>"+
                            "</svg>"
        button.addEventListener("click", clickCollapse)
        H2.appendChild(button)
        //Put header on accordion, show on screen
        document.getElementById('exercise-collapse').appendChild(H2)
        //Check progress for this exercise.
        let exerciseAnswers = [], exerciseFullyCorrected = false, fillableNbr = null
        progress.forEach((progressItem) => {
            progressModule = progressItem.substr(1,2)*1 //M[xx]
            progressSubmodule = progressItem.substr(4,2)*1 //MxxS[xx]
            progressExercise = progressItem.substr(7,2)*1 //MxxSxxE[xx]
            if(progressModule == item["1_module"] && progressSubmodule == item["2_submodule"] && progressExercise == item["3_exercise"]){
                fillableNbr = progressItem.substr(10,1)-1 //MxxSxxExxF[x]
                answerNbr = progressItem.substr(12,2)-1 //MxxSxxExxFxA[xx]
                exerciseAnswers.push(item["5_possibleAnswers"][fillableNbr][answerNbr])
                exerciseFullyCorrected = !fillableNbr ? true : exerciseFullyCorrected
                exerciseFullyCorrected&&= progressItem.length > 14
            }
        })
        let div1 = document.createElement("div")
        div1.id = "exercise-body-"+exerciseNbr
        div1.className = "hidden text-3vw exerciseBody w-full grid grid-flow-col justify-stretch border border-1 border-pink-600"
        document.getElementById('exercise-collapse').appendChild(div1)
        let div2 = document.createElement("div")
        div2.className = "px-3 p-1 text-black bg-pink-300 items-center"
        let exerciseWords = item["4_words"]
        let p1 = document.createElement("p")
        p1.className = "flex justify-start items-center"
        p1.innerHTML = "<img src=\"images/hellokitty-icon.png\" style=\"max-width: 8%; height: auto;\" class=\"me-2\" />"
        let span1 = document.createElement("span")
        span1.className = "leading-tight"
        let fullAnswered = true, corrected = false
        exerciseWords.forEach((word) => {
            //If it's a number, then it represents a blank for an answer.
            if(typeof(word) == 'number'){
                fillableNbr = word*1
                word = " __"+(exerciseAnswers[fillableNbr] ? "<strong>"+exerciseAnswers[fillableNbr]+"</strong>" : "?")+"__ "
                fullAnswered &&= (exerciseAnswers[fillableNbr])
            }
            span1.innerHTML+= word+" "
        })
        p1.appendChild(span1)
        div2.appendChild(p1)
        div1.appendChild(div2)
        let div3 = document.createElement("div")
        div3.className = "px-3 p-1 text-black bg-pink-300 grid grid-flow-col justify-end items-center"
        let p2 = document.createElement("p")
        p2.className = "text-pink-"+(exerciseFullyCorrected ? "700": (fullAnswered ? "500" : "300"))+" font-bold"
        p2.innerHTML = "<span class=\"me-2\">"+(exerciseFullyCorrected ? "Corregido" : (fullAnswered ? "Completado" : ""))+"</span>"+(exerciseFullyCorrected ? "<i class=\"fa fa-check\"></i>" : (fullAnswered ? "<i class=\"fa fa-edit\"></i>" : ""))
        div3.appendChild(p2)
        let p3 = document.createElement("p")
        let button1 = document.createElement("button")
        button1.className = "ms-2 p-0 px-3 button text-white bg-pink-800"
        button1.setAttribute("type", "button")
        button1.setAttribute("onClick", "window.location=\"exercise.html?module="+item["1_module"]+"&submodule="+item["2_submodule"]+"&exercise="+item["3_exercise"]+"\"")
        button1.innerHTML = "<span class=\"me-2\">Abrir</span><i class=\"ms-2 fa fa-folder-open\"></i>"
        p3.appendChild(button1)
        let button2 = document.createElement("button")
        button2.className = "ms-2 p-0 px-3 button text-white bg-pink-800"
        button2.setAttribute("type", "button")
        button2.setAttribute("onClick", "window.location=\"exercise_vocabulary.html?module="+item["1_module"]+"&submodule="+item["2_submodule"]+"&exercise="+item["3_exercise"]+"\"")
        button2.innerHTML = "<i class=\"fa fa-spell-check\"></i>"
        p3.appendChild(button2)
        div3.appendChild(p3)
        div1.appendChild(div3)
        exerciseNbr++
    }
})

// Event handler for clicking module number.
var currentModuleClick = (e) => {
    window.location = "module_list.html"
}

document.querySelector("#module").addEventListener('click', currentModuleClick);

// Event handler for clicking submodule number.
var currentSubmoduleClick = (e) => {
    window.location = "submodule_list.html?module="+module
}

document.querySelector("#submodule").addEventListener('click', currentSubmoduleClick);

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