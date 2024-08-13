
export const lastVisit = (req, res, next)=>{
    if(req.cookies.lastVisit){
        // if cookie is Set, the add a local variable with last visit time date
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 2*24*60*60*1000
    })
    next();
}