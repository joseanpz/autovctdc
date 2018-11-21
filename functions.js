var datos = {
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

function procesar_datos() {

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
