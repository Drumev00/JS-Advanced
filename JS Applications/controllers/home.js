import { allMovies} from '../data.js';

export async function getHome() {
    try {
        this.partials = {
            header: await this.load('./templates/common/header.hbs'),
            footer: await this.load('./templates/common/footer.hbs'),
            catalog: await this.load('./templates/movies/catalog.hbs'),
            individualMovie: await this.load('./templates/movies/individualMovie.hbs')
        };

        if (this.app.userData.email){
            const movies = await allMovies();
            this.app.userData.movies = movies;
        }
        
        this.partial('./templates/common/home.hbs', this.app.userData);
    } catch (err) {
        console.error(err);
    }
}