const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fullName = "aditya_avi";
const dob = "26012004";       
const email = "aditya.avi2022@vitstudent.ac.in";
const rollNumber = "22BCI0096";

app.set("json spaces", 2);
app.post("/bfhl", (req, res) => {
  try {
    let data = req.body.data;

    if (!data) {
      return res.status(400).json({
        is_success: false,
        message: "No data provided"
      });
    }

    if (typeof data === "string") {
      data = data.split(",").map(item => item.trim());
    }

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. Expected an comma separated array."
      });
    }

    let odd = [];
    let even = [];
    let alphabets = [];
    let special = [];
    let sum = 0;

    data.forEach(item => {
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even.push(item.toString());
        } else {
          odd.push(item.toString());
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special.push(item);
      }
    });

    let concat_string = "";
    let letters = alphabets.join("").split("").reverse();
    letters.forEach((ch, i) => {
      concat_string += i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
    });

    res.status(200).json({
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email: email,
      roll_number: rollNumber,
      odd: odd,
      even: even,
      alphabets: alphabets,
      special: special,
      sum: sum.toString(),
      concat_string: concat_string
    });

  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: error.message
    });
  }
});

const PORT = 3000;

app.get("/bfhl", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "page.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
