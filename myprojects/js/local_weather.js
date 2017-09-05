//Finding users location
if(navigator.geolocation)
{
  navigator.geolocation.getCurrentPosition(getCoords);
}
else document.getElementById("cityInfo").innerHTML = "Couldn't find your location.";
//Sending coords of user's to get weather information
function getCoords(position){
  SendReq(position.coords.latitude,position.coords.longitude);
}
//Sending request to yahoo
var weatherObj;
function SendReq(x,y){
	var xhr = new XMLHttpRequest();
	xhr.open("GET","https://simple-weather.p.mashape.com/weatherdata?lat="+x+"&lng="+y,true);
	xhr.setRequestHeader("X-Mashape-Key","iDodu7SghRmsh9HfSzbbeTYSmqqpp1YR1dcjsnXel3LFcUcaGW");
	//Get your own key here: https://market.mashape.com/fyhao/weather-13
	xhr.setRequestHeader("Accept","application/json");
	xhr.onreadystatechange = function (){
	if(this.readyState == 4 && this.status == 200)
	{
		weatherObj = JSON.parse(this.responseText);
		showWeather();
	}
	};
	xhr.send();
}
function showWeather(){
	document.getElementById("unitshower").style.visibility='visible';
	document.getElementById("cityInfo").innerHTML = weatherObj.query.results.channel.description;
	document.getElementById("cityInfo").href = weatherObj.query.results.channel.item.link.split('*')[1];
	today(weatherObj.query.results.channel.item.condition.temp,weatherObj.query.results.channel.item.forecast[0].high,weatherObj.query.results.channel.item.forecast[0].low);
	tomorrow(weatherObj.query.results.channel.item.forecast[1].high,weatherObj.query.results.channel.item.forecast[1].low);
}
function today(nowTemp,todayMaxTemp,todayMinTemp){
	document.getElementById("weatherImg").innerHTML = "";
	document.getElementById("weatherImg").style.backgroundImage = "url('"+weatherObj.query.results.channel.item.description.split('"')[1]+"')";
	document.getElementById("nowTemp").innerHTML = nowTemp;
	document.getElementById("todaymaxtemp").innerHTML = todayMaxTemp;
	document.getElementById("todaymintemp").innerHTML = todayMinTemp;
	document.getElementById("wind").innerHTML = "Wind Speed:"+weatherObj.query.results.channel.wind.speed+" km/h";
}
function tomorrow(tommaxtemp,tommintemp){
	document.getElementById("tomorrow").innerHTML = weatherObj.query.results.channel.item.forecast[1].day;
	document.getElementById("tommaxtemp").innerHTML = tommaxtemp;
	document.getElementById("tommintemp").innerHTML = tommintemp;
}


function convertTemp() {
	if(document.getElementById("unitshower").innerHTML == "C")
	{
		document.getElementById("unitshower").innerHTML = "F";
		today(weatherObj.query.results.channel.item.condition.temp * 9 / 5 + 32 , weatherObj.query.results.channel.item.forecast[0].high * 9 / 5 + 32 , weatherObj.query.results.channel.item.forecast[0].low * 9 / 5 + 32);
		tomorrow(weatherObj.query.results.channel.item.forecast[1].high * 9 / 5 + 32 , weatherObj.query.results.channel.item.forecast[1].low * 9 / 5 + 32);
	}
	else
	{
		document.getElementById("unitshower").innerHTML = "C";
		showWeather();
	}
}