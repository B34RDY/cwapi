var restify = require('restify');
var connection = require('./connection');

var server = restify.createServer({name: 'codewonk'});

server.get('/test', myTest);
server.get('/valid/:word/:count', isWordValid);
server.get('/getWord/:length', getWord);

server.use(restify.fullResponse()).use(restify.bodyParser());

server.listen(process.env.PORT || 8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

function myTest(req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(connection.database + ' or blank.');
    next();
}

function isWordValid(req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    var strWord = req.params.word || '';
    var strCount = req.params.count || '';
    var strSQL = "SELECT `word` FROM `words` WHERE ?? = ? AND ?? = ?";
    var inserts = ['word', strWord, 'count', strCount];
    var query = connection.query(strSQL, inserts, function(err, rows, fields){
        //console.log(query.sql);
        if(err) {
        }
        else{
            if(rows.length>0) {
                console.log(rows[0].word + ' is valid');
                res.send("true");
            }
            else{
                console.log(strWord + ' is invalid');
                res.send("false");
            }
        }
    });
    next();
}

function getWord(req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    var nLength = req.params.length || 0;
    var strSQL = 'SELECT `word` FROM `words` WHERE ? AND `allowed` = 1 ORDER BY RAND() LIMIT 1';
    var query = connection.query(strSQL, {'count':nLength}, function(err, rows, fields){
        if(err){
            // If it failed, return error
            res.send("There was a problem checking the database for some reason.\r\n" + err);
        }
        else{
            console.log(rows);
            res.send(rows[0].word);
        }
    });
    next();
}

//var debug = require('debug')('codewonk');
//var app = require('./app');
//
//app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
//
//var server = app.listen(app.get('port'), function() {
//    debug('Express server listening on port ' + server.address().port);
//});