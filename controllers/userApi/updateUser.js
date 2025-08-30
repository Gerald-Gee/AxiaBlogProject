import User from "../../schemas/userSchema.js";

// Edit user info
export const editUser = async (req, res) => {
  const { id } = req.params;

  if (id !== req.user._id.toString()) {
    return res.status(401).json({ message: "Unauthorized to edit this user" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password");
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit user profile
export const editProfile = async (req, res) => {
  const { id } = req.params;
  const { country, Number, Street, Bio } = req.body;

  if (id !== req.user._id.toString()) {
    return res.status(401).json({ message: "Unauthorized to edit this profile" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { "profile.country": country, "profile.Number": Number, "profile.Street": Street, "profile.Bio": Bio } },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
