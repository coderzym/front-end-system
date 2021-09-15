const fs = require("fs");

function router(pathname, response) {
  console.log("????", pathname);
  fs.readFile(`./${pathname}.json`, "utf-8", (err, data) => {
    // response.write(`cb(${JSON.stringify(data)})`);
    response.write(data.replace(/\r\n/g, ""));
    response.end();
  });
}

module.exports = router;
