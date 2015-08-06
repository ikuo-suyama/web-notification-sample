console.log('Loading function');
var request = require('request');

exports.hander = function(event, context) {

    var options = {
        uri : 'https://android.googleapis.com/gcm/send',
        headers: {
            'Authorization': 'key=AIzaSyBTwceATLKG7hZ0EEwGzJ4OJ88TVi4oAjY',
            'Content-Type' : 'application/json'
        },
        form : {'registration_ids':['APA91bF-Y8foAtDoSkM2P6T0Yw7s6w01_OS_6_2QnMoFtpmKHFEBXVIedkya8N3HhxN9_mG02bpo4YDHkCj066SUstytAyIJyMh5Ky8udjtQwFVrDErYSYtp7OItGTcRwvkC-xn-A2PXrgeaM_H_Q8NOhtwc3q6-4A']},
        json : true
    }
    request.post(
        options,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("success!", body);
            } else {
                console.log("error!", body, response.statusCode);
            }
        }
    );

};
exports.hander();