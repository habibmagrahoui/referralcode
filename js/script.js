function copyCode(code, btn) {
    navigator.clipboard.writeText(code).then(() => {
        if (btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = '✓ Copied!';
            btn.style.backgroundColor = '#A8F2C6';
            setTimeout(() => {
                btn.innerHTML = orig;
                btn.style.backgroundColor = '';
            }, 2200);
        }
        showToast("Referral code '" + code + "' copied to clipboard!");
    });
}

function copyPageUrl() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("Page link copied to clipboard!");
    });
}

function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = '✨ ' + msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function filterOffers(catSlug, btnElem) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(b => b.classList.remove('active'));
    if (btnElem) btnElem.classList.add('active');

    const cards = document.querySelectorAll('.offer-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (catSlug === 'all' || cardCat === catSlug) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchOffers() {
    const input = document.getElementById('offerSearch');
    if (!input) return;
    const q = input.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.offer-card');
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(q) ? 'flex' : 'none';
    });
}
