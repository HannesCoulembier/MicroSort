let controllerData;
let filterconfig = {
    "Reversed":false,
    "SortBy":"Name"
}
function renderTable() {
    $('#main-table').empty();

    let selection = controllerData.controllers;
    for (const header of controllerData.layout) {
        let title=Object.keys(header)[0];
        if (title == 'Name'){ continue; }
        selection = selection.filter((controller)=> controller[title]>= filterconfig['filters'][title]['min'] & controller[title]<= filterconfig['filters'][title]['max'])
    }
    selection = _.sortBy(selection, filterconfig["SortBy"]);
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
            filterconfig['filters']={};
            for (const header of controllerData.layout) {
                let title=Object.keys(header)[0];
                let opt = document.createElement('option');
                opt.value=title;
                opt.innerText=header[title];
                $('#sortBy').append(opt);
                
                if (title == 'Name'){ continue; }
                let entry = document.createElement('div');
                let label = document.createElement('label');
                label.innerText = title+":";
                label.classList.add('input-label');
                let min = document.createElement('input');
                min.placeholder = "min";
                min.id = title+"-min";
                min.classList.add('input-text');
                let max = document.createElement('input');
                max.placeholder = "max";
                max.id = title+"-max";
                max.classList.add('input-text');
                label.appendChild(min);
                label.appendChild(max);
                entry.appendChild(label);
                $('#filter-content').append(entry);
                filterconfig['filters'][title]={};
            }
            updateFilters();
            renderTable();
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

    $('.dropdown-btn').click(()=>{
        $('#filter-content').toggleClass('show');
    })

    function updateFilters() {
        for (const header of controllerData.layout) {
            let title=Object.keys(header)[0];
            if (title == 'Name'){ continue; }

            let values = controllerData.controllers.map((x)=> x[title]);
            let minimum = Math.min(...values);
            let maximum = Math.max(...values);

            let min = $('#'+title+'-min').val();
            let minval = min;
            if (minval == '') {
                minval = minimum;
            }
            if (isNaN(minval)) {
                minval = minimum;
                $('#'+title+'-min').val('');
            }

            let max = $('#'+title+'-max').val();
            let maxval = max;
            if (maxval == '') {
                maxval = maximum;
            }
            if (isNaN(maxval)) {
                maxval = maximum;
                $('#'+title+'-max').val('');
            }

            filterconfig['filters'][title]['min']=parseFloat(minval);
            filterconfig['filters'][title]['max']=parseFloat(maxval);
        }
    }

    $("#filter-content").change(()=>{
        updateFilters();
        renderTable();
    })
    
})