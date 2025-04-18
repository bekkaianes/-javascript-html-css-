document.addEventListener('DOMContentLoaded', async () => {
    await loadBaladiyaOptions();
    await refreshTable();
    
    // Add event listener for baladiya selection change
    document.getElementById('binificaireBaladiya').addEventListener('change', async function() {
        const selectedBaladiya = this.value;
        await refreshTable(selectedBaladiya);
    });
});

async function refreshTable(filterBaladiya = null) {
    let OrgInf = await window.api.getOrgInf();
    let divOrgInf = document.getElementById("OrgInf");
    
    // Filter organizations if a baladiya is selected
    if (filterBaladiya && filterBaladiya !== '') {
        OrgInf = OrgInf.filter(org => org.binificaireBaladiya === filterBaladiya);
    }

    let table = `
        <thead>
            <tr>
                <th>الرقم</th>
                <th>البلدية</th>
                <th>اسم المؤسسة</th>
                <th>اسم العضو المسؤول</th>
                <th>حذف</th>
            </tr>
        </thead>
    <tbody>`;

    OrgInf.forEach((formData, indexOrg) => {
        table += `
                <tr>
                    <td>${indexOrg + 1}</td>
                    <td>${formData.binificaireBaladiya}</td>
                    <td>${formData.organisationName}</td>
                    <td>${formData.responsableName}</td>
                    <td><button id="btnRemoveOrganisation" onclick="removeOrganisation(${formData.organisationNum})"><i class="fa-solid fa-trash"></i></button></td>
                </tr>`;       
    });

    table += `</tbody>`;
    divOrgInf.innerHTML = table;
}

window.removeOrganisation = async function(organisationNum) {
    await window.api.removeOrganisation(organisationNum);
    // Refresh without filter to show all organizations after deletion
    await refreshTable();
};

async function loadBaladiyaOptions() {
    const baladiyaSelect = document.getElementById('binificaireBaladiya');
    
    try {
        // Clear and add default option
        baladiyaSelect.innerHTML = '';
        const defaultOption = new Option('اختر البلدية', '', true, true);
        defaultOption.disabled = true;
        baladiyaSelect.add(defaultOption);

        // Add "All" option to show all organizations
        baladiyaSelect.add(new Option('الكل', ''));
        
        // Fetch and populate baladiya options
        const baladiyas = await window.api.getBaladiya();
        
        if (baladiyas && baladiyas.length > 0) {
            baladiyas.forEach(baladiya => {
                baladiyaSelect.add(new Option(
                    baladiya.binificaireBaladiya,
                    baladiya.binificaireBaladiya
                ));
            });
        } else {
            console.warn('No baladiya data found');
            baladiyaSelect.add(new Option('لا توجد بلديات مسجلة', '', true, true));
        }
    } catch (error) {
        console.error('Error loading baladiyas:', error);
        baladiyaSelect.innerHTML = '';
        baladiyaSelect.add(new Option('خطأ في تحميل البلديات', '', true, true));
    }
}