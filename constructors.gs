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
      "score_parametrico":"988",
      "alerta_rechazo":"1",
      "bc_score":"742",
      "numero_cuentas":"5",
      "limite_tdc":"53411",
      "email_generador":"jacob.mendoza@banregio.com"};

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
  this.numero_cuentas = data.numero_cuentas;
  this.limite_tdc = data.limite_tdc;
  this.email_generador = data.email_generador;
}

// metodos para Solicitud
// Validacion si cumple las 3 reglas
Solicitud.prototype.validar = function(){
  if(this.exp_rev == "1" && this.num_tar < 7  &&  this.tar_banregio == "0"){
     return var_valida = 1;
  }else{
    return var_valida = 0;
  }
}

// Calculo de EdadMeses
Solicitud.prototype.edad = function() {
  var fecha = new Date();
  var Fecha_Nac = new Date(this.fecha_nac);
     
  if(Fecha_Nac.getDate() > fecha.getDate()){
    return var_EdadMeses = (fecha.getFullYear() - Fecha_Nac.getFullYear()) * 12 + (fecha.getMonth()+1) - (Fecha_Nac.getMonth()+1) - 1;
  }else{
    return var_EdadMeses = (fecha.getFullYear() - Fecha_Nac.getFullYear()) * 12 + (fecha.getMonth()+1) - (Fecha_Nac.getMonth()+1);
  }

}

// Hit o no Hit
Solicitud.prototype.HitNoHit = function(){
  if(this.bc_score == "-8" || this.bc_score == "-9"){
        return var_hitNoHit = "NO HIT";
    }else{
        return var_hitNoHit = "HIT";
    }
}


// Criterios

Solicitud.prototype.criterios = function(){
  if(this.tar_banregio == "1" || this.num_tar >= 7){
      return var_criterios = "No Aplica";
    }else{
      return var_criterios = "Aplica Análisis TDC preaprobada";
    }
}

// Decreto

Solicitud.prototype.decreto = function(){
   if(this.score_parametrico <= "644"){
      return var_Decreto = "Revisión Facultado TDC";
    }else if(this.alerta_rechazo=="1" || this.score_parametrico <= "739"){
      return var_Decreto = "Revisión Analísta TDC";
    }else{
      return var_Decreto = "Pre aprobado";
    } 
}

// segmento
Solicitud.prototype.segmento = function(){

   if(this.HitNoHit()=="NO HIT"){
      return var_Segmento = "NO HIT";
    }else if(this.HitNoHit()=="HIT" && this.exp_rev == "1"){
      return var_Segmento = "Con experiencia en TDC";
    }else{
      return var_Segmento = "Sin experiencia en TDC";
    }
}

// Limite promedio

Solicitud.prototype.limitePromedio = function(){
  var limit_credito = this.limite_tdc / this.numero_cuentas;

  if(this.segmento() == "Con experiencia en TDC"){
      return var_LimPromedio = limit_credito/this.num_tar;
    }else{
      return var_LimPromedio = 0;
    }

}

// Factor veces capacidad
Solicitud.prototype.factorVecesCap = function(){
    if(this.segmento() == "Sin experiencia en TDC" || this.HitNoHit()=="NO HIT"){
        if(this.score_parametrico <= "450"){
          return var_factVecesCap = 2;
        }else if(this.score_parametrico >= "950"){
          return var_factVecesCap = 10;
        }else{
          return var_factVecesCap = "0.17914852" * "0.093467212" * Math.exp(0.006534714 * this.score_parametrico) +  "1.68306653";
        }
      
    }else{
      return var_factVecesCap = 0;
    }
};


Solicitud.prototype.factPorcentajeProm = function(){
    if(this.segmento() == "Con experiencia en TDC"){
      if(this.score_parametrico <="450"){
         return var_porpromedio = "0.8";
      }else if(this.score_parametrico >="950"){
         return var_porpromedio = "1.2";
      }else{
         return var_porpromedio = "0.00895743" * "0.093467212" * Math.exp("0.006534714" * this.score_parametrico) + "0.78415333";
      }
    }else{
      return var_porpromedio = "0";
    }

}

Solicitud.prototype.lineaMinima = function(){
    return var_linMinima = 5000;
}

Solicitud.prototype.lineaMaxima = function(){
    return var_linMaxima = 250000;
}

Solicitud.prototype.topeMaximoIngreso = function(){
    if(this.HitNoHit()=="NO HIT"){
      return var_topeMaxIngreso = this.ingreso_neto;
    }else{
      return var_topeMaxIngreso = 1.5 * this.ingreso_neto;
    }
  
}

Solicitud.prototype.topeMaximoEdad = function(){
    var edad_anio =  Math.floor(parseInt(this.edad())/12);
     if(edad_anio < 25){
       return v_topeMaxEdad = 15000;
     }else if(edad_anio <=45){
       return v_topeMaxEdad = 40000;
     }else{
       return v_topeMaxEdad = 60000;
     }

}

Solicitud.prototype.lineaSugNoHit = function(){
  if(this.HitNoHit()=="NO HIT"){
      return v_linSugNoHit = Math.max(Math.min(this.factorVecesCap() * this.capacidad_pago, this.topeMaximoEdad(),this.topeMaximoIngreso(),this.lineaMaxima()),this.lineaMinima());
  }else{
      return v_linSugNoHit = 0;
  }
  // 
}


Solicitud.prototype.lineaSugExperTDC = function(){
  if(this.segmento() == "Con experiencia en TDC"){
      return var_linSugExpTdc = Math.max(Math.min(this.factPorcentajeProm() * this.limitePromedio(), this.lineaMaxima()),this.lineaMinima());
    
  }else{
      return var_linSugExpTdc = 0;
  }

}


Solicitud.prototype.lineaSugSinExperTDC = function(){
    if(this.segmento() == "Sin experiencia en TDC"){
       return v_linSugSinExp = Math.max(Math.mi(this.factorVecesCap() * this.capacidad_pago, this.topeMaximoIngreso(),this.lineaMaxima()),this.lineaMinima());
    }else{
      return v_linSugSinExp = 0 ;
    }
}


Solicitud.prototype.lineaFinal = function(){
    if(this.HitNoHit()=="NO HIT"){
        return  var_lineaFinal = this.v_linSugNoHit();
    }else if(this.segmento() == "Con experiencia en TDC"){
        return  var_lineaFinal = this.lineaSugExperTDC();
    }else{
        return  var_lineaFinal = this.lineaSugSinExperTDC();
    }
}

function procesar_datos() {
  var solicitud =  new Solicitud(data);
  
  var v_validacion = solicitud.validar();
  var v_EdadMeses = solicitud.edad();
  var v_hitNohit = solicitud.HitNoHit();
  var v_criterio = solicitud.criterios();
  var v_decreto = solicitud.decreto();
  var v_segmento = solicitud.segmento();
  var v_limpromedio = solicitud.limitePromedio();
  var v_vecespago = solicitud.factorVecesCap();
  var v_procenPromedio = solicitud.factPorcentajeProm();
  var v_liniaMin = solicitud.lineaMinima();
  var v_liniaMax = solicitud.lineaMaxima();
  var v_topeMaxIng = solicitud.topeMaximoIngreso();
  var v_topeMaxEdad = solicitud.topeMaximoEdad();
  var v_lineaSugNoHit = solicitud.lineaSugNoHit();
  var v_lineaSugExperTDC = solicitud.lineaSugExperTDC();
  var v_lineaSugSinExperTDC = solicitud.lineaSugSinExperTDC();
  var v_lineaFinal = solicitud.lineaFinal();
  var ff = "Hola"
  
      Logger.log(ff);
  
}
