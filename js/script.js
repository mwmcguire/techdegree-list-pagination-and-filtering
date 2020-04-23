/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// global variables
let listItems = document.getElementsByClassName('student-item cf');
let searchResults = [];
const itemsPerPage = 10;
const page = document.querySelector('.page');

// dynamic search bar
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

const performSearch = (input, names) => {
  for (let i = 0; i < names.length; i++) {
    let name = names[i].textContent.toLowerCase();
    let inputValue = input.value.toLowerCase();

    if (inputValue.length !== 0 && name.includes(inputValue)) {
      console.log(names[i]);
      searchResults.push(names[i]);
    }
  }
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  performSearch(searchBar, listItems);
  showPage(searchResults, 1);

  const pageLinks = document.querySelector('.pagination');
  page.removeChild(pageLinks);
  console.log('submit button is functional');
});

searchBar.addEventListener('keyup', () => {
  performSearch(searchBar, listItems);
  console.log('keyup event on search input is functional');
});

// function to display list items to the page
const showPage = (list, page) => {
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;

  for (let i = 0; i < list.length; i++) {
    if ((i >= startIndex) & (i < endIndex)) {
      list[i].style.display = '';
    } else {
      list[i].style.display = 'none';
    }
  }
};

// function to append link items to the page
const appendPageLinks = (list) => {
  const div = document.createElement('div');
  const ul = document.createElement('ul');

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

// function calls
showPage(listItems, 1);
appendPageLinks(listItems);
