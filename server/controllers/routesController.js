const pool = require("../database/configuration.js");

module.exports = {
    homePage: (req, res) => {
        res.render("index.ejs");
    },
    addPost: (req, res) => {
        pool.connect()
            .then(client => {
                return client.query('select * from messages')                
                    .then(results => {
                        client.release();
                        res.render("results", { newPost: results.rows })
                    })
                    .catch(error => {
                        client.release();
                        console.error(`Could not add new message ${error.stack}`)
                    })
            })
            .catch(error => {
                console.error(`Could not connect to database ${error.stack}`)
            })
    },
    printPost: (req, res) => {
        console.log(req.body);
        pool.connect()
            .then(client => {
                return client.query('insert into messages (title, body) values ($1, $2)', [req.body.title, req.body.body])
                    .then(results => {
                        client.release();
                        res.redirect("addPost");
                    })
                    .catch(err => {
                        client.release();
                        console.error(`Something went wrong when adding new post ${err.stack}`)
                    })
            })
            .catch(error => {
                client.release();
                console.error(err => {
                    console.error(`Couldn't connect to database ${err.stack}`)
                })
            })
    }
    
}