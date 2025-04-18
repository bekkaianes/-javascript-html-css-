document.addEventListener('DOMContentLoaded', async () => {
    await refreshTable();
    
    document.getElementById('btnAddEtatAndPrice').addEventListener('click', async () => {
        const etatName = document.getElementById('addEtat').value;
        const etatPrice = document.getElementById('addEtatPrice').value;
        
        if (etatName && etatPrice) {
            await window.api.addEtat(etatName, etatPrice);
            document.getElementById('addEtat').value = '';
            document.getElementById('addEtatPrice').value = '';
            await refreshTable();
        } else {
            alert('Please enter both etat name and price');
        }
    });
    
    
});



async function refreshTable() {
    // Fetch the names from your Electron API
    let names = await window.api.getNames();

    // Get the container div
    let divNames = document.getElementById("names");

    // Start building the HTML for the table
    let tableHTML = `
        <thead>
            <tr>
                <th>الرقم</th>
                <th>الحالة</th>
                <th>السعر</th>
         
                <th>حذف الحالة</th>
            </tr>
        </thead>
        <tbody>`;

    // Loop through the data and create table rows
    names.forEach((elem,indexEtat) => {
        tableHTML += `
            <tr>
                <td>${indexEtat + 1} </td>
                <td>${elem.etatName}</td>
                <td>${elem.etatPrice}</td>
                <td><button onclick="removeEtat(${elem.etatNum})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;
    });

    // Close the table
    tableHTML += `</tbody>`;

    // Set the inner HTML of the div
    divNames.innerHTML = tableHTML;
}

window.removeEtat = async function(etatNum) {
        await window.api.removeEtat(etatNum);
        await refreshTable();
    
};