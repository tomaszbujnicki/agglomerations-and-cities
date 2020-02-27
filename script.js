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

const POPULACJA = {
	populacjaMiasta: {
		big: 2500000,
		medium: 500000,
		small: 100000
	},
	populacja: {
		big: 10000000,
		medium: 3000000,
		small: 100000
	}
};


function populacjaFunction(x, populacja) {
	if (x > populacja.big) return populacja.big;
	if (x > populacja.medium) return populacja.medium;
	if (x > populacja.small) return populacja.small;
}

for (i = 0; i < miasta.length; i++) {
	const populacjaMiasta = POPULACJA.populacjaMiasta;
	switch (populacjaFunction(miasta[i].populacja, populacjaMiasta)) {
		case populacjaMiasta.big:
			cityFillColor = document.getElementById("colorBigCity").value;
			cityFillOpacity = 1;
			cityClassName = "bigCity";
			break;
		case populacjaMiasta.medium:
			cityFillColor = document.getElementById("colorMediumCity").value;
			cityFillOpacity = 1;
			cityClassName = "mediumCity";
			break;
		case populacjaMiasta.small:
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
		[miasta[i].szerokoscGeo, miasta[i].dlugoscGeo], {
			fillColor: cityFillColor,
			fillOpacity: cityFillOpacity,
			radius: Math.sqrt(miasta[i].populacja * 1000),
			className: cityClassName + " miastoClass",
			stroke: false,
		}
	).addTo(mymap);
	let popupLabel = miasta[i].nazwa + " " + miasta[i].populacja.toLocaleString();
	circle.bindPopup(popupLabel);
}

for (i = 0; i < metropolie.length; i++) {
	const populacja = POPULACJA.populacja;

	switch (populacjaFunction(metropolie[i].populacja, populacja)) {
		case 10000:
			cityFillColor = document.getElementById("colorBig").value;
			cityFillOpacity = 1;
			cityClassName = "big";
			break;
		case 3000:
			cityFillColor = document.getElementById("colorMedium").value;
			cityFillOpacity = 1;
			cityClassName = "medium";
			break;
		case 1000:
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
		[metropolie[i].szerokoscGeo, metropolie[i].dlugoscGeo], {
			fillColor: cityFillColor,
			fillOpacity: cityFillOpacity,
			radius: Math.sqrt(metropolie[i].populacja * 1000),
			className: cityClassName + " aglomeracjaClass hide",
			stroke: false,
		}
	).addTo(mymap);
	let popupLabel = metropolie[i].nazwa + " " + metropolie[i].populacja.toLocaleString();
	circle.bindPopup(popupLabel);
}

L.control.scale().addTo(mymap);

/*setInterval(function(){
	mymap.setView([0, 0]);
	setTimeout(function(){
		circle.setView([60, 0]);
	}, 2000);
}, 4000);*/


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
document.getElementById("wybierzAglomeracje").addEventListener("change", function () {
	if (this.checked) {
		document.getElementById("legendAglomeracje").classList.remove("hide");
		document.getElementById("legendMiasta").classList.add("hide");
		let arrayCityClassName = document.getElementsByClassName("miastoClass");
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
document.getElementById("wybierzMiasta").addEventListener("change", function () {
	if (this.checked) {
		document.getElementById("legendMiasta").classList.remove("hide");
		document.getElementById("legendAglomeracje").classList.add("hide");
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
