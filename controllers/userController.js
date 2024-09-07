const e = require("express");
const User = require("../models/User");
const Note = require("../models/Note");
const Joi = require("joi");

exports.signUp = async (req, res) => {
  try {
    const { error, value } = Joi.object({}).validate(req.body);
    if (error) {
      return res
        .status(400)
        .send(`Validation Error: ${error.details[0].message}`);
    }

    const user = await User.create({
      content: req.body.content,
      from_id: req.body.from_id,
      to_id: req.body.to_id,
    });

    // send status and note
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { error, value } = Joi.object({
      user_id: Joi.number().required(),
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
    }).validate(req.body);
    if (error) {
      return res
        .status(400)
        .send(`Validation Error: ${error.details[0].message}`);
    }
    const{ user_id, name, email, password } = req.body;

    const user = await Note.update({
      where: {
        user_id,
      },
      name: name? name : user.name,
      email: email? email : user.email,
      password: password? password : user.password,
      
    });

    // send status and note
    return res.status(200).send(note);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    users.forEach((user) => {
      console.log(user.dataValues.friends);
    });
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.acceptFriend = async (req, res) => {
  try {
    const { error, value } = Joi.object({
      user_id: Joi.number().required(),
      friend_id: Joi.number().required(),
    }).validate(req.body);
    if (error) {
      return res
        .status(400)
        .send(`Validation Error: ${error.details[0].message}`);
    }
    const { user_id, friend_id } = req.body;

    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });

    const friend = await User.findOne({
      where: {
        id: friend_id,
      },
    });
    // if one of them is not found
    if (!user || !friend) return res.status(404).send("User not found");
    // if already friends
    if (user.friends.includes(friend_id))
      return res.status(400).send("Already friends");
    // if friend request not found
    if (!user.friendRequests.includes(friend_id))
      return res.status(400).send("Friend request not found");

    const friends = user.friends || [];
    friends.push(friend_id);

    const friendRequests = user.friendRequests || [];
    friendRequests.splice(friendRequests.indexOf(friend_id), 1);

    const updatedUser = await User.update(
      { friendRequests, friends }, // Güncellenen değerler
      {
        where: {
          id: user_id,
        },
        returning: true,
      }
    );
 

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.friendRequest = async (req, res) => {
  try {
    const { error, value } = Joi.object({
      user_id: Joi.number().required(),
      friend_id: Joi.number().required(),
    }).validate(req.body);
    if (error) {
      return res
        .status(400)
        .send(`Validation Error: ${error.details[0].message}`);
    }
    const { user_id, friend_id } = req.body;

    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });

    const friend = await User.findOne({
      where: {
        id: friend_id,
      },
    });
    // if one of them is not found
    if (!user || !friend) return res.status(404).send("User not found");
    // if already friends
    if (user.friends.includes(friend_id))
      return res.status(400).send("Already friends");

    const friendRequests = user.friendRequests || [];
    friendRequests.push(user_id);

    const updatedUser = await User.update(
      { friendRequests }, // Güncellenen değerler
      {
        where: {
          id: friend_id, // Güncellenecek kayıtlar
        },
        returning: true,
      }
    );

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
