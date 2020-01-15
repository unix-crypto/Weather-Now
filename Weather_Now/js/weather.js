/**************************************************
  [Script Meteo]
  Scritto da Pierluca Corti per start2impact.it
  Plagin Utilizzati:
  	- jQuery 3.3.1
   	- openweathermap.org API 2.5
 *************************************************/
 window.onload = function(){
 	getWeatherByCity("Milano, it");
 }

 $(function(){
 	$("#request").submit(function(){
 		getWeatherByCity( $("#city").val() );
 		return false;
 	});

 	$("#state-icon").attr( "onerror", "$(this).hide()" );
 });

 function getWeatherByCity( request ){
 	var key = "b658b4b7d5c127849aa0fc3be6ca9a70";
 	var apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + key + "&units=metric&lang=it&q=";
 	$.ajax({
 		dataType: "json",
 		url: apiUrl + request,
 		data: "",
 		success: function(){ console.log("Request Completed") },
 		statusCode: {
 			400: function(){
 				swal({
 					title: "Ops..",
 					text: "A quanto pare la tua richiesta non é valida. Prova ad inserire un'altra città !",
 					icon: "error"
 				});
 			},

 			404: function(){
 				swal({
 					title: "Cosa?",
 					text: "Non credo di conoscere quella città , sicuro di averla scritta bene?",
 					icon: "warning"
 				});
 			}
 		}
 	});

 	$.getJSON( apiUrl + request,  function( data ){
 		assign(data);
 	});
 }
function assign(data){
  var ora =  new Date;
  var sunrise = new Date(data.sys.sunrise * 1000 ) ;
  var sunset = new Date(data.sys.sunset * 1000 );
  sunrise.getHours() + sunrise.getMinutes() ;
  sunset.getHours() + sunset.getMinutes();
  console.log('oario' + '=' + ora);
  console.log('sorgimento' + '=' + sunrise);
  console.log('tramonto' + '=' + sunset);
  if (ora>sunrise) {
    document.getElementById('page-content').style.backgroundImage= "url(../style/img/sfondo_giorno.jpg)";
  }
  if (ora<sunset) {
    document.getElementById('page-content').style.backgroundImage= "url(../style/img/sfondo_giorno.jpg)";
  }
  if (ora<sunrise || ora>sunset){
    document.getElementById('page-content').style.backgroundImage= "url(../style/img/sfondo_notturno.jpg)";
  }
  $("#city-name").html(data.name );
  $("#country").html(data.sys.country );
  $("#state-icon").attr("title", data.weather[0].main );
  $("#state").html(data.weather[0].description );
  $("#temp").html (parseInt(data.main.temp) + "°C" );
  $("#temp-max").html(parseInt(data.main.temp_max) + "°C" );
  $("#temp-min").html(parseInt(data.main.temp_min) + "°C" );
  $("#speed").html( data.wind.speed + " m/s" );
	$("#deg").html( data.wind.deg + "°" );
  $("#humidity").html( data.main.humidity + "%" );
}
