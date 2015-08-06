console.log('Loading function');
var gcm = require('node-gcm');

exports.hander = function(event, context) {

    var regId = event.regId;

    // Notificationの内容はあくまでWorkerで登録したものとなる
    var message = new gcm.Message();

    // message.addData('key1', 'msg1');

    var regIds = [regId];

    // Set up the sender with you API key
    var sender = new gcm.Sender('AIzaSyBTwceATLKG7hZ0EEwGzJ4OJ88TVi4oAjY');

    //Now the sender can be used to send messages
    sender.send(message, regIds, function (err, result) {
        if(err) {
            console.error(err);
            context.fail();
        } else {
            context.succeed();
        }   console.log(result);
    });

    // sender.sendNoRetry(message, regIds, function (err, result) {
    //     if(err) console.error(err);
    //     else    console.log(result);
    // });
};
// exports.hander({'regId' : 'APA91bF-Y8foAtDoSkM2P6T0Yw7s6w01_OS_6_2QnMoFtpmKHFEBXVIedkya8N3HhxN9_mG02bpo4YDHkCj066SUstytAyIJyMh5Ky8udjtQwFVrDErYSYtp7OItGTcRwvkC-xn-A2PXrgeaM_H_Q8NOhtwc3q6-4A'});