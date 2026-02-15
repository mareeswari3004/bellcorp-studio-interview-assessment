const router = require("express").Router();
const Transaction = require("../models/Transation.js");
const auth = require("../middleware/authMiddleware.js");

router.get("/", auth, async (req, res) => {
  const data = await Transaction.find({ userId: req.user.id });
  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const transaction = await Transaction.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(transaction);
});

router.put("/:id", auth, async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
