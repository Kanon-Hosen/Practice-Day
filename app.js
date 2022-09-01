const loadData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    console.log(data)
    return data;
    
}
const mainData = loadData();

const displayData = () => {
    mainData.forEach(item => {
        const title = item.title;
        const img = item.image;
        const des = item.category;
    });
}