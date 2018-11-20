function crear_file(){
      var folder = DriveApp.createFolder("Solicitud_folder");
      folder.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
      var doc = DocumentApp.create("Solicitud_folder/documento_1");
      doc.getBody().appendParagraph("Este es un documento creado desde boton");
}