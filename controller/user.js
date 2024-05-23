// userController.js
const UserModel = require("../model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
let user = {
  login: async (req, res) => {
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    try {
      
      const { username, password } = req.body;
      console.log('================uss====================');
      console.log(username);
      console.log('====================================');

      const user = await UserModel.getOneUser(req.body, (err, user) => {
        if (err) {
          console.log("================err====================");
          console.log(err);
          console.log("====================================");
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (!user) {
          return res.status(401).json({ error: "Invalid username or password" });
        }
        console.log('====================================');
        console.log(user);
        console.log('====================================');
        // const validPassword =  bcrypt.compare(password, user.password);
      // console.log('===============validPassword=====================');
      // console.log(validPassword);
      // console.log('====================================');
        // if (!validPassword) {
        //   return res.status(401).json({ error: "Invalid username or password" });
        // }

        if (password== user.password) {
          return res.status(401).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ userId: user.idUser }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({ token });
      });
    } catch (err) {
      console.log("================err====================");
      console.log(err);
      console.log("====================================");
    }
  },

  getAllUsers: async (req, res) => {
    UserModel.getAllUser((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      else res.send(data);
    });
  },
};
module.exports = user;
