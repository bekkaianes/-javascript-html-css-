
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        binificaireNom: document.getElementById('binificaireNom').value,
        binificairePrenom: document.getElementById('binificairePrenom').value,
        binificaireAge: document.getElementById('binificaireAge').value,
        binificaireId: document.getElementById('binificaireId').value,
        binificaireTel: document.getElementById('binificaireTel').value,
        binificaireJob: document.getElementById('binificaireJob').value,
        binificaireBaladiya: document.getElementById('binificaireBaladiya').value,
        etatName: getSelectedStatus(),
        binificaireChild: document.getElementById('binificaireChild').value,
        binificaireSickChild: document.getElementById('binificaireSickChild').value,
        binificairePartner: document.getElementById('binificairePartner').value,
        binificairePartnerId: document.getElementById('binificairePartnerId').value,
        organisationName: document.getElementById('organisationName').value,
        binificaireAmount: document.getElementById('binificaireAmount').value
    };
    window.api.addBinInf(
        formData.binificaireNom,
        formData.binificairePrenom,
        formData.binificaireAge,
        formData.binificaireId,
        formData.binificaireTel,
        formData.binificaireJob,
        formData.binificaireBaladiya,
        formData.etatName,
        formData.binificaireChild,
        formData.binificaireSickChild,
        formData.binificairePartner,
        formData.binificairePartnerId,
        formData.organisationName,
        formData.binificaireAmount
    );
    window.location.reload();
});



function getSelectedStatusArray() {
    const statuses = [];
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const statusMap = {
            'binificairemEtat1': 'متزوج',
            'binificairemEtat2': 'اعزب',
            'binificairemEtat3': 'مطلقة',
            'binificairemEtat4': 'ارملة',
            'binificairemEtat5': 'مريض',
            'binificairemEtat6': 'رجل',
            'binificairemEtat7': 'امرأة'
        };
        statuses.push(statusMap[checkbox.name]);
    });
    return statuses;
}
function getSelectedStatus() {
    return getSelectedStatusArray().join(', ');
}

let etatPrices = {};

document.addEventListener('DOMContentLoaded', async () => {
    // Existing code for etatPrices and checkboxes
    const etats = await window.api.getNames();
    etats.forEach(etat => {
        etatPrices[etat.etatName] = etat.etatPrice;

                // Get prices for children
                if (etat.etatName === 'طفل') {
                    childPrice = parseFloat(etat.etatPrice);
                }
                if (etat.etatName === 'طفل مريض') {
                    sickChildPrice = parseFloat(etat.etatPrice);
                }
        
    });

    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateAmountField);
    });

    document.getElementById('binificaireChild').addEventListener('input', updateAmountField);
    document.getElementById('binificaireSickChild').addEventListener('input', updateAmountField);

    // Populate baladiya dropdown
    await populateBaladiyaDropdown();
    
    // Initialize dropdown with all organizations
    await populateOrganizationsDropdown();

    // Listen for changes in baladiya and filter organizations
    document.getElementById('binificaireBaladiya').addEventListener('change', async function() {
        const selectedBaladiya = this.value;
        await populateOrganizationsDropdown(selectedBaladiya);
    });
});

async function populateOrganizationsDropdown(baladiya = null) {
    const select = document.getElementById('organisationName');
    select.innerHTML = ''; // Clear existing options

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'اختر مؤسسة';
    select.appendChild(defaultOption);

    let organisations;
    if (baladiya) {
        organisations = await filterOrganizationsByBaladiya(baladiya);
    } else {
        organisations = await window.api.getOrganisations();
    }

    // Add filtered organizations to dropdown
    organisations.forEach(org => {
        const option = document.createElement('option');
        option.value = org.organisationName;
        option.textContent = org.organisationName;
        select.appendChild(option);
    });
}

async function filterOrganizationsByBaladiya(baladiya) {
    const organisations = await window.api.getOrganisations();
    return organisations.filter(org => org.binificaireBaladiya === baladiya);
}

async function populateBaladiyaDropdown() {
    const select = document.getElementById('binificaireBaladiya');
    select.innerHTML = ''; // Clear existing options

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'اختر بلدية';
    select.appendChild(defaultOption);

    // Fetch baladiya data from database
    const baladiyas = await window.api.getBaladiya();

    // Add baladiyas to dropdown
    baladiyas.forEach(baladiya => {
        const option = document.createElement('option');
        option.value = baladiya.binificaireBaladiya;
        option.textContent = baladiya.binificaireBaladiya;
        select.appendChild(option);
    });
}

function updateAmountField() {
    const selectedStatuses = getSelectedStatusArray();
    let totalAmount = 0;
    
    // Add prices for selected statuses
    selectedStatuses.forEach(status => {
        if (etatPrices[status]) {
            totalAmount += parseFloat(etatPrices[status]);
        }
    });
    
    // Add prices for children
    const childCount = parseInt(document.getElementById('binificaireChild').value) || 0;
    totalAmount += childCount * childPrice;
    
    // Add prices for sick children
    const sickChildCount = parseInt(document.getElementById('binificaireSickChild').value) || 0;
    totalAmount += sickChildCount * sickChildPrice;
    
    // Update the amount field
    const amountField = document.getElementById('binificaireAmount');
    amountField.value = totalAmount > 0 ? totalAmount : '';
    amountField.readOnly = true;
}