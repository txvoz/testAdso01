window.addEventListener("load", onloadwindow)

function onloadwindow(e) {
    var btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.addEventListener("click", clickFrmSubmit);
    var arrayUsers = loadData();
    printTable(arrayUsers);
}

function clickFrmSubmit(e) {
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
    var avatar = inpAvatar.value;
    //-----
    //Creacion de objeto 
    var objUsuario = {
        "nombres": nombres, 
        "fechaNacimiento": fechaNacimiento,
        "color": color, 
        "correo": correo, 
        "rangoSalario": rangoSalario, 
        "telefono":telefono,
        "avatar": avatar
    };
    //*********/
    var arrayUsers = loadData();
    arrayUsers.push(objUsuario);
    printTable(arrayUsers);
    //*********/
    jArray = JSON.stringify(arrayUsers);
    localStorage.setItem("usersData",jArray);
    //*********/
    resetData.click();
}

function loadData() {
    var arrayUsers = [];
    //*********/
    var usersData = localStorage.getItem("usersData");
    if(usersData === null) {
        localStorage.setItem("usersData","[]");
    } else {
        arrayUsers = JSON.parse(usersData);
    }
    return arrayUsers;
}

function printTable(data) {
    var html = "";
    for(var i=0; i < data.length; i++) {
        html += "<tr>"
        html += "<th scope='row'>"+(i+1)+"</th>"
        html += "<td>"+data[i].nombres+"</td>";
        html += "<td>"+data[i].fechaNacimiento+"</td>";
        html += "<td>"+data[i].color+"</td>";
        html += "<td>"+data[i].correo+"</td>";
        html += "<td>"+data[i].rangoSalario+"</td>";
        html += "<td>"+data[i].telefono+"</td>";
        html += "<td>"+data[i].avatar+"</td>";
        html += "</tr>"
    }
    bodyList.innerHTML = html;
}