# backlog: 
- show/hide password button
- styles
- display users for admin view and delete user feature

# done:
- database schema and creation script
- sign up form (ui, sanitization, validation, post request)
- login form (ui, post request, session + cookies)
- become member feature
- create new message form and functionality
- display messages with author and date on condition for members
- become admin feature
- message view (with delete button for admin)
- delete messages if you are admin 

## target
- become member | login, create new message, display messages, become admin [24/9]
- message view, delete message if you admin, display users for admin [25/9]

## takeaways
- [24/9]:
    - passport.authenticate will use the verifyCallback and redo the expensive query while req.login is better because needs only the userId to set the user in the cookies after the user registration
    - req.logout deletes req.user and clears authentication session data on the server side
    - I used passport.authenticate for the login but I had to assign it to a function variable and call it at the end otherwise it didnt trigger
    - validation arrays live in the middleware where validationResults and matchedData live in the controller because we need the first to display the errors and the second to get the validated and sanitized data for the request
    - you can use isAuth middleware to guard routes and any other is... function really and you set them up in the controller and not the route - industry standard is to set the middleware guard in the route though
    - you can pass through locals variable to ejs and then use it inside a <script></script> - although it is better to use <%- JSON.stringify(variable)%> before using it to prevent crossite scripting
    - passReqToCallback: true tells passport to pass req into the strategy's verification callback so you can access req.body and req.flash directly into the strategy
    - use connect-flash package to pass messages through the application when redirecting (the are removed after you use them with req.flash) - this was used because I had to display the error messages to login page which were coming from the database and also fill the username field because after false authentication the redirect would empty it
    - if you use failureflash it means you are passing error message after failed authentication so you need connect-flash package which also you have to set it up
    - never get user id from req.session.passport.user, instead inside the strategy query (deserializeUser function) return the desired fields you need and get whatever you need from req.user object
- [25/9]:
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
