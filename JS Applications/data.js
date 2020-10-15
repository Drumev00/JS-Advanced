function host(endpoint) {
    return `https://api.backendless.com/89E3EDF9-142F-8605-FFCA-1EDAA81D5A00/CE8F8853-005A-45D8-8284-EC584FB58B22/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    CREATE_EVENT: 'data/movies'
};

export async function register(email, password) {
    const result = (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })).json();

    return result;
}

export async function login(email, password) {
    const result = await (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: email,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('email', result.email);
    localStorage.setItem('userId', result.objectId);

    return result;
}

export async function logout() {
    const token = localStorage.getItem('userToken');

    const result = fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });
    
    localStorage.clear();

    return result;
}

export async function createMovie(movie) {
    const token = localStorage.getItem('userToken');


    const result = (await fetch(host(endpoints.CREATE_EVENT), {
        method: 'POST',
        headers: {
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();

    return result;
}

/*export async function myMovies() {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');

    const result = (await fetch(endpoints.CREATE_EVENT + `?where=${escape(`ownerId=${id}`)}`, {
        headers: {
            'user-token': token,
            'Content-Type': 'application/json'
        }
    })).json();

    return result;
}*/

export async function allMovies() {
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.CREATE_EVENT), {
        headers: {
            'user-token': token
        }
    })).json();

    return result;
}

export async function edit(id, updatedProps) {
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.CREATE_EVENT + `/${id}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

    return result;
}

export async function details(id) {
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.CREATE_EVENT + `/${id}`), {
        headers: {
            'user-token': token
        }
    })).json();

    return result;
}

export async function getMovieById(id) {
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.CREATE_EVENT + `/${id}`), {
        headers: {
            'user-token': token
        },
    })).json();

    return result;
}

export async function like(movie, user) {
    const likes = movie.likes + 1;
    const people = user;
    movie.peopleLiked += people;
    return edit(movie.objectId, { likes: likes, peopleLiked: movie.peopleLiked});
}

export async function deleteData(id) {
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.CREATE_EVENT + `/${id}`), {
        method: 'DELETE',
        headers: {
            'user-token': token
        }
    })).json();

    return result;
}