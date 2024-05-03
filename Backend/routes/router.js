const express = require("express");
const router = express.Router();
const UserModel = require("../models/userSchema");
const bcrypt = require("bcryptjs")
const auth = require("../middleware/auth")

router.post("/", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (!name || !email || !password || !confirmPassword) {
            return res.status(422).json({ error: "Fill all the details" });
        }

        const preUser = await UserModel.findOne({ email: email });
        if (preUser) {
            return res.status(422).json({ error: "This email is already in use" });
        } else if (password !== confirmPassword) {
            return res.status(422).json({ error: "Password and Confirm Password do not match" });
        }

        const finalUser = new UserModel({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        });

        const storeData = await finalUser.save();
        console.log(storeData);
        res.status(201).json({ message: "User registered successfully",storeData });
    } catch (error) {
        console.error(error);
        res.status(422).json({ error});
    }
});


//user login 

//user login 
router.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Fill all the details" });
    }

    const userValid = await UserModel.findOne({ email: email });
    if (!userValid) {
      return res.status(422).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(String(password), String(userValid.password));
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid email or password" });
    }else{

    // Token generation
    const token = await userValid.generateAuthToken();
    // console.log(token); // Log token to console

    // cookiegenerate
    res.cookie("usercookie", token,{
      expires: new Date(Date.now()+9000000),
      httpOnly: true
    })

    const result = {
      userValid,
      token
    }
    res.status(201).json({status:201, result})

    }
  } catch (error) {
    console.error(error);
   
  }
});


// Check if user is valid (authenticated)
router.get("/validUser", auth, async (req, res) => {
  try {
    const ValidUserOne = await UserModel.findOne({_id:req.userId})
    res.status(201).json({status:201,ValidUserOne})
  } catch (error) {
    res.status(401).json({status:401,error})
  }
})

module.exports = router;
