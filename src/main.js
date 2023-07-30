import { BookElement } from "./BookElement.js";
import { Basket } from "./Basket.js";
import { Helper } from "./Helper.js";

class BookShop {
  booksIdInBasket = JSON.parse(localStorage.getItem("booksIdInBasket")) || {
    sum: 0,
  };
  rootElement = document.querySelector("#container");
  apiBaseURL = "http://localhost:3000/books";
  queryObject = { limit: 12, page: 1, q: null };
  helper = new Helper();

  constructor(buttons) {
    const {
      basket,
      addToBasket,
      home,
      basketCounter,
      searchInput,
      searchButton,
      searchDiv,
    } = buttons;
    this.basket = document.querySelector(basket);
    this.addToBasket = document.querySelectorAll(addToBasket);
    this.home = document.querySelector(home);
    this.basketCounter = document.querySelector(basketCounter);
    this.searchInput = document.querySelector(searchInput);
    this.searchButton = document.querySelector(searchButton);
    this.searchDiv = document.querySelector(searchDiv);
  }

  createInitialHTML(list, filteredBooksAmount) {
    this.rootElement.innerHTML = "";
    this.rootElement.style.cssText = "flex-direction: row;";
    this.searchDiv.style.cssText = "display: block;";
    for (const el of list) {
      const book = this.createBookElement(el);
      this.rootElement.append(book);
    }
    let numberAmount;
    if (filteredBooksAmount)
      numberAmount = Math.ceil(filteredBooksAmount / this.queryObject.limit);
    else numberAmount = Math.ceil(this.totalBooks / this.queryObject.limit);
    this.helper.createPageNumbers(
      this.rootElement,
      numberAmount,
      this.queryObject.page
    );
    const numbers = document.querySelectorAll(".number");
    const arrowLeft = document.querySelector("#arrow-left");
    const arrowRight = document.querySelector("#arrow-right");

    arrowLeft.addEventListener("click", async () => {
      if (this.queryObject.page > 1) {
        this.queryObject.page--;
        const list = await this.getData(this.queryObject);
        this.createInitialHTML(list, filteredBooksAmount);
      }
    });

    arrowRight.addEventListener("click", async () => {
      if (this.queryObject.page < numberAmount) {
        this.queryObject.page++;
        const list = await this.getData(this.queryObject);
        this.createInitialHTML(list, filteredBooksAmount);
      }
    });

    for (const el of numbers) {
      el.addEventListener("click", async () => {
        this.queryObject.page = +el.innerText;
        const list = await this.getData(this.queryObject);
        this.createInitialHTML(list, filteredBooksAmount);
      });
    }
  }

  createBookElement(book) {
    const bookElement = new BookElement(
      book,
      this.basketCounter,
      this.searchDiv
    );
    bookElement.addItemToBasket();
    return bookElement.getBook;
  }

  getBasketItems(books) {
    this.searchDiv.style.cssText = "display: none;";
    const basket = new Basket(this.rootElement);
    this.rootElement.innerHTML = "";
    const tableHeaderCell = {
      id: "Id",
      name: "Product name",
      amount: "Quantity",
      price: "Price",
      subtotal: "Subtotal",
    };
    basket.createRow(tableHeaderCell, "th");
    const booksIdInBasket = JSON.parse(localStorage.getItem("booksIdInBasket"));
    const bookIds = Object.keys(booksIdInBasket);
    const filteredBooks = books.filter((book) => bookIds.includes(book.id));
    filteredBooks.forEach((book) => {
      const amount = booksIdInBasket[book.id];
      book["amount"] = amount;
      basket.createRow(book, "td");
    });
    basket.createTotal();
    basket.createPlusAndMinus(this.basketCounter);
  }

  async getData(paramObj) {
    let request = [];
    if (paramObj && Object.keys(paramObj).length) {
      if (paramObj.page) {
        request.push(`_page=${paramObj.page}`);
      } else request.push(`_page=${this.queryObject.page}`);

      if (paramObj.q) request.push(`q=${paramObj.q}`);

      if (paramObj.limit) request.push(`_limit=${paramObj.limit}`);

      request.push(`_sort=id`);
    }

    request = request.join("&");

    const result = await fetch(`${this.apiBaseURL}?${request}`);
    let json;
    if (result.ok) json = await result.json();
    return json;
  }

  displayItemsInBasket() {
    this.basketCounter.innerText = this.booksIdInBasket.sum;
    this.basketCounter.style.cssText = "display: flex;";
  }

  async search(searchInputValue) {
    this.queryObject.page = 1;
    this.queryObject.q = searchInputValue;
    let limitedResult = await this.getData(this.queryObject);
    const searchResult = await this.getData({ q: searchInputValue });
    console.log("searchResult: ", searchResult);
    this.createInitialHTML(limitedResult, searchResult.length);
  }

  async start() {
    if (this.booksIdInBasket.sum) this.displayItemsInBasket();
    const allBooks = await this.getData();
    this.totalBooks = allBooks.length;
    const books = await this.getData(this.queryObject);
    this.createInitialHTML(books);
    this.home.addEventListener("click", () => {
      window.location.href = "/";
    });
    this.basket.addEventListener("click", () => {
      const mainPage = document.querySelector("#main-page");
      const subscribe = document.querySelector("#subscribe");
      const mostPopular = document.querySelector("#most-popular");

      this.rootElement.setAttribute("id", "table-container");
      mainPage.style.cssText = "display:none;";
      subscribe.style.cssText = "display:none;";
      mostPopular.style.cssText = "display:none;";

      this.getBasketItems(allBooks);
    });
    this.searchButton.addEventListener("click", () => {
      const { value: searchInputValue } = this.searchInput;
      this.search(searchInputValue);
      this.rootElement.scrollIntoView({ behavior: "smooth" });
    });
  }
}

const buttons = {
  basket: "#img-basket",
  addToBasket: ".book-btn",
  home: "#home",
  basketCounter: "#basket-counter",
  searchInput: "#search-input",
  searchButton: "#search-btn",
  searchDiv: "#search",
};

const bookShop = new BookShop(buttons);
bookShop.start();
