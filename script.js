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
// function submitContact() {
//     const name = document.getElementById('cName').value.trim();
//     const phone = document.getElementById('cPhone').value.trim();
//     if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
//     document.getElementById('contactFormEl').style.display = 'none';
//     document.getElementById('contactSuccess').style.display = 'block';
// }
async function submitContact() {
  const name    = document.getElementById('cName').value.trim();
  const phone   = document.getElementById('cPhone').value.trim();
  const country = document.getElementById('cCountry').value;
  const skill   = document.getElementById('cSkill').value;

  const interestBtns = document.querySelectorAll('.interest-btn.active');
  const interest = Array.from(interestBtns).map(b => b.textContent.trim()).join(', ');

  if (!name || !phone) {
    alert('Please enter your name and phone number.');
    return;
  }

  // ── 1. Silent Google Form submission ──
  const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd_l4jyRxaAuOeWWfKH_IFFntCSveeww30KY_1TGLoVLGsw3A/formResponse';

  const formData = new FormData();
  formData.append('entry.1270073310', name);
  formData.append('entry.1241894107', phone);
  formData.append('entry.846543135',  country);
  formData.append('entry.1954698376', interest);
  formData.append('entry.846884259',  skill);

  fetch(FORM_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  });

  // ── 2. Show success screen first ──
  document.getElementById('contactFormEl').style.display = 'none';
  document.getElementById('contactSuccess').style.display = 'block';

  // ── 3. Ask user if they want to send WhatsApp message ──
  const sendWA = confirm(
    '✅ Application submitted!\n\nWould you also like to send us a WhatsApp message so we can contact you faster?'
  );

  if (sendWA) {
    const msg =
`Hello OOO BACAH! 🌍

New Application Received:

👤 Name: ${name}
📱 Phone: ${phone}
🌍 Country: ${country}
🎯 Interest: ${interest}
💼 Skill / Field: ${skill}

Please contact this applicant. Thank you!`;

    window.open(
      `https://wa.me/79854663304?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  }
}

const io = new IntersectionObserver(entries => { entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 70); io.unobserve(e.target); } }); }, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));