let controllerData;
let filterconfig;
function renderTable() {

    topRow = document.createElement('tr');
    for (const header of controllerData.layout) {
        const cell = document.createElement('th');
        cell.innerText = header;
        topRow.appendChild(cell);
    }
    $('#main-table').append(topRow);

    for (const controller of controllerData.controllers) {
        row = document.createElement('tr');
        for (const header of controllerData.layout) {
            const cell = document.createElement('td');
            cell.innerText = controller[header];
            row.appendChild(cell);
        }
        $('#main-table').append(row);
    }
}

$(document).ready(()=>{

    fetch('controllers.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
        .then(data => {
            controllerData = data;
            renderTable();
        })  
        .catch(error => console.error('Failed to fetch data:', error));
    $('#filter-button').click(()=>{
        console.log("test");
    })
    
})