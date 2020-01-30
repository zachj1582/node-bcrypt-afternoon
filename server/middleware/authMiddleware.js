module.exports = {
    usersOnly: (req,res,next) => {
        if(!req.session.user){
            return res.status(401).send('Please log in')
        }
        next()
    },
    adminsOnly: (req,res,next) => {
        console.log(req.session.user)
        if(!req.session.user.isAdmin){
            res.status(403).send('You no admin!')
        }
        next()
    }
}