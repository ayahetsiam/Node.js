const fs = require("fs");

const path = require("path");

fs.readFile(path.join(__dirname, "files", "note.txt"), "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.writeFile(
    path.join(__dirname, "files", "reply.txt"),
    "bonjour ami je vais bien et toi",
    (err) => {
        if (err) throw err;
        console.log("write complete");
  
        fs.appendFile(
            path.join(__dirname, "files", "test.txt"),
            "\n\nyes ? ",
            (err) => {
                if (err) throw err;
                console.log("append complete");

                fs.rename(
                    path.join(__dirname, "files", "test.txt"),
                    path.join(__dirname, "files", "reply1.txt"),
                  (err) => {
                    if (err) throw err;
                    console.log("rename complete");
                  }
                );
            })

    });

    fs.appendFile(
            path.join(__dirname, "files", "note.txt"),
            "difference trouvée",
        (err) => {
            if (err) throw err;
            console.log("append complete");
        })



console.log("hello .....");

process.on("uncaughtException", (err) => {
  console.log("il y a une erreur :" + err);
  process.exit(1);
});
