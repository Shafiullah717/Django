function quickOrder() {
    const searchBox = document.getElementById('searchBox');
    const query = searchBox.value.trim();

    if (query) {
        alert(`Searching for: ${query}`);
        // Simulate a redirect or search feature
        window.location.href = `#menu`;
    } else {
        alert('Please enter a food item to search.');
    }
}
