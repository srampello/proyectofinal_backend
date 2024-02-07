const socket = io();

const renderProducts = async (products)=>{
    const res = await fetch("./views/productTemplate.ejs");
    const template = await res.text();
    const html = ejs.render(template, {products});
    document.getElementById("listContainer").innerHTML = html;
}

socket.on('server:products', (data) => {
    renderProducts(data.products)
})