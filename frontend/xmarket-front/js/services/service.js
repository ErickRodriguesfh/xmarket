export default async function request_API(metodo, endPoint, body){
    body = JSON.stringify(body) || null;
    let response;
    let init;

    init = {
        method: metodo,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: body
    }

    response = await fetch(endPoint, init);

    /*
    if(metodo == "GET"){
        if(response.status == 200){
            dados = await response.json();
            return dados;
        }
    }
    */
   
    return response;
}