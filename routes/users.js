var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/**
 * ROUTE PARAMETERS
 * are named URL segemnts that are used to capture the values specified at their position in URL.
 * The captured value populates in req.params.
 */
router.get("/:userId", function (req, res, next) {
  res.send("respond with a resource");
});

/**
 * ROUTE HANDLERS
 * mutliple callback function can be passed that will behave like middlewares to handle a request.
 * these callbacks might invke next('route') to bypass the remaining route callback.
 */
router.put("/:userId", function (req, res, next) {
    console.log("invoking next function..");
    next();
  },
  function (req, res) {
    res.send("Sending from next function.");
  }
);

// an array of callbacks can be passed
const cb1 = function (req, res, next) {
  console.log("callback 1 is invoked");
  next();
};

const cb2 = function (req, res, next) {
  console.log("callback 2 is invoked");
  next();
};

const cb3 = function (req, res) {
  console.log("callback 3 is invoked");
  res.send("resposnse sent from callback 3, array of callback");
};

router.post("/userArray", [cb1, cb2, cb3]);

module.exports = router;
