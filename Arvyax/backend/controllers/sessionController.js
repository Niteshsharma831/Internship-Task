const Session = require("../models/Session");

exports.getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" }).sort({
      created_at: -1,
    });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.id }).sort({
      updated_at: -1,
    });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMySessionById = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!session) return res.status(404).json({ message: "Not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.saveDraft = async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;
  try {
    if (id) {
      // update
      const session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user.id },
        {
          title,
          tags: (tags || []).map((t) => t.trim()).filter(Boolean),
          json_file_url,
          updated_at: Date.now(),
          status: "draft",
        },
        { new: true }
      );
      return res.json(session);
    }
    const session = new Session({
      user_id: req.user.id,
      title,
      tags: (tags || []).map((t) => t.trim()).filter(Boolean),
      json_file_url,
      status: "draft",
    });
    await session.save();
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.publish = async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;
  try {
    if (!id)
      return res.status(400).json({ message: "id is required to publish" });
    const session = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      {
        title,
        tags: (tags || []).map((t) => t.trim()).filter(Boolean),
        json_file_url,
        status: "published",
        updated_at: Date.now(),
      },
      { new: true }
    );
    if (!session) return res.status(404).json({ message: "Not found" });
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
