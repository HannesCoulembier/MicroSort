let controllerData;
let filterconfig = {
    "Reversed":false,
    "SortBy":"Name"
}
function renderTable() {
    $('#main-table').empty();

    let selection = controllerData.controllers;
    // Select something
    selection = _.sortBy(controllerData.controllers, filterconfig["SortBy"]);
    if (filterconfig["Reversed"]==true) {
        selection = selection.reverse();
    }

    topRow = document.createElement('tr');
    for (const header of controllerData.layout) {
        const cell = document.createElement('th');
        cell.innerText = header[Object.keys(header)[0]];
        topRow.appendChild(cell);
    }
    $('#main-table').append(topRow);

    for (const controller of selection) {
        let row = document.createElement('tr');
        for (const header of controllerData.layout) {
            let title=Object.keys(header)[0];
            const cell = document.createElement('td');
            if (title=="Name") {
                let link = document.createElement('a');
                link.href = controller["link"];
                link.innerText = controller[title];
                link.target = "_blank";
                cell.appendChild(link);
            }
            else {
                cell.innerText = controller[title];
            }
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

            for (const header of controllerData.layout) {
                title=Object.keys(header)[0];
                opt = document.createElement('option');
                opt.value=title;
                opt.innerText=header[title];
                $('#sortBy').append(opt);
            }
        })  
        .catch(error => console.error('Failed to fetch data:', error));

    $('#filter-button').click(()=>{
        console.log("test");
    })

    $('#sortBy').change(()=>{
        filterconfig["SortBy"]=$("#sortBy").children("option:selected").val();
        renderTable();
    })
    $('#order').click(()=>{
        filterconfig["Reversed"]=!filterconfig["Reversed"];
        renderTable();
    })
    
})