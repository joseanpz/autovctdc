/*
* Read solicitides
*/
function read(){
  var data = {};
  var sheet = db.getSheetByName("solicitudes");
  
  
  
  data.records = _readData(sheet);  
  return data;
}


/*
* Insetrt Solicitud
*/

function insert(data) {

   // all data your needed
  
  var sheetSolicitudes = db.getSheetByName("solicitudes");

   var flag = 1;
   var Row = sheetSolicitudes.getLastRow();
   for (var i = 1; i <= Row; i++) {
      /* getRange(i, 2) 
       * i | is a row index
       * 1 | is a id column index ('id')
       */
      var idTemp = sheetSolicitudes.getRange(i, 1).getValue();
      if (idTemp == data.id) {
         flag = 0;
         var result = "Sorry bratha, id already exist";
      }
   }

  if (data.fecha_solicitud === null){
    data.fecha_solicitud = Date.now();
  }


   
   // add new row with recieved parameter from client
   if (flag == 1) {
      var timestamp = Date.now();
      var currentTime = new Date().toLocaleString(); // Full Datetime
      

      var rowData = sheetSolicitudes.appendRow([
         data.id,
         data.nom_solicitante,
         data.num_cliente,
         data.fecha_nac,
         data.nom_ejecutivo,
         data.sucursal,
         data.facultado,
         data.fecha_solicitud,
         data.producto_ori,
         data.solicitud_ori,
         data.exp_rev,
         data.num_tar,
         data.tar_banregio,
         data.ingreso_neto,
         data.capacidad_pago,
         data.score_parametrico,
         data.alerta_rechazo,
         data.bc_score,
         data.limite_tdc,
         data.email_generador
      ]);
      var result = "Insertion successful";
   }

   return {
      result: result
   };
}



