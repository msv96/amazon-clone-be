var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");
var mongo = require("mongodb");
const { ObjectID } = require("bson");

dotenv.config();
const mongoClient = mongo.MongoClient;
const url = process.env.MONGODB;

router.post("/", async function (req, res) {
	try {
		let client = await mongoClient.connect(url);

		let db = client.db("amazon");

		let response = await db.collection("users").insertOne(req.body);

		for await (let item of req.body.Data) {
			let d = await db
				.collection("products")
				.findOne({ _id: ObjectID(item._id) });
			let d1 = d.qty - item.userqty;
			await db
				.collection("products")
				.findOneAndUpdate(
					{ _id: ObjectID(item._id) },
					{ $set: { qty: d1 } }
				);
		}

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
		});
	}
});

module.exports = router;
