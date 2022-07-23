const router = require("express").Router();
const products = require("./products.js");
const categories = require("./categories");
const functionalities = require("./functionalities");

const usersHandlers = require("./users.js");

router.use("/products", products);
router.use("/categories", categories);

// Usuarios ->
const user = require("./user.js");
router.use("/auth", user);

router.use("/function", functionalities);
router.use("/users", usersHandlers);

module.exports = router;
