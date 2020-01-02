document.querySelector("#starter").addEventListener("click",function(){
    fetch("http://localhost:3000/",{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({order:"do"}),
    })
    .then((response)=>response.json().then(data=>console.log(data)))
    .catch(err=>console.log(err))
})