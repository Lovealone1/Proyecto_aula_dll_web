var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'daniel'

exports.decodeToken = function(req, res, next) {
    if(!req.headers.authorization){
        console.log(res);
        return res.status(403).send({message: 'NoHeadersError'});
    }

    var token = req.headers.authorization;
    var segement = token.split('.');
    
    if(segement.length != 3){
        return res.status(403).send({message: 'InvalidToken'});
    }else{
        try{
            var payload = jwt.decode(token,secret);
            console.log(payload);
        }catch(error){
            return res.status(403).send({message: 'ErrorToken'});
        }
    }
    
    req.user = payload;
    next();
};