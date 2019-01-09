const cookie = require("cookie");
const jwt = require("jsonwebtoken");

exports.handler = function(event, context, callback) {
  const params = event.queryStringParameters;

  const authToken = params.token;
  const redirectURL = params.url;

  const secret = "suchSecretsMuchToHide";
  console.log("token ", authToken);
  console.log("redirect to site ", redirectURL);

  try {
    var valid = jwt.verify(authToken, secret);
    console.log("is Valid", valid);
    console.log("token is valid ", authToken);
    console.log(valid.app_metadata.authorization.roles);
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

  // const html = `
  // <html lang="en">
  //   <head>
  //     <meta charset="utf-8">
  //   </head>
  //   <body>
  //     <noscript>
  //       <meta http-equiv="refresh" content="50; url=${redirectURL}" />
  //     </noscript>
  //   </body>
  //   <script>
  //     setTimeout(function(){
  //       window.location.href = ${JSON.stringify(redirectURL)}
  //     }, 5000)
  //   </script>
  // </html>`;

  console.log(netlifyCookie);
  console.log("redirecting....", redirectURL);

  callback(null, {
    statusCode: 302,
    headers: {
      Location: redirectURL,
      "Set-Cookie": netlifyCookie,
      "Cache-Control": "no-cache",
      "Content-Type": "text/html"
    },
    body: JSON.stringify({ msg: "im a little teapot" })
  });
};
