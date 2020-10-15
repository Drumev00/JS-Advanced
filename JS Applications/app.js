import { getHome } from './controllers/home.js';
import { getRegister, postRegister, getLogin, postLogin, getLogout} from './controllers/users.js';
import { getCreate, postCreate, getDetails, getEdit, postEdit, likePost, deleteMovie} from './controllers/movies.js';

window.addEventListener('load', () => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');
        this.userData = {
            email: localStorage.getItem('email') || '',
            userId: localStorage.getItem('userId') || ''
        };

        this.get('/', getHome);
        this.get('#/home', getHome);
        this.get('index.html', getHome);
        this.get('#/register', getRegister);
        this.get('#/login', getLogin);
        this.post('#/register', ctx => { postRegister.call(ctx) });
        this.post('#/login', ctx => { postLogin.call(ctx) });
        this.get('#/logout', getLogout);
        this.get('#/create', getCreate);
        this.post('#/create', ctx => { postCreate.call(ctx) });
        this.get('#/details/:id', getDetails);
        this.get('#/edit/:id', getEdit);
        this.post('#/edit/:id', ctx => { postEdit.call(ctx) });
        this.get('#/like/:id', likePost);
        this.get('#/delete/:id', deleteMovie);


    });
    app.run('#/home');
});