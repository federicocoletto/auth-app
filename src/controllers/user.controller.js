const catchError = require("../utils/catchError");
const User = require("../models/User");
const { verifyAccount } = require("../utils/verifyAccount");
const EmailCode = require("../models/EmailCode");

const getAll = catchError(async (req, res) => {
	const results = await User.findAll();
	return res.json(results);
});

const create = catchError(async (req, res) => {
	const { email, firstName, frontBaseUrl } = req.body;

	const result = await User.create(req.body);

	const code = require("crypto").randomBytes(64).toString("hex");

	verifyAccount(email, firstName, frontBaseUrl, code);

	await EmailCode.create({ code, userId: result.id });

	return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
	const { id } = req.params;
	const result = await User.findByPk(id);
	if (!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async (req, res) => {
	const { id } = req.params;
	const result = await User.destroy({ where: { id } });
	if (!result) return res.sendStatus(404);
	return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
	const { id } = req.params;
	delete req.body.password;
	delete req.body.isVerified;
	delete req.body.email;
	const result = await User.update(req.body, {
		where: { id },
		returning: true,
	});
	if (result[0] === 0) return res.sendStatus(404);
	return res.json(result[1][0]);
});

const verifyUser = catchError(async (req, res) => {
	const { code } = req.params;
	const emailCode = await EmailCode.findOne({ where: { code } });
	if (!emailCode) return res.sendStatus(401);
	const user = await User.update(
		{ isVerified: true },
		{ where: { id: emailCode.userId }, returning: true }
	);
	if (user[0] === 0) return res.sendStatus(404);
	await emailCode.destroy();
	return res.json(user[1][0]);
});

module.exports = {
	getAll,
	create,
	getOne,
	remove,
	update,
	verifyUser,
};
