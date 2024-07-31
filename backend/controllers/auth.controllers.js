import { User } from '../models/User.model.js';

export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if email, password and username are provided
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: 'Please fill all fields 🤨' });
    }

    // Check if email is valid
    const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );

    if (!isEmailValid) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email address 🤨' });
    }

    // Check if password is at least 5 characters
    if (password.length < 5) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Password must be at least 5 characters 🤨',
        });
    }

    // Check is user already exists
    const isEmailExists = await User.findOne({ email });

    if (isEmailExists) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already exists 🤨' });
    }

    // Check if username already exists
    const isUsernameExists = await User.findOne({ username });

    if (isUsernameExists) {
      return res
        .status(400)
        .json({ success: false, message: 'Username already exists 🤨' });
    }

    const PROFILE_AVATRS = [
      '/profile_img_1.jpg',
      '/profile_img_2.jpg',
      '/profile_img_3.jpg',
      '/profile_img_4.jpg',
    ];

    const image =
      PROFILE_AVATRS[Math.floor(Math.random() * PROFILE_AVATRS.length)];

    // Create new user
    const newUser = new User({ email, password, username, image });
    // Save user to database
    await newUser.save();

    //TODO: Remove password from response
    res
      .status(201)
      .json({ success: true, user: { ...newUser._doc, password: '********' } });
  } catch (error) {
    console.log('Error on signup', error.message);
    res
      .status(500)
      .json({ success: false, message: 'Internal server error 🤨' });
  }
};

export const login = async (req, res) => {
  res.send('login route');
};

export const logout = async (req, res) => {
  res.send('logout route');
};
