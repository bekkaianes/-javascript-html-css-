
document.addEventListener('DOMContentLoaded', async () => {
    // Load baladiya options when page loads
    await loadBaladiyaOptions();
    
    // Form submission handler
    document.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form elements
        const baladiyaSelect = document.getElementById('binificaireBaladiya');
        const orgNameInput = document.getElementById('organisationName');
        const responsableNameInput = document.getElementById('responsableName');
        const responsableTelInput = document.getElementById('responsableTel');
        const responsableEmailInput = document.getElementById('responsableEmail');

        // Validate required fields
        if (!baladiyaSelect.value) {
            alert('الرجاء اختيار البلدية');
            return;
        }
        
        if (!orgNameInput.value) {
            alert('الرجاء إدخال اسم المؤسسة');
            return;
        }

        if (!responsableNameInput.value) {
            alert('الرجاء إدخال اسم المسؤول');
            return;
        }

        try {
            // First, add responsable to responsable table
            const responsableId = await window.api.addResponsable(
                responsableNameInput.value,
                responsableTelInput.value,
                responsableEmailInput.value
            );

            // Then add organisation with both responsable name and ID
            await window.api.addOrg(
                baladiyaSelect.value,
                orgNameInput.value,
                document.getElementById('organisationType').value,
                responsableNameInput.value,  // Store name in organisation table
                responsableId               // Store reference to responsable table
            );
            
            document.querySelector('form').reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('حدث خطأ أثناء تسجيل البيانات. الرجاء المحاولة مرة أخرى.');
        }
    });
});

async function loadBaladiyaOptions() {
    const baladiyaSelect = document.getElementById('binificaireBaladiya');
    
    try {
        // Clear and add default option
        baladiyaSelect.innerHTML = '';
        const defaultOption = new Option('اختر البلدية', '', true, true);
        defaultOption.disabled = true;
        baladiyaSelect.add(defaultOption);

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