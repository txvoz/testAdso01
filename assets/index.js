window.addEventListener("load", onloadwindow)
var avatarBase64 = null;

function onloadwindow(e) {
    var btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.addEventListener("click", clickFrmSubmit);

    var btnClearLocalStorage = document.getElementById("deleteData");
    btnClearLocalStorage.addEventListener("click", deleteLocalStorageData);

    var arrayUsers = loadData();
    printTable(arrayUsers);
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

    avatar.classList.remove("input-error");
    if (avatar.value === "") {
        avatar.classList.add("input-error");
        isValid = false;
    }

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
    var file = inpAvatar.files[0];
    getBase64(file);
    window.setTimeout(function () {
        //-----
        //Creacion de objeto 
        var objUsuario = {
            "nombres": nombres,
            "fechaNacimiento": fechaNacimiento,
            "color": color,
            "correo": correo,
            "rangoSalario": rangoSalario,
            "telefono": telefono,
            "avatar": avatarBase64
        };
        console.log(objUsuario);
        //*********/
        var arrayUsers = loadData();
        arrayUsers.push(objUsuario);
        printTable(arrayUsers);
        //*********/
        jArray = JSON.stringify(arrayUsers);
        localStorage.setItem("usersData", jArray);
        //*********/
        resetData.click();
    }, 3000);
}

function loadData() {
    var arrayUsers = [];
    //*********/
    var usersData = localStorage.getItem("usersData");
    if (usersData === null) {
        localStorage.setItem("usersData", "[]");
    } else {
        arrayUsers = JSON.parse(usersData);
    }
    return arrayUsers;
}

function printTable(data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
        html += "<tr>"
        html += "<th scope='row'>" + (i + 1) + "</th>"
        html += "<td>" + data[i].nombres + "</td>";
        html += "<td>" + data[i].fechaNacimiento + "</td>";
        html += "<td> <div class='userColor' style='background-color:" + data[i].color + "'></div> <label class='detail-color'>" + data[i].color + "</label> </td>";
        html += "<td>" + data[i].correo + "</td>";
        html += "<td>" + data[i].rangoSalario + "</td>";
        html += "<td>" + data[i].telefono + "</td>";
        html += "<td><img src='" + data[i].avatar + "' class='avatar' width='50px' height='50px' /></td>";
        html += "<td>";
        html += "<div data-id='" + i + "' class='eliminar'>Eliminar</div>";
        html += "<div data-id='" + i + "' class='editar'>Editar</div>"
        html += "</td>";
        html += "</tr>";
    }
    bodyList.innerHTML = html;

    var btnsEliminar = document.getElementsByClassName("eliminar");
    for(var i = 0; i < btnsEliminar.length; i++) {
        var btnEliminar = btnsEliminar[i];
        btnEliminar.addEventListener('click', function(e) {
            eliminar(e.target.getAttribute("data-id"));
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

function eliminar(i) {
    var arrayUsers = loadData();
    if(i >= arrayUsers.length) {
        alert("El elemento a eliminar no existe!");
        return;
    } 
    if(i < 0) {
        alert("El elemento a eliminar no es valido!");
        return;
    } 
    if(confirm("Esta seguro que desea eliminar a " + arrayUsers[i].nombres + " de la lista?")) {
        var arrTemp = [];
        for(var j = 0; j < arrayUsers.length; j++) {
            if(j != i) {
                arrTemp.push(arrayUsers[j]);
            }
        }
        jArray = JSON.stringify(arrTemp);
        localStorage.setItem("usersData", jArray);
        printTable(arrTemp);
    }
}