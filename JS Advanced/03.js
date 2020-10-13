class Movie {
    constructor(movieName, ticketPrice) {
        this.movieName = movieName;
        this.ticketPrice = Number(ticketPrice);
        this.screenings = [];
        this.totalProfit = 0;
        this.totalSoldTickets = 0;
    }

    newScreening(date, hall, description) {
        for (let i = 0; i < this.screenings.length; i++) {
            if (this.screenings[i].date === date && this.screenings[i].hall == hall) {
                throw new Error(`Sorry, ${hall} hall is not available on ${date}`)
            }
        }

        this.screenings.push({
            date,
            hall,
            description
        });
        return `New screening of ${this.movieName} is added.`;
    }

    endScreening(date, hall, soldTickets) {
        const currentScreening = this.screenings.find(e => e.date === date && e.hall === hall);
        if (currentScreening === undefined) {
            throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`);
        }

        const profit = soldTickets * this.ticketPrice;
        this.totalProfit += profit;
        this.totalSoldTickets += soldTickets;

        const index = this.screenings.indexOf(currentScreening);
        this.screenings.splice(index, 1);

        return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${profit}`;
    }

    toString() {
        const result = [
            `${this.movieName} full information:`,
            `Total profit: ${this.totalProfit.toFixed(0)}$`,
            `Sold Tickets: ${this.totalSoldTickets.toFixed(0)}`
        ];

        if (this.screenings.length > 0) {
            result.push('Remaining film screenings:');
            const temp = this.screenings.slice().sort((a, b) => a.hall.localeCompare(b.hall) - b.hall.localeCompare(a.hall));
            temp.forEach(e => result.push(`${e.hall} - ${e.date} - ${e.description}`));
        } else {
            result.push('No more screenings!');
        }

        return result.join('\n');
    }
}