// script to populate books from the JSON
async function books() {
    try {
        // Fetch the books JSON
        const response = await fetch('assets/docs/books.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        const books = data.books;

        // create search input element
        const searchBar = document.createElement('input');
        searchBar.type = 'text';
        searchBar.placeholder = 'Search';
        searchBar.id = 'searchBar';
        // get library div to add books to.
        const container = document.querySelector('#library');

        container.parentNode.insertBefore(searchBar, container);
        // Store references to all book elements for filtering
        const bookElements = [];

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
            // div for other content

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
            seriesParagraph.innerHTML = "<b>Series:</b> "+ book.series;
            seriesParagraph.className = 'series';
            bookDiv.appendChild(seriesParagraph);

            // year
            const yearParagraph = document.createElement('p');
            yearParagraph.innerHTML = "<b>Publication Date:</b> "+ book.year;
            yearParagraph.className = 'book-year';
            bookDiv.appendChild(yearParagraph);

            const blurbParagraph = document.createElement('p');
            // blurb
            if(book.blurb !== ''){       
                blurbParagraph.className = 'blurb';
                blurbParagraph.innerHTML = book.blurb;
                bookDiv.appendChild(blurbParagraph);
            }
            
            // "Show More"/"Show Less" link
            if (book.blurb.length > 120) {
                const toggleLink = document.createElement('a');
                toggleLink.href = '#';
                toggleLink.textContent = 'Show More';
                toggleLink.className = 'toggle-blurb';

                toggleLink.addEventListener('click', (event) => {
                    event.preventDefault();
                
                    if (blurbParagraph.classList.contains('expanded')) {
                        // Collapse
                        blurbParagraph.classList.remove('expanded');
                        toggleLink.textContent = 'Show More';
                    } else {
                        // Expand
                        blurbParagraph.classList.add('expanded');
                        toggleLink.textContent = 'Show Less';
                    }
                });

                bookDiv.appendChild(toggleLink);
            }
            
            if(book.link1 !== ''){
                // idk if this is a good way to do this but it works
                bookDiv.className = 'book has-button'
                bookDiv.appendChild(document.createElement('br'));
                bookDiv.appendChild(document.createElement('br'));
                const link1 = document.createElement('a');
                link1.href = book.link1;
                link1.innerHTML = book.link1name;
                link1.className = 'buy-link'
                bookDiv.appendChild(link1);
            }
            container.appendChild(bookDiv);
            // Store book element and searchable content
            bookElements.push({
                element: bookDiv,
                searchableText: [
                    book.title,
                    book.subtitle,
                    book.series,
                    book.year,
                    book.blurb
                ].join(' ').toLowerCase()
            });
        });
        // Add event listener to the search box
        searchBar.addEventListener('input', (event) => {
            const filter = event.target.value.toLowerCase();
            bookElements.forEach(({ element, searchableText }) => {
                if (searchableText.includes(filter)) {
                    element.hidden = false;
                } else {
                    element.hidden = true;
                }
            });
        });
    } catch (error) {
        console.error('Error loading books:', error);
    }
    
}

// Call the function to populate books
document.addEventListener('DOMContentLoaded', books);

