window.addEventListener("load", init);
function ID(elem) {
  return document.getElementById(elem);
}



function init() {

  rendelesKiir();
  
  ID("mentes").innerHTML = "Elmentem";
 
  ID("mentes").onclick = function (){
    ID("mentes").style.display="none";
    window.print()};
  
}

let megrendelesek = JSON.parse(localStorage.getItem("megrendelesek"));



function rendelesKiir() {
  var url_string = location.href;
  var url = new URL(url_string);
  var id = url.searchParams.get("id");

  let megrendelo = "";
  let termekek = "";

 
  
  for (var i = 0; i < megrendelesek.length; i++) {

    if (id == megrendelesek[i].sorsz) {
  
      megrendelo += `
   
<h2>Vásárlás azonosítói</h2>
<div> Sorszáma: ${megrendelesek[i].sorsz}</div>
<div>Dátuma: ${megrendelesek[i].datum} </div>

<h2>Vevő adatai</h2>
<div>Név: ${megrendelesek[i].nev} </div>
<div>Cím: ${megrendelesek[i].cim}</div>
<div>Email: ${megrendelesek[i].email}</div>
<div>Telefon: ${megrendelesek[i].telefon}</div>
`
      termekek += `
      <table class="table ">
<thead>
<tr><th >Title</th><th> PCS</th><th>Price</th><th>Total</th></tr>
</thead>
<tbody>`

megrendelesek[i].kosar.forEach(element => {
  

      termekek +=
        `
  <tr><td>${element.title}</td><td>${element.mennyiseg}</td><td>${element.price}</td>
  <td>${element.termekara}</td>
  </tr>` 
});
  termekek += `<tr><td>összesen</td></td><td></td><td></td><td>${megrendelesek[i].osszesen}</td>
  `

      termekek += `</tbody></table>`
    }
  }
  ID("megrendelo").innerHTML = megrendelo;


  ID("termekek").innerHTML = termekek;

}
