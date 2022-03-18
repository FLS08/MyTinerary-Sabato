const User = require("../models/usersModel");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")

const sendEmail = async (email, uniqueString) => { 

  const transporter = nodemailer.createTransport({ 
      host: 'smtp.gmail.com',         //Protocolo smtp para gmail
      port: 465,
      secure: true,
      auth: {
          user: "usermailverify.fls@gmail.com",    
          pass: "1959Alberto"                          
      },
      tls: {
          rejectUnauthorized: false
      }
                                           
  })

  let sender = "usermailverify.fls@gmail.com"  
  let mailOptions = { 
      from: sender,    
      to: email,       
      subject: "MyTinerary's || Verify your account ", 
      html: `Press <a href=http://localhost:4000/api/verify/${uniqueString}>"here"</a> to confirm your email. Thank you`,  
  };
  await transporter.sendMail(mailOptions, function (error, response) { 
      if (error) { console.log(error) }
      else {
          console.log("Message sent")

      }
  })
};




const usersControllers = {

  verifyEmail: async (req, res) => {

    const { uniqueString } = req.params; 

    const user = await User.findOne({ uniqueString: uniqueString })
    if (user) {
        user.emailVerificado = true 
        await user.save()
        res.redirect("http://localhost:3000/") 
        
    }
    else { res.json({ success: false, response: "Your email has not been verified" }) }
},
  signUpUsers: async (req, res) => {
    let { name, lastName, urlImage, country, email, password, from } = req.body.userData;
    console.log(req.body);

    try {
      const usuarioExiste = await User.findOne({ email }); 

      console.log(usuarioExiste)


      if (usuarioExiste) {
        if (usuarioExiste.from.indexOf(from) !== -1) {
          
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
                "We send you an email to validate it. Please check your mailbox to next with signin ",
            });
          } else {
            usuarioExiste.save();

            res.json({
              success: true,
              from: "signup",
              message:
                "We Add " + from + "to your means to perform signIn",
            });
          } // EN ESTE PUNTO SI EXITE RESPONDE FALSE
        }
      } else {
        //SI EL USUARIO NO ESXITE
        

        const contraseñaHasheada = bcryptjs.hashSync(password, 10); 
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

        if (from !== "signup") {  
          await nuevoUsuario.save();
          res.json({
            success: true,        // Case Facebook ***********
            from: "signup",
            message: "Ok! You Signed Up from: " + from,
          }); // 
        } else {                   
            await nuevoUsuario.save()
            await sendEmail(email, nuevoUsuario.uniqueString)
          res.json({
            success: true,
            from: "signup",
            message:
              "We send you an email to validate it. Please check your mailbox ",
          });  
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong. Try again in a few moment..",
      }); 
    }
  },
  signInUser: async (req, res) => {
    const { email, password, from } = req.body.logedUser;
    

   
    try {
      const usuarioExiste = await User.findOne({ email });
      console.log(usuarioExiste);

      

      if (!usuarioExiste) {
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
              message: "Welcome To MiTinerary! ",
            });
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "You are not registered with " +
                from +
                "if you want to join with these method you must do signUp with " +
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



              res.json({
                success: true,
                from: from,
                response: {token, userData},
                message: "Welcome To MiTinerary! ",
              });
            } else {
              res.json({
                success: false,
                from: from,
                message: "Incorrect User or Password",
              });
            }
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "Your email was not verified. Please check your mailbox",
            });
          }
        } 
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong. Try again in a few moment..",
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
              message:"Welcome to MiTinerary!"}) 
    }else{
        res.json({success:false,
        message:"Please do the signUp again.."}) 
    }
}
};
module.exports = usersControllers;
