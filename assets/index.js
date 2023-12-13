window.addEventListener("load", onloadwindow)
var avatarBase64 = null;
var indexUser = null;
var urlApiUser = "http://localhost:8082/user";

function onloadwindow(e) {
    var btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.addEventListener("click", clickFrmSubmit);

    var btnClearLocalStorage = document.getElementById("deleteData");
    btnClearLocalStorage.addEventListener("click", deleteLocalStorageData);

    var arrayUsers = loadData();
}

function deleteLocalStorageData() {
    if (confirm("Quiere eliminar el localStorage?")) {
        localStorage.clear();
        //location.reload();
        var arrayUsers = loadData();
        printTable(arrayUsers);
    }

}

function validarForm() {
    var isValid = true;

    nombres.classList.remove("input-error");
    if (nombres.value === "") {
        nombres.classList.add("input-error");
        isValid = false;
    }

    fechaNacimiento.classList.remove("input-error");
    if (fechaNacimiento.value === "") {
        fechaNacimiento.classList.add("input-error");
        isValid = false;
    }

    correo.classList.remove("input-error");
    if (correo.value === "") {
        correo.classList.add("input-error");
        isValid = false;
    }

    telefono.classList.remove("input-error");
    if (telefono.value === "") {
        telefono.classList.add("input-error");
        isValid = false;
    }

    /*avatar.classList.remove("input-error");
    if (avatar.value === "" && indexUser === null) {
        avatar.classList.add("input-error");
        isValid = false;
    }*/

    return isValid;

}

function clickFrmSubmit(e) {
    if (!validarForm()) {
        alert("Hay campos vacios, valide el formulario!");
        return;
    }

    var txtNombres = document.getElementById("nombres");
    var nombres = txtNombres.value;
    //-----
    var txtFechaNacimiento = document.getElementById("fechaNacimiento");
    var fechaNacimiento = txtFechaNacimiento.value;
    //-----
    var txtColor = document.getElementById("color");
    var color = txtColor.value;
    //-----
    var txtCorreo = document.getElementById("correo");
    var correo = txtCorreo.value;
    //-----
    var inpRangoSalario = document.getElementById("rango_salario");
    var rangoSalario = inpRangoSalario.value;
    //-----
    var txtTelefono = document.getElementById("telefono");
    var telefono = txtTelefono.value;
    //-----
    var inpAvatar = document.getElementById("avatar");
    //var avatar = inpAvatar.value;

    /*var arrayUsers = loadData();
    if(indexUser===null || inpAvatar.value!=="") {
        var file = inpAvatar.files[0];
        getBase64(file);
    } else if(indexUser !== null && inpAvatar.value === "") {
        avatarBase64 = arrayUsers[indexUser].avatar;
    }*/

    //-----
    //Creacion de objeto 
    var objUsuario = {
        "fullName": nombres,
        "bornDate": fechaNacimiento,
        "color": color,
        "email": correo,
        "phone": telefono
    };

    if(indexUser===null) { 
        createData(objUsuario);
    } else {
        updateData(objUsuario, indexUser);
    }

    

}

function loadData() {

}

function calcularEdad(fecha) {
    var dateNacimiento = new Date(fecha);
    var now = new Date();
    var diffAnios = now - dateNacimiento; //en milisegundos
    var equMiliAnio = 31536000 * 1000;
    var aniosConDecimal = diffAnios / equMiliAnio;
    var edad = Math.ceil(aniosConDecimal);
    return edad;
}

function printTable(data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
        html += "<tr>"
        html += "<th scope='row'>" + (i + 1) + "</th>"
        html += "<td>" + data[i].fullName + "</td>";
        html += "<td>" + data[i].bornDate + "</td>";
        html += "<td>" + calcularEdad(data[i].bornDate) + "</td>";
        html += "<td> <div class='userColor' style='background-color:" + data[i].color + "'></div> <label class='detail-color'>" + data[i].color + "</label> </td>";
        html += "<td>" + data[i].email + "</td>";
        html += "<td> -- </td>";
        html += "<td>" + data[i].phone + "</td>";
        //html += "<td><img src='" + data[i].avatar + "' class='avatar' width='50px' height='50px' /></td>";
        html += "<td></td>";
        html += "<td>";
        html += "<div data-id='" + data[i].id + "' class='eliminar'>Eliminar</div>";
        html += "<div data-id='" + data[i].id + "' class='editar'>Editar</div>"
        html += "</td>";
        html += "</tr>";
    }
    bodyList.innerHTML = html;

    var btnsEliminar = document.getElementsByClassName("eliminar");
    for (var i = 0; i < btnsEliminar.length; i++) {
        var btnEliminar = btnsEliminar[i];
        btnEliminar.addEventListener('click', function (e) {
            eliminar(e.target.getAttribute("data-id"));
        });
    }

    var btnsEditar = document.getElementsByClassName("editar");
    for (var i = 0; i < btnsEditar.length; i++) {
        var btnEditar = btnsEditar[i];
        btnEditar.addEventListener('click', function (e) {
            editar(e.target.getAttribute("data-id"));
        });
    }
}

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
        avatarBase64 = reader.result;
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
        return "";
    };
}

function editar(i) {
    loadDataById(i);
}

function updateData(request, id) {
    request = JSON.stringify(request);
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", urlApiUser + "/" + id);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(request);
    //xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            indexUser = null;
            const data = xhr.response;
            console.log(data);
            loadData();
            resetData.click();
        } else {
            alert("Error al ejecutar la transaccion, el servidor no puede procesar la solicitud");
            console.log(`Error: ${xhr.status}`);
        }
    };
}

function eliminar(i) {
    if (confirm("Esta seguro que desea eliminar el registro de la lista?")) {
        deleteData(i);
    }
}

function loadDataById(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", urlApiUser + "/" +id);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {

            const data = xhr.response;
            console.log(data);
            nombres.value = data.fullName;

            var newDate =  data.bornDate.replace("T","-");
            var arrayDate = newDate.split("-");
            fechaNacimiento.value = arrayDate[0]+"-"+arrayDate[1]+"-"+arrayDate[2];
            color.value = data.color;
            correo.value = data.email;
            telefono.value = data.phone;
            indexUser = id;

        } else {
            alert("Error al ejecutar la transaccion, el servidor no puede procesar la solicitud");
            console.log(`Error: ${xhr.status}`);
        }
    };
}

function createData(request) {
    request = JSON.stringify(request);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", urlApiUser);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(request);
    //xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            console.log(data);
            loadData();
            resetData.click();
        } else {
            alert("Error al ejecutar la transaccion, el servidor no puede procesar la solicitud");
            console.log(`Error: ${xhr.status}`);
        }
    };
}

function loadData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", urlApiUser);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            console.log(data);
            printTable(data)
        } else {
            alert("Error al ejecutar la transaccion, el servidor no puede procesar la solicitud");
            console.log(`Error: ${xhr.status}`);
        }
    };
}

function deleteData(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", urlApiUser + "/" + id);
    xhr.send();
    //xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            loadData();
        } else {
            alert("Error al ejecutar la transaccion, el servidor no puede procesar la solicitud");
            console.log(`Error: ${xhr.status}`);
        }
    };
}