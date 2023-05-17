function wyswietlLiczby(...argumenty){
    console.log(argumenty)
   }
//wyswietlLiczby(4,6,7,9,0,2) // [4, 6, 7, 9, 0, 2]node

function sumator(...argumenty){
    let suma=0
    for(let i=0; i<argumenty.length; i++){
        suma += argumenty[i]
    }
    console.log("Suma liczb ", argumenty, " to ", suma)
}

//sumator(1,2,5)
const dane = require('./dane')



dane.listaZadan.forEach((element) => {
    console.log(`${element.tekst}`)
});


var mapowanie = dane.listaZadan.map((e) => e.tekst)
console.log(mapowanie)

var filtrowanie = dane.listaZadan.filter((e) => e.zrealizowano==true)
console.log(filtrowanie)

//zad3 
var zad3 = dane.poniedzialek.concat(dane.wtorek)
.map((e) => e.czas/60)
.filter((e) => e>2)
.map((e) => e*35)
.reduce((sum, e) => [+sum+ +e], 0)
.map((sum) => `${sum}.00 zł`)
.reduce((sum, e) => e)
console.log(zad3)

