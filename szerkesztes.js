window.addEventListener("load", init);
function ID(elem) {
    return document.getElementById(elem);
}

var index = 0;
function init() {
    betoltes();
    ID("gomb").onclick = function () {
        termekek[index].title = ID("cim").value
        termekek[index].price = ID("ár").value
        termekek[index].description = ID("leírás").value
        termekek[index].category = ID("kategória").value
        termekek[index].image = ID("kep").value
        mentes();

    };
    ID("torlesgomb").onclick = function () {
        termekek.splice(index, 1)
        mentes();
    };
}
var termekek = [];
termekek = JSON.parse(localStorage.getItem("adatok"))

function betoltes() {
    var url_string = location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

    if (id == null) {
        id = termekek[termekek.length - 1].id + 1;
        termekek.push({id:id});
        index=termekek.length - 1;
        return;
    }
    for (var i = 0; i < termekek.length; i++) {

        if (id == termekek[i].id) {
            ID("cim").value = termekek[i].title
            ID("ár").value = termekek[i].price
            ID("leírás").value = termekek[i].description
            ID("kategória").value = termekek[i].category
            ID("kep").value = termekek[i].image
            index = i;

        }
    }


}

function mentes() {
    localStorage.setItem("adatok", JSON.stringify(termekek))
    location.href = "admin.html"
}


