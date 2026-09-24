export async function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    const format = req.accepts("json", "html");
    if (format === "json") {
      return res.status(401).json({ msg: "You are not authenticated" });
    }
    return res.redirect("/");
  }
}

export async function isMember(req, res, next) {
  if (req.isAuthenticated() && req.user.membership_status === "member") {
    next();
  } else {
    const format = req.accepts("json", "html");
    if (format === "json") {
      return res.status(403).json({ msg: "You are not a member yet" });
    }
    return res.redirect("/");
  }
}

export async function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    const format = req.accepts("json", "html");
    if (format === "json") {
      return res.status(403).json({ msg: "Access denied" });
    }
    return res.redirect("/");
  }
}
