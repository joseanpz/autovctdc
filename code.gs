 
/* Route
 * All Request with Method Get will be proces here
 */
function doGet(req) {
   var action = req.parameter.action;

   var db = SpreadsheetApp.openById("1-Ps7I1Tyk9RdD53dlD75jPCxe9qrM3Un69UCpJi1AVs");
  
   // Don't forget to change your Sheet Name by default is 'Sheet1'
   var sheetUsers = db.getSheetByName("Users");
   
   switch(action) {
       case "read":
       console.log('case read');
           return doRead(req, sheetUsers);
           break;
       case "insert":
       console.log('case insert');
           return doInsert(req, sheetUsers);
           break;
       case "update":
           return doUpdate(req, sheetUsers);
           break;
       case "delete":
           return doDelete(req, sheetUsers);
           break;
       default:
           return HtmlService.createHtmlOutputFromFile('index2');
           
       
     
       //default:
       //    return response().json({
       //       status: false,
       //       message: 'silent!'
       //    });
       
       
   }
}

/* Read
 * request for all Data
 *
 * @request-parameter | action<string>
 * @example-request | ?action=read
 */
function doRead(request, sheetObject) 
{
   var data = {};
   var callback = request.parameter.callback;
   
   data.records = _readData(sheetObject);
  
  // test email get
  //var test_record = {'id': 'eco', 'username': Session.getActiveUser().getEmail(), 'email': Session.getActiveUser().getEmail()};
  //data.records.push(test_record);
  //return ContentService
  //          .createTextOutput(callback+'('+JSON.stringify(data)+')')
  //          .setMimeType(ContentService.MimeType.JAVASCRIPT);
            //.setMimeType(ContentService.MimeType.JSON);
   return response(callback).json(data);

}

/* Insert
 *
 */
function doInsert(req, sheet) {
  console.log('doInsert');
   var id = req.parameter.id;
   var username = req.parameter.username;
   var email = req.parameter.email;
   // all data your needed
  
  var callback = req.parameter.callback;

   var flag = 1;
   var Row = sheet.getLastRow();
   for (var i = 1; i <= Row; i++) {
      /* getRange(i, 2) 
       * i | is a row index
       * 1 | is a id column index ('id')
       */
      var idTemp = sheet.getRange(i, 1).getValue();
      if (idTemp == id) {
         flag = 0;
         var result = "Sorry bratha, id already exist";
      }
   }
   
   // add new row with recieved parameter from client
   if (flag == 1) {
      var timestamp = Date.now();
      var currentTime = new Date().toLocaleString(); // Full Datetime
      var rowData = sheet.appendRow([
         id,
         username,
         email,
         timestamp,
         currentTime
      ]);
      var result = "Insertion successful";
   }

   return response(callback).json({
      result: result
   });
}

/* Update
 * request for Update
 *
 * @request-parameter | id<string>, data<JSON>, action<string>
 * @example-request | ?action=update&data={"email":"ryandevstudio@gmail.com", "username":"nyancodeid"}
 */
function doUpdate(req, sheet) 
{
   var id = req.parameter.id;
   var updates = JSON.parse(req.parameter.data);
  
   var lr = sheet.getLastRow();

   var headers = getHeaderRow_(sheet);
   var updatesHeader = Object.keys(updates);
   
   // Looping for row
   for (var row = 1; row <= lr; row++) {
      // Looping for available header / column
      for (var i = 0; i <= (headers.length - 1); i++) {
         var header = headers[i];
         // Looping for column need to updated
         for (var update in updatesHeader) {
            if (updatesHeader[update] == header) {
               // Get ID for every row
               var rid = sheet.getRange(row, 1).getValue();

               if (rid == id) {
                  // Lets Update
                  sheet.getRange(row, i + 1).setValue(updates[updatesHeader[update]]);
               }
            }
         }
      }
   }

   
   // Output
   return response().json({
      status: true,
      message: "Update successfully"
   });
}


/* Delete
 *
 */
function doDelete(req, sheet) {
   var id = req.parameter.id;
   var flag = 0;

   var Row = sheet.getLastRow();
   for (var i = 1; i <= Row; i++) {
      var idTemp = sheet.getRange(i, 1).getValue();
      if (idTemp == id) {
         sheet.deleteRow(i);
         
         var result = "deleted successfully";
         flag = 1;
      }

   }

   if (flag == 0) {
      return response().json({
         status: false,
         message: "ID not found"
      });
   }

   return response().json({
      status: true,
      message: result
   });
}


/* Service
 */
function _readData(sheetObject, properties) {

   if (typeof properties == "undefined") {
      properties = _getHeaderRow(sheetObject);
      properties = properties.map(function (p) {
         return p.replace(/\s+/g, '_');
      });
   }

   var rows = _getDataRows(sheetObject),
      data = [];

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

   return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
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