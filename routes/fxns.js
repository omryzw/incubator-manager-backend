var moment = require('moment');
var randomstring = require('randomstring');

exports.addProject = function(req,res) {
    var cname = req.body.cname;
    var loadeggs = req.body.loadeggs; 
    var loaddate = moment().format('YYYY-MM-DD');
    var dldate = moment(loaddate, "YYYY-MM-DD").add(19, 'days');
    var expdate = moment(loaddate, "YYYY-MM-DD").add(21, 'days');
    dldate = moment(dldate).format("YYYY-MM-DD");
    expdate = moment(expdate).format("YYYY-MM-DD");
     var string_componet = randomstring.generate({
         length: 3,
         charset: 'alphabetic'
     });
     var ran_num = Math.floor(Math.random() * 9) + 1;
     var another_ran_num = Math.floor(Math.random() * 9) + 1;
     var pid = string_componet + ran_num + another_ran_num;

    var sql = "INSERT INTO projects(pid,customer,loaddate,dldate,expdate,pstatus,loadeggs) VALUES(?,?,?,?,?,?,?)";
    db.query(sql, [pid, cname, loaddate, dldate, expdate, 0 , loadeggs],function(err,results){
        if(!err) {
            return res.status(200).send(process.env.oknum);
        } else {
            return res.status(200).send(process.env.errnum);
        }
    })
};


exports.getActive = function(req,res) {
    // where download date has not arrived yet
    var sql = "SELECT * FROM projects WHERE dldate >= CURDATE()";
    db.query(sql,function(err,results){
        if (!err) {
            return res.status(200).send(results);
        } else {
            return res.status(200).send(process.env.errnum);
        }
    });
};

exports.getHatching = function(req,res) {
    // where tisat tasvika pa end date
    var sql = "SELECT * FROM projects WHERE CURDATE() <= expdate AND dldate <= CURDATE()";
    db.query(sql, function (err, results) {
        if (!err) {
            return res.status(200).send(results);
        } else {
            return res.status(200).send(process.env.errnum);
        }
    });
}

exports.getExpiredButNotClosed = function(req,res) {
    // get projects that have expired but have not been recorded yet 
    var sql = "SELECT * FROM projects WHERE CURDATE() >= expdate AND pstatus = 0";
    db.query(sql, function (err, results) {
        if (!err) {
            return res.status(200).send(results);
        } else {
            console.log(err)
            return res.status(200).send(process.env.errnum);
        }
    });
}

exports.addRecord = function(req,res) {
    var hatched = req.body.hatched;
    var comments = req.body.comments;
    var srate = req.body.srate;
    var pid = req.body.pid;
    var sql = "UPDATE projects SET hatched = ? , comments = ? , srate = ? , pstatus = 1 WHERE pid = ?";
    db.query(sql, [hatched, comments , srate , pid], function (err, results) {
        if (!err) {
            return res.status(200).send(process.env.oknum);
        } else {
            console.log(err);
            return res.status(200).send(process.env.errnum);
        }
    });
}

exports.getSingleProject = function(req,res) {
    var pid = req.body.pid;
    var sql = "SELECT * FROM projects WHERE pid = ?";
    db.query(sql,[pid], function (err, results) {
        if (!err) {
            return res.status(200).send(results);
        } else {
            return res.status(200).send(process.env.errnum);
        }
    });
}

exports.history = function(req,res) {
    var sql = "SELECT * FROM projects WHERE pstatus = 1 ";
    db.query(sql, function (err, results) {
        if (!err) {
            return res.status(200).send(results);
        } else {
            return res.status(200).send(process.env.errnum);
        }
    });
}

exports.overallSuccess = function (req, res) {
    var sql = "SELECT * FROM projects WHERE pstatus = 1 ";
    var total = 0;
    var avg = 0;
    db.query(sql, function (err, results) {
        if (!err) {
            for (i in results) {
                total = total + results[i].srate;
            }
            avg = Math.ceil(total/results.length);
            return res.status(200).send(avg.toString());
        } else {
            return res.status(200).send(process.env.errnum);
        }
    });
}