function solve() {
    const moviesSection = document.querySelector('#movies');
    const inputContainer = document.querySelector('#container');
    const archiveContainer = document.querySelector('#archive');
    const nameField = inputContainer.children[0];
    const hallField = inputContainer.children[1];
    const ticketField = inputContainer.children[2];

    inputContainer.children[3].addEventListener('click', (e) => {
        e.preventDefault();
        let name = nameField.value;
        let hall = hallField.value;
        let tickets = ticketField.value;
        if (name && hall && tickets && Number.isInteger(Number(tickets)) == true) {
            const ul = moviesSection.children[1];
            const archive = el('button', 'Archive');
            const inputWithPlaceholder = el('input', '', { placeholder: 'Tickets Sold' });
            const price = el('strong', Number(tickets).toFixed(2));
            const movieName = el('span', name);
            const li = el('li', [
                movieName,
                el('strong', `Hall: ${hall}`),
                el('div', [
                    price,
                    inputWithPlaceholder,
                    archive
                ])
            ]);

            ul.appendChild(li);
            nameField.value = '';
            hallField.value = '';
            ticketField.value = '';

            if (Number.isInteger(Number(inputWithPlaceholder.value))) {
                archive.addEventListener('click', () => {
                    let profit = Number(price.textContent) * Number(inputWithPlaceholder.value);
                    const archiveUl = document.querySelector('#archive').children[1];
                    const deleteBtn = el('button', 'Delete')
                    const archiveLi = el('li', [
                        el('span', movieName.textContent),
                        el('strong', `Total amount: ${profit.toFixed(2)}`),
                        deleteBtn
                    ]);
                    archiveUl.appendChild(archiveLi);
                    ul.removeChild(li);


                    deleteBtn.addEventListener('click', () => {
                        archiveUl.removeChild(archiveLi);
                    })

                    document.querySelector('#archive').children[2].addEventListener('click', () => {
                        for (let i = 0; i < archiveUl.children.length; i++) {
                            archiveUl.removeChild(archiveUl.children[i]);
                        }
                    })
                })

            }
        }
    })


    function el(type, content, attributes) {
        const result = document.createElement(type);

        if (attributes !== undefined) {
            Object.assign(result, attributes);

            if (attributes['class']) {
                result.className = attributes['class'];
            }
        }

        if (Array.isArray(content)) {
            content.forEach(append);
        } else {
            append(content);
        }

        function append(node) {
            if (typeof node === 'string') {
                node = document.createTextNode(node);
            }
            result.appendChild(node);
        }

        return result;
    }
}