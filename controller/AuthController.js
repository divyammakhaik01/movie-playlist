const User = require("../model/user");



const login = async (req, res) => {
  //login api logic here
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.statusCode(400).json({
        message: "Please provide email and password",
        statusCode: 400,
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.statusCode(400).json({
        message: "The email is not yet registered to an accout",
        statusCode: 400,
      });
    }

    const match = await user.checkPassword(password);

    if (!match) {
      // res.redirect('login')
      return res.statusCode(400).json({
        message: "The password does not match",
        statusCode: 400,
      });
    }
    
    const token = user.getJwtToken();
    
    
    res.cookie('jwtoken' , token , {
      maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      httpOnly : false
    })

    res.status(200).json({ status: true, token, user });

  } catch (error) {
    return res.json({
      status: "false",
      message: error,
    });
  }
};




const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (email === '' || username === '' || password === '') {
      return res.json({
        status: "fasle",
        message: "email or username or password not found ",
      });
    }



    const finduser = await User.find({
      username: username
    });
    // check whether user already registered

    if (finduser.length != 0) {
      return res.json({
        status: "false",
        message: "user already exist with this username or email",
      });
    }
    const user = await User.create({ email , username, password  });
    console.log(user);

    const token = user.getJwtToken();
    res.status(201).json({ success: true, token: token });
  } catch (error) {
    return res.json({
      status: "false",
      message: error,
    });
  }
};

const logout = async (req, res) => {
  //logout api logic here
    try {


    

  } catch (error) {
    return res.json({
      status: "false",
      message: error,
    });
  }
};


const AuthController = {
  login,
  register,
  logout
};

module.exports = AuthController;
