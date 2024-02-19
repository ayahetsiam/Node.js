const fsPromise = require("fs").promises;

const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromise.readFile(
      path.join(__dirname, "", "lorem.txt"),
      "utf-8"
    );

    await fsPromise.unlink(path.join(__dirname, "", "lorem.txt"));
    await fsPromise.writeFile(path.join(__dirname, "", "new_lorem.txt"), data);
    await fsPromise.appendFile(
      path.join(__dirname, "", "new_lorem.txt"),
      "\n\n c'est la fin !"
    );
    await fsPromise.rename(
      path.join(__dirname, "", "new_lorem.txt"),
      path.join(__dirname, "", "loremPromises.txt")
    );
    console.log(data);

    await fsPromise.writeFile(path.join(__dirname, "", "loremPromises"), data);

    await fsPromise.rename(
      path.join(__dirname, "", "loremPromises.txt"),
      path.join(__dirname, "", "lorem.txt")
    );
  } catch (err) {
    console.log(`ERREUR ELEVE: ${err}`);
  }
};

fileOps();
