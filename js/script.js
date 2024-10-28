var productName = document.getElementById("ProductName");
var productPrice = document.getElementById("ProductPrice");
var productDec = document.getElementById("Productdec");
var productCat = document.getElementById("ProductCat");
var tableBody = document.getElementById("tableBody");
var btnAction = document.getElementById("addAndUpdate");
var productContainer = [];
var currentIndex = 0;

if (localStorage.getItem("myProducts") !== null) {
  productContainer = JSON.parse(localStorage.getItem("myProducts"));
  displayProduct(productContainer);
}

function Actionbtn() {
  console.log(btnAction.innerHTML);
  if (btnAction.innerHTML.trim() == "Add Product") {
    if (regxProduct()) {
      addProduct();
    } else {
      alert("is invalid");
    }
  } else {
    if (regxProduct()) {
      updateProduct();
    } else {
      alert("is invalid");
    }
  }
}

function addProduct() {
  var product = {
    name: ProductName.value,
    price: ProductPrice.value,
    dec: Productdec.value,
    cat: ProductCat.value,
  };

  productContainer.push(product);
  localStorage.setItem("myProducts", JSON.stringify(productContainer));
  displayProduct(productContainer);
  clearProduct();
}

function clearProduct() {
  productName.value = "";
  productPrice.value = "";
  productDec.value = "";
  productCat.value = "";
}

function displayProduct(arrayContainer) {
  var box = ` `;
  for (var i = 0; i < arrayContainer.length; i++) {
    box += ` <tr>
        <td>${i + 1}</td>
        <td>${arrayContainer[i].name}</td>
        <td>${arrayContainer[i].price}</td>
        <td>${arrayContainer[i].dec}</td>
        <td>${arrayContainer[i].cat}</td>
        <td>
            <button class="btn btn-danger" onClick={DeleteProduct(${i});}>Delete</button>
            <button class="btn btn-secondary" onClick={fillInput(${i});}>Update</button>
        </td>
    </tr> `;
  }
  tableBody.innerHTML = box;
}

function DeleteProduct(index) {
  productContainer.splice(index, 1);
  localStorage.setItem("myProducts", JSON.stringify(productContainer));
  displayProduct(productContainer);
}

function fillInput(index) {
  currentIndex = index;
  productName.value = productContainer[index].name;
  productPrice.value = productContainer[index].price;
  productDec.value = productContainer[index].dec;
  productCat.value = productContainer[index].cat;
  btnAction.innerHTML = "Update Product";
}

function updateProduct() {
  var product = {
    name: ProductName.value,
    price: ProductPrice.value,
    dec: Productdec.value,
    cat: ProductCat.value,
  };
  productContainer[currentIndex] = product;
  localStorage.setItem("myProducts", JSON.stringify(productContainer));
  displayProduct(productContainer);
  btnAction.innerHTML = "Add Product";
  clearProduct();
}

function searchProduct(term) {
  var fillterProducts = [];
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toUpperCase().includes(term.toUpperCase()) ==
      true
    ) {
      fillterProducts.push(productContainer[i]);
    }
    displayProduct(fillterProducts);
  }
}

function deleteAll() {
  localStorage.removeItem("myProducts");
  productContainer = [];
  displayProduct(productContainer);
}

function regxProduct() {
  var regxName = /^[A-Z ]{1,2}[a-z]{1,10}$/;
  var regxPrice = /^[0-9]{1,10}$/;
  var regxDec = /^[A-Z]{1,2}[a-z]{1,50}$/;
  var regxCat = /^[A-Z]{1,2}[a-z]{1,20}$/;
  var nameTrue = false;
  var priceTrue = false;
  var decTrue = false;
  var catTrue = false;
  var canAdd = false;

  if (regxName.test(productName.value)) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    nameTrue = true;
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
  }

  if (regxPrice.test(productPrice.value)) {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    priceTrue = true;
  } else {
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
  }

  if (regxDec.test(productDec.value)) {
    productDec.classList.add("is-valid");
    productDec.classList.remove("is-invalid");
    decTrue = true;
  } else {
    productDec.classList.add("is-invalid");
    productDec.classList.remove("is-valid");
  }

  if (regxCat.test(productCat.value)) {
    productCat.classList.add("is-valid");
    productCat.classList.remove("is-invalid");
    catTrue = true;
  } else {
    productCat.classList.add("is-invalid");
    productCat.classList.remove("is-valid");
  }

  if (
    nameTrue == true &&
    priceTrue == true &&
    decTrue == true &&
    catTrue == true
  )
    return true;
  else return false;
}
