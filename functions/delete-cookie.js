const cookie = require("cookie");

exports.handler = function(event, context, callback) {
  const netlifyCookie = cookie.serialize("nf_jwt", null, {
    secure: true,
    path: "/",
    expires: new Date()
  });

  callback(null, {
    statusCode: 302,
    headers: {
      Location: "https://festive-brown-c3df1a.netlify.com",
      "Set-Cookie": netlifyCookie,
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify({ message: "Cookie has been removed" })
  });
};
