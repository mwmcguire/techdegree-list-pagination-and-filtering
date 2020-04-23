/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// global variables
let listItems = document.getElementsByClassName('student-item cf');
const itemsPerPage = 10;

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
  const page = document.querySelector('.page');
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
      const activeClass = document.querySelector('.active');
      if (activeClass) {
        activeClass.className = '';
      }
      e.target.className = 'active';
      showPage(listItems, a.textContent);
    });
  }
};

// function calls
showPage(listItems, 1);
appendPageLinks(listItems);
