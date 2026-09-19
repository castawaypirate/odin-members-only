export async function isAuth(req, res, next) {
  if (req.isAutenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "You are not authenticated" });
  }
}
