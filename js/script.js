function fallbackCopyText(text) {
  try {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch (e) {
    return false;
  }
}

function copyTextUniversal(text, onSuccess) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(function() {
      fallbackCopyText(text);
      onSuccess();
    });
  } else {
    fallbackCopyText(text);
    onSuccess();
  }
}

function copyCode(c, b) {
  copyTextUniversal(c, function() {
    if (b) {
      if (!b.dataset.origLabel) {
        b.dataset.origLabel = b.innerHTML;
      }
      b.innerHTML = '✓ Copied!';
      b.style.background = '#A8F2C6';
      b.style.color = '#141413';
      if (b.dataset.timerId) {
        clearTimeout(Number(b.dataset.timerId));
      }
      b.dataset.timerId = setTimeout(function() {
        b.innerHTML = b.dataset.origLabel;
        b.style.background = '';
        b.style.color = '';
      }, 2200);
    }
    showToast("Code '" + c + "' copied to clipboard!");
  });
}

function copyPageUrl(b) {
  copyTextUniversal(window.location.href, function() {
    if (b) {
      if (!b.dataset.origLabel) b.dataset.origLabel = b.innerHTML;
      b.innerHTML = '✓ Link Copied!';
      setTimeout(function() { b.innerHTML = b.dataset.origLabel; }, 2200);
    }
    showToast("Page link copied!");
  });
}

var toastTimer = null;
function showToast(m) {
  var t = document.getElementById('toast');
  if (t) {
    t.textContent = '✨ ' + m;
    t.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      t.classList.remove('show');
    }, 2800);
  }
}

function filterOffers(s, b) {
  document.querySelectorAll('.filter-btn').forEach(function(x) { x.classList.remove('active'); });
  if (b) b.classList.add('active');
  document.querySelectorAll('.offer-card[data-cat]').forEach(function(c) {
    c.style.display = (s === 'all' || c.getAttribute('data-cat') === s) ? 'flex' : 'none';
  });
}

function searchOffers() {
  var input = document.getElementById('offerSearch');
  if (!input) return;
  var q = input.value.toLowerCase();
  document.querySelectorAll('.offer-card[data-cat]').forEach(function(c) {
    c.style.display = c.innerText.toLowerCase().includes(q) ? 'flex' : 'none';
  });
}
