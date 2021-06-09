const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const promise = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for credits",
      source: req.body.id,
    });
    // the user is provided by passport library on the request
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
