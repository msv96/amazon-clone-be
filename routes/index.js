var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");
var mongo = require("mongodb");

dotenv.config();
const mongoClient = mongo.MongoClient;
const url = process.env.MONGODB;

router.get("/", async function (req, res, next) {
	try {
		let client = await mongoClient.connect(url);

		let db = client.db("amazon");

		let data = await db.collection("products").find().toArray();

		client.close();

		res.json(data);
	} catch (error) {
		res.status(404).json({
			message: "Something went wrong",
		});
	}
});

module.exports = router;
