// Import necessary modules and models
const Chat = require("../modals/chatModal");
const User = require("../modals/userModal");
const Sequelize = require('sequelize');

// Create a chat message
exports.chatMessage = async (req, res, next) => {
  try {
    console.log("body of message is >>>>>>>", req.body)
    const message = req.body.userMessage;
    const chatMessage = await Chat.create({
      userId: req.user.id,
      chatMessage: message,
      groupId: req.body.groupId // Make sure groupId is a valid group ID
    });
    res.status(200).json({ chatMessage: chatMessage, message: "chat message sent" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unable to send message" });
  }
};

// Get messages for a specific group
exports.getMessage = async (req, res, next) => {
  try {
    const lastMessageId = parseInt(req.query.lastMessageId) || 0;
    console.log("lastMessageID >>>>>>>>>>>>>>>>>>>>", lastMessageId);
    console.log("group id is >>>>", req.query.groupId);
    const groupId = req.query.groupId; // Make sure groupId is a valid group ID
    const userMessage = await Chat.findAll({
      where: {
        groupId: groupId,
        id: {
          [Sequelize.Op.gt]: lastMessageId
        },
        userId: req.user.id
      },
      include: {
        model: User,
        attributes: ['userName']
      }
    });
    console.log("User MEssage >>>>>>>>>>>>>>>.", userMessage);
    res.status(200).json({ userMessage: userMessage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Unable to fetch messages' });
  }
};
