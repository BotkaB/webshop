window.addEventListener("load", init);
function ID(elem) {
  return document.getElementById(elem);
}



function init() {

  kosarKiir();
 
 // ID("rendeles").onclick = megrendeles;
 $("#kosarform").on("submit",function(event){
  event.preventDefault();
  
  if(this.checkValidity()){ 
  megrendeles();
}
})




}
var termekek = JSON.parse(localStorage.getItem("kosar"));


let megrendelesek = JSON.parse(localStorage.getItem("megrendelesek"));

if (megrendelesek == null) {
  megrendelesek = [];
}



function kosarKiir() {

  let osszesen = 0;

  if (termekek==null)
  {ID("kosar").innerHTML=`<h1 style="color: red">Nem tud rendelni, üres a kosara!</h1>`;
  ID("rendeles").disabled=true;
}
  else{
  let tabla = "";

  tabla +=
    `
 <table class="table ">
 <thead>
<tr><th >Title</th><th>PCS</th><td></td><th>Price</th><th>Total</th></tr>
</thead>
<tbody>`
  termekek.forEach((element, index) => {
    osszesen += element.price * element.mennyiseg;
    tabla +=
      `
    <tr><td>${element.title}</td><td>${element.mennyiseg}</td>  
   
    <td><span class="btn-group" role="group" aria-label="Basic mixed styles example">
    <button type="button" class="btn btn-danger" id="csokkent${element}" onclick="csokkent(${index})">-</button>
    <button type="button" class="btn btn-success" id="novel${element}" onclick="novel(${index})">+</button></span></td>

    <td>${element.price}</td>
    <td>${Math.round((element.price * element.mennyiseg) * 100) / 100}</td>
    <td><a class="btn btn-danger" id="torles${element}" onclick="torol(${index})">töröl</a></td>
   
    </tr>
    
    `
  });
  tabla += `<tr><td>összesen</td></td><td></td><td></td><td></td><td>${Math.round(osszesen * 100) / 100}</td>`
  tabla += `</tbody></table>`
  ID("tablazat").innerHTML = tabla
  }
}
function torol(index) {
 
  termekek.splice(index, 1);
  mentes();
  kosarKiir();
}

function mentes() {
  localStorage.setItem("kosar", JSON.stringify(termekek))

}

function csokkent(index) {
  if (termekek[index].mennyiseg > 0) {
    termekek[index].mennyiseg--;
  }
  mentes();
  kosarKiir();
}
function novel(index) {

  termekek[index].mennyiseg++;

  mentes();
  kosarKiir();
}





function megrendeles() {
  
  let megvesz = [];
  let termekara= 0;
  let datum = new Date().toLocaleString();
  let osszesen=0;
  
  
    
 
  for (let i = 0; i < termekek.length; i++) {
    if (termekek[i].mennyiseg != 0) {
      termekara=Math.round((termekek[i].price * termekek[i].mennyiseg) * 100) / 100;
      osszesen+=termekara;
      megvesz.push({...termekek[i],termekara});
     
    }

  }
  if (megvesz.length==0)
  {ID("kosar").innerHTML=`<h1 style="color: red">Nem tud rendelni, üres a kosara!</h1>`;
 
}
else{
  megrendelesek.push(

    {
      sorsz: megrendelesek.length+1,
      datum: datum,
      
      nev: document.getElementById("nev").value,
      cim: document.getElementById("cim").value,
      telefon: document.getElementById("telefon").value,
      email: document.getElementById("email").value,
      kosar: megvesz,
  
      osszesen:Math.round(osszesen * 100) / 100,
      teljesitve:false
     
    }


  );


  
 
  localStorage.setItem("megrendelesek", JSON.stringify(megrendelesek))
  localStorage.removeItem("kosar");
  window.location.replace( `megrendeles.html?id=${megrendelesek.length}`);
  return false;

}
}
