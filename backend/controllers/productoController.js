var Producto = require('../models/producto');
var Categoria = require('../models/categoria');
var Subcategoria = require('../models/subcategoria');
var Galeria = require('../models/galeria');
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


        let productos = await Producto.find({titulo:data.titulo});
        console.log(productos.length);

        if(productos.length>= 1){
            if(productos[0]._id == id){
                if(req.files){
                    //REGISTRO PRODUCTO
                    var img_path = req.files.portada.path;
                    var str_img = img_path.split('\\');
                    var str_portada = str_img[2];
    
                    ///
    
                    data.portada = str_portada;
                    data.slug = slugify(data.titulo);
                    
                    let categoria = data.categoria[0];
                    try {
                        let producto = await Producto.findByIdAndUpdate({_id:id},{
                            titulo: data.titulo,
                            categoria:categoria,
                            descripcion: data.descripcion,
                            estado: data.estado,
                            descuento: data.descuento,
                            portada: data.portada,
                        });
                        res.status(200).send({data:producto});
                    } catch (error) {
                        res.status(500).send(error);   
                    }
                }else{
    
                     data.slug = slugify(data.titulo);
                     
                     try {
                         let producto = await Producto.findByIdAndUpdate({_id:id},{
                             titulo: data.titulo,
                             categoria:data.categoria,
                             descripcion: data.descripcion,
                             estado: data.estado,
                             descuento: data.descuento
                         });
                         res.status(200).send({data:producto});
                     } catch (error) {
                         res.status(200).send({data:undefined,message: 'No se pudo crear el producto.'});   
                     }
                }
            }else{
                res.status(200).send({data:undefined,message: 'El titulo de producto ya existe.'});   
            }
        }else{
            if(req.files){
                //REGISTRO PRODUCTO
                var img_path = req.files.portada.path;
                var str_img = img_path.split('\\');
                var str_portada = str_img[2];

                ///

                data.portada = str_portada;
                data.slug = slugify(data.titulo);
                
                try {
                    let producto = await Producto.findByIdAndUpdate({_id:id},{
                        titulo: data.titulo,
                        categoria:data.categoria,
                        descripcion: data.descripcion,
                        estado: data.estado,
                        descuento: data.descuento,
                        portada: data.portada,
                    });
                    res.status(200).send({data:producto});
                } catch (error) {
                    res.status(200).send({data:undefined,message: 'No se pudo crear el producto.'});   
                }
            }else{

                 data.slug = slugify(data.titulo);
                 
                 try {
                     let producto = await Producto.findByIdAndUpdate({_id:id},{
                         titulo: data.titulo,
                         categoria:data.categoria,
                         descripcion: data.descripcion,
                         estado: data.estado,
                         descuento: data.descuento
                     });
                     res.status(200).send({data:producto});
                 } catch (error) {
                     res.status(200).send({data:undefined,message: 'No se pudo crear el producto.'});   
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

const eliminar_producto_admin = async function(req,res){
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

const subir_imagen_producto_admin = async function(req,res){
    if(req.user){
        let data = req.body; 

            //Registro exitoso
        var img_path = req.files.imagen.path
        var str_img = img_path.split('\\');
        var str_imagen = str_img[2];

        data.imagen = str_imagen; 
            
        try {
            let imagen = await Galeria.create(data);
            res.status(200).send(imagen);
        } catch (error) {
            res.status(200).send({data:undefined,message: 'No se pudo guardar la imagen'});
        }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const obtener_galeria_producto = async function(req, res){
    let img = req.params['img']
    fs.stat('./uploads/galeria/'+img,function(err){
        if(err){
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads//galeria/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}

const obtener_galeria_producto_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];

        let galeria = await Galeria.find({producto: id});

        res.status(200).send(galeria);

    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const eliminar_galeria_producto_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];

        try {
            let reg = await Galeria.findById({_id: id});
            let path_img = './uploads//galeria/'+reg.imagen;
            fs.unlinkSync(path_img);
            let galeria = await Galeria.findOneAndRemove({_id: id});
            res.status(200).send(galeria);
        } catch (error) {
            console.log(error);
            res.status(200).send({data:undefined,message: 'No se pudo eliminar la imagen'});
        }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const crear_categoria_admin = async function(req,res){
    if(req.user){
        let data = req.body;
        try {
            var reg = await Categoria.find({titulo:data.titulo});

        if(reg.length == 0){
            data.slug = slugify(data.titulo).toLowerCase();
            var categoria = await Categoria.create(data);
            res.status(200).send(categoria);
        }else{
            res.status(200).send({data:undefined,message: 'La categoria ya existe.'});   
        }
        } catch (error) {
            res.status(200).send({data:undefined,message: 'Ocurrio un error durante el proceso.'});   
        }

    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const listar_categorias_admin = async function(req,res){
    if(req.user){

        var regs = await Categoria.find().sort({titulo:-1});
        var categorias = [];

        for(var item of regs){
            var subcategorias = await Subcategoria.find({categoria: item._id});
            var productos = await Producto.find({categoria: item.titulo})
            categorias.push({
                categoria: item,
                subcategorias,
                nproductos: productos.length
            })
        }
        res.status(200).send(categorias);

    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const crear_subcategoria_admin = async function(req,res){
    if(req.user){
        let data = req.body;

        try {
            var reg = await Subcategoria.find({titulo:data.titulo});

            if(reg.length == 0){
                var subcategoria = await Subcategoria.create(data);
                res.status(200).send(subcategoria);
            }else{
                res.status(200).send({data:undefined,message: 'La subcategoria ya existe.'});   
            }
        } catch (error) {
            res.status(200).send({data:undefined,message: 'Ocurrió un eror durante el proceso.'});  
        }

        

    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const eliminar_subcategoria_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];

        var reg = await Subcategoria.findOneAndRemove({_id:id});
        res.status(200).send(reg);

    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const cambiar_estado_producto_admin = async function(req, res){
    if(req.user){
        let id = req.params['id'];
        let data = req.body;

        let nuevo_estado = false; 

        if(data.estado){
            nuevo_estado = false; 
        }else{
            nuevo_estado = true; 
        }

        let categoria = await Categoria.findByIdAndUpdate({_id: id,},{
            estado: nuevo_estado
        });
        res.status(200).send(categoria);
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
    registro_ingreso_admin,
    subir_imagen_producto_admin,
    obtener_galeria_producto,
    obtener_galeria_producto_admin,
    eliminar_galeria_producto_admin,
    crear_categoria_admin,
    listar_categorias_admin,
    crear_subcategoria_admin,
    eliminar_subcategoria_admin,
    cambiar_estado_producto_admin
}