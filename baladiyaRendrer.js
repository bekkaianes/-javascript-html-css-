document.addEventListener('DOMContentLoaded', async () => {
    await refreshTable();
    
    document.getElementById('btnAddBaladiya').addEventListener('click', async () => {
        const binificaireBaladiya = document.getElementById('addBaladiya').value;
        
        if (binificaireBaladiya) {
            await window.api.addBaladiya(binificaireBaladiya);
            document.getElementById('addBaladiya').value = '';
            await refreshTable();
        } else {
            alert('Please enter name of baladiya');
        }
    });
    
    
});

async function refreshTable() {
    // Fetch the names from your Electron API
    let baladiya = await window.api.getBaladiya();

    // Get the container div
    let divBaladiya = document.getElementById("baladiya");

    // Start building the HTML for the table
    let tableHTML = `
        <thead>
            <tr>
                <th>الرقم</th>
                <th>اسم البلدية</th>
                <th>حذف البلدية</th>
            </tr>
        </thead>
        <tbody>`;

    // Loop through the data and create table rows
    baladiya.forEach((elem,indexBaladiya) => {
        tableHTML += `
            <tr>
                <td>${indexBaladiya + 1}</td>
                <td>${elem.binificaireBaladiya}</td>
                <td><button onclick="removeBaladiya(${elem.baladiyaNum})"><i class="fa-solid fa-trash"></i></button></td> <!-- hdi bch nsuprimiw etat mn list-->

            </tr>`;
    });

    // Close the table
    tableHTML += `</tbody>`;

    // Set the inner HTML of the div
    divBaladiya.innerHTML = tableHTML;
}

window.removeBaladiya = async function(baladiyaNum) {
    await window.api.removeBaladiya(baladiyaNum);
    await refreshTable();

};