/*
* Read solicitides
*/
function read(){
  var data = {};
  var sheet = db.getSheetByName("solicitudes");
  
  
  
  data.records = _readData(sheet);  
  return data;
}


function read_sucursales(){
  var data = {};
  var sheet = db.getSheetByName("sucursales");  
  data.records = _readData(sheet);  
  return data;
}

/*
* Insetrt Solicitud
*/

function insert(data) {

  if (!data.solicitud_ori) {
    return {
      message: 'Bad request',
      data: null,
      status: 400
   };
  }

  
  var user = new User(Session.getActiveUser());
   // all data your needed
  
  var sheetSolicitudes = db.getSheetByName("solicitudes");
 

   if (data.fecha_solicitud === null){

    var now_date = new Date(Date.now());
    data.fecha_solicitud = now_date.getFullYear() + "-" + (now_date.getMonth()+1) + "-" + leftPad(now_date.getDate(),2);
  }

  //if (data.email_generador === null) {
    data.email_generador = user.getEmail();
  //} 

  //data.email_generador = user.getEmail();

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

          data.id,
          setStr(data.decision_final),
          data.fecha_nac,
          data.fecha_solicitud,
          setStr(data.solicitud_ori),
          data.decreto,
          data.linea_asignada,
          setStr(data.sucursal),
          //data.plaza,
          //data.origen,
          data.linea_autorizada,
          setStr(data.num_cred_rev),
          setStr(data.tar_banregio), 
          data.ingreso_neto,
          data.capacidad_pago,
          data.score_parametrico,
          setStr(data.alerta),
          setStr(data.rechazo),
          data.bc_score,
          data.limite_tdc,
          data.email_generador
        ]])
        var message = "Update successful";
        var status = 204
        break;         
      }
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
      data.id = auto_inc_id + data.solicitud_ori;
     
     Logger.log(data);

      // solicitud_ori field format (keep leading zeros)
      // sheetSolicitudes.getRange(sheetSolicitudes.getLastRow()+1, 5).setNumberFormat("@");


      var rowData = sheetSolicitudes.appendRow([
        data.id,
        setStr(data.decision_final),
        data.fecha_nac,
        data.fecha_solicitud,
        setStr(data.solicitud_ori),
        data.decreto,
        data.linea_asignada,
        setStr(data.sucursal),
        //data.plaza,
        //data.origen,
        data.linea_autorizada,
        setStr(data.num_cred_rev),
        setStr(data.tar_banregio), 
        data.ingreso_neto,
        data.capacidad_pago,
        data.score_parametrico,
        setStr(data.alerta),
        setStr(data.rechazo),
        data.bc_score,
        data.limite_tdc,
        data.email_generador

      ]);


      var message = "Insertion successful";
      var status = 201;
   }

   return {
      message: message,
      data: data,
      status: status
   };
}

function checkAutoInc(row) {
    return row.name === 'autoinc_count_sol';
}


function deleteSol(sol_id) {
  var sheetSolicitudes = db.getSheetByName("solicitudes");
   //var id = data.id;
   var flag = 0;
   var result = 'not found';
   var status = false;

   //var Row = sheet.getLastRow();
   //for (var i = 1; i <= Row; i++) {
   //   var idTemp = sheet.getRange(i, 1).getValue();
   //   if (idTemp == id) {

   var Row = sheetSolicitudes.getLastRow();
   for (var i = 1; i <= Row; i++) {
      var idTemp = sheetSolicitudes.getRange(i, 1).getValue();
      if (idTemp == sol_id) {
         flag = 0;
         sheetSolicitudes.deleteRow(i);
         
         var result = "Item succesfully deleted";
         flag = 1;
         status = true;
      }

   }
   return {
      message: result,
      status: status
   };
}



