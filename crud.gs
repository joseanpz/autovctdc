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

  
  var user = new User(Session.getActiveUser());
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
        
        sheetSolicitudes.getRange(i, 1, 1, sheetSolicitudes.getLastColumn()).setValues([[
          /*data.id,
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
          data.numero_cuentas,
          data.limite_tdc,
          data.email_generador*/
          //user.getEnail()

          data.id,
         // nom_solicitante: null,
          //num_cliente: null,
          data.decision_final,
          data.fecha_nac,
          //nom_ejecutivo: null,
          //sucursal: null,
          //facultado: null,
          data.fecha_solicitud,
          //producto_ori: null,
          data.solicitud_ori,
          data.decreto,
          data.linea_asignada,
          // data.exp_rev,
          data.num_cred_rev,
          data.tar_banregio, 
          data.ingreso_neto,
          data.capacidad_pago,
          data.score_parametrico,
          data.alerta,
          data.rechazo,
          data.bc_score,
          data.limite_tdc,
          data.email_generador
        ]])
        var result = "Update successful";
        break;         
      }
   }

  if (data.fecha_solicitud === null){
    data.fecha_solicitud = Date.now();
  }


   
   // add new row with recieved parameter from client
   if (flag == 1) {
      var timestamp = Date.now();
      var currentTime = new Date().toLocaleString(); // Full Datetime
      

      
      // obtener siguiente id
      var sheetConfigs = db.getSheetByName("configs");
      var configs = _readData(sheetConfigs);     
      var auto_inc = configs[0];
      var auto_inc_id = parseInt(auto_inc.value);
      sheetConfigs.getRange(2,2,1,1).setValue(auto_inc_id+1);
      data.id = auto_inc_id;


      var rowData = sheetSolicitudes.appendRow([
       //auto_inc_id,
       /*data.nom_solicitante,
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
       data.numero_cuentas,
       data.limite_tdc,
       data.email_generador*/
       //user.getEnail()

     // nom_solicitante: null,
      //num_cliente: null,
        data.id,
       // nom_solicitante: null,
        //num_cliente: null,
        data.decision_final,
        data.fecha_nac,
        //nom_ejecutivo: null,
        //sucursal: null,
        //facultado: null,
        data.fecha_solicitud,
        //producto_ori: null,
        data.solicitud_ori,
        data.decreto,
        data.linea_asignada,
        // data.exp_rev,
        data.num_cred_rev,
        data.tar_banregio, 
        data.ingreso_neto,
        data.capacidad_pago,
        data.score_parametrico,
        data.alerta,
        data.rechazo,
        data.bc_score,
        data.limite_tdc,
        data.email_generador

      ]);


      var message = "Insertion successful";
   }

   return {
      message: message,
      data: data
   };
}

function checkAutoInc(row) {
    return row.name === 'autoinc_count_sol';
}



