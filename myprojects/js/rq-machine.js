/*Sending request to Mashape*/
var objQuote;
var xhr = new XMLHttpRequest();
xhr.open("GET","https://andruxnet-random-famous-quotes.p.mashape.com/?count=10",false);
xhr.setRequestHeader('X-Mashape-Key','vSVTram11Ymsh9uQAxV0zDn3IbRCp1Zwo4zjsnzRgEUuYjxft2');
xhr.setRequestHeader('Accept','application/json');
xhr.onreadystatechange = function(){
	if(this.status == 200 && this.readyState == 4)
	{
		objQuote = JSON.parse(this.responseText);
	}
};
xhr.send();
/*Choose witch category and call the showing function using onclick event(check html buttons)*/
var categ = "";
var categindex = 0;
function movieCat(){
	categ = "";
    while(categ!="Movies"){
		categindex = Math.floor(Math.random()*10);
		categ = objQuote[categindex].category;
    }
		showQuote(categindex);
}
function famCat(){
	categ = "";
    while(categ!="Famous"){
		categindex = Math.floor(Math.random()*10);
		categ = objQuote[categindex].category;
    }
		showQuote(categindex);
}
/*Show*/
function showQuote(index){
		document.getElementById("quote").innerHTML = objQuote[index].quote;
		document.getElementById("author").innerHTML = objQuote[index].author;
		tweet(objQuote[index].quote,objQuote[index].author);
}
//tweet
function tweet(q,a){
	document.getElementById("tweetitbtn").href ='https://twitter.com/intent/tweet?hashtags=quotes&text='+q+'--'+a;
}