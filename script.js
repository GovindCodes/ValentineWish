async function loadCustomization() {
    try {
        const response = await fetch('customize.json');
        const data = await response.json();
        
        document.getElementById('name').textContent = data.name;
        document.getElementById('greeting').textContent = data.greetingText;
        document.getElementById('wish').textContent = data.wishText;
        document.getElementById('image').src = data.imagePath;
        
    } catch (error) {
        console.error('Error loading customization:', error);
    }
}

loadCustomization();