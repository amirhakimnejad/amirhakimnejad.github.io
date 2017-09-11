
//Change the language for random article and make a href attribute
function random(){
	document.getElementById('randomAr').href = "https://"+document.getElementById('langselect').value+".wikipedia.org/wiki/Special:Random";
}
//Sending search value and selected language to callWiki function
function sendInputValues(){
	callWiki(document.getElementById('langselect').value,document.getElementById('searchVal').value);
}
//Make contact with wikipedia using GET method and send responsed values to showWiki function
function callWiki(lang,searchval){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() { 
      if (xhr.readyState == 4 && xhr.status == 200)
      {
          var wikiobj = JSON.parse(xhr.responseText);
          showWiki(wikiobj[1],wikiobj[2],wikiobj[3],lang);
      }
  };
  xhr.open("GET", 'https://'+lang+'.wikipedia.org/w/api.php?action=opensearch&limit=10&search='+searchval+'&origin=*', true);
  xhr.send(null);
}
//Display wikipedia response
function showWiki(titles,summ,urls,lang){
	document.getElementById('results').innerHTML = '';
	document.getElementById('results').style.overflowY = 'scroll';
	for(var i=0 ; i<urls.length ; i++)
	{
		document.getElementById('results').innerHTML += '<div align="center" class="result"><h4>'+titles[i]+'</h4><p dir=\'rtl\' lang=\''+lang+'\'>'+summ[i]+'</p><a href="'+urls[i]+'" target="_blank"">Full article</a></div>';
  		document.getElementById('searchVal').value = "";
	}
}