const {
	getAll,
	create,
	getOne,
	remove,
	update,
	verifyUser,
} = require("../controllers/user.controller");
const express = require("express");

const routerUser = express.Router();

routerUser.route("/").get(getAll).post(create);

routerUser.route("/verify/:code").get(verifyUser);

routerUser.route("/:id").get(getOne).delete(remove).put(update);

module.exports = routerUser;
