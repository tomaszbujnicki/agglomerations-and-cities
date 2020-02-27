let cityFillColor = "green";
let cityFillOpacity = 1;
let cityClassName = "small";


var mymap = L.map('mapid').setView([51.110, 17.030], 4);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'zielonykwas/ck5nzpx3u037y1ip67n59m7qq',
	accessToken: 'pk.eyJ1IjoiemllbG9ueWt3YXMiLCJhIjoiY2s1bGlncWgyMDU4NDNrcWl2cGYweHV1YiJ9.UGamVCbOWZHvAEdFAJoUcw'
}).addTo(mymap);

const POPULATION = {
	cityPopulation: {
		big:   2500000,
		medium: 500000,
		small:  100000
	},
	population: {
		big:   10000000,
		medium: 3000000,
		small:  1000000
	}
};


function populationFunction(x, population) {
	if (x > population.big) return population.big;
	if (x > population.medium) return population.medium;
	if (x > population.small) return population.small;
}

for (i = 0; i < cities.length; i++) {
	const cityPopulation = POPULATION.cityPopulation;
	switch (populationFunction(cities[i].population, cityPopulation)) {
		case cityPopulation.big:
			cityFillColor = document.getElementById("colorBigCity").value;
			cityFillOpacity = 1;
			cityClassName = "bigCity";
			break;
		case cityPopulation.medium:
			cityFillColor = document.getElementById("colorMediumCity").value;
			cityFillOpacity = 1;
			cityClassName = "mediumCity";
			break;
		case cityPopulation.small:
			cityFillColor = document.getElementById("colorSmallCity").value;
			cityFillOpacity = 1;
			cityClassName = "smallCity";
			break;

		default:
			cityFillColor = "green";
			cityFillOpacity = 0.5;
			cityClassName = "smallCiy";
	}
	let circle = L.circle(
		[cities[i].latitude, cities[i].longitude], {
			fillColor: cityFillColor,
			fillOpacity: cityFillOpacity,
			radius: Math.sqrt(cities[i].population * 1000),
			className: cityClassName + " cityClass",
			stroke: false,
		}
	).addTo(mymap);
	let popupLabel = cities[i].name + " " + cities[i].population.toLocaleString();
	circle.bindPopup(popupLabel);
}

for (i = 0; i < agglomerations.length; i++) {
	const population = POPULATION.population;

	switch (populationFunction(agglomerations[i].population, population)) {
		case population.big:
			cityFillColor = document.getElementById("colorBig").value;
			cityFillOpacity = 1;
			cityClassName = "big";
			break;
		case population.medium:
			cityFillColor = document.getElementById("colorMedium").value;
			cityFillOpacity = 1;
			cityClassName = "medium";
			break;
		case population.small:
			cityFillColor = document.getElementById("colorSmall").value;
			cityFillOpacity = 1;
			cityClassName = "small";
			break;

		default:
			cityFillColor = "green";
			cityFillOpacity = 0.5;
			cityClassName = "small";
	}
	let circle = L.circle(
		[agglomerations[i].latitude, agglomerations[i].longitude], {
			fillColor: cityFillColor,
			fillOpacity: cityFillOpacity,
			radius: Math.sqrt(agglomerations[i].population * 1000),
			className: cityClassName + " aglomeracjaClass hide",
			stroke: false,
		}
	).addTo(mymap);
	let popupLabel = agglomerations[i].name + " " + agglomerations[i].population.toLocaleString();
	circle.bindPopup(popupLabel);
}

L.control.scale().addTo(mymap);

document.getElementById("hideSmall").addEventListener("click", function () {
	let arrayCityClassName = document.getElementsByClassName("small");
	for (i = 0; i < arrayCityClassName.length; i++) {
		if (this.checked) {
			arrayCityClassName[i].classList.remove("hide");
		} else {
			arrayCityClassName[i].classList.add("hide");
		}
	}
});
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
$('#hideMedium').click(function () {
	if (this.checked) {
		$(".medium").removeClass("hide")
	} else {
		$(".medium").addClass("hide")
	}
});
$('#hideBig').click(function () {
	if (this.checked) {
		$(".big").removeClass("hide")
	} else {
		$(".big").addClass("hide")
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
document.getElementById("colorSmall").addEventListener("change", function () {
	let newColor = document.getElementById("colorSmall").value;
	let arrayCityClassName = document.getElementsByClassName("small");
	for (i = 0; i < arrayCityClassName.length; i++) {
		arrayCityClassName[i].style = "fill: " + newColor;
	}
});
document.getElementById("colorMedium").addEventListener("change", function () {
	let newColor = document.getElementById("colorMedium").value;
	let arrayCityClassName = document.getElementsByClassName("medium");
	for (i = 0; i < arrayCityClassName.length; i++) {
		arrayCityClassName[i].style = "fill: " + newColor;
	}
});
document.getElementById("colorBig").addEventListener("change", function () {
	let newColor = document.getElementById("colorBig").value;
	let arrayCityClassName = document.getElementsByClassName("big");
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

		
		if (document.getElementById("hideSmall").checked){
			$(".small").removeClass("hide")
		}
		if (document.getElementById("hideMedium").checked){
			$(".medium").removeClass("hide")
		}
		if (document.getElementById("hideBig").checked){
			$(".big").removeClass("hide")
		}
	}
});
document.getElementById("selectCities").addEventListener("change", function () {
	if (this.checked) {
		document.getElementById("map-legend_cities").classList.remove("hide");
		document.getElementById("map-legend_agglomerations").classList.add("hide");
		let arrayCityClassName = document.getElementsByClassName("aglomeracjaClass");
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
