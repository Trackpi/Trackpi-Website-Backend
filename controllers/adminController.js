const adminModel = require('../models/adminSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// getAllAdmin
exports.getAdmins = async (req, res) => {
  try {
    const response = await adminModel.find();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(406).json({
      err: 'server side error',
    });
  }
};

// deleteAdmin
exports.deleteAdmin = async (req, res) => {
  try {
    const user = req.user;
    const adminid = req.params.id;

    if (!user) {
      return res.status(406).json({
        err: 'failed to delete',
      });
    }

    // Verify the admin credentials
    const foundUser = await adminModel.findOne({
      _id: user,
    });
    if (!foundUser) {
      return res.status(406).json({
        err: 'you dont have credentials',
      });
    }

    // Proceed to delete the admin by ID
    const response = await adminModel.findOneAndDelete({
      _id: adminid,
    });
    if (!response) {
      return res.status(406).json({
        err: 'admin id not found',
      });
    }

    res.status(200).json({ message:"Admin Deleted Successfully!!!"});
  } catch (err) {
    console.log(err);
    res.status(406).json({
      err: 'server side error',
    });
  }
};

// addAdmin
exports.addAdmin = async (req, res) => {
    try {
      const user = req.user; // Assumes authentication middleware sets this
      const data = req.body;
      console.log('Request User:', user);
  
      console.log('Request Data:', data);
  
      // Validate request data
      if (!user || !data.username || !data.password || !data.adminType || !data.email) {
        return res.status(400).json({ err: 'Missing required fields' });
      }
  
      // Verify the admin credentials
      const foundUser = await adminModel.findOne({ _id: user });
      if (!foundUser) {
        return res.status(403).json({ err: 'You do not have credentials to add an admin' });
      }
  
      // Check for duplicate username or email
      const existingAdmin = await adminModel.findOne({
        $or: [{ username: data.username }, { email: data.email }],
      });
      if (existingAdmin) {
        return res.status(409).json({ err: 'Admin with this username or email already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;
  
      // Create new admin
      const response = await adminModel.create(data);
      console.log('New Admin Created:', response);
  
      res.status(201).json({ message: 'Admin created successfully', admin: response });
    } catch (err) {
      console.error('Error in addAdmin:', err);
      res.status(500).json({ err: 'Server-side error' });
    }
  };

  exports.editAdmin = async (req, res) => {
    try {
      const user = req.user; // Authenticated user
      const { id } = req.params; // Admin ID to update
      const data = req.body;
  
      console.log('Authenticated User:', user);
      console.log('Request Data:', data);
      console.log('Admin ID to Edit:', id);
  
      // Validate required data
      if (!user || !id || (!data.username && !data.email && !data.adminType && !data.password)) {
        return res.status(400).json({ err: 'Missing required fields or no fields to update' });
      }
  
      // Check if the authenticated user has valid credentials
      const foundUser = await adminModel.findById(user._id);
      if (!foundUser) {
        return res.status(403).json({ err: 'You do not have credentials to edit an admin' });
      }
  
      // Check if the new email already exists for another admin
      if (data.email) {
        const emailExists = await adminModel.findOne({ email: data.email, _id: { $ne: id } });
        if (emailExists) {
          return res.status(409).json({ err: 'Email already exists for another admin' });
        }
      }
  
      // Hash the password if it's being updated
      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
      }
  
      // Update the admin details
      const updatedAdmin = await adminModel.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true, runValidators: true } // Return updated document and enforce schema validation
      );
  
      if (!updatedAdmin) {
        return res.status(404).json({ err: 'Admin not found or could not be updated' });
      }
  
      res.status(200).json({
        message: 'Admin updated successfully',
        admin: updatedAdmin,
      });
    } catch (err) {
      console.error('Error in editAdmin:', err);
      res.status(500).json({ err: 'Server-side error' });
    }
  };
  
  
// adminLogin
// exports.adminLogin = async (req, res) => {

//   const { username, password } = req.body;

//   try {
//     // Find the admin by email
//     const admin = await adminModel.findOne({ username });

//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found.' });
//     }

//     // Option 1: Non-hashed password check (for now)
//     if (admin.password !== password) {
//       return res.status(401).json({ message: 'Invalid password.' });
//     }

//     // Uncomment this block when you store hashed passwords
//     /*
//         // Option 2: Hashed password check
//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid password." });
//         }
//         */

//     // Successful login
//     res.status(200).json({
//       message: 'Login successful.',
//       admin: {
//         username: admin.username,
//         email: admin.email,
//         adminType: admin.adminType,
//         isActive: admin.isActive,
//       },
//     });
//   } catch (error) {
//     console.error('Error during admin login:', error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// };

exports.adminLogin = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { username, password } = req.body;

    // Validate the input
    if (!username || !password) {
      return res
        .status(406)
        .json({ error: 'Username and password are required' });
    }

    // Find the admin by email or username
    let response;
    if (username.includes('@gmail.com')) {
      response = await adminModel.findOne({ email: username });
    } else {
      response = await adminModel.findOne({ username: username });
    }

    console.log('Database response:', response);

    // Check if the admin exists
    if (!response) {
      return res.status(406).json({ error: 'Invalid username or email' });
    }

    if (response.password !== password) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Compare the hashed password
    // const isPasswordMatch = await bcrypt.compare(password, response.password);
    // console.log('Password match result:', isPasswordMatch);

    // if (!isPasswordMatch) {
    //   return res.status(406).json({ error: 'Invalid password' });
    // }

    // Generate a JWT token
    const jwtToken = jwt.sign(
      { _id: response._id },
      process.env.JWT_KEY,
      { expiresIn: '7d' } // Set token expiry time
    );

    console.log('JWT Token generated successfully:', jwtToken);

    // Respond with success
    return res.status(200).json({
      message: 'Successfully logged in',
      token: jwtToken,
     
    });
  } catch (err) {
    console.error('Error during admin login:', err);
    return res.status(500).json({ error: 'Server-side error' });
  }
};
// exports.adminLogin = async (req, res) => {
//     try {
//         // const user = new adminModel({
//         //     username: "user",
//         //     password: "password",
//         //     adminType: "user",
//         //     email: "user00@gmail.com",
//         //     isActive: true
//         // });
//         // await user.save();
//         const { username, password } = req.body;

//         // Check for missing fields
//         if (!username || !password) {
//             return res.status(400).json({ message: 'Email and password are required' });
//         }

//         // Find admin by email
//         const admin = await adminModel.findOne({ username: username });
//         if (!admin) {
//             return res.status(403).json({ message: 'Email or password is incorrect' });
//         }

//         // Uncomment the following lines if password hashing is used in your system
//         // const isMatching = await bcrypt.compare(password, admin.password);
//         // if (!isMatching) {
//         //     return res.status(403).json({ message: 'Email or password is incorrect' });
//         // }

//         // Generate JWT token (uncomment if needed)
//         // const token = jwt.sign(
//         //     { id: admin._id, role: 'ADMIN' },
//         //     process.env.SECRET_KEY,
//         //     { expiresIn: '7d' }
//         // );

//         res.status(200).json({
//             message: 'You are Logged In !!!',
//             // Uncomment to include the token
//             // token: token
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

exports.adminStatusUpdate = async (req, res) => {
    const { id } = req.params;  // The ID of the admin whose status is being updated
    const { isActive } = req.body;  // The new status (true or false)

    try {
        // Find and update the admin's isActive status
        const admin = await adminModel.findByIdAndUpdate(id, { isActive }, { new: true });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        res.status(200).json({ message: "Admin status updated.", admin });
    } catch (error) {
        console.error("Error updating admin status:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
