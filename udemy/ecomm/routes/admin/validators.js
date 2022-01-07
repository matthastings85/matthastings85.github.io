const {body} = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
  requireTitle: body('title')
    .trim()
    .isLength({ min: 5, max: 40 })
    .withMessage('Title is required. 5-40 characters.'),
  requirePrice: body('price')
    .trim()
    .toFloat() //use float because it has a decimal attached to it. Rather than toInt()
    .isFloat({ min: 1 })
    .withMessage('Valid number required.'),
  requireEmail: body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be valid email')
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error('Email in use');
      } 
  }),
  requirePassword: body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters'),
  requirePasswordConfirmation: body('passwordConfirmation')
    .trim()
    .isLength({ min: 4, max: 20})
    .withMessage('Passwords must match')
    .custom((passwordConfirmation, {req}) => {
      if (passwordConfirmation !== req.body.password){
        throw new Error('Passwords must match')
      }
  }),
  requireEmailExists: body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({email});
      if (!user) {
        throw new Error('Email not found');
      }
    }),
  requireValidPassword: body('password')
  .trim()
  .custom(async (password, { req }) => {
    const user = await usersRepo.getOneBy({email: req.body.email});
    if(!user) {
      throw new Error('Invalid password')
    }
    const validPassword = await usersRepo.comparePasswords(user.password, password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }
  })
};