console.log('Loading function');
var gcm = require('node-gcm');
var aws = require('aws-sdk');
var s3 = new aws.S3({ apiVersion: '2006-03-01' });

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

            // success
            var params = {
                Bucket: "web-notification-sample",
                Key:    "enabled/" + regId,
                Body:   regId
            };
            s3.upload(params, function (err, result) {
                console.log(err, result);
                context.succeed();
            })
        }
    });

    // sender.sendNoRetry(message, regIds, function (err, result) {
    //     if(err) console.error(err);
    //     else    console.log(result);
    // });
};

// please commented out when release
// exports.hander({'regId' : 'APA91bF-Y8foAtDoSkM2P6T0Yw7s6w01_OS_6_2QnMoFtpmKHFEBXVIedkya8N3HhxN9_mG02bpo4YDHkCj066SUstytAyIJyMh5Ky8udjtQwFVrDErYSYtp7OItGTcRwvkC-xn-A2PXrgeaM_H_Q8NOhtwc3q6-4A'});
