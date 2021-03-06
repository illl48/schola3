const express = require('express');
const app = require('express')();

/*
    option1: require as middleware
*/
const studentRouter = require('./routers/student');
const classRouter = require('./routers/class');
app.use('/', express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/form.html');
});
app.use('/students', studentRouter);
app.use('/classes', classRouter);

/*
    option2: dynamic require as middleware

    const fs = require('fs');
    const path = require('path');
    const routers = path.join(__dirname, 'routers');
    fs
        .readdirSync(routers)
        .filter((file) => {
            return file.charAt(0) !== '.';
        })
        .forEach((file) => {
            const router = path.join(routers, file);
            app.use('/' + file, require(router));
        });
*/

/*
    option3: pass app to router, you can use the dynamic way, too. (my favorite one)

    //server.js
    require(router)(app);

    // router.js
    module.exports = (app)=>{
        app.route('/students?', (req, res)=>{});
    };
*/




app.listen(3000, () => {
    console.log('server start');
});
