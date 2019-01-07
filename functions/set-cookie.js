const cookie = require("cookie");
const jwt = require("jsonwebtoken");

exports.handler = function(event, context, callback) {
  const params = event.queryStringParameters;

  const authToken = params.token;
  const url = params.site;

  const secret = "suchSecretsMuchToHide";
  console.log("token ", authToken);
  console.log("from site ", url);

  try {
    var valid = jwt.verify(authToken, secret);
    console.log("is Valid", valid);
    console.log("token is valid ", authToken);
  } catch (e) {
    console.log("Error", e);
  }

  var hour = 3600000;
  var twoWeeks = 14 * 24 * hour;
  const netlifyCookie = cookie.serialize("nf_jwt", authToken, {
    secure: true,
    httpOnly: true,
    path: "/",
    maxAge: twoWeeks
  });

  callback(null, {
    statusCode: 200,
    headers: {
      Location: url,
      "Set-Cookie": netlifyCookie,
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify({ msg: "hello" })
  });
};
