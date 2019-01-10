const cookie = require("cookie");

exports.handler = function(event, context, callback) {
  const redirectToLogin = event.headers.referer;

  const netlifyCookie = cookie.serialize("nf_jwt", null, {
    secure: true,
    path: "/",
    maxAge: -1
  });

  const html = `
  <html lang="en">
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <noscript>
        <meta http-equiv="refresh" content="0; url=${redirectToLogin}" />
      </noscript>
    </body>
    <script>
      setTimeout(function(){
        window.location.href = ${JSON.stringify(redirectToLogin)}
      }, 0)
    </script>
  </html>`;

  callback(null, {
    statusCode: 200,
    headers: {
      "Set-Cookie": netlifyCookie,
      "Cache-Control": "no-cache",
      "Content-Type": "text/html"
    },
    body: html
  });
};
