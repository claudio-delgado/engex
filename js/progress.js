    //Get cookie with progress.
    let progress = getCookie("progress") ? JSON.parse(getCookie("progress")) : []
    let errorCode = ""

    //Initialize alerts.
    let alert = (alertStructure, callback = false) => {
        Swal.fire(alertStructure).then((result) => {
            if(callback){
                if (result.isConfirmed) {
                    /* Get the text field */
                    let copyError = document.getElementById("inputErrorCode");
                    /* Select the text field */
                    copyError.select();
                    /* Copy the text inside the text field */
                    document.execCommand("copy");
                    Swal.fire("", "Se copió el código "+copyError.value+" al portapapeles. Pegalo en el mensaje a tu profe.", "success");
                }
            }
        })
    }

    //Structures for different types of alerts.
    let alertCodeCopied = {
        title: 'Bravo!',
        text: 'Copiaste tu código de progreso al portapapeles. Pegalo en un archivo de texto y guardalo.',
        confirmButtonText: 'De acuerdo'
    }
    let alertCodeProccesed = {
        title: 'Bravo!',
        text: 'Tu código de progreso pudo ser procesado correctamente. Ya tienes tu progreso actualizado.',
        confirmButtonText: 'De acuerdo'
    }
    
    //Event handler after clicking button to get progress code
    let clickGetCode = (e) => {
        document.querySelector("#inputGetCode").value = ""
        progress.forEach((exerciseString) => {
            document.querySelector("#inputGetCode").value += ";"+exerciseString;
        })
        document.querySelector("#inputGetCode").value = document.querySelector("#inputGetCode").value.substr(1)
        document.querySelector("#obtainCode").classList.remove("hidden")
        document.querySelectorAll("#getCode, #enterCode").forEach((elem) => elem.setAttribute("disabled", true))
        document.querySelectorAll("#getCode, #enterCode").forEach((elem) =>elem.classList.remove("bg-green-500"))
        document.querySelectorAll("#getCode, #enterCode").forEach((elem) =>elem.classList.remove("border-black-500"))
        document.querySelectorAll("#getCode, #enterCode").forEach((elem) =>elem.classList.add("bg-gray-300"))
        document.querySelectorAll("#getCode, #enterCode").forEach((elem) =>elem.classList.add("border-gray-500"))
    }

    document.querySelector("#getCode").addEventListener('click', clickGetCode);

    // Event handler for clicking Copy progress code.
    var clickCopyCode = (e) => {
        /* Get the text field */
        let copyText = document.getElementById("inputGetCode");
        /* Select the text field */
        copyText.select();
        /* Copy the text inside the text field */
        document.execCommand("copy");
        alert(alertCodeCopied)
    }

    document.querySelector("#copy").addEventListener('click', clickCopyCode);
    
    // Event handler for clicking Cancel get progress code.
    var clickCancelGetCode = (e) => {
        document.querySelector("#obtainCode").classList.add("hidden")
        document.querySelectorAll("#getCode, #enterCode").forEach((elem) => elem.removeAttribute("disabled", true))
        document.querySelectorAll("#getCode, #enterCode").forEach((elem) =>elem.classList.add("bg-green-500"))
        document.querySelectorAll("#getCode, #enterCode").forEach((elem) =>elem.classList.add("border-black-500"))
        document.querySelectorAll("#getCode, #enterCode").forEach((elem) =>elem.classList.remove("bg-gray-300"))
        document.querySelectorAll("#getCode, #enterCode").forEach((elem) =>elem.classList.remove("border-gray-500"))
    }

    document.querySelector("#cancelGet").addEventListener('click', clickCancelGetCode);

    //Event handler after clicking button to set progress code
    let clickEnterCode = (e) => {
        document.querySelector("#insertCode").classList.remove("hidden")
        document.querySelector("#inputSetCode").value = ""
        document.querySelectorAll("#enterCode, #getCode").forEach((elem) =>elem.setAttribute("disabled", true))
        document.querySelectorAll("#enterCode, #getCode").forEach((elem) =>elem.classList.remove("bg-green-500"))
        document.querySelectorAll("#enterCode, #getCode").forEach((elem) =>elem.classList.remove("border-black-500"))
        document.querySelectorAll("#enterCode, #getCode").forEach((elem) =>elem.classList.add("bg-gray-300"))
        document.querySelectorAll("#enterCode, #getCode").forEach((elem) =>elem.classList.add("border-gray-500"))
    }

    document.querySelector("#enterCode").addEventListener('click', clickEnterCode);

    // Event handler for clicking Copy progress code.
    var clickProcessCode = (e) => {
        /* Get the text field */
        let codeText = document.getElementById("inputSetCode").value;
        errorCode = ""
        //Evaluate typed code syntax.
        //1) Split string into an array separated by ;
        let codeTextArray = codeText.split(";")
        //2) Iterate array.
        let exerciseNbr = 0
        codeTextArray.forEach((exercise) => {
            //Parse exercise code
            let exerciseLen = exercise.length
            //3) Check if Mxx exists inside string, and in the right position.
            const expMxx = /^M\d\d/
            let Mxx = exercise.match(expMxx) != null ? exercise.match(expMxx).index : null
            errorCode = !errorCode && Mxx == null ? "E1"+exerciseNbr.toString().padStart(3, "0") : errorCode //Module recognition failure.
            if(!errorCode){
                //4) Check if Sxx exists inside string, and in the right position (following Mxx)
                const expMxxSxx = /^M\d\dS\d\d/
                let Sxx = exercise.match(expMxxSxx) != null ? exercise.match(expMxxSxx).index : null
                errorCode = !errorCode && Sxx == null ? "E2"+exerciseNbr.toString().padStart(3, "0") : errorCode //Submodule recognition failure.
                if(!errorCode){
                    //5) Check if Exx exists inside string, and in the right position (following Sxx)
                    const expMxxSxxExx = /^M\d\dS\d\dE\d\d/
                    let Exx = exercise.match(expMxxSxxExx) != null ? exercise.match(expMxxSxxExx).index : null
                    errorCode = !errorCode && Exx == null ? "E3"+exerciseNbr.toString().padStart(3, "0") : errorCode //Exercise recognition failure.
                    if(!errorCode){
                        //6) Check if Fx exists inside string, and in the right position (following Exx)
                        const expMxxSxxExxFx = /^M\d\dS\d\dE\d\dF\d/
                        let Fx = exercise.match(expMxxSxxExxFx) != null ? exercise.match(expMxxSxxExxFx).index : null
                        errorCode = !errorCode && Fx == null ? "E4"+exerciseNbr.toString().padStart(3, "0") : errorCode //Exercise recognition failure.
                        if(!errorCode){
                            //7) Check if Ax exists inside string, and in the right position (following Exx)
                            const expMxxSxxExxFxAx = /^M\d\dS\d\dE\d\dF\dA\d/
                            let Ax = exercise.match(expMxxSxxExxFxAx) != null ? exercise.match(expMxxSxxExxFx).index : null
                            errorCode = !errorCode && Ax == null ? "E5"+exerciseNbr.toString().padStart(3, "0") : errorCode //Exercise recognition failure.
                        }
                    }
                }
            }
            exerciseNbr++
        })
        if(errorCode){
            let alertCodeWrong = {
                title: '🤦🏻‍♂️ Oops!',
                showDenyButton: true,
                confirmButtonText: "Copiar código al portapapeles",
                denyButtonText: "Oh 😔. Intentaré reescribirlo",
                html: '<p class="text-left font-bold text-red-500">El código ingresado tiene un error.</p>'+
                    '<p class="text-left">Verificá que lo hayas seleccionado completamente y no falte ni una única letra o número. Pegalo nuevamente y volvé a procesarlo.</p>'+
                    '<p class="text-left mt-2">Si continúa el error, contacta a tu profesor y enviale el siguiente código:</p>'+
                    '<p class="text-left mt-2"><input id="inputErrorCode" type="text" class="font-bold w-17 text-center border border-slate-300 rounded-md py-2 shadow-sm" value="'+errorCode+'"/>',
            }
            alert(alertCodeWrong, callback = true)
        } else {
            //Set cookie with parsed progress code.
            setCookie("progress", JSON.stringify(codeText.split(";")), 60)
            alert(alertCodeProccesed)
        }
    }

    document.querySelector("#set").addEventListener('click', clickProcessCode);
    
    // Event handler for clicking Copy progress code.
    var changeCode = (e) => {
        if(e.target.value != ""){
            document.querySelector("#set").classList.remove("bg-gray-300")
            document.querySelector("#set").classList.add("bg-green-500")
            document.querySelector("#set").removeAttribute("disabled")
        } else {
            document.querySelector("#set").classList.add("bg-gray-300")
            document.querySelector("#set").classList.remove("bg-green-500")
            document.querySelector("#set").addAttribute("disabled")
        }
    }
    document.querySelector("#inputSetCode").addEventListener('keyup', changeCode);

    // Event handler for clicking Cancel set progress code.
    var clickCancelEnterCode = (e) => {
        document.querySelector("#insertCode").classList.add("hidden")
        document.querySelectorAll("#enterCode, #getCode").forEach((elem) =>elem.removeAttribute("disabled"))
        document.querySelectorAll("#enterCode, #getCode").forEach((elem) =>elem.classList.add("bg-green-500"))
        document.querySelectorAll("#enterCode, #getCode").forEach((elem) =>elem.classList.add("border-black-500"))
        document.querySelectorAll("#enterCode, #getCode").forEach((elem) =>elem.classList.remove("bg-gray-300"))
        document.querySelectorAll("#enterCode, #getCode").forEach((elem) =>elem.classList.remove("border-gray-500"))
    }

    document.querySelector("#cancelSet").addEventListener('click', clickCancelEnterCode);

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
