// middleware/auth.js
const jwt = require('jsonwebtoken');
const {User} = require('../model/user')

const authenticateToken = (requiredPermissions) => async (req, res, next) => {
  
  const token = req.header('Authorization')?.split(" ")[1];
  if (!token) {
    return res.json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, 'your_secret_key', async (error, user) => {
    if (error) {
      return res.json({ message: 'Invalid token.' });
    }

    // try {
      // Fetch user from the database to get their permissions
      const fetchedUser = await User.findOne({where:{ id: user.id}});
      if (!fetchedUser) {
        return res.json({ message: 'User not found.' });
      }

      // Check if the user has the required permissions
      const hasRequiredPermissions = requiredPermissions.some(permission => fetchedUser.rule == permission);
      if (!hasRequiredPermissions) {
        return res.json({ message: 'Insufficient permissions.' });
      }

      req.user = fetchedUser;
     return next();
    // } catch (error) {
    //   res.json({ message: 'Error fetching user permissions.', error });
    // }
  });
};

module.exports = authenticateToken;
