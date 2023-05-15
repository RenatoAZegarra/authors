const AuthorController = require('../controllers/author.controller');

module.exports = app => {
    app.get('/api/authors',AuthorController.readAll);
    app.get('/api/authors/:id',AuthorController.readOne);
    app.post('/api/authors',AuthorController.create);
    app.patch('/api/authors/:id',AuthorController.update);
    app.delete('/api/authors/:id',AuthorController.delete);

}