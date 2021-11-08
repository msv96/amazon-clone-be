var express = require("express");
var router = express.Router();

router.post("/order", async function (req, res, next) {
	try {
		let client = await mongoClient.connect(url);

		let db = client.db("amazon");

		let data = await db.collection("users").insertOne(req.body);

		await client.close();

		res.json({
			message: "User Registered",
			id: data._id,
			code: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong",
			code: false,
		});
	}
});

module.exports = router;
