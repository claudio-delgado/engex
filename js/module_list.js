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
            document.querySelectorAll("#module-collapse .moduleBody").forEach((element) => {
                element.classList.add("hidden")
            })
            document.querySelectorAll("#module-collapse svg").forEach((element) => {
                element.classList.add("rotate-180")
            })
        }
        svgClasses.toggle("rotate-180")
        buttonClicked.classList.toggle("bg-pink-600")
        buttonClicked.classList.toggle("bg-pink-800")
        let bodyId = buttonClicked.getAttribute("data-accordion-target")
        document.querySelector(bodyId).classList.toggle("hidden")
    }

    let moduleNbr = 1
    modules.forEach((item) => {
        let H2 = document.createElement("H2")
        H2.id = "module-heading-"+moduleNbr
        H2.className = "mt-1"
        let button = document.createElement("button")
        button.setAttribute("type", "button")
        button.setAttribute("data-accordion-target", "#module-body-"+moduleNbr)
        button.className = "collapseIcon text-3vw flex items-center justify-between w-full px-3 p-1 text-white border border-b-0 border-pink-800 bg-pink-600 gap-3"
        let p = document.createElement("p")
        p.className = "flex items-center justify-start"
        let img = document.createElement("img")
        img.setAttribute("src", "images/kitty2.png")
        img.setAttribute("width", "7%")
        img.className = "me-3"
        p.appendChild(img)
        p.innerHTML += "<strong>Module "+moduleNbr+"</strong>: "+item["1_module_info"]
        button.appendChild(p)
        button.innerHTML += "<svg data-accordion-icon class=\"w-3 h-3 rotate-180 shrink-0\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 10 6\">"+
                                "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5 5 1 1 5\"/>"+
                            "</svg>"
        button.addEventListener("click", clickCollapse)
        H2.appendChild(button)
        //Put header on accordion, show on screen
        document.getElementById('module-collapse').appendChild(H2)
        //Get amount of submodules for current module.
        let moduleSubmodules = selectWhere(submodules, "1_submodule", item["1_submodule"]).length
        
        let div1 = document.createElement("div")
        div1.id = "module-body-"+moduleNbr
        div1.className = "hidden text-3vw moduleBody w-full grid grid-flow-col justify-stretch border border-1 border-pink-600"
        document.getElementById('module-collapse').appendChild(div1)
        let div2 = document.createElement("div")
        div2.className = "px-3 p-1 text-black bg-pink-300 items-center"
        let p1 = document.createElement("p")
        p1.className = "flex justify-start items-center"
        p1.innerHTML = "<img src=\"images/hellokitty-icon.png\" style=\"max-width: 8%; height: auto;\" class=\"me-2\" />"
        let span1 = document.createElement("span")
        span1.innerHTML = "Cantidad de submódulos: <strong>"+moduleSubmodules+"</strong>"
        p1.appendChild(span1)
        div2.appendChild(p1)
        div1.appendChild(div2)
        let div3 = document.createElement("div")
        div3.className = "px-3 p-1 text-black bg-pink-300 grid grid-flow-col justify-end items-center"
        let p2 = document.createElement("p")
        let button1 = document.createElement("button")
        button1.className = "ms-2 p-0 px-3 button text-white bg-pink-800"
        button1.setAttribute("type", "button")
        button1.setAttribute("onClick", "window.location=\"submodule_list.html?module="+item["1_module"]+"\"")
        button1.innerHTML = "<span class=\"me-2\">Abrir</span><i class=\"ms-2 fa fa-folder-open\"></i>"
        p2.appendChild(button1)
        div3.appendChild(p2)
        div1.appendChild(div3)
        moduleNbr++
    })

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
