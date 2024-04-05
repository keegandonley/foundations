const fs = require("fs");

fs.readFile("./package.json", (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const stringData = data.toString();
  const parsed = JSON.parse(stringData);
  const version = parsed.version;
  const splits = version.split(".");
  const patch = parseInt(splits[2]) + 1;
  const newVersion = `${splits[0]}.${splits[1]}.${patch}`;
  parsed.version = newVersion;
  const newPackage = JSON.stringify(parsed, null, 2);
  fs.writeFile("./package.json", newPackage, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Bumped version to ${newVersion}`);
  });
});
