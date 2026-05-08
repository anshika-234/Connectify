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

    res.status(200).json({
      message: "message send successfully",
      chat,
    });
  } catch (err) {
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
// Get all conversations for current user, sorted by latest message
const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all messages where current user is sender OR receiver
    const messages = await Chat.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: -1 }); // latest first

    // From all messages, get unique roomIds in order
    // First message of each room = latest message of that room
    const seenRooms = new Set();
    const conversations = [];

    for (const msg of messages) {
      if (!seenRooms.has(msg.roomId)) {
        seenRooms.add(msg.roomId);

        // Get the OTHER person's id (not current user)
        const otherUserId =
          msg.senderId.toString() === userId.toString()
            ? msg.receiverId
            : msg.senderId;

        conversations.push({
          roomId: msg.roomId,
          otherUserId: otherUserId,
          lastMessage: msg.message,
          lastMessageTime: msg.createdAt,
        });
      }
    }

    res.status(200).json({
      message: "All conversations",
      conversations, // array sorted by latest message
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { sendChat, getChats, getConversations };
