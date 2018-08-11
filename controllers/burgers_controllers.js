var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");


router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    })
});

router.post("/api/burger", function(req, res) {
    burger.create(["burger_name"], [req.body.burger_name], function(result) {
        res.json({id: result.insertId});
    });
});

router.put("api/burger/:id", function(req,res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    burger.update (
        {
            devoured: req.body.devoured
        },
        condition,
        function(result) {
            if (result.changeRows === 0) {
                return res.status(400).end();
            }
            res.status(200).end;
        }
    );
});

module.exports = router;
