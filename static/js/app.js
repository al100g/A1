/* A1 – Music & Mood Empowerment – frontend logic */
'use strict';

(function () {
  // ── Element refs ────────────────────────────────────────────────────────
  const moodGrid      = document.getElementById('moodGrid');
  const generateBtn   = document.getElementById('generateBtn');
  const themeInput    = document.getElementById('themeInput');
  const nameInput     = document.getElementById('nameInput');
  const loading       = document.getElementById('loading');
  const stepMood      = document.getElementById('step-mood');
  const stepResult    = document.getElementById('step-result');
  const moodBadge     = document.getElementById('moodBadge');
  const lyricsOutput  = document.getElementById('lyricsOutput');
  const musicDesc     = document.getElementById('musicDescription');
  const musicDetails  = document.getElementById('musicDetails');
  const musicSource   = document.getElementById('musicSource');
  const voiceDesc     = document.getElementById('voiceDescription');
  const voiceSource   = document.getElementById('voiceSource');
  const audioSection  = document.getElementById('audioSection');
  const audioPlayers  = document.getElementById('audioPlayers');
  const adjustInput   = document.getElementById('adjustInput');
  const adjustBtn     = document.getElementById('adjustBtn');
  const adjustMsg     = document.getElementById('adjustMsg');
  const copyBtn       = document.getElementById('copyBtn');
  const startOverBtn  = document.getElementById('startOverBtn');

  // ── State ────────────────────────────────────────────────────────────────
  let selectedMood = null;
  let currentLyrics = '';

  // ── Mood selection ───────────────────────────────────────────────────────
  moodGrid.addEventListener('click', function (e) {
    const btn = e.target.closest('.mood-btn');
    if (!btn) return;
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMood = btn.dataset.mood;
    generateBtn.disabled = false;
  });

  // ── Generate ─────────────────────────────────────────────────────────────
  generateBtn.addEventListener('click', function () {
    if (!selectedMood) return;

    stepMood.classList.add('hidden');
    stepResult.classList.add('hidden');
    loading.classList.remove('hidden');

    const body = {
      mood: selectedMood,
      theme: themeInput.value.trim() || 'life',
      user_name: nameInput.value.trim() || null,
    };

    fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(r => { if (!r.ok) throw new Error('Server error'); return r.json(); })
      .then(renderResult)
      .catch(function (err) {
        loading.classList.add('hidden');
        stepMood.classList.remove('hidden');
        alert('Something went wrong: ' + err.message);
      });
  });

  // ── Render result ────────────────────────────────────────────────────────
  function renderResult(data) {
    loading.classList.add('hidden');

    // Badge
    moodBadge.textContent = data.mood;

    // Lyrics
    currentLyrics = data.lyrics.full_lyrics;
    lyricsOutput.textContent = currentLyrics;

    // Music
    const mp = data.music.profile;
    musicDesc.textContent = mp.description || '';
    musicDetails.innerHTML = [
      `<li>Tempo: ${mp.tempo} (${mp.bpm} BPM)</li>`,
      `<li>Key: ${mp.key}</li>`,
      `<li>Style: ${mp.style}</li>`,
      `<li>Instruments: ${(mp.instruments || []).join(', ')}</li>`,
    ].join('');
    musicSource.textContent = data.music.message;

    // Voice
    const vp = data.voice.profile;
    voiceDesc.textContent = vp.description || '';
    voiceSource.textContent = data.voice.message;

    // Audio players
    audioPlayers.innerHTML = '';
    const urls = [
      { label: '🎸 Music', url: data.music.audio_url },
      { label: '🎤 Vocals', url: data.voice.audio_url },
    ].filter(x => x.url);
    if (urls.length) {
      audioSection.classList.remove('hidden');
      urls.forEach(function ({ label, url }) {
        const h = document.createElement('h4');
        h.textContent = label;
        h.style.marginBottom = '4px';
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = url;
        audioPlayers.appendChild(h);
        audioPlayers.appendChild(audio);
      });
    } else {
      audioSection.classList.add('hidden');
    }

    // Reset adjust
    adjustInput.value = '';
    adjustMsg.textContent = '';
    adjustMsg.classList.add('hidden');

    stepResult.classList.remove('hidden');
    stepResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Adjust music ─────────────────────────────────────────────────────────
  adjustBtn.addEventListener('click', function () {
    const adj = adjustInput.value.trim();
    if (!adj || !selectedMood) return;

    adjustBtn.disabled = true;
    adjustMsg.textContent = 'Adjusting…';
    adjustMsg.classList.remove('hidden');

    fetch('/api/adjust', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood: selectedMood, adjustment: adj }),
    })
      .then(r => { if (!r.ok) throw new Error('Server error'); return r.json(); })
      .then(function (data) {
        const mp = data.profile;
        musicDesc.textContent = mp.description || '';
        musicDetails.innerHTML = [
          `<li>Tempo: ${mp.tempo} (${mp.bpm} BPM)</li>`,
          `<li>Key: ${mp.key}</li>`,
          `<li>Style: ${mp.style}</li>`,
          `<li>Instruments: ${(mp.instruments || []).join(', ')}</li>`,
        ].join('');
        musicSource.textContent = data.message;
        adjustMsg.textContent = '✓ Music profile updated!';
      })
      .catch(function (err) {
        adjustMsg.textContent = 'Error: ' + err.message;
      })
      .finally(function () {
        adjustBtn.disabled = false;
      });
  });

  // ── Copy lyrics ──────────────────────────────────────────────────────────
  copyBtn.addEventListener('click', function () {
    if (!currentLyrics) return;
    navigator.clipboard.writeText(currentLyrics).then(function () {
      copyBtn.textContent = '✓ Copied!';
      setTimeout(function () { copyBtn.textContent = '📋 Copy Lyrics'; }, 2000);
    });
  });

  // ── Start over ───────────────────────────────────────────────────────────
  startOverBtn.addEventListener('click', function () {
    selectedMood = null;
    currentLyrics = '';
    generateBtn.disabled = true;
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
    themeInput.value = '';
    nameInput.value = '';
    stepResult.classList.add('hidden');
    stepMood.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
