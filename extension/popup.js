$(function () {
    $('#keywordsubmit').click(function () {
        var search_topic = $('#keyword').val();
        if (search_topic) {
            chrome.runtime.sendMessage( { topic: search_topic }, function (response) {
                result = response.farewell;
                if (!("Notification" in window)) {
                    alert("This browser does not support desktop")
                };
                var options = {
                    body: result.summary,
                }
                var notification = new Notification("Wikipedia summary of your result", options);
            });
        }
        $('#keyword').val('');
    });
});