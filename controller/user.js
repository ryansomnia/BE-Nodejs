// userController.js
const UserModel = require("../model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { logError, logInfo } = require("../helpers/loggerService");
let user = {
  login: async (req, res) => {
    try {
      
      const { username, password } = req.body;
   

      const user = await UserModel.getOneUser(req.body, (err, user) => {
        if (err) {
          logError(`Internal Server Error`);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!user) {
          logError(`Invalid username or password`);
          return res.status(401).json({ error: "Invalid username or password" });
        }
   
        const validPassword =  bcrypt.compare(password, user.password);
     
        if (!validPassword) {
          logError('Invalid username or password');
          return res.status(401).json({ error: "Invalid username or password" });
        }

        if (password== user.password) {
          logError('Invalid username or password')
          return res.status(401).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ userId: user.idUser }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        logInfo('Login Success')
        res.status(200).json({ token });
      });
    } catch (err) {
      res.status(500).json({ err });
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
  register: async (req, res) => {
    try {
      const { fullName, username, password, email } = req.body;

      if (!emptyValidation(req.body)) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      
      // Hash the password before saving it to the database
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        fullName,
        username,
        password: hashedPassword,
        email,
      };

      UserModel.createUser(newUser, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    } catch (err) {
          res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
module.exports = user;
