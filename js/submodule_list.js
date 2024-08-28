    // Get querystring from URL.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    //Check if module and submodule were provided. Otherwise, reset to 1.
    let module = urlParams.get("module") ? parseInt(urlParams.get("module")) : 1;
    document.getElementById("module").innerText = module.toString().padStart(2, "0")
    let moduleObject = selectWhere(modules, "1_module", module)[0]
    document.querySelector("#module_info").innerHTML = moduleObject["1_module_info"]

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
            document.querySelectorAll("#submodule-collapse .submoduleBody").forEach((element) => {
                element.classList.add("hidden")
            })
            document.querySelectorAll("#submodule-collapse svg").forEach((element) => {
                element.classList.add("rotate-180")
            })
        }
        svgClasses.toggle("rotate-180")
        buttonClicked.classList.toggle("bg-pink-600")
        buttonClicked.classList.toggle("bg-pink-800")
        let bodyId = buttonClicked.getAttribute("data-accordion-target")
        document.querySelector(bodyId).classList.toggle("hidden")
    }

    let submoduleNbr = 1
    submodules.forEach((item) => {
        if(item["1_module"] == module){
            let H2 = document.createElement("H2")
            H2.id = "submodule-heading-"+submoduleNbr
            H2.className = "mt-1"
            let button = document.createElement("button")
            button.setAttribute("type", "button")
            button.setAttribute("data-accordion-target", "#submodule-body-"+submoduleNbr)
            button.className = "collapseIcon text-3vw flex items-center justify-between w-full px-3 p-1 text-white border border-b-0 border-pink-800 bg-pink-600 gap-3"
            let p = document.createElement("p")
            p.className = "flex items-center justify-start"
            let img = document.createElement("img")
            img.setAttribute("src", "images/kitty2.png")
            img.setAttribute("width", "7%")
            img.className = "me-3"
            p.appendChild(img)
            p.innerHTML += "<strong>Submodule "+submoduleNbr+"</strong>: "+item["2_submodule_info"]
            button.appendChild(p)
            button.innerHTML += "<svg data-accordion-icon class=\"w-3 h-3 rotate-180 shrink-0\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 10 6\">"+
                                    "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5 5 1 1 5\"/>"+
                                "</svg>"
            button.addEventListener("click", clickCollapse)
            H2.appendChild(button)
            //Put header on accordion, show on screen
            document.getElementById('submodule-collapse').appendChild(H2)
            //Get amount of exercises for current submodule.
            let moduleExercises = selectWhere(exercises, "1_module", item["1_module"])
            let submoduleExercises = selectWhere(moduleExercises, "2_submodule", item["2_submodule"]).length
            moduleExercises = moduleExercises.length

            let div1 = document.createElement("div")
            div1.id = "submodule-body-"+submoduleNbr
            div1.className = "hidden text-3vw submoduleBody w-full grid grid-flow-col justify-stretch border border-1 border-pink-600"
            document.getElementById('submodule-collapse').appendChild(div1)
            let div2 = document.createElement("div")
            div2.className = "px-3 p-1 text-black bg-pink-300 items-center"
            let p1 = document.createElement("p")
            p1.className = "flex justify-start items-center"
            p1.innerHTML = "<img src=\"images/hellokitty-icon.png\" style=\"max-width: 8%; height: auto;\" class=\"me-2\" />"
            let span1 = document.createElement("span")
            span1.innerHTML = "Cantidad de ejercicios: <strong>"+submoduleExercises+"</strong>"
            p1.appendChild(span1)
            div2.appendChild(p1)
            div1.appendChild(div2)
            let div3 = document.createElement("div")
            div3.className = "px-3 p-1 text-black bg-pink-300 grid grid-flow-col justify-end items-center"
            let p2 = document.createElement("p")
            if(submoduleExercises){
                let button1 = document.createElement("button")
                button1.className = "ms-2 p-0 px-3 button text-white bg-pink-800"
                button1.setAttribute("type", "button")
                button1.setAttribute("onClick", "window.location=\"exercise_list.html?module="+item["1_module"]+"&submodule="+item["2_submodule"]+"\"")
                button1.innerHTML = "<span class=\"me-2\">Abrir</span><i class=\"ms-2 fa fa-folder-open\"></i>"
                p2.appendChild(button1)
            }
            div3.appendChild(p2)
            div1.appendChild(div3)
            submoduleNbr++
        }
    })

    // Event handler for clicking module number.
    var currentModuleClick = (e) => {
        window.location = "module_list.html"
    }

    document.querySelector("#module").addEventListener('click', currentModuleClick);

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
