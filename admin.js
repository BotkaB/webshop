window.addEventListener("load", init);
function ID(elem) {
  return document.getElementById(elem);
}
function init() {

  kiir();
 
    
}
var termekek = JSON.parse(localStorage.getItem("adatok"));

function kiir() {

  let tabla = "";
 

  tabla +=
    `
<div class="d-grid gap-2 d-md-block">
<a href="szerkesztes.html" class="btn btn-primary" id="modosit">Termék hozzáadása</a>
<a href="megrendelesadmin.html" class="btn btn-secondary" id="rendelesek">Rendelések kezelése</a>
</div>
 <table class="table ">
 <thead>
<tr><th class="cursor-pointer" onclick="rendez('id')" style="color: blue">ID</th><th class="cursor-pointer" onclick="rendez('title')" style="color: blue">Title</th><th class="cursor-pointer" onclick="rendez('price')" style="color: blue">Price</th><th>Description</th><th class="cursor-pointer" onclick="rendez('category')">Category</th><th>Image</th></tr>
</thead>
<tbody>`
  termekek.forEach(element => {
    tabla +=
      `
    <tr><td>${element.id}</td><td>${element.title}</td><td>${element.price}</td>
    <td>${element.description}</td><td>${element.category}</td><td><img src="${element.image}" height="50px"></td>
    <td><a href="szerkesztes.html?id=${element.id}" class="btn btn-primary" id="kat3${element}">Szerkeszt</a></td>
    </tr>
    `
  });
  tabla += `</tbody></table>`
  ID("tablazat").innerHTML = tabla

}

var szamlalo = 1;


function rendez(oszlop) {

  
  szamlalo++;
  

  

  if (szamlalo % 2 == 0) {
    termekek = (termekek.sort((a, b) => (a[oszlop] > b[oszlop]) ? 1 : (a[oszlop] === b[oszlop]) ? ((a[oszlop] > b[oszlop]) ? 1 : -1) : -1));
  }
  else {
    termekek = (termekek.sort((a, b) => (b[oszlop] > a[oszlop]) ? 1 : (a[oszlop] === b[oszlop]) ? ((b[oszlop] > a[oszlop]) ? 1 : -1) : -1));


  }


  kiir();
 


}

