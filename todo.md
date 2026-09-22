# backlog: 
- show/hide password button
- styles
- message view (with delete button for admin)
- delete messages if you are admin 
- display users for admin view and delete user feature

# done:
- database schema and creation script
- sign up form (ui, sanitization, validation, post request)
- logout
- login form (ui, post request, session + cookies)
- become member feature
- create new message form and functionality
- display messages with author and date on condition for members
- become admin feature

## target
- become member [24/9]

## takeaways
- [24/9]:
    - 


# structure
members-only/
├── config/
│   ├── database.js          # pg Pool connection setup
│   └── passport.js          # LocalStrategy, serializeUser/deserializeUser
├── db/
│   └── schema.sql           # CREATE TABLE for users, messages, and the session store
├── models/
│   ├── userModel.js         # queries: create user, find by username/id, update
│   └── messageModel.js      # queries: create, get, delete
├── controllers/
│   ├── authController.js    # register + log-out handler logic
│   ├── membershipController.js  # join-club passcode logic, admin passcode logic
│   └── messageController.js # home page listing, new-message form, delete message
├── middleware/
│   ├── authMiddleware.js    # isLoggedIn, isMember, isAdmin guards
│   └── validators.js        # express-validator chains
├── routes/
│   ├── index.js             # mounts the routers below
│   ├── authRouter.js        # /register, /log-in, /log-out
│   ├── membershipRouter.js  # /join, /admin
│   └── messageRouter.js     # /, /new-message, /messages/:id/delete
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── message.ejs      # single message partial, reused on the home page
│   ├── index.ejs            # home page / message list
│   ├── register-form.ejs
│   ├── log-in-form.ejs
│   ├── join-form.ejs        # membership passcode form
│   ├── admin-form.ejs       # admin passcode form (if not a signup checkbox)
│   ├── new-message-form.ejs
│   └── error.ejs
├── public/
│   ├── css/
│   │   └── style.css
│   └── images/
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
