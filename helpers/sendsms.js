const http = require('https');

var options = {
    "method": "POST",
    "hostname": "api.msg91.com",
    "port": null,
    "path": "/api/v2/sendsms?country=91",
    "headers": {
        "authkey": "236155AYj2f1NozV5b921323",
        "content-type": "application/json"
    }
};

module.exports.sendMessage = function (message, phoneNumber) {
    let phone = phoneNumber;
    var req = http.request(options, function (res) {
        var chunks = [];
        console.log(res)
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function (res) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });
    req.write(JSON.stringify({
        sender: 'MefyIn',
        route: '4',
        country: '91',
        sms:
            [{ message: message, to: [phone] }]
    }));
    req.end();
}