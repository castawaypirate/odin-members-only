export async function isAuth(req, res, next) {
  if (req.isAutenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "You are not authenticated" });
  }
}

export async function isMember(req, res, next) {
  if (req.isAutenticated() && req.user.membership_status === "member") {
    next();
  } else {
    res.status(401).json({ msg: "You are not a member yet" });
  }
}
