function sendTwiReq(username){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
	document.getElementById('searchVal').disabled = "true"
	document.getElementById('searchVal').value = "";
	document.getElementById('searchVal').placeholder = "Getting user's info..";
	if(this.status == 200 && this.readyState == 4)
	{
		var obj = JSON.parse(this.responseText);
		if(obj.stream === null)
		{
		offlines(username);
		}
		else 
		{
        showInfo(obj.stream.channel.display_name,obj.stream.game,obj.stream.viewers,obj.stream.preview.medium,obj.stream.channel.logo, obj.stream.channel.url);
		}
    }
  };
  xhr.open("GET","https://api.twitch.tv/kraken/streams/"+username);
  xhr.setRequestHeader("Accept","application/vnd.twitchtv.v3+json");
  xhr.setRequestHeader("Client-ID","uixoh74d6qalk0nr4i7cq4yp7o2cuw");
  xhr.send();
}
function showInfo(username,gameName,viewers,screenS,logo,channUrl){
	document.getElementById('result').innerHTML = "<h3>"+username+" is online and playing "+gameName+" .";
	document.getElementById('result').innerHTML +="It has "+viewers+" viewers right now.</h3><p>ScreenShot:</p><img src='"+screenS+"'/>";
	document.getElementById('result').innerHTML +="<p><a href=\""+channUrl+"\">Join the viewers.</a></p>"
	end();
}
function offlines(username){
	document.getElementById('result').innerHTML = '<h3>'+username+' is currently offline or does not exist at all.</h3>';
    document.getElementById('result').innerHTML += '<a href="https://twitch.tv/'+username+'" target="_blank">Go to the channel</a>.';
	end();
}
function end(){
	document.getElementById('searchVal').value = "";
	document.getElementById('searchVal').placeholder = "Try another user..";
	document.getElementById('searchVal').disabled = ""
}