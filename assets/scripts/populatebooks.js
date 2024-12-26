// script to populate books from the JSON
async function populateBooks() {
    try {
        // Fetch the books JSON
        const response = await fetch('assets/docs/books.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        const books = data.books;

        // get library div to add books to.
        const container = document.querySelector('#library');
        // create the element for the book.
        books.forEach(book => {
            // TODO: add an if statement in the case that the book is unpublished?
            // this will mean that we will be able to sort books based on their status.
            // maybe have seperate elements for released and not released.

            // create book div / container
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';

            // cover image
            const coverImg = document.createElement('img');
            // cover element will be the filename, not path
            coverImg.src = 'assets/img/covers/' + book.cover; 
            coverImg.alt = `${book.title} Cover`;
            coverImg.className = 'cover';
            bookDiv.appendChild(coverImg);

            // title
            const titleHeading = document.createElement('h2');
            titleHeading.textContent = book.title;
            titleHeading.className = 'title';
            bookDiv.appendChild(titleHeading);
            // subtitle
            const subtitleHeading = document.createElement('h4');
            subtitleHeading.textContent = book.subtitle;
            subtitleHeading.className = 'subtitle';
            bookDiv.appendChild(subtitleHeading);

            // series
            const seriesParagraph = document.createElement('p');
            seriesParagraph.textContent = book.series;
            seriesParagraph.className = 'series';
            bookDiv.appendChild(seriesParagraph);

            // year
            const yearParagraph = document.createElement('p');
            yearParagraph.textContent = book.year;
            yearParagraph.className = 'year';
            bookDiv.appendChild(yearParagraph);

            // blurb
            const blurbParagraph = document.createElement('p');
            blurbParagraph.innerHTML = book.blurb.replace('\n', '<br>');
            blurbParagraph.className = 'blurb';
            bookDiv.appendChild(blurbParagraph);

            // Append the book to the container
            container.appendChild(bookDiv);
        });
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

// Call the function to populate books
document.addEventListener('DOMContentLoaded', populateBooks);