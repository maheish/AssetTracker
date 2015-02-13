/**
 * Module dependencies.
 */
var cluster = require('cluster');
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // Listen for dying workers
    cluster.on('exit', function (worker) {
        // Replace the dead worker, we're not sentimental
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });
} else if (cluster.isWorker)  {

    var express = require('express')
        , fs = require('fs')
        , passport = require('passport')
        , logger = require('flock-logger');

    /**
     * Main application entry file.
     * Please note that the order of loading is important.
     */

// Load configurations
// if test env, load example file
    var env = process.env.NODE_ENV || 'development'
        , config = require('./config/config')[env]
        //, auth = require('./config/middlewares/authorization')
        , mongoose = require('mongoose');

// Bootstrap db connection
    var db = mongoose.connect(config.db);

// Bootstrap models
    var models_path = __dirname + '/app/models';
    fs.readdirSync(models_path).forEach(function (file) {
        require(models_path+'/'+file);
    });

// bootstrap passport config
  // require('./config/passport')(passport, config)

    var app = express();
    // , server = require('http').createServer(app)

// express settings
    require('./config/express')(app, config);//, passport)

// Bootstrap routes
//require('./config/routes')(app, passport, auth)
    auth = require('./config/middlewares/authorization');
    require('./config/routes')(app, auth);

// Start the app by listening on <port>
    var port = process.env.PORT || 4000;
     app.listen(port);

/************ KAWAL FOR SECURE SUPPORT      
  //    app.listen(port) // KAWAL FLASHISSUE
    // KAWAL FLASHISSUE start
    var https = require('https');
    var http = require('http');
    var options = options = {
        key: fs.readFileSync('./loc.key'),
        cert: fs.readFileSync('./loc.cert')} ;

    http.createServer(app).listen(port);
    https.createServer(options, app).listen(443);
    
 //   exports = module.exports = app // KAWAL FLASHISSUE
 
    // KAWAL FLASHISSUE end

**************/
    
    console.log('Asset Tracker app started on port '+port);

//Initializing logger
    //logger.init(app, passport, mongoose)
    logger.init(app, passport, mongoose);

// expose app
    exports = module.exports = app;
}
