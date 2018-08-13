const router = require('express').Router();
const Student = require('./Student');

router
    .route('/')
    .get(get)
    .post(post)

    function get(req, res) {
        Student.find().then(exp => {
            res.status(200).json(exp);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error in GET for Student" })
        });
    }

    function post(req, res) {
        const email = req.body.email
        let regVar = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regVar.test(email)){
        const student = new Student(req.body);
        student
          .save()
          .then(stuff => {
              res.status(201).json(stuff);
          })
          .catch(err => {
              res.status(500).json({ message: 'There was an error in POST for Student'})
          });
        }
        else {
            res.json({ errorMessage: 'email pattern incorrect' })
        }  
    } 


 module.exports = router;