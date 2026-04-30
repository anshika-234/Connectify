import Chat from "../model/chat.model.js";

const sendChat = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.params;
    const roomId = [senderId, receiverId].sort().join("_");
    const chat = await Chat.create({
      senderId: senderId,
      receiverId: receiverId,
      message: req.body.message,
      roomId: roomId,
    });
    console.log(chat);
    res.status(200).json({
      message: "message send successfully",
      chat,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

const getChats = async (req, res) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return res.status(404).json({ message: "This room doesn't exist.." });
    }
    const chat = await Chat.find({ roomId });
    res.status(200).json({
      message: "THese all are your message",
      chat,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export default { sendChat, getChats };
