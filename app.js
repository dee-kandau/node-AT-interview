const express = require("express");
const app = express();
const path = require("path");
const SMS = require("./sms/sender");

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.render("index", { errors: false, msg: "" });
});

app.post("/", (req, res) => {
  let { first_name, phone, comments } = req.body;

  if (phone.length == 10) {
    phone = "+254" + phone.slice(1);
  }
  if (phone.length == 12) {
    phone = "+" + phone;
  }

  //implement a better way to validate eg use joi or express-validator

  if (!first_name || !phone || !comments) {
    return res.render("index", { errors: true });
  } else {
    let repl = SMS.sendSms(first_name, phone, comments);
    return res.render("index", { errors: false, msg: "sent" });
  }
});

app.listen(4000, () => {
  console.log("server up");
});
