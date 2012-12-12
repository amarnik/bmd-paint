/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;  

var User = new Schema({
    status: { type: Number, default: 1 },
    type: { type: Number, default: 1 },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },  
    pass: { type: String, required: true },  
    added: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now }
});

var UserModel = mongoose.model('User', User); 

exports.model = UserModel;