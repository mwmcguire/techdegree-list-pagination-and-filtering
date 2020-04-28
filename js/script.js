/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Global variables
let listItems = document.getElementsByClassName('student-item cf');
console.log(listItems);
// for (let i = 0; i <= listItems.length; i++) {
//   console.log(listItems[i].firstElementChild.children[1].textContent);
// }
let searchResults = [];
const itemsPerPage = 10;
const page = document.querySelector('.page');

// Dynamic search bar
const searchBar = document.createElement('input');
searchBar.setAttribute('placeholder', 'Search for students...');

const searchBarDiv = document.createElement('div');
searchBarDiv.className = 'student-search';

const submitBtn = document.createElement('button');
submitBtn.textContent = 'Search';

const pageHeader = document.getElementsByClassName('page-header cf');

pageHeader[0].appendChild(searchBarDiv);
searchBarDiv.appendChild(searchBar);
searchBarDiv.appendChild(submitBtn);

// Function to perform a search given two parameters
// Param 1.) the input to the search bar (inputValue)
// Param 2.) a list of items
const performSearch = (input, names) => {
  for (let i = 0; i < names.length; i++) {
    let name = names[i].firstElementChild.children[1].textContent.toLowerCase();
    let inputValue = input.value.toLowerCase();

    if (inputValue.length !== 0 && name.includes(inputValue)) {
      console.log(name);
      searchResults.push(names[i]);
    }
  }
};

// Add event listener to the submit button to perform search function
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  performSearch(searchBar, listItems);
  showPage(listItems, 1, searchResults);
  console.log('submit button is functional');
});

// Add event listener to keystrokes to perform search funtion
// searchBar.addEventListener('keyup', () => {
//   performSearch(searchBar, listItems);
//   console.log('keyup event on search input is functional');
// });

// Function to display list items to the page given two parameters
// Param 1.) a list of items
// Param 2.) the page number
const showPage = (list, page, searchResult) => {
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;

  console.log('search result: ' + searchResult);

  for (let i = 0; i < list.length; i++) {
    if ((i >= startIndex) & (i < endIndex)) {
      list[i].style.display = '';
    } else if (list[i] === searchResult) {
      list[i].style.display = '';
    } else {
      list[i].style.display = 'none';
    }
  }
};

// Function to generate and append new link items to the bottom of the page given a single parameter
// Param 1.) a list of items
const appendPageLinks = (list) => {
  const div = document.createElement('div');
  const ul = document.createElement('ul');

  // Assign class name of "pagination" to new div element that holds the link items and append to page
  div.className = 'pagination';
  page.appendChild(div);
  div.appendChild(ul);

  let numOfPages = Math.ceil(list.length / itemsPerPage);

  for (let i = 1; i <= numOfPages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    ul.appendChild(li);
    li.appendChild(a);
    a.href = '#';
    a.textContent = i;

    // Add event listener to each link to listen for clicks, check if links are active, assign active class and call showPage function
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const activeClass = document.querySelector('.active');
      if (activeClass) {
        activeClass.classList.remove('active');
      }
      e.target.className = 'active';
      showPage(listItems, a.textContent);
    });
  }
};

// Function calls
showPage(listItems, 1);
appendPageLinks(listItems);
