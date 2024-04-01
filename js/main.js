var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productDescription = document.getElementById('productDescription');
var productCategory = document.getElementById('productCategory');
var productSearch = document.getElementById('productSearch')
var productList = [];
var addBTN = document.getElementById('addBTN');
var updateBTN = document.getElementById('updateBTN');
var updateIndex = 0;

if (localStorage.getItem('products')) {
    productList = JSON.parse(localStorage.getItem('products'))
    display()
}

function addProduct() {
   if (validationName() && validationPrice() && validationDescription() && validationCategory()) {
    var product = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value,
        category: productCategory.value,
    };

    productList.push(product);
    localStorage.setItem('products' , JSON.stringify(productList))
    document.getElementById('errorMessage').classList.add('d-none')
    clear();
    display();
   }else{
    document.getElementById('errorMessage').classList.remove('d-none')
   }
   
}

function clear() {
    productName.value = '';
    productPrice.value = '';
    productDescription.value = '';
    productCategory.value = '';
}

function display() {
    var cartona = '';
    for (var i = 0; i < productList.length; i++) {
        cartona += `<tr>
                   <td>${productList[i].name}</td>
                   <td>${productList[i].price}</td>
                   <td>${productList[i].description}</td>
                   <td>${productList[i].category}</td>
                   <td><button type="button" onclick="setData(${i})" class="btn btn-warning">Update</button></td>
                   <td><button type="button" onclick="remove(${i})" class="btn btn-danger">Delete</button></td>
                   </tr>`;
    }

    document.getElementById('productTable').innerHTML = cartona;
}

function remove(index) {
    productList.splice(index , 1);
    localStorage.setItem('products' , JSON.stringify(productList))
    display();
}


function search() {
    var text = productSearch.value
    var cartona = '';
    for (var i = 0; i < productList.length; i++) {

        if (productList[i].name.toLowerCase().includes(text.toLowerCase())) {
             cartona += `<tr>
                   <td>${productList[i].name}</td>
                   <td>${productList[i].price}</td>
                   <td>${productList[i].description}</td>
                   <td>${productList[i].category}</td>
                   <td><button type="button" onclick="setData(${i})" class="btn btn-warning">Update</button></td>
                   <td><button type="button" onclick="remove(${i})" class="btn btn-danger">Delete</button></td>
                   </tr>`;
        }
       
    }

    document.getElementById('productTable').innerHTML = cartona;
   
}

function validationName() {
    var text = productName.value;
    var regexName = /^[a-zA-Z]{3,}$/;
    if (regexName.test(text)) {
        productName.classList.add('is-valid');
        productName.classList.remove('is-invalid');
        document.getElementById('productNameError').classList.add('d-none');
        document.getElementById('errorMessage').classList.add('d-none');
        return true;
    } else {
        productName.classList.add('is-invalid');
        productName.classList.remove('is-valid');
        document.getElementById('productNameError').classList.remove('d-none');
        return false;
    }
}

function validationPrice() {
    var text = productPrice.value;
    var regexPrice = /^(?!0{4,5}$)\d{4,5}$/;
    if (regexPrice.test(text)) {
        productPrice.classList.add('is-valid');
        productPrice.classList.remove('is-invalid');
        document.getElementById('productPriceError').classList.add('d-none');
        document.getElementById('errorMessage').classList.add('d-none');
        return true;
    } else {
        productPrice.classList.add('is-invalid');
        productPrice.classList.remove('is-valid');
        document.getElementById('productPriceError').classList.remove('d-none');
        return false;
    }
}

function validationDescription() {
    var text = productDescription.value;
    var regexDescription = /^.{20,}$/;
    if (regexDescription.test(text)) {
        productDescription.classList.add('is-valid');
        productDescription.classList.remove('is-invalid');
        document.getElementById('productDescriptionError').classList.add('d-none');
        document.getElementById('errorMessage').classList.add('d-none');
        return true;
    } else {
        productDescription.classList.add('is-invalid');
        productDescription.classList.remove('is-valid');
        document.getElementById('productDescriptionError').classList.remove('d-none');
        return false;
    }
}

function validationCategory() {
    var text = productCategory.value;
    var regexCategory = /^(mobile|TV|laptop|tablet)$/i;
    if (regexCategory.test(text)) {
        productCategory.classList.add('is-valid');
        productCategory.classList.remove('is-invalid');
        document.getElementById('productCategoryError').classList.add('d-none');
        document.getElementById('errorMessage').classList.add('d-none');
        return true;
    } else {
        productCategory.classList.add('is-invalid');
        productCategory.classList.remove('is-valid');
        document.getElementById('productCategoryError').classList.remove('d-none');
        return false;
    }
}


function setData(index) {
    updateIndex = index;
    var currentProduct = productList[index]
    productName.value = currentProduct.name;
    productPrice.value = currentProduct.price;
    productDescription.value = currentProduct.description;
    productCategory.value = currentProduct.category;
    addBTN.classList.add('d-none')
    updateBTN.classList.remove('d-none')
}

function updateProduct() {
    if (validationName() && validationPrice() && validationDescription() && validationCategory()) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            description: productDescription.value,
            category: productCategory.value,
        };
        productList.splice(updateIndex , 1 , product)   
        addBTN.classList.remove('d-none')
        updateBTN.classList.add('d-none')  
        localStorage.setItem('products' , JSON.stringify(productList))
        document.getElementById('errorMessage').classList.add('d-none')
        clear();
        display();
       }else{
        document.getElementById('errorMessage').classList.remove('d-none')
       }
}
