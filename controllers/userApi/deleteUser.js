import User from "../../schemas/userSchema.js";

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { _id, admin } = req.user;

  if (id === _id.toString() || admin) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(401).json({ message: "Unauthorized to delete this user" });
  }
};
