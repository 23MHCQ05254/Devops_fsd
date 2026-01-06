const express = require("express");
const app = express();
const fs = require("fs");

const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/formPost", (req, res) => {
    let data = JSON.parse(fs.readFileSync(__dirname + "/cse.json"));
    data.push(req.body);
    fs.writeFile(__dirname + "/cse.json", JSON.stringify(data), (err) => {
        res.send("successfully added data");
    });
});


//succ
app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/public/form.html");
});

app.get("/deletebyid", (req, res) => {
    res.sendFile(__dirname + "/public/delete.html");
});


app.get("/updateid", (req, res) => {
    res.sendFile(__dirname + "/public/update.html");
});


app.post("/formdelete", (req, res) => {
    let id = req.body.id;
    let data = JSON.parse(fs.readFileSync(__dirname + "/cse.json"));
    let index = data.findIndex((el) => el.id == id);

    if (index !== -1)// data present
        data.splice(index, 1)
    else res.send("cant find id")
    fs.writeFile(__dirname + "/cse.json", JSON.stringify(data), (err) => {
        res.send("delted data");
    })
})


//update by id 
//issue
app.post("/rocks", (req, res) => {

    let data = JSON.parse(fs.readFileSync(__dirname + "/cse.json"));
    let field = data.find((el) => el.id);

    field.name = req.body.name;
    field.city = req.body.city;



    fs.writeFile(__dirname + "/cse.json", JSON.stringify(data), () => {
        res.send("updated dataa");
    });

});

app.listen(3000, () => {
    console.log("server runnning....");
});