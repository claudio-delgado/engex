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

    //Build progress code string from cookie.
    progress.forEach((exerciseString) => {
        document.querySelector("#inputGetCode").value += ";"+exerciseString;
    })
    document.querySelector("#inputGetCode").value = document.querySelector("#inputGetCode").value.substr(1)

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
    
    // Event handler for clicking home.
    var homeClick = (e) => {
        window.location = "./"
    }

    document.querySelector("#home").addEventListener('click', homeClick);
