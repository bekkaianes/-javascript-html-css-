document.addEventListener('DOMContentLoaded', async () => {
    await refreshTable();
});

async function refreshTable() {
    let BinInf = await window.api.getBinInf();
    let divBinInf = document.getElementById("BinInf");
    let table = `
            <thead>
                <tr>
                    <th>الرقم</th>
                    <th>الاسم</th>
                    <th>اللقب</th>
                    <th>بطاقة التعريف</th>
                    <th>الحساب</th>
                    <th>البلدية</th>
                    <th>المؤسسة</th>
                    <th>حذف</th>
                </tr>
            </thead>
            <tbody>`;

    BinInf.forEach((formData,indexBin) => {
        table += `
                <tr>
                    <td>${indexBin + 1}</td>
                    <td>${formData.binificaireNom }</td>
                    <td>${formData.binificairePrenom }</td>
                    <td>${formData.binificaireId}</td>
                    <td>${formData.binificaireAmount}</td>
                    <td>${formData.binificaireBaladiya}</td>
                    <td>${formData.organisationName}</td>
                    <td><button id="btnRemoveBinificaire" onclick="removeBinInf(${formData.binificaireNum})"><i class="fa-solid fa-trash"></i></button></td>
                </tr>`;       
    });

    table += `</tbody>`;

    divBinInf.innerHTML = table;
}

window.removeBinInf = async function(binificaireNum) {
    await window.api.removeBinInf(binificaireNum);
    await refreshTable();

};