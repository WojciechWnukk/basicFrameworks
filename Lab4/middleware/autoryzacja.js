function isAuthorized(req, res, next){
    const secretPassword = "tajne";
    let password = req.body.password;
    if(password === secretPassword){
      res.send("Uzyskano dostep");
      return;
    }
    else{
      res.status(401).send("Dostęp zabroniony");
      return;
    }
  }
  module.exports = isAuthorized;