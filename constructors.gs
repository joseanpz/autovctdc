

function Solicitud (data) {

  this.id = data.id; 
  this.nom_solicitante = data.nom_solicitante; 
  this.num_cliente = data.num_cliente; 
  this.fecha_nac = data.fecha_nac;
  this.nom_ejecutivo = data.nom_ejecutivo;
  this.sucursal = data.sucursal; 
  this.facultado = data.facultado; 
  this.fecha_solicitud = data.fecha_solicitud; 
  this.producto_ori = data.producto_ori;
  this.solicitud_ori = data.solicitud_ori;
  this.exp_rev = data.exp_rev;
  this.num_tar = data.num_tar;
  this.tar_banregio = data.tar_banregio;
  this.ingreso_neto = data.ingreso_neto;
  this.capacidad_pago = data.capacidad_pago;
  this.score_parametrico = data.score_parametrico;
  this.alerta_rechazo = data.alerta_rechazo;
  this.bc_score = data.bc_score;
  this.limite_tdc = data.limite_tdc;
  this.email_generador = data.email_generador;
}

// metodos para Solicitud
Solicitud.prototype.edad = function() {
  var fecha = new Date();
  var Fecha_Nac = new Date(this.fecha_nac);
     
     // Calculo de Edad
  if(Fecha_Nac.getDate() > fecha.getDate()){
    return var_Edad = (fecha.getFullYear() - Fecha_Nac.getFullYear()) * 12 + (fecha.getMonth()+1) - (Fecha_Nac.getMonth()+1) - 1;
  }else{
    return var_Edad = (fecha.getFullYear() - Fecha_Nac.getFullYear()) * 12 + (fecha.getMonth()+1) - (Fecha_Nac.getMonth()+1);
  }

}





function edad(data) {
  var fecha = new Date();
  var Fecha_Nac = new Date(data.fecha_nac);
     
     // Calculo de Edad
  if(Fecha_Nac.getDate() > fecha.getDate()){
    return  (fecha.getFullYear() - Fecha_Nac.getFullYear()) * 12 + (fecha.getMonth()+1) - (Fecha_Nac.getMonth()+1) - 1;
  }else{
    return  (fecha.getFullYear() - Fecha_Nac.getFullYear()) * 12 + (fecha.getMonth()+1) - (Fecha_Nac.getMonth()+1);
  }
}


function procesar_datos() {

  var a = this.edad(this.data);

  if(this.datos.exp_rev == "1" && this.datos.num_tar < 7  &&  this.datos.tar_banregio == "0"){
     var fecha = new Date();
     var Fecha_Nac = new Date(this.datos.fecha_nac);
     
     // Calculo de Edad
     if(Fecha_Nac.getDate() > fecha.getDate()){
        var var_Edad = (fecha.getFullYear() - Fecha_Nac.getFullYear()) * 12 + (fecha.getMonth()+1) - (Fecha_Nac.getMonth()+1) - 1;
      }else{
        var var_Edad = (fecha.getFullYear() - Fecha_Nac.getFullYear()) * 12 + (fecha.getMonth()+1) - (Fecha_Nac.getMonth()+1);
      }
    
    // Hit o no Hit
    
    if(this.datos.bc_score == "-8" || this.datos.bc_score == "-9"){
        var var_hitNoHit = "NO HIT";
    }else{
        var var_hitNoHit = "HIT";
    }
    
    //  Criterios
    if(this.datos.tar_banregio == "1" || this.datos.num_tar >= 7){
      var var_criterios = "No Aplica";
    }else{
      var var_criterios = "Aplica Análisis TDC preaprobada";
    }
    
    // Decreto
    if(this.datos.score_parametrico <= "644"){
      var var_Decreto = "Revisión Facultado TDC";
    }else if(this.datos.alerta_rechazo=="1" || this.datos.score_parametrico <= "739"){
      var var_Decreto = "Revisión Analísta TDC";
    }else{
      var var_Decreto = "Pre aprobado";
    }
    
    // Segmento
    if(var_hitNoHit=="NO HIT"){
      var var_Segmento = "NO HIT";
    }else if(var_hitNoHit=="HIT" && this.datos.exp_rev == "1"){
      var var_Segmento = "Con experiencia en TDC";
    }else{
      var var_Segmento = "Sin experiencia en TDC";
    }
    
    
    // Limite promedio
    
    if(var_Segmento == "Con experiencia en TDC"){
      var var_LimPromedio = this.datos.limite_tdc/this.datos.num_tar;
    }else{
      var var_LimPromedio = 0;
    } 
    
    // Factor veces capacidad
    
    if(var_Segmento == "Sin experiencia en TDC" || var_hitNoHit=="NO HIT"){
        if(this.datos.score_parametrico <= "450"){
          var var_factVecesCap = 2;
        }else if(this.datos.score_parametrico >= "950"){
          var var_factVecesCap = 10;
        }else{
          var var_factVecesCap = "0.17914852" * "0.093467212" * Math.exp(0.006534714 * this.datos.score_parametrico) +  "1.68306653";
        }
      
    }else{
      var var_factVecesCap = 0;
    }
    
  }else{
    avanza = 0;
  }
  
  var ff = fecha.getDate();
  
      Logger.log(ff);
  
}
