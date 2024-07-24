import jwt from "jsonwebtoken";
const secret = "JWTTOKEN";
export const generateToken = (user, role) => {
  const payload = {
    id: user?._id,
    email: user?.email,
    role: role?.roleName,
  };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export function VerifyJWT(req, res, next) {
  const token = req.cookies.token;
  if (!token)
    return res
      .clearCookie("token")
      .status(403)
      .send({ success: false, error: "No token provided." });

  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ success: false, error: "Failed to authenticate token." });
    next();
  });
}
