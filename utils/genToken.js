import jwt from "jsonwebtoken";

const getToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30m" });
};

export default getToken;
