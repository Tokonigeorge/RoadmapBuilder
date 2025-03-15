import express from 'express';
import UserModel from '../schema/user';

const router = express.Router();

// Create or update user eafter authentication
router.post('/user', async (req, res) => {
  try {
    const { email, uid, displayName, photoURL } = req.body;

    if (!email || !uid) {
      return res.status(400).json({ error: 'Email and UID are required' });
    }

    // Check if user exists and update, otherwise create
    const user = await UserModel.findOneAndUpdate(
      { uid },
      {
        email,
        displayName,
        photoURL,
        lastLogin: new Date(),
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to save user information' });
  }
});

// Save resources to user
router.post('/save-resource', async (req, res) => {
  try {
    const { uid, resourceId } = req.body;

    if (!uid || !resourceId) {
      return res
        .status(400)
        .json({ error: 'User ID and Resource ID are required' });
    }

    const user = await UserModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add resource if not already saved
    if (!user.savedResources.includes(resourceId)) {
      user.savedResources.push(resourceId);
      await user.save();
    }

    res
      .status(200)
      .json({ success: true, savedResources: user.savedResources });
  } catch (error) {
    console.error('Error saving resource:', error);
    res.status(500).json({ error: 'Failed to save resource' });
  }
});

export default router;
