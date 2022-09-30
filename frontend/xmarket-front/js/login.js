async function getCredentials(){
    let endPoint = "http://localhost:8080/login";

    let usuario = {
        "username": document.getElementById("inputEmail").value,
        "password": document.getElementById("inputPassword").value
    }
    console.log("login : " + usuario["username"])
    console.log("password : " + usuario["password"])
    
    let init = {
        method: "POST",
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            "Access-Control-Allow-Methods": "POST,GET,OPTIONS, PUT, DELETE",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        // referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(usuario)
    }


    let dados = {
        login: "",
        senha: ""
    };

    await fetch(endPoint, init)
        .then(function(response){
            return response.json()
        } )
        .then(function(data){
            console.log(data)
            dados = data;
        }).catch(eer => console.log(eer))
    return dados;
}

let btnEvent = document.getElementById("submit");

btnEvent.addEventListener('click', getCredentials);