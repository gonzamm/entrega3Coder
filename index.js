//REQUERIMIENTOS
const express = require("express");
const path = require("path");
const fs = require("fs");
const Contenedor = require("./claseContenedor.js");

const app = express();
const PORT = process.env.PORT || 8080;

//COMIENZO SERVIDOR
app.listen(PORT, () =>{
    console.log("Server is run on port " + PORT);
})

//GET INDEX
app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname + "/index.html"));
})

//GET /productos
app.get("/productos", (req,res)=>{
    //UTILIZO EL METODO getAll DE LA CLASE CONTENDOR
    async function getAll(){
      try{
        let aux = await productos.getAll();
        aux = JSON.stringify(aux, null, 2);
        res.send(`Estos son los productos guardados actualmente: <br><br> ${aux} <br><br> <a href="../">Volver al Index</a>`);
      }
      catch(error){
        throw Error("Error en todos los productos")
      }  
    }    
  getAll();

})

//GET /productoRandom
app.get("/productoRandom", (req,res)=>{
  async function getRandom(){
    try{
      let aux = await productos.getAll();
      //CREO UN NUMERO AL AZAR ENTRE LA CANTIDAD DE PRODUCTOS QUE HAY
      let random = Math.floor(Math.random() * ((aux.length+1) - 1)) + 1;
      //USO EL METODO getById CON UN NUMERO AL AZAR
      let ptoRandom = await productos.getById(random);
      ptoRandom = JSON.stringify(ptoRandom, null, 2);
      res.send(`Este es un producto random entre los guardados actualmente: <br><br> ${ptoRandom} <br><br> <a href="../">Volver al Index</a>`);
    }
    catch(error){
      throw Error("Error en pto random");
    }
    
  };
  getRandom();
})

//FIN SERVIDOR

//CLASE
let productos = new Contenedor("productos.txt");

