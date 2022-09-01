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
                <h5>${item.title.slice(0 , 22)}</h5>
                <p>${item.price}</p>
            </div>
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
        if (foundProducts.length ) {
            foundProducts.forEach(products => {
                const div = document.createElement('div');
                div.classList.add('box');
                div.innerHTML = `
                    <div class="img">
                        <img src ="${products.image}">
                    </div>
                    <div class="text">
                        <h6>${products.category}</h6>
                        <h5>${products.title.slice(0 , 22)}</h5>
                        <p>${products.price}</p>
                    </div>
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
})