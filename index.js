const app = require('./app.js');
const environment =require('./environment')
const PORT = environment.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`)
});