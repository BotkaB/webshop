window.addEventListener("load", init);
function ID(elem) {
  return document.getElementById(elem);
}
function init() {

  adminkiir();

}

let megrendelesek = JSON.parse(localStorage.getItem("megrendelesek"));


function adminkiir() {
  let rendelestabla = "";
  rendelestabla += `
    <table class="table ">
    <thead>
    <tr><th >Sorsz</th><th> Dátum</th><th>Vevő neve</th><th>Termékek száma</th><th>Végösszeg</th><th>Rendelés teljesítve</th></tr>
    </thead>`

  megrendelesek.forEach(element => {


    rendelestabla += `
      
    <tbody>`




    rendelestabla +=
      `<tr><td>${element.sorsz}</td><td>${element.datum}</td><td>${element.nev}</td><td>${element.kosar.length}</td><td>${element.osszesen}</td>
            <td>${element.teljesitve ? "igen" : `nem\t<button type="button" class="btn btn-sm btn-info" onclick="teljesitve(${element.sorsz})">Teljesítve</button>`}</td>
      <td><a href="megrendeles.html?id=${element.sorsz}" class="btn btn-secondary" id="kat3${element}">Részletek</a></td></tr>`

  });

  rendelestabla += `</tbody></table>`


  ID("tablazat").innerHTML = rendelestabla;




}
function teljesitve(sorsz) {
  megrendelesek.forEach(element =>{
    if(element.sorsz==sorsz){
      element.teljesitve=true;
    }
  });
  adminkiir();
  localStorage.setItem("megrendelesek", JSON.stringify(megrendelesek))
}
