const modalData = {
    shop: `
        <h2>🛒 Магазин - Divi Selqni</h2>
        <div class="price-card"><span>VIP Ранг</span> <strong>5.00 лв.</strong></div>
        <div class="price-card"><span>LEGEND Ранг</span> <strong>10.00 лв.</strong></div>
        <div class="price-card"><span>ULTRA Ранг</span> <strong>20.00 лв.</strong></div>
        <p style="margin-top:20px;">За покупка се свържете с @Admin в Discord!</p>
    `,
    rules: `
        <h2>📜 Правила на сървъра</h2>
        <ol>
            <li>Без обиди и токсично поведение.</li>
            <li>Без спам и реклами на други сървъри.</li>
            <li>Слушайте модераторите.</li>
            <li>Забавлявайте се, но бъдете "Диви" в рамките на нормалното!</li>
        </ol>
    `,
    links: `
        <h2>🔗 Важни Връзки</h2>
        <p>Последвайте ни в социалните мрежи:</p>
        <button onclick="window.location.href='#'" style="padding:10px; width:100%; margin-bottom:10px; cursor:pointer;">TikTok на Дивите</button>
        <button onclick="window.location.href='#'" style="padding:10px; width:100%; cursor:pointer;">YouTube Канал</button>
    `
};

function openModal(type) {
    document.getElementById('modal-body').innerHTML = modalData[type];
    document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

// Затваряне при натискане извън прозореца
window.onclick = function(event) {
    if (event.target == document.getElementById('modal-overlay')) {
        closeModal();
    }
}