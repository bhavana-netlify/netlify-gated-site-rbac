const cookie = require("cookie");
const jwt = require("jsonwebtoken");

exports.handler = function(event, context, callback) {
  const { headers } = event;
  const cookieHeader = headers.cookie || "";
  const cookies = cookie.parse(cookieHeader);

  console.log(cookies);
  console.log(cookies.nf_jwt);

  try {
    console.log(jwt.decode(cookies.nf_jwt, { complete: true }));
  } catch (e) {
    console.log(e);
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: "hello" })
  });
};
