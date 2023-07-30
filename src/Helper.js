export class Helper {
  clickedPage = 1;
  createCell(container, table, thORtd, cellObj, imgURL) {
    const tr = document.createElement("tr");
    const idEl = document.createElement(thORtd);
    const img = document.createElement('img');
    img.src = imgURL;
    img.setAttribute("class", "img-in-basket");
    const nameEl = document.createElement(thORtd);
    nameEl.setAttribute("class", "name-wrapper");
    const quantityEl = document.createElement(thORtd);
    const quantitySpan = document.createElement("span");
    const quantityPlus = document.createElement("span");
    const quantityMinus = document.createElement("span");
    const priceEl = document.createElement(thORtd);
    const subtotalEl = document.createElement(thORtd);

    const { id, name, quantity, price, subtotal } = cellObj;
    idEl.innerText = id;
    nameEl.innerText = name;

    quantitySpan.innerText = quantity;
    priceEl.innerText = price;
    subtotalEl.innerText = subtotal;

    priceEl.setAttribute("class", "priceEl");
    quantityEl.setAttribute("class", "quantity");
    quantityEl.append(quantitySpan);
    subtotalEl.setAttribute("class", "subtotal");

    if (thORtd === "td") {
      nameEl.append(img)

      tr.setAttribute("id", id);
      quantitySpan.setAttribute("class", "quantity-amount");

      quantityMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';
      quantityMinus.setAttribute("class", "quantity-minus");

      quantityPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';
      quantityPlus.setAttribute("class", "quantity-plus");

      quantityEl.append(quantityMinus);
      quantityEl.append(quantityPlus);
    }
    tr.append(idEl);
    tr.append(nameEl);
    tr.append(quantityEl);
    tr.append(priceEl);
    tr.append(subtotalEl);

    table.append(tr);
    container.append(table);
  }

  createTotalPrice(total, container) {
    const totalEl = document.querySelector("#total");
    if (totalEl) totalEl.remove();

    const totalDiv = document.createElement("div");
    totalDiv.setAttribute("id", "total");

    const totalPriceSpan = document.createElement("span");
    totalPriceSpan.innerText = `Total: ${total}$`;
    totalDiv.append(totalPriceSpan);

    container.append(totalDiv);
    container.style.cssText = "flex-direction: column;";
  }

  createPageNumbers(container, numbersAmount, page) {
    const numbersWrapper = document.createElement("div");
    numbersWrapper.setAttribute("id", "numbers-wrapper");
    const arrowLeft = document.createElement("div");
    arrowLeft.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    arrowLeft.setAttribute("id", "arrow-left");
    numbersWrapper.append(arrowLeft);

    for (let i = 1; i < numbersAmount + 1; i++) {
      const number = document.createElement("span");
      number.setAttribute("class", "number");
      number.innerText = i;
      if (i === page) number.setAttribute("id", "active-number");
      numbersWrapper.append(number);
    }

    const arrowRight = document.createElement("div");
    arrowRight.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
    arrowRight.setAttribute("id", "arrow-right");
    numbersWrapper.append(arrowRight);

    container.append(numbersWrapper);
  }

  createBanner() {
    const main = document.querySelector("main");
    let bannerDiv = document.querySelector("#best-books-header");
    if (bannerDiv) return;
    else bannerDiv = document.createElement("div");
    bannerDiv.setAttribute("id", "best-books-header");
    const bannerImg = document.createElement("img");
    bannerImg.setAttribute("id", "best-books-header-img");
    bannerImg.src =
      "//dispatch.barnesandnoble.com/content/dam/ccr/global/global-nav-banner/2023/06/26815_BOTYSF_6-5.jpg";
    bannerDiv.append(bannerImg);

    const categoriesWrapper = document.createElement("div");
    categoriesWrapper.setAttribute("id", "categories-wrapper");
    
    main.prepend(bannerDiv);
  }
}
