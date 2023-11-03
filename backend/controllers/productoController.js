var Producto = require('../models/producto');
var Variacion = require('../models/variacion');
var Ingreso = require('../models/ingreso');
var Ingreso_detalle = require('../models/ingreso_detalle');
var slugify = require('slugify');
var fs = require('fs');
var path = require('path');

const registro_producto_admin = async function(req,res){
    if(req.user){
        let data = req.body; 
        let productos = await Producto.find({titulo: data.titulo});
        console.log(productos.length);

        if (productos.length>=1) {
            res.status(200).send({data:undefined,message: 'El producto ya existe'});
        }else{
            //Registro exitoso
            var img_path = req.files.portada.path
            var str_img = img_path.split('\\');
            var str_portada = str_img[2];

            data.portada = str_portada; 
            data.slug = slugify(data.titulo);
            
            try {
                let producto = await Producto.create(data);
                res.status(200).send({data:producto});
            } catch (error) {
                res.status(200).send({data:undefined,message: 'No se pudo guardar el producto'});
            }
        }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const listar_productos_admin = async function(req, res){
    if(req.user){
        let filtro = req.params['filtro']
        let productos = await Producto.find({
            $or: [
                {titulo: new RegExp(filtro,'i')},
                {categoria: new RegExp(filtro,'i')},
            ]
        }).sort({createdAt:-1});
        res.status(200).send(productos)
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const obtener_portada_producto = async function(req, res){
    let img = req.params['img']
    fs.stat('./uploads/productos/'+img,function(err){
        if(err){
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads//productos/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}

const obtener_producto_admin = async function(req, res){
    if(req.user){
        let id = req.params['id'];

        try{
            let producto = await Producto.findById({_id: id});

            res.status(200).send(producto);
        }catch{
            res.status(200).send(undefined);
        }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const actualizar_producto_admin = async function(req,res){
    if(req.user){
        let data = req.body; 
        let id = req.params['id'];

        let productos = await Producto.find({titulo: data.titulo});
        console.log(productos.length);

        if (productos.length>=1) {
            if(productos[0]._id == id){
                if(req.files){
                    //Registro exitoso
                    var img_path = req.files.portada.path
                    var str_img = img_path.split('\\');
                    var str_portada = str_img[2];
    
                    data.portada = str_portada; 
                    data.slug = slugify(data.titulo);
                    
                    try {
                        let producto = await Producto.findByIdAndUpdate({_id: id},{
                            titulo: data.titulo, 
                            categoria: data.categoria,
                            descripcion: data.descripcion,
                            estado: data.estado, 
                            str_variedad: data.str_variedad,
                            descuento: data.descuento, 
                            portada: data.portada,
                        });
                        res.status(200).send({data:producto});
                    } catch (error) {
                        res.status(200).send({data:undefined,message: 'No se pudo guardar el producto'});
                    }
                }else{
                     data.slug = slugify(data.titulo);
                     
                     try {
                         let producto = await Producto.findByIdAndUpdate({_id: id},{
                             titulo: data.titulo, 
                             categoria: data.categoria,
                             descripcion: data.descripcion,
                             estado: data.estado, 
                             str_variedad: data.str_variedad,
                             descuento: data.descuento, 
                         });
                         res.status(200).send({data:producto});
                     } catch (error) {
                         res.status(200).send({data:undefined,message: 'No se pudo guardar el producto'});
                     }
                }
            }else{
                res.status(200).send({data:undefined,message: 'El producto ya existe'});
            }
        }else{
            if(req.files){
                //Registro exitoso
                var img_path = req.files.portada.path
                var str_img = img_path.split('\\');
                var str_portada = str_img[2];

                data.portada = str_portada; 
                data.slug = slugify(data.titulo);
                
                try {
                    let producto = await Producto.findByIdAndUpdate({_id: id},{
                        titulo: data.titulo, 
                        categoria: data.categoria,
                        descripcion: data.descripcion,
                        estado: data.estado, 
                        str_variedad: data.str_variedad,
                        descuento: data.descuento, 
                        portada: data.portada,
                    });
                    res.status(200).send({data:producto});
                } catch (error) {
                    res.status(200).send({data:undefined,message: 'No se pudo guardar el producto'});
                }
            }else{
                 data.slug = slugify(data.titulo);
                 
                 try {
                     let producto = await Producto.findByIdAndUpdate({_id: id},{
                         titulo: data.titulo, 
                         categoria: data.categoria,
                         descripcion: data.descripcion,
                         estado: data.estado, 
                         str_variedad: data.str_variedad,
                         descuento: data.descuento, 
                     });
                     res.status(200).send({data:producto});
                 } catch (error) {
                     res.status(200).send({data:undefined,message: 'No se pudo guardar el producto'});
                 }
            }
        }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const registro_variacion_producto = async function(req,res){
    if(req.user){
        let data = req.body;

        let variacion = Variacion.create(data);
        res.status(200).send({data:variacion});
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const obtener_variedades_producto = async function(req,res){
    if(req.user){
        let id = req.params['id'];

        let variedades = await Variacion.find({producto: id}).sort({stock: -1});
        res.status(200).send(variedades);
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const eliminar_variedad_producto = async function(req,res){
    if(req.user){
        let id = req.params['id'];

        let reg = await Variacion.findById({_id:id});

        if (req.stock == 0) {
            let variacion = await Variacion.findOneAndRemove({_id: id});
            res.status(200).send(variacion);
        }else{
            res.status(200).send({data:undefined,message: 'No se puede eliminar esta variación'});
        }


    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const listar_productos_activos = async function(req, res){
    if(req.user){
        let productos = await Producto.find({estado: true
        }).sort({createdAt:-1});
        res.status(200).send(productos)
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const registro_ingreso_admin = async function(req, res){
    if(req.user){
        let data = req.body; 
        try {
            let reg_ingresos = await Ingreso.find({}).sort({createdAt: -1});

            if (reg_ingresos.length == 0) {
                data.serie = 1;
            }else{
                data.serie = reg_ingresos[0].serie + 1;
            }

            let detalles = JSON.parse(data.detalles); 

            var img_path = req.files.documento.path
            var str_img = img_path.split('\\');
            var str_documento = str_img[2];
            data.documento = str_documento;
            data.usuario = req.user.sub;

            let ingreso = await Ingreso.create(data);

            for (var item of detalles) {
                item.ingreso = ingreso._id;
                await Ingreso_detalle.create(item);    
                
                //STOCKS
                let variedad = await Variacion.findById({_id: item.variedad});
                await Variacion.findByIdAndUpdate({_id: item.variedad},{
                    stock: parseInt(variedad.stock) + parseInt(item.cantidad)
                });

                let producto = await Producto.findById({_id: item.producto});
                await Producto.findByIdAndUpdate({_id: item.producto},{
                    stock: parseInt(producto.stock) + parseInt(item.cantidad)
                });

                //MARGEN DE GANANCIA 
                if (producto.stock >= 1) {
                    let subtotal_residual = producto.precio * producto.stock;
                    let ganancia = Math.ceil((item.precio_unidad * data.ganancia)/100);
                    let subtotal_ingreso = (parseFloat(item.precio_unidad) + parseFloat(ganancia))*item.cantidad;

                    let cantidades = parseInt(producto.stock) + parseInt(item.cantidad);
                    let subtotales = parseFloat(subtotal_residual) + parseFloat(subtotal_ingreso);

                    console.log(subtotales + ' ' + cantidades);

                    let precio_equilibro = Math.ceil(subtotales/cantidades);

                    await Producto.findByIdAndUpdate({_id: item.producto},{
                        precio: precio_equilibro
                    });
                }else{
                    let ganancia = Math.ceil((item.precio_unidad * data.ganancia)/100);
                    await Producto.findByIdAndUpdate({_id: item.producto},{
                        precio: parseFloat(item.precio_unidad) + parseFloat(ganancia)
                    });
                }
            }

        res.status(200).send(ingreso);
        } catch (error) {
            
            res.status(200).send({message: 'No se pudo registrar el ingreso'});
        }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}
module.exports = {
    registro_producto_admin,
    listar_productos_admin,
    obtener_portada_producto,
    obtener_producto_admin,
    actualizar_producto_admin,
    registro_variacion_producto,
    obtener_variedades_producto,
    eliminar_variedad_producto,
    listar_productos_activos,
    registro_ingreso_admin
}