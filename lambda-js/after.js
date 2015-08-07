console.log('Loading function');

var aws = require('aws-sdk');
var s3 = new aws.S3({ apiVersion: '2006-03-01' });

exports.handler = function(event, context) {
    // Get the object from the event and show its content type
    var bucket = "web-notification-sample";
    var params = {
        Bucket: bucket,
        Prefix:    "enabled",
    };

    var allKeys = [];
    // Get file list from backet
    s3.listObjects(params, function(err, data){
        if (err) {
            console.log(err);
        } else {
            allKeys = data.Contents;
            allKeys.sort(function(a,b) {
                if (a.LastModified < b.LastModified) return -1
                if (a.LastModified > b.LastModified) return 1
                return 0
            });
            console.log(allKeys);

            var commands = "";
            allKeys.forEach(function(data) {
                if (data.Key === "enabled/") return;
                commands = commands + 'curl --header "Authorization: key=AIzaSyBTwceATLKG7hZ0EEwGzJ4OJ88TVi4oAjY" --header Content-Type:"application/json" https://android.googleapis.com/gcm/send -d "{\\"registration_ids\\":[\\"' +
                data.Key.replace('enabled/','') +
                '\\"]}"<br/>';
            })

            params = {
                Bucket: bucket,
                Body:   '<html><body>' + commands + '</body></html>',
                ContentType: 'text/html',
                Key: "targets/list.html"
            }
            s3.upload(params, function(err, data) {
                if (err) {
                    console.log(err);
                    var message = "Error putting object " + key + " to bucket " + bucket +
                        ". Make sure they exist and your bucket is in the same region as this function.";
                    console.log(message, err);
                    context.fail(message);
                } else {
                    console.log(data);
                    context.succeed(data.ContentType);
                }
            });

        }
    })

};

// exports.handler();