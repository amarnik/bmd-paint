
/*
 * GET users listing.
 */
var UserModel = require('../models/user').model;

exports.init = function(app) {
    app.get('/users', this.index);
    app.post('/users', this.create);
    app.get('/users/:id', this.show);
    app.get('/users/:id/edit', this.edit);
    app.put('/users/:id', this.update);
    app.delete('/users/:id', this.destroy);
}

exports.index = function(req, res) {
    res.send("respond with a resource");
};

exports.create = function(req, res) {
  
    var user;
    console.log("POST: ");
    console.log(req.body);
    user = new UserModel({
        status: 1,
        type: 1,
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass
    });
    user.save(function (err) {
        if (!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
    });
    return res.send(user);
  
};

exports.show = function(req, res){
  return UserModel.findById(req.params.id, function (err, product) {
    if (!err) {
      return res.send(product);
    } else {
      return console.log(err);
    }
  });
};

exports.edit = function(req, res){
    res.send('edit forum ' + req.params.forum);
};

exports.update = function(req, res){
    return UserModel.findById(req.params.id, function (err, user) {
        user.status = req.body.status;
        user.type = req.body.type;
        user.name = req.body.name;
        user.email = req.body.email;
        user.pass = req.body.pass;
        user.modified = Date.now;
        return user.save(function (err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            return res.send(user);
        });
    });
};

exports.destroy = function(req, res){
    return UserModel.findById(req.params.id, function (err, user) {
        return user.remove(function (err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
};