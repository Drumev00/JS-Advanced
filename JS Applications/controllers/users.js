import { register, login, logout } from '../data.js';

export async function getRegister() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/users/register.hbs', this.app.userData);
}

export async function getLogin() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/users/login.hbs', this.app.userData);
}

export async function postRegister() {
    try {
        const { email, password, repeatPassword} = this.params;
        if (!email) {
            throw new Error('Email is required.');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        if (password !== repeatPassword) {
            throw new Error('Passwords should match!');
        }
    
        const result = await register(email, password);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        const loginResult = await login(email, password);
        if (loginResult.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        this.app.userData.email = result.email;
        this.redirect('#/home');
    } catch (err) {
        console.error(err);
    }
}

export async function postLogin() {
    try {
        const { email, password } = this.params;
    
        const result = await login(email, password);
        
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        this.app.userData.email = result.email;

        this.redirect('#/home');

        
    } catch (err) {
        console.error(err);
    }
}

export async function getLogout() {
    try {
        const result = await logout();
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        this.app.userData.email = '';

        this.redirect('#/login');
    } catch (err) {
        console.error(err);
    }
}