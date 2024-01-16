const router =require('express').Router();
const bycrypt = require('bycrypt');
const User = require('../../models/User');

//Route for registration
router.post('/register', async (req,res)=>{
    try{
     // Get user input from request body
     const { username, password } = req.body;

     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10);
 
     // Create a new user in the database
     const user = await User.create({
       username,
       password: hashedPassword
     });
 
     // Return the created user as response
     res.status(201).json(user);
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal server error' });
   }
 });
 
 // Route for user login
 router.post('/login', async (req, res) => {
   try {
     // Get user input from request body
     const { username, password } = req.body;
 
     // Find the user in the database
     const user = await User.findOne({ where: { username } });
 
     // If user does not exist, return error message
     if (!user) {
       return res.status(404).json({ error: 'User not found' });
     }
 
     // Compare the provided password with the hashed password in the database
     const passwordMatch = await bcrypt.compare(password, user.password);
 
     // If passwords do not match, return error message
     if (!passwordMatch) {
       return res.status(401).json({ error: 'Invalid password' });
     }
 
     // User authentication successful, return success message
     res.status(200).json({ message: 'Login successful' });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal server error' });
   }
 });
 
 module.exports = router;