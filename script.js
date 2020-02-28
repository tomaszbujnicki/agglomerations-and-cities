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
const placeType = [
	"city-small",
	"city-medium",
	"city-big",
	"agglomeration-small",
	"agglomeration-medium",
	"agglomeration-big",
]

for (const i in placeType){
$('#check-'+ placeType[i]).click(function () {
	if (this.checked) {
		showElementsByClassName(placeType[i]);
	} else {
		hideElementsByClassName(placeType[i]);
	}
});
}

for (const i in placeType){
	const element = document.getElementById('color-' + placeType[i]);
	element.addEventListener("change", function () {
		const newColor = element.value;
		const elementsArr = document.getElementsByClassName(placeType[i]);
		for (const i in elementsArr) {
			elementsArr[i].style = "fill: " + newColor;
		}	
	});
}




