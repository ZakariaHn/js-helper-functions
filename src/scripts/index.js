// ===================================================> Read More/Less Button <======================================
const displaydTxt = () => {
  let paragraph = document.querySelector(".txt"),
    readMoreSpan = document.querySelector(".readMore"),
    readLessSpan = document.querySelector(".readLess"),
    maximizedTxt = paragraph.innerHTML,
    splited = maximizedTxt.split(" "),
    counter = [];

  for (let i = 0; i < splited.length; i++) {
    counter.push(splited[i]);
    if (counter.length == 40) {
      break;
    }
  }

  let minimizedtext = counter.join(" ");
  paragraph.innerHTML = minimizedtext;

  readMoreSpan.addEventListener("click", () => {
    paragraph.innerHTML = maximizedTxt;
    readMoreSpan.style.opacity = "0";
    readLessSpan.style.opacity = "1";
  });
  readLessSpan.addEventListener("click", () => {
    paragraph.innerHTML = minimizedtext;
    readMoreSpan.style.opacity = "1";
    readLessSpan.style.opacity = "0";
  });
};
displaydTxt();

/* ===================================================> Search field <=============================================

    * show x icon and enable the search button when somthing is written in the search field 
    * clean the search field and disable the search button after clicking on the x icon
    * show loading icon after clicking on the search button */

const spanx = document.querySelector(".spanX");
const search = document.querySelector(".search");
const btn = document.querySelector(".btn");

clearInput = () => {
  spanx.style.opacity = 0;
  search.value = "";
  btn.disabled = true;
};

search.addEventListener("keyup", function () {
  if (search.value.length > 0) {
    spanx.style.opacity = 1;
    spanx.addEventListener("click", () => {
      clearInput();
    });
    btn.disabled = false;
  } else {
    clearInput();
  }
});

// ===================================================> Generic Pagintaion Function  <======================================

const dataToDisplay = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const pagination_element = document.querySelector(".pagenumbers");
const list_element = document.querySelector(".elements");

let current_page = 1; // starting page
let rows = 6;

function displayList(items, wrapper, rows_per_page, page) {
  wrapper.innerHTML = "";
  page--;
  let start = rows_per_page * page; // get the specific amount of item we need in each page
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end); // to get an array out of the displayed items in each page

  // _________creating a div for each item _________________

  paginatedItems.forEach((item) => {
    let item_element = document.createElement("div");
    item_element.classList.add("item"); // built in css
    item_element.innerText = item; //   value to display in each div
    wrapper.appendChild(item_element);
  });
}

// __________________ setteing page numbers _________________________

function setupPagination(items, wrapper, rows_per_page) {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rows_per_page); // number of pages depending on the ammount of data from API

  for (let i = 1; i < page_count + 1; i++) {
    let btn = paginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

//___________________ Generat buttons to represent the number of the pages ______________________________

function paginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  button.addEventListener("click", () => {
    current_page = page;
    displayList(items, list_element, rows, current_page);
  });

  return button;
}

displayList(dataToDisplay, list_element, rows, current_page);
setupPagination(dataToDisplay, pagination_element, rows);

// ========================================= scroll to the top of the page ===================================

const goUp = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

buttonUp = document.querySelector(".button_up");

buttonUp.addEventListener("click", goUp);

// ========================================= scroll to certain div in the page ===================================

const scrollToResultPage = () => {
  pagination.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};

pagination = document.querySelector(".pagination");
goToDiv = document.querySelector(".goToDiv");

goToDiv.addEventListener("click", scrollToResultPage);
