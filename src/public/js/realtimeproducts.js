const socket = io();

const listContainer = document.getElementById('listContainer')

socket.on('recibirProductos', (data) => {
    listContainer.innerHTML = "",
    listContainer.innerHTML += data.map
    ((product) =>{
        return `<td><p>${product.title}</p></td>
        <td><img src=${product.thumbnail} alt=${product.title} style="height: 50px; width: 50px"/>`
    }).join("")
})