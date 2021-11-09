var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");
var mongo = require("mongodb");

dotenv.config();
const mongoClient = mongo.MongoClient;
const url = process.env.MONGODB;

router.post("/", async function (req, res) {
	try {
		let client = await mongoClient.connect(url);

		let db = client.db("amazon");

		let response = await db.collection("users").insertOne(req.body);

		await client.close();

		res.json({
			message: "Order Placed",
			code: true,
			response,
		});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong",
			code: false,
			response,
		});
	}
});

module.exports = router;
