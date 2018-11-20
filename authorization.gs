
function is_authorized() {
  var data = {};
  var sheetWhiteList = db.getSheetByName("users");
  var user = Session.getActiveUser();
  var user_email = user.getEmail();
  data.records = _readData(sheetWhiteList);
  
  for (var r = 0, l = data.records.length; r < l; r++) {
    if (data.records[r].email === user_email) {
      return true
    }
  }
  
  Logger.log(data);
  Logger.log('done!');
  return false;
}
