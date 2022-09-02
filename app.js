const section = document.getElementById('section');
const loadData = async () => {
    const url = await fetch('https://fakestoreapi.com/products');
    const data = await url.json();
    return data;
};


const display = async() => {
    const mainData = await loadData();
    mainData.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('box');
        div.innerHTML = `
            <div class="img">
                <img src ="${item.image}">
            </div>
            <div class="text">
                <h6>${item.category}</h6>
                <h5>${item.title.slice(0 , 22)}...</h5>
                <p>${item.price}$</p>
            </div>
            <button onclick ="details('${item.image}' , '${item.description}' , '${item.title}' , '${item.rating.rate}')">Details</button>
        `
        section.appendChild(div)
    })
}
display();
const searchField = document.getElementById('searchField')
searchField.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        section.textContent = '';
        const data = await loadData()
        const foundProducts = data.filter(product => product.category.includes(searchField.value.toLowerCase()));
        console.log(foundProducts)
        if (foundProducts.length) {
            foundProducts.forEach(products => {
                const div = document.createElement('div');
                div.classList.add('box');
                div.innerHTML = `
                    <div class="img">
                        <img src ="${products.image}">
                    </div>
                    <div class="text">
                        <h6>${products.category}</h6>
                        <h5>${products.title.slice(0, 22)}</h5>
                        <p>${products.price}$</p>
                    </div>
                    <button onclick ="details('${products.image}' , '${products.description}' , '${products.title}' , '${products.rating.rate}')">Details</button>

                `   
                section.appendChild(div)
            })
        }
        else {
            section.innerHTML = `
                <h1>No Products Found</h1>
            `
        }
    }
});
const modal = document.getElementById('modal');
const main = document.getElementById('main');
const backBtn = document.getElementById('backBtn');

const details = (image, des, title, rating) => {
    modal.innerHTML = `
    <div class="img">
        <img src="${image}" alt="">
    </div>
    <div class="text">
        <h4>${title.slice(0,22)}..</h4>
        <h5>${des.slice(0,200)}..</h5>
        <p>Rating: ${rating}</p>
    </div>
    `;
    main.style.display = 'block'
};

backBtn.addEventListener('click', () => {
    main.style.display = 'none';
    modal.textContent = '';
});
