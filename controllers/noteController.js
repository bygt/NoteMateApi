const Note = require("../models/Note");
const Joi = require("joi");
const { Op } = require("sequelize");
const User = require("../models/User");

exports.createNote = async (req, res) => {
  try {
    console.log(req.body);
    const { error, value } = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      from_id: Joi.number().required(),
      to_id: Joi.number().required(),
    }).validate(req.body);
    if (error)return res.status(400).send(`Validation Error: ${error.details[0].message}`);
    
    const { from_id, to_id, title, content } = req.body;
    const isFriends = await User.findOne({      
        where: {
          id: from_id,
          friends: {
            [Op.contains]: [to_id]  // check if to_id is in friends array
          }
        }
    });
    if (!isFriends) return res.status(400).send("You are not friends with this user, add before sending a note");
    const note = await Note.create({
      title,
      content,
      from_id,
      to_id,
    });

    // send status and note
    return res.status(200).send(note);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { error, value } = Joi.object({
      note_id: Joi.number().required(),
      content: Joi.string().required(),
      title: Joi.string().required(),
    }).validate(req.body);
    if (error) return res.status(400).send(`Validation Error: ${error.details[0].message}`);

    const { note_id, content, title } = req.body;

    const oldNote = await Note.findOne({
      where: {
        note_id,
      },
    });

    if (!oldNote) return res.status(404).send("Note not found");

    const note = await Note.update({
      where: {
        note_id,
      },
      content : content || oldNote.content,
      title : title || oldNote.title,
    });

    // send status and note
    return res.status(200).send(note);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {     
    const { error, value } = Joi.object({
      from: Joi.number().required(),
      to: Joi.number(),
    }).validate(req.query);
    if (error) return res.status(400).send(`Validation Error: ${error.details[0].message}`);

    const { from, to } = req.query;

    if (!from) return res.status(400).send("Invalid query parameters");  
    let whereObj = {
      from_id: from,
    };
    if(to) whereObj.to_id = to;
    const notes = await Note.findAll({
        where: whereObj
    });
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
