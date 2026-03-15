let rating = 0, testType = 'work';
function setLang(lang, btn) { document.body.setAttribute('data-lang', lang); document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
function setRating(n) { rating = n; document.querySelectorAll('#starPick span').forEach((s, i) => s.classList.toggle('on', i < n)); }
function setTestType(type, btn) { testType = type; document.querySelectorAll('.type-tab').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
function toggleInterest(btn) { btn.classList.toggle('active'); }
function scrollCards(dir) { document.getElementById('scrollContainer').scrollBy({ left: dir * 340, behavior: 'smooth' }); }
function submitTestimonial() {
    const name = document.getElementById('tName').value.trim();
    const country = document.getElementById('tCountry').value;
    const role = document.getElementById('tRole').value.trim();
    const msg = document.getElementById('tMsg').value.trim();
    if (!name || !msg || !rating) { alert('Please fill in name, rating and message.'); return; }
    const container = document.getElementById('scrollContainer');
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const col = testType === 'work' ? 'red' : 'blue';
    const card = document.createElement('div');
    card.className = 'tcard';
    card.innerHTML = `<span class="tcard-type ${testType}">${testType === 'work' ? 'Work' : 'Study'}</span><div class="tcard-stars">${stars}</div><div class="tcard-quote">"</div><p>"${msg}"</p><div class="tcard-author"><div class="tcard-avatar ${col}">${initials}</div><div><div class="tcard-name">${name}</div><div class="tcard-role">${role || 'Member'} · ${country || 'Abroad'}</div></div></div>`;
    container.appendChild(card);
    container.scrollBy({ left: 9999, behavior: 'smooth' });
    document.getElementById('testForm').style.display = 'none';
    document.getElementById('testSuccess').style.display = 'block';
}
function submitContact() {
    const name = document.getElementById('cName').value.trim();
    const phone = document.getElementById('cPhone').value.trim();
    if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
    document.getElementById('contactFormEl').style.display = 'none';
    document.getElementById('contactSuccess').style.display = 'block';
}
const io = new IntersectionObserver(entries => { entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 70); io.unobserve(e.target); } }); }, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));