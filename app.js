const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const fs = require('fs');
var html = fs.readFileSync('./test.html', 'utf8');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/pdf', (req, res) => {
//     console.log(html);
//     const fileName = './' + req.fname;
//     try {
//         pdf.create(html).toFile('./new.pdf',function(err, res){
//             //console.log();
//             return res.status(200).send('OK');
//           });   
//     } catch (e) {
//         return res.status(400).send('NO');
//     }
// });

app.post('/pdf', (req, res) => {
    //return res.status(200).send('No');
    // pdf.create(html).toStream(function(err, stream){
    //    return res.status(200).send(stream.pipe(fs.createWriteStream('./foo.pdf')));
    //   });
    console.log(req.body);
    pdf.create(req.body.html).toBuffer(function(err, buffer){
        return res.status(200).send(buffer.toString('base64'));
      });
});



app.listen(5000, () => {
    console.log('server start at port 5000');
})