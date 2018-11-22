
function User(user) {
  this._user = user;
}

// tabla de usuarios
User.prototype._sheet = db.getSheetByName("users");

// validacion de autorizacion
User.prototype.is_authorized = function() {
  var user_email = this.getEmail();
  var records = _readData(this._sheet);  
  for (var r = 0, l = records.length; r < l; r++) {
    if (records[r].email === user_email) {
      return true
    }
  }
  return false;
}

// email de usuario
User.prototype.getEmail = function() {
  return this._user.getEmail();
}

