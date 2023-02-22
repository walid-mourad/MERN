let User = require('../models/UserModels.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../config/config.env' });

// Get all users
exports.getUsers = async (req, res) => {
try {
const users = await User.find({});
res.status(200).json({
success: true,
users
});
} catch (err) {
console.log(err);
res.status(500).send(err);
}
};

// Get user by id
exports.getUserById = async (req, res) => {
try {
const user = await User.findById(req.params.id);
if (!user) {
return res.status(404).json({ message: 'User not found' });
}
res.status(200).json({
success: true,
user
});
} catch (err) {
res.status(500).send(err);
}
};
exports.register= async(req,res) =>{
const email= await User.findOne({email:req.body.email});
if(email) {return res.status(401).send('Email exists !');}
const salt = await bcrypt.genSalt(5);
const pwdHash = await bcrypt.hash(req.body.password,salt);
const user = new User({
  name: req.body.name,
  email: req.body.email,
  password : pwdHash
})
try {
  await user.save();
  res.status(200).json({
    "success": "user saved successfully",
    "user": user
})
}catch (err) {
  console.error(err);
}
}

exports.login= async(req,res) =>{
  const user =await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send('user not found');
const verif = await bcrypt.compare(req.body.password,user.password)
if(!verif) return res.status(400).send('password incorrect !')
const token = jwt.sign({_id:user._id},process.env.SECRET_TOKEN,{expiresIn:'36000s'});

res.header('auth-token',token).send(token);
}

// Create a new user
exports.addUser = async (req, res) => {
  console.log(req,"Text");
try {
  if (!req.body.password || !req.body.email || !req.body.name) {
    return res.status(400).json({
        message: "Missing required fields"
    }); }
const user = await User.create(req.body);
res.status(200).json({
created: true,
user
});
} catch (err) {
console.log(err);
res.status(500).send(err);
}
};

// Get user by name
exports.getUserByName = async (req, res) => {
try {
const user = await User.findOne({ name: req.params.name });
if (!user) {
return res.status(404).json({ message: 'User not found' });
}
res.status(200).json({
success: true,
user
});
} catch (err) {
res.status(500).send(err);
}
};



// Update a user by id
exports.updateUser = async (req, res) => {
try {
const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!user) return res.status(404).send("The user with the given ID was not found.");
res.send(
{updated : true,
  user
});
} catch (err) {
res.status(500).send(err);
}
};

exports.updateUserName = async (req, res) => {
  try {
  const user = await User.findOneAndUpdate({name :req.params.name},req.body, { new: true });
  if (!user) return res.status(404).send("The user with the given ID was not found.");
  res.send({updated : true,
    user
  });
  } catch (err) {
  res.status(500).send(err);
  }
  };
  

// Delete a user by id
exports.deleteUser = async (req, res) => {
try {
const user = await User.findByIdAndDelete(req.params.id);
if (!user) return res.status(404).send("The user with the given ID was not found.");
res.send(user);
} catch (err) {
res.status(500).send(err);
}
};

exports.deleteUserName = async (req, res) => {
  try {
  const user = await User.findOneAndDelete({name: req.params.name});
  if (!user) return res.status(404).send("The user with the given ID was not found.");
  res.send({
    deleted: true,
    user
  });
  } catch (err) {
  res.status(500).send(err);
  }
  };