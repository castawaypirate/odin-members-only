export async function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/");
    // res.status(401).json({ msg: "You are not authenticated" });
  }
}

export async function isMember(req, res, next) {
  if (req.isAuthenticated() && req.user.membership_status === "member") {
    next();
  } else {
    return res.redirect("/");
    // res.status(401).json({ msg: "You are not a member yet" });
  }
}
