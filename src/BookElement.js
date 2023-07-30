export class BookElement {
  constructor(book, basketElemRef, search) {
    const { id, name, author, price, description, fullDescription, imgURL } =
      book;

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "book-wrapper");
    wrapper.setAttribute("data-id", id);

    const bookImg = document.createElement("div");
    bookImg.setAttribute("class", "book-img");
    const img = document.createElement("img");
    img.setAttribute("class", "img");
    img.src = imgURL;
    bookImg.append(img);

    const bookPrice = document.createElement("div");
    bookPrice.setAttribute("class", "book-price");
    const spanPrice = document.createElement("span");
    spanPrice.setAttribute("class", "price");
    spanPrice.innerText = `${price} $`;
    bookPrice.append(spanPrice);

    const bookName = document.createElement("p");
    bookName.innerText = name;

    const bookDescription = document.createElement("div");
    bookDescription.setAttribute("class", "book-description");
    const pDescription = document.createElement("p");
    pDescription.innerText = description;
    bookDescription.append(pDescription);

    const bookButton = document.createElement("button");
    bookButton.setAttribute("class", "book-btn");
    const spanButton = document.createElement("span");
    spanButton.innerText = "Add to Basket";
    bookButton.append(spanButton);
    bookImg.append(bookButton);

    wrapper.append(bookImg);
    wrapper.append(bookPrice);
    wrapper.append(bookName);
    wrapper.append(bookDescription);

    function createSinglePage () {
      const mainPage = document.querySelector('#main-page');
      const subscribe = document.querySelector('#subscribe');
      const mostPopular = document.querySelector('#most-popular');

      mainPage.style.cssText = 'display:none;';
      subscribe.style.cssText = 'display:none;';
      mostPopular.style.cssText = 'display:none;';
      search.style.cssText = "display: none;";

      const container = document.querySelector("#container");
      container.innerHTML = "";

      const singleImgDiv = document.createElement("div");
      singleImgDiv.setAttribute("class", "single-img");
      const singleImg = document.createElement("img");
      singleImg.setAttribute("class", "img");
      singleImg.src = imgURL;
      singleImgDiv.append(singleImg);

      const bookDescription = document.createElement("div");
      bookDescription.setAttribute("class", "book-single-description");

      const itemDescription = document.createElement("h1");
      itemDescription.innerText = description;
      bookDescription.append(itemDescription);

      const bookAuthor = document.createElement("p");
      bookAuthor.innerText = `Author: ${author}`;
      bookDescription.append(bookAuthor);

      const bookPrice = document.createElement("h3");
      bookPrice.innerText = `Price: ${price} $`;
      bookDescription.append(bookPrice);

      const singleBookButton = document.createElement("button");
      singleBookButton.setAttribute("class", "single-book-btn");
      const singleSpanButton = document.createElement("span");
      singleSpanButton.innerText = "Add to Basket";
      singleBookButton.append(singleSpanButton);
      bookDescription.append(singleBookButton);

      singleBookButton.addEventListener("click", () => {

        const booksIdInBasket = JSON.parse(
          localStorage.getItem("booksIdInBasket")
        ) || { sum: 0 };
        if (booksIdInBasket[id]) booksIdInBasket[id]++;
        else booksIdInBasket[id] = 1;
        booksIdInBasket.sum++;
        localStorage.setItem(
          "booksIdInBasket",
          JSON.stringify(booksIdInBasket)
        );
        basketElemRef.innerText = booksIdInBasket.sum;
        basketElemRef.style.cssText = "display: flex;";
      });

      const descriptionSingleBook = document.createElement("h2");
      descriptionSingleBook.innerText = "Description";
      bookDescription.append(descriptionSingleBook);
      const aboutBook = document.createElement("p");
      aboutBook.innerText = fullDescription;
      bookDescription.append(aboutBook);

      container.append(singleImgDiv);
      container.append(bookDescription);
    }

    wrapper.addEventListener("click", () => {
      createSinglePage();
    });

    wrapper.addEventListener("mouseover", () => {
      bookButton.style.cssText = "display:block";
      img.classList.add("img-mouse-over");
    });

    wrapper.addEventListener("mouseout", () => {
      bookButton.style.cssText = "display:none";
      img.classList.remove("img-mouse-over");
    });

    this.basketElemRef = basketElemRef;
    this._book = wrapper;
    this._bookImg = bookImg;
    this._bookPrice = bookPrice;
    this._bookName = bookName;
    this._bookDescription = bookDescription;
    this._bookButton = bookButton;
  }

  get getBookButton() {
    return this._bookButton;
  }

  get getBook() {
    return this._book;
  }

  addItemToBasket() {
    this.getBookButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const idWrapper = this._book.getAttribute("data-id");
      const booksIdInBasket = JSON.parse(
        localStorage.getItem("booksIdInBasket")
      ) || { sum: 0 };
      if (booksIdInBasket[idWrapper]) booksIdInBasket[idWrapper]++;
      else booksIdInBasket[idWrapper] = 1;
      booksIdInBasket.sum++;
      localStorage.setItem("booksIdInBasket", JSON.stringify(booksIdInBasket));
      this.basketElemRef.innerText = booksIdInBasket.sum;
      this.basketElemRef.style.cssText = "display: flex;";
    });
  }
}
