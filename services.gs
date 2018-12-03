/* Service
 */
function _readData(sheetObject, properties) {

   if (typeof properties == "undefined") {
      properties = _getHeaderRow(sheetObject);
      properties = properties.map(function (p) {
         return p.replace(/\s+/g, '_');
      });
   }
  // return properties;

   var rows = _getDataRows(sheetObject),
      data = [];
  //return rows;

   for (var r = 0, l = rows.length; r < l; r++) {
      var row = rows[r],
          record = {};

      for (var p in properties) {
         record[properties[p]] = row[p];
      }

      data.push(record);
   }
   
   return data;
}
function _getDataRows(sheetObject) {
   var sh = sheetObject;
  //return [2, 1, sh.getLastRow() - 1, sh.getLastColumn()];

  //var header

  var rows = sh.getRange(2, 1, sh.getLastRow()-1, sh.getLastColumn()).getDisplayValues();
  //rows.map(row => row.map())

  return rows;
}
function _getHeaderRow(sheetObject) {
   var sh = sheetObject;

   return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
}
function response(callback) {
   return {
      json: function(data) {
        return ContentService
            .createTextOutput(callback+'('+JSON.stringify(data)+')')
            .setMimeType(ContentService.MimeType.JAVASCRIPT); 
        
        //return ContentService
        //    .createTextOutput(JSON.stringify(data))
        //    .setMimeType(ContentService.MimeType.JAVASCRIPT);
            //.setMimeType(ContentService.MimeType.JSON);
      }
   }
}

function setStr(data) {
  if (data != null) {
    return "'" + data;
  }else {
    return data;
  }
}

// left padding
function leftPad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}
