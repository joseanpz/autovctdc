 
var db = SpreadsheetApp.openById("1-Ps7I1Tyk9RdD53dlD75jPCxe9qrM3Un69UCpJi1AVs");




/* Route
 * All Request with Method Get will be proces here
 */
function doGet(req) {
  
  var user = new User(Session.getActiveUser());
  
  //TODO: Validations 
  if(user.is_authorized()) {
    return HtmlService.createHtmlOutputFromFile('index');
  }
  else {
    return HtmlService.createHtmlOutputFromFile('index');
  }        
}



function test(){
  
  var data = {
      "id":"10",
      "nom_solicitante":"Jacob Mendoza",
      "num_cliente":"248907",
      "fecha_nac":"1989-07-24",
      "nom_ejecutivo":"Juan Perez",
      "sucursal":"Nuevo Sur",
      "facultado":"Pedro Ramirez",
      "fecha_solicitud":"2018-11-01",
      "producto_ori":"Auto",
      "solicitud_ori":"0052485",
      "exp_rev":"1",
      "num_tar":"5",
      "tar_banregio":"0",
      "ingreso_neto":"524552",
      "capacidad_pago":"5255",
      "score_parametrico":"654",
      "alerta_rechazo":"1",
      "bc_score":"742",
      "limite_tdc":"53411",
      "email_generador":"jacob.mendoza@banregio.com"};
  var a = new Solicitud(data);
  
  var b = a.edad();
  
  Logger.log(b);
  
  this.insert(data);
  
  const z = 'finish!'

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




