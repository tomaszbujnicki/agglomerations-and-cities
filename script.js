var mymap = L.map('mapid').setView([51.110, 17.030], 4);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'zielonykwas/ck5nzpx3u037y1ip67n59m7qq',
	accessToken: 'pk.eyJ1IjoiemllbG9ueWt3YXMiLCJhIjoiY2s1bGlncWgyMDU4NDNrcWl2cGYweHV1YiJ9.UGamVCbOWZHvAEdFAJoUcw'
}).addTo(mymap);

L.control.scale().addTo(mymap);

const POPULATION = {
	city: {
		big:   2500000,
		medium: 500000,
	},
	agglomeration: {
		big:   10000000,
		medium: 3000000,
	}
};


function compareSize(placePopulation, population) {
	if (placePopulation > population.big) return "big";
	if (placePopulation > population.medium) return "medium";
	return "small";
}

drawCircles(cities,"city");
drawCircles(agglomerations,"agglomeration");

function drawCircles (placesArr,type){
	let fillColor = "green";
	let className = "small";
	const colorBig = document.getElementById("color-" + type + "-big").value
	const colorMedium = document.getElementById("color-" + type + "-medium").value
	const colorSmall = document.getElementById("color-" + type + "-small").value

	for (const place of placesArr) {

	switch (compareSize(place.population, POPULATION[type])) {
		case "big":
			fillColor = colorBig;
			className = type + "-big";
			break;
		case "medium":
			fillColor = colorMedium;
			className = type + "-medium";
			break;
		case "small":
			fillColor = colorSmall;
			className = type + "-small";
			break;

		default:
			fillColor = colorSmall;
			className = type + "-small";
	}

	let circle = L.circle(
		[place.latitude, place.longitude], {
			fillColor: fillColor,
			fillOpacity: 1,
			radius: Math.sqrt(place.population * 1000),
			className: className,
			stroke: false,
		}
	).addTo(mymap);
	let popupLabel = place.name + " " + place.population.toLocaleString();
	circle.bindPopup(popupLabel);
}
}
hideElementsByClassName("agglomeration-big");
hideElementsByClassName("agglomeration-medium");
hideElementsByClassName("agglomeration-small");


function hideElementsByClassName(className){
	$("." + className).addClass("hide");
}
function showElementsByClassName(className){
	$("." + className).removeClass("hide");
}

$('#selectAgglomerations').click(function () {
	showOnMap("agglomeration")
});
$('#selectCities').click(function () {
	showOnMap("city")
});

function showOnMap(type){

	if (type === "city"){
		$('#map-legend_cities').removeClass("hide");
		if (document.getElementById("check-city-small").checked) 	showElementsByClassName("city-small");
		if (document.getElementById("check-city-medium").checked)  showElementsByClassName("city-medium");
		if (document.getElementById("check-city-big").checked) 	showElementsByClassName("city-big");
	}
	else{
		$('#map-legend_cities').addClass("hide");
		hideElementsByClassName("city-big");
		hideElementsByClassName("city-medium");
		hideElementsByClassName("city-small");

	}


	if (type === "agglomeration"){
		$('#map-legend_agglomerations').removeClass("hide");
		if (document.getElementById("check-agglomeration-small").checked) 	showElementsByClassName("agglomeration-small");
		if (document.getElementById("check-agglomeration-medium").checked)  showElementsByClassName("agglomeration-medium");
		if (document.getElementById("check-agglomeration-big").checked) 	showElementsByClassName("agglomeration-big");
	}
	else{
		$('#map-legend_agglomerations').addClass("hide");
		hideElementsByClassName("agglomeration-big");
		hideElementsByClassName("agglomeration-medium");
		hideElementsByClassName("agglomeration-small");

	}

}
const circleType = [
	"city-small",
	"city-medium",
	"city-big",
	"agglomeration-small",
	"agglomeration-medium",
	"agglomeration-big",
]

for (const i in circleType){
$('#check-'+ circleType[i]).click(function () {console.log("click");
	if (this.checked) {
		showElementsByClassName(circleType[i]);
	} else {
		hideElementsByClassName(circleType[i]);
	}
});
}
//check-agglomeration-small

/* 
$('#hideSmallCity').click(function () {
	if (this.checked) {
		$(".smallCity").removeClass("hide")
	} else {
		$(".smallCity").addClass("hide")
	}
});
$('#hideMediumCity').click(function () {
	if (this.checked) {
		$(".mediumCity").removeClass("hide")
	} else {
		$(".mediumCity").addClass("hide")
	}
});
$('#hideBigCity').click(function () {
	if (this.checked) {
		$(".bigCity").removeClass("hide")
	} else {
		$(".bigCity").addClass("hide")
	}
});
$('#hideSmallAgglomeration').click(function () {
	if (this.checked) {
		$(".smallAgglomeration").removeClass("hide")
	} else {
		$(".smallAgglomeration").addClass("hide")
	}
});
$('#hideMediumAgglomeration').click(function () {
	if (this.checked) {
		$(".mediumAgglomeration").removeClass("hide")
	} else {
		$(".mediumAgglomeration").addClass("hide")
	}
});
$('#hideBigAgglomeration').click(function () {
	if (this.checked) {
		$(".bigAgglomeration").removeClass("hide")
	} else {
		$(".bigAgglomeration").addClass("hide")
	}
});

document.getElementById("colorSmallCity").addEventListener("change", function () {
	let newColor = document.getElementById("colorSmallCity").value;
	let arrayCityClassName = document.getElementsByClassName("smallCity");
	for (i = 0; i < arrayCityClassName.length; i++) {
		arrayCityClassName[i].style = "fill: " + newColor;
	}
});
document.getElementById("colorMediumCity").addEventListener("change", function () {
	let newColor = document.getElementById("colorMediumCity").value;
	let arrayCityClassName = document.getElementsByClassName("mediumCity");
	for (i = 0; i < arrayCityClassName.length; i++) {
		arrayCityClassName[i].style = "fill: " + newColor;
	}
});
document.getElementById("colorBigCity").addEventListener("change", function () {
	let newColor = document.getElementById("colorBigCity").value;
	let arrayCityClassName = document.getElementsByClassName("bigCity");
	for (i = 0; i < arrayCityClassName.length; i++) {
		arrayCityClassName[i].style = "fill: " + newColor;
	}
});
document.getElementById("colorSmallAgglomeration").addEventListener("change", function () {
	let newColor = document.getElementById("colorSmallAgglomeration").value;
	let arrayCityClassName = document.getElementsByClassName("smallAgglomeration");
	for (i = 0; i < arrayCityClassName.length; i++) {
		arrayCityClassName[i].style = "fill: " + newColor;
	}
});
document.getElementById("colorMediumAgglomeration").addEventListener("change", function () {
	let newColor = document.getElementById("colorMediumAgglomeration").value;
	let arrayCityClassName = document.getElementsByClassName("mediumAgglomeration");
	for (i = 0; i < arrayCityClassName.length; i++) {
		arrayCityClassName[i].style = "fill: " + newColor;
	}
});
document.getElementById("colorBigAgglomeration").addEventListener("change", function () {
	let newColor = document.getElementById("colorBigAgglomeration").value;
	let arrayCityClassName = document.getElementsByClassName("bigAgglomeration");
	for (i = 0; i < arrayCityClassName.length; i++) {
		arrayCityClassName[i].style = "fill: " + newColor;
	}
});
document.getElementById("selectAgglomerations").addEventListener("change", function () {
	if (this.checked) {
		document.getElementById("map-legend_agglomerations").classList.remove("hide");
		document.getElementById("map-legend_cities").classList.add("hide");
		let arrayCityClassName = document.getElementsByClassName("cityClass");
		for (i = 0; i < arrayCityClassName.length; i++) {
			arrayCityClassName[i].classList.add("hide");
		}

		
		if (document.getElementById("hideSmallAgglomeration").checked){
			$(".smallAgglomeration").removeClass("hide")
		}
		if (document.getElementById("hideMediumAgglomeration").checked){
			$(".mediumAgglomeration").removeClass("hide")
		}
		if (document.getElementById("hideBigAgglomeration").checked){
			$(".bigAgglomeration").removeClass("hide")
		}
	}
});
document.getElementById("selectCities").addEventListener("change", function () {
	if (this.checked) {
		document.getElementById("map-legend_cities").classList.remove("hide");
		document.getElementById("map-legend_agglomerations").classList.add("hide");
		let arrayCityClassName = document.getElementsByClassName("agglomerationClass");
		for (i = 0; i < arrayCityClassName.length; i++) {
			arrayCityClassName[i].classList.add("hide");
		}


		if (document.getElementById("hideSmallCity").checked){
			$(".smallCity").removeClass("hide")
		}
		if (document.getElementById("hideMediumCity").checked){
			$(".mediumCity").removeClass("hide")
		}
		if (document.getElementById("hideBigCity").checked){
			$(".bigCity").removeClass("hide")
		}



	}
});
 */