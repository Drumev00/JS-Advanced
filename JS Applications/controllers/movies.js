import { createMovie, getMovieById, edit, like, deleteData} from '../data.js';

export async function getCreate() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/movies/create.hbs', this.app.userData);
}

export async function postCreate() {
    try {
        const { title, description, imageUrl } = this.params;
        if (!title || !description || !imageUrl) {
            throw new Error('All fields are required!');
        }

        const owner = localStorage.getItem('email');

        const result = await createMovie({ title, description, image: imageUrl, creator: owner, peopleLiked: [] });
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        console.log(result);

        this.redirect('#/home');
    } catch (err) {
        console.error(err);
    }
}

export async function getDetails() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const movie = await getMovieById(this.params.id);
    Object.assign(this.app.userData, movie);

    const owner = localStorage.getItem('email') === movie.creator;
    this.app.userData.owner = owner;

    this.partial('./templates/movies/details.hbs', this.app.userData);
}

export async function getEdit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/movies/edit.hbs', this.app.userData);
}

export async function postEdit() {
    try {
        const id = this.params.id;
        const { title, description, imageUrl } = this.params;
        const result = await edit(id, { title, description, imageUrl });
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect(`#/details/${id}`);

    } catch (err) {
        console.error(err);
    }
}

export async function likePost() {
    try {
        const id = this.params.id;
        const movie = await getMovieById(id);
        
        if (movie.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        const user = localStorage.getItem('email');
        const result = await like(movie, user);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        this.app.userData.liked = result.peopleLiked.includes(user);
        console.log(this.app.userData);
        
        this.redirect(`#/details/${id}`);
    } catch (err) {
        console.error(err);
    }
}

export async function deleteMovie() {
    try {
        const result = deleteData(this.params.id);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect('#/home');
    } catch (err) {
        console.error(err);
    }
}