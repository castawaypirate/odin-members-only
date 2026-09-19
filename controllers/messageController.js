export async function getMessageList(req, res) {
  console.log(req.session);
  console.log(req.user);
  return res.render("index");
}
