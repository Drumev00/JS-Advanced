function solveClasses() {
    class Hall {
        constructor(capacity, name) {
            this.capacity = Number(capacity);
            this.name = name;
            this.events = [];
        }

        hallEvent(title) {
            if (this.events.some(e => e === title) === true) {
                throw new Error('This event is already added!');
            }

            this.events.push(title);
            return 'Event is added.';
        }

        close() {
            for (let i = 0; i < this.events.length; i++) {
                this.events.pop();
            }

            return `${this.name} hall is closed.`;
        }

        toString() {
            const result = [
                `${this.name} hall - ${ this.capacity }`
            ];
            if (this.events.length > 0) {
                const currentEvents = this.events.join(', ');
                result.push(`Events: ${currentEvents}`);
            }

            return result.join('\n');
        }
     }
    class MovieTheater extends Hall {
        constructor(capacity, name, screenSize) {
            super(capacity, name);
            this.screenSize = screenSize;
        }

        close() {
            return super.close() + 'Аll screenings are over.';
        }

        toString() {
            const result = [
                super.toString(),
                `${this.name} is a movie theater with ${this.screenSize} screensize and ${this.capacity} seats capacity.`
            ].join('\n');

            return result;
        }
     }
    class ConcertHall extends Hall {
        constructor(capacity, name) {
            super(capacity, name);
        }

        hallEvents(title, performers) {
            if (this.events.some(e => e === title) === true) {
                throw new Error('This event is already added!');
            }
            super.hallEvent(title);
            this.events.performers = performers;
            return 'Event is added.';
        }

        close() {
            return super.close() + 'Аll performances are over.';
        }

        toString() {
            const result = [
                super.toString()
            ];
            if (this.events.length > 0) {
                const perf = this.events.performers.join(', ');
                result.push(perf);
            }

            return result.join('\n');
        }
     }

    return {
        Hall,
        MovieTheater,
        ConcertHall
    };
}