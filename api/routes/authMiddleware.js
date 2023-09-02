const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

// auth middleware
const authenticate = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) return res.status(401).json({ msg: "invalid: no token provided" });

	jwt.verify(token, secret, function (err, user) {
		if (err) return res.status(403).json({ msg: "invalid token" });

		if (user) {
			res.locals.user = user;
			next();
		}
	});
};

module.exports = authenticate;
