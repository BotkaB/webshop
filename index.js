window.addEventListener("load", init);
function ID(elem) {
    return document.getElementById(elem);
}
function init() {
    kategoriaTermek = [];
    kategoriak();
    termekMegnez(termekek);
    ID("keres").addEventListener("click",
        function () {
            let x = ID("szoveg").value.toLowerCase()
            let y = ""
            
            let keresett = [];
            for (let i = 0; i < termekek.length; i++) {
                if (termekek[i].title.toLowerCase().includes(x) || termekek[i].description.toLowerCase().includes(x)) {
                    keresett.push(termekek[i])
                   
                }

            }

           // termekMegnez(keresett);
           if(keresett.length==0){
            ID("termekek").innerHTML = "Nincs találat."
        }
           else{
            termekMegnez(keresett);
           }
           
        }
    );




}

let category = []
let termekek = JSON.parse(localStorage.getItem("adatok"));
let kosar = JSON.parse(localStorage.getItem("kosar"));
if (kosar == null) {
    kosar = [];
}

function kategoriak() {
    let kategoria = ""

    fetch('https://fakestoreapi.com/products/categories')

        .then((res) => {
            
            return res.json();
        })
        .then((data) => {
            category = data


            for (i = 0; i < category.length; i++) {


                kategoria += `
               
                <div  class="col-sm-6 mb-10">
                <div class="card" style="background-color: lightgrey;">
                
           
                 
           <a  class="btn btn-outline-secondary"  id="kat${i} " onclick="kategoriaMegnez(${i})"><h3>${category[i]}</h3></a>   
            
           
           </div>
          </div>`;

            }
            ID("kategoriak").innerHTML = kategoria


  

        })
}



function termekMegnez(lista) {
    let termek = "";


    for (i = 0; i < lista.length; i++) {

        termek += `
 

        <div class="col-sm-3 mb-10">


        <div  class="card h-100" " style="max-width: 19rem">
        
        

        <h5 class="card-header"   >${lista[i].title}</h5>
                   


<div class="card-body" >

<img src="${lista[i].image}"   style="max-height:100px; width:max-content;"  alt="termek[i].title" >
<!--p class="card-text">${lista[i].description}</p-->

</div>
<div class="card-footer">
<h2 class="card-text">Ár: ${lista[i].price}</h2>
<a class="btn btn-outline-primary" onclick="reszletek(${i})">Részletek</a>
<a class="btn btn-primary" id="kosar${i}" onclick="kosarbaTesz(${i})">Kosár</a>
</div>

</div>



      </div>`;
    }
    ID("termekek").innerHTML = termek



}




function reszletek(index) {
    let tomb = kategoriaTermek.length == 0 ? termekek : kategoriaTermek;
    $("#modal .modal-title").html(tomb[index].title)
    $("#modal .modal-body #image").attr("src", tomb[index].image)
    $("#modal .modal-body #description").html(tomb[index].description)
    $("#modal .modal-body #rating").html(tomb[index].rating.rate)
    $("#modal .modal-body #rating2").html(tomb[index].rating.count)
    $("#modal .modal-body #price").html(tomb[index].price)
    $("#modal .modal-footer #vissza").off("click");
    $("#modal .modal-footer #vissza").on("click", function () { csokkent(index) });
    $("#modal .modal-footer #elore").off("click");
    $("#modal .modal-footer #elore").on("click", function () { novel(index) });
   
    $("#modal .modal-footer #kosar").off("click");
    $("#modal .modal-footer #kosar").on("click", function () { kosarbaTesz(index) });
    
    $('#modal').modal('show');



}

function csokkent(index) {
    let tomb = kategoriaTermek.length == 0 ? termekek : kategoriaTermek;
    if (index > 0) {
        index--;

    }
    else {
        index = tomb.length - 1;
    }
    reszletek(index);

}

function novel(index) {
    let tomb = kategoriaTermek.length == 0 ? termekek : kategoriaTermek;
    if (index < tomb.length - 1) {
        index++;

    }
    else {
        index = 0;
    }
    reszletek(index);

}

let kategoriaTermek = [];
function kategoriaMegnez(id) {
    kategoriaTermek = [];
    for (i = 0; i < termekek.length; i++) {
        if (category[id] == termekek[i].category) {
            kategoriaTermek.push(termekek[i]);
        }
    }
    
    termekMegnez(kategoriaTermek);

}



function kosarbaTesz(index) {

    let tomb = kategoriaTermek.length == 0 ? termekek : kategoriaTermek;
    let nincs = true;
    for (let i = 0; i < kosar.length; i++) {
        if (kosar[i].title == tomb[index].title) {
            kosar[i].mennyiseg++;
            nincs = false;
        }
    }
    if (nincs) {
        kosar.push({ ...tomb[index], mennyiseg: 1 });
    }
    



    
    localStorage.setItem("kosar", JSON.stringify(kosar));


}

