window.addEventListener("load", init);

function init() {

    if (localStorage.getItem("adatok")==null){
    betolt();
}
   
}
function betolt() {
    
    let adatok = []
    fetch('https://fakestoreapi.com/products')

        .then((res) => {
            console.log(res)
            return res.json();
        })
        .then((data) => {
            adatok = data
            localStorage.setItem("adatok", JSON.stringify(data))
            location.reload();
        })

    }