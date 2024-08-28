//Get cookie with progress.
let progress = getCookie("progress") ? JSON.parse(getCookie("progress")) : []

// Event handler for button "Módulos".
var buttonModuleClick = (e) => {
    window.location = "module_list.html"
}

document.querySelector("#modules").addEventListener('click', buttonModuleClick);

// Event handler for button "Progreso".
var buttonProgressClick = (e) => {
    window.location = "progress.html"
}

document.querySelector("#progress").addEventListener('click', buttonProgressClick);

// Event handler for button "Ejercicios".
var buttonExercisesClick = (e) => {
    window.location = "exercise_list.html?module=1&submodule=1"
}

document.querySelector("#exercises").addEventListener('click', buttonExercisesClick);

// Event handler for button "Progreso".
var buttonCorrectionClick = (e) => {
    window.location = "correction.html"
}

document.querySelector("#correction").addEventListener('click', buttonCorrectionClick);