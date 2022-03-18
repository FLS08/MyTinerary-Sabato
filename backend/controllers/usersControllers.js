const User = require("../models/usersModel");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")

const sendEmail = async (email, uniqueString) => { //FUNCION ENCARGADA DE ENVIAR EL EMAIL

  const transporter = nodemailer.createTransport({ //DEFINIMOS EL TRASPORTE UTILIZANDO NODEMAILER
      host: 'smtp.gmail.com',         //Protocolo smtp para gmail
      port: 465,
      secure: true,
      auth: {
          user: "usermailverify.fls@gmail.com",    
          pass: "1959Alberto"                          
      },
                                           
  })

  let sender = "usermailverify.fls@gmail.com"  
  let mailOptions = { 
      from: sender,    
      to: email,       
      subject: "MyTinerary's || Verify your account ", //EL ASUNTO Y EN HTML EL TEMPLATE PARA EL CUERPO DE EMAIL Y EL LINK DE VERIFICACION
      html: `Press <a href=http://localhost:4000/api/verify/${uniqueString}>"here"</a> to confirm your email. Thank you`,  
  };
  await transporter.sendMail(mailOptions, function (error, response) { //SE REALIZA EL ENVIO
      if (error) { console.log(error) }
      else {
          console.log("Mensaje enviado")

      }
  })
};




const usersControllers = {

  verifyEmail: async (req, res) => {

    const { uniqueString } = req.params; //EXTRAE EL EL STRING UNICO DEL LINK

    const user = await User.findOne({ uniqueString: uniqueString })
    if (user) {
        user.emailVerificado = true //COLOCA EL CAMPO emailVerified en true
        await user.save()
        res.redirect("http://localhost:3000/") //REDIRECCIONA AL USUARIO A UNA RUTA DEFINIDA
        //return  res.json({success:true, response:"Su email se ha verificado correctamente"})
    }
    else { res.json({ success: false, response: "Su email no se ha verificado" }) }
},
  signUpUsers: async (req, res) => {
    let { name, lastName, urlImage, country, email, password, from } = req.body.userData;
    console.log(req.body);

    try {
      const usuarioExiste = await User.findOne({ email }); //BUSCAR SI EL USUARIO YA EXISTE EN DB

      console.log(usuarioExiste)


      if (usuarioExiste) {
        if (usuarioExiste.from.indexOf(from) !== -1) {
          //INDEXOF = 0 EL VALOR EXISTE EN EL INDICE EQ A TRUE, -1 NO EXISTE EQ A FALSE
          res.json({
            success: false,
            from: "signup",
            message:
              "You are registered. Do you want to go SingIn page?",
          });
        } else {
          const contraseñaHasheada = bcryptjs.hashSync(password, 10);

          usuarioExiste.from.push(from);
          usuarioExiste.password.push(contraseñaHasheada);
          
          if (from === "signup") {
            usuarioExiste.uniqueString = crypto.randomBytes(15).toString('hex')
            await usuarioExiste.save()
            await sendEmail(email, usuarioExiste.uniqueString)
            res.json({
              success: true,
              from: "signup", 
              message:
                "Te enviamos un email para validarlo, por favor verifica tu casilla para completar el signUp y agregarlo a tus metodos de SignIN ",
            });
          } else {
            usuarioExiste.save();

            res.json({
              success: true,
              from: "signup",
              message:
                "Agregamos " + from + " a tus medios para realizar signIn",
            });
          } // EN ESTE PUNTO SI EXITE RESPONDE FALSE
        }
      } else {
        //SI EL USUARIO NO ESXITE
        

        const contraseñaHasheada = bcryptjs.hashSync(password, 10); //LO CREA Y ENCRIPTA LA CONTRASEÑA
        // CREA UN NUEVO OBJETO DE PERSONAS CON SU USUARIO Y CONTRASEÑA (YA ENCRIPTADA)
        const nuevoUsuario = await new User({
          name,
          lastName,
          urlImage,
          country,
          email,
          password: [contraseñaHasheada],
          uniqueString:crypto.randomBytes(15).toString('hex'),
          emailVerificado: false,
          from: [from],
        });

        if (from !== "signup") {  //User doesnt exists & registry from other site
          await nuevoUsuario.save();
          res.json({
            success: true,        // Caso Facebook ***********
            from: "signup",
            message: "Ok! You Signed Up from: " + from,
          }); // 
        } else {                   // User doesnt exists & registry from signup
            await nuevoUsuario.save()
            await sendEmail(email, nuevoUsuario.uniqueString)
          console.log("Usuario no existe y from es signup");
          res.json({
            success: true,
            from: "signup",
            message:
              "Te enviamos un email para validarlo, por favor verifica tu casilla para completar el signUp ",
          }); // AGREGAMOS MENSAJE DE VERIFICACION
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Algo ha salido mal intentalo en unos minutos",
      }); //CAPTURA EL ERROR
    }
  },
  signInUser: async (req, res) => {
    const { email, password, from } = req.body.logedUser;
    //console.log("Test");

    //console.log(req.body)
    try {
      const usuarioExiste = await User.findOne({ email });
      console.log(usuarioExiste);

      

      if (!usuarioExiste) {
        // PRIMERO VERIFICA QUE EL USUARIO EXISTA
        res.json({
          success: false,
          message: "Your user never does created. Maybe you look SingUp page",
        });
      } else {
        if (from !== "form-Signin") {
          let contraseñaCoincide = usuarioExiste.password.filter((pass) =>
            bcryptjs.compareSync(password, pass)
          );
          
          console.log(contraseñaCoincide.length);
          if (contraseñaCoincide.length > 0) {
            //TERERO VERIFICA CONTRASEÑA

            const userData = {
              id: usuarioExiste._id,
              name: usuarioExiste.name,
              lastName: usuarioExiste.lastName,
              email: usuarioExiste.email,
              urlImage: usuarioExiste.urlImage,
              from: usuarioExiste.from,
            };
            await usuarioExiste.save();
            const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24})

            
            res.json({
              success: true,
              from: from,
              response: {token, userData },
              message: "Bienvenido nuevamente " + userData.name + " " + userData.lastName,
            });
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "No has realizado el registro con " +
                from +
                "si quieres ingresar con este metodo debes hacer el signUp con " +
                from,
            });
          }
        } else {
          if (usuarioExiste.emailVerificado) {
            let contraseñaCoincide = usuarioExiste.password.filter((pass) =>
              bcryptjs.compareSync(password, pass)
            );
            if (contraseñaCoincide.length > 0) {
              const userData = {
                id: usuarioExiste._id,
                name: usuarioExiste.name,
                lastName: usuarioExiste.lastName,
                email: usuarioExiste.email,
                urlImage: usuarioExiste.urlImage,
                from: usuarioExiste.from,
              };

              const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24})


              //console.log("Contraseña coincide");

              res.json({
                success: true,
                from: from,
                response: {token, userData},
                message: "Bienvenido nuevamente " + userData.name + " " + userData.lastName,
              });
            } else {
              res.json({
                success: false,
                from: from,
                message: "El usuario o el password no coinciden",
              });
            }
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "No has verificado tu email, por favor verifica ti casilla de emails para completar tu signUp",
            });
          }
        } //SI NO ESTA VERIFICADO
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Algo a salido mal intentalo en unos minutos",
      });
    }
  },
  signOutUser: async (req, res) => {
    const email = req.body.closeuser;
    const user = await User.findOne({ email });
    await user.save();
    res.json(console.log(" " + email));
  },
  VerifyToken:(req, res) => {
    console.log(req.user)
    if(!req.err){
    res.json({success:true,
              response:{id:req.user.id, fullName:req.user.fullName,email:req.user.email,urlImage:req.user.urlImage, from:"token"},
              message:"Bienvenido nuevamente "+req.user.fullName}) 
    }else{
        res.json({success:false,
        message:"Por favor realiza nuevamente signIn"}) 
    }
}
};
module.exports = usersControllers;
