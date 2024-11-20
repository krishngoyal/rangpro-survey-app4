document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('survey-form');
    const colorGrid = document.querySelector('.color-grid');
    const summaryTableBody = document.querySelector('#summary-table tbody');
    const colorDemandTableBody = document.querySelector('#color-demand-table tbody');

    const colors = [
        { id: 'color1', name: 'Bright Yellow', src: './images/bright-yellow.jpg' },
        { id: 'color2', name: 'Sky Blue', src: './images/sky-blue.jpg' },
        { id: 'color3', name: 'Soft Pink', src: './images/soft-pink.jpg' },
        { id: 'color4', name: 'Lime Green', src: './images/lime-green.jpg' },
        { id: 'color5', name: 'Peach', src: './images/peach.jpg' },
        { id: 'color6', name: 'Light Gray', src: './images/light-gray.jpg' },
        { id: 'color7', name: 'Orange', src: './images/orange.jpg' },
        { id: 'color8', name: 'Deep Red', src: './images/deep-red.jpg' },
        { id: 'color9', name: 'White', src: './images/white.jpg' },
        { id: 'color10', name: 'Ivory', src: './images/ivory.jpg' },
        { id: 'color11', name: 'Lavender', src: './images/lavender.jpg' },
        { id: 'color12', name: 'Mint Green', src: './images/mint-green.jpg' },
        { id: 'color13', name: 'Turquoise', src: './images/turquoise.jpg' },
        { id: 'color14', name: 'Burgundy', src: './images/burgundy.jpg' },
        { id: 'color15', name: 'Beige', src: './images/beige.jpg' },
        { id: 'color16', name: 'Chocolate Brown', src: './images/chocolate-brown.jpg' },
        { id: 'color17', name: 'Light Blue', src: './images/light-blue.jpg' },
        { id: 'color18', name: 'Charcoal Gray', src: './images/charcoal-gray.jpg' },
        { id: 'color19', name: 'Coral', src: './images/coral.jpg' },
        { id: 'color20', name: 'Amber', src: './images/amber.jpg' },
    ];

    const colorDemand = {};
    colors.forEach(color => colorDemand[color.id] = 0);

    const selectedColors = new Set();

    // Populate color grid
    colors.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.classList.add('color-card');
        colorCard.dataset.id = color.id;

        const img = document.createElement('img');
        img.src = color.src;

        const caption = document.createElement('p');
        caption.textContent = color.name;

        colorCard.appendChild(img);
        colorCard.appendChild(caption);
        colorCard.addEventListener('click', () => toggleColor(colorCard));

        colorGrid.appendChild(colorCard);
    });

    function toggleColor(card) {
        const colorId = card.dataset.id;

        if (selectedColors.has(colorId)) {
            selectedColors.delete(colorId);
            card.classList.remove('selected');
        } else if (selectedColors.size < 5) {
            selectedColors.add(colorId);
            card.classList.add('selected');
        } else {
            alert('You can select up to 5 colors.');
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const shopkeeperName = document.getElementById('shopkeeper-name').value.trim();
        const shopName = document.getElementById('shop-name').value.trim();
        const contactNumber = document.getElementById('contact-number').value.trim();
        const address = document.getElementById('address').value.trim();

        if (selectedColors.size === 0) {
            alert('Please select at least one color.');
            return;
        }

        const selectedColorNames = Array.from(selectedColors).map(id => {
            const color = colors.find(c => c.id === id);
            colorDemand[id]++;
            return color.name;
        }).join(', ');

        // Add shopkeeper data to the summary table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${shopkeeperName}</td>
            <td>${shopName}</td>
            <td>${contactNumber}</td>
            <td>${address}</td>
            <td>${selectedColorNames}</td>
        `;
        summaryTableBody.appendChild(row);

        // Update color demand table
        updateColorDemandTable();

        // Reset form
        form.reset();
        selectedColors.clear();
        document.querySelectorAll('.color-card').forEach(card => card.classList.remove('selected'));
    });

    function updateColorDemandTable() {
        colorDemandTableBody.innerHTML = '';
        Object.keys(colorDemand).forEach(colorId => {
            const color = colors.find(c => c.id === colorId);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${color.name}</td>
                <td>${colorDemand[colorId]}</td>
            `;
            colorDemandTableBody.appendChild(row);
        });
    }
});
