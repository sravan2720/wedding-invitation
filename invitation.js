'use strict';

if (window.lucide) window.lucide.createIcons();

document.querySelectorAll('#engagement a').forEach(link => link.addEventListener('click', stopMusic));

const portraitDialog = document.getElementById('portrait-dialog');
if (portraitDialog && typeof portraitDialog.showModal === 'function') {
  document.querySelectorAll('[data-portrait]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const name = link.dataset.portrait;
      const photo = document.getElementById('portrait-full');
      document.getElementById('portrait-name').textContent = name;
      photo.src = link.href;
      photo.alt = `Full portrait of ${name}`;
      portraitDialog.showModal();
    });
  });
  document.getElementById('close-portrait').addEventListener('click', () => portraitDialog.close());
  portraitDialog.addEventListener('click', event => {
    if (event.target === portraitDialog) portraitDialog.close();
  });
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function setupEventJourney() {
  const journey = document.querySelector('.event-journey');
  if (!journey) return;
  const svg = journey.querySelector('.journey-path');
  const guide = journey.querySelector('.journey-guide');
  const progress = journey.querySelector('.journey-progress');
  const markers = journey.querySelector('.journey-markers');
  const footprints = journey.querySelector('.journey-footsteps');
  const stops = [...journey.querySelectorAll('.journey-stop')];
  const narrowLayout = matchMedia('(max-width: 600px)');
  let pathLength = 0;
  let walkedDistance = 0;
  let checkpoints = [];
  let steps = [];
  let animationFrame = 0;
  let lastTime = 0;

  function distanceAtHeight(height) {
    let lower = 0;
    let upper = pathLength;
    for (let iteration = 0; iteration < 18; iteration += 1) {
      const middle = (lower + upper) / 2;
      if (guide.getPointAtLength(middle).y < height) lower = middle;
      else upper = middle;
    }
    return (lower + upper) / 2;
  }

  function paintJourney() {
    progress.style.strokeDashoffset = String(pathLength - walkedDistance);
    let latestStep;
    steps.forEach(step => {
      const arrived = step.distance <= walkedDistance && walkedDistance > 1;
      step.element.classList.toggle('is-stepped', arrived);
      step.element.classList.remove('is-current');
      if (arrived) latestStep = step.element;
    });
    if (latestStep) latestStep.classList.add('is-current');
    checkpoints.forEach(checkpoint => {
      if (walkedDistance >= checkpoint.distance) checkpoint.stop.classList.add('is-reached');
      checkpoint.marker.classList.toggle('is-reached', checkpoint.stop.classList.contains('is-reached'));
    });
  }

  function advanceJourney(timestamp) {
    animationFrame = 0;
    const bounds = journey.getBoundingClientRect();
    const elapsed = lastTime ? Math.min(timestamp - lastTime, 48) : 16;
    lastTime = timestamp;
    const height = Math.max(0, Math.min(bounds.height, innerHeight * 0.72 - bounds.top));
    const target = reducedMotion.matches ? pathLength : Math.max(walkedDistance, distanceAtHeight(height));
    if (reducedMotion.matches || bounds.bottom < 0) walkedDistance = pathLength;
    else walkedDistance = Math.min(target, walkedDistance + elapsed * 0.42);
    paintJourney();
    if (target - walkedDistance > 0.1) animationFrame = requestAnimationFrame(advanceJourney);
    else lastTime = 0;
  }

  function requestJourneyUpdate() {
    if (!animationFrame) animationFrame = requestAnimationFrame(advanceJourney);
  }

  function measureJourney() {
    const width = journey.clientWidth;
    const height = journey.clientHeight;
    if (!width || !height) return;
    const previousProgress = pathLength ? walkedDistance / pathLength : 0;
    const center = narrowLayout.matches ? 32 : width / 2;
    const bend = narrowLayout.matches ? 12 : 38;
    const points = stops.map((stop, index) => ({
      stop,
      x: center + (index % 2 ? bend : -bend),
      y: stop.offsetTop + stop.offsetHeight / 2,
    }));
    let previous = { x: center, y: 0 };
    let shape = `M ${previous.x} 0`;
    [...points, { x: center, y: height }].forEach(point => {
      const halfway = (previous.y + point.y) / 2;
      shape += ` C ${previous.x} ${halfway}, ${point.x} ${halfway}, ${point.x} ${point.y}`;
      previous = point;
    });
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    guide.setAttribute('d', shape);
    progress.setAttribute('d', shape);
    pathLength = guide.getTotalLength();
    walkedDistance = previousProgress * pathLength;
    progress.style.strokeDasharray = String(pathLength);
    markers.replaceChildren();
    checkpoints = points.map(point => {
      const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      marker.setAttribute('class', 'journey-marker');
      marker.setAttribute('cx', point.x);
      marker.setAttribute('cy', point.y);
      marker.setAttribute('r', '20');
      markers.append(marker);
      return { stop: point.stop, marker, distance: distanceAtHeight(point.y) };
    });
    const distances = checkpoints.map(checkpoint => checkpoint.distance);
    for (let distance = 18; distance < pathLength - 16; distance += 37) {
      if (checkpoints.every(checkpoint => Math.abs(checkpoint.distance - distance) > 22)) distances.push(distance);
    }
    footprints.replaceChildren();
    steps = distances.sort((first, second) => first - second).map((distance, index) => {
      const position = guide.getPointAtLength(distance);
      const ahead = guide.getPointAtLength(Math.min(pathLength, distance + 1));
      const direction = Math.atan2(ahead.y - position.y, ahead.x - position.x);
      const side = index % 2 ? 1 : -1;
      const angle = direction * 180 / Math.PI + 90 + side * 8;
      const element = document.createElement('span');
      element.className = 'footstep';
      element.style.left = `${position.x + Math.sin(direction) * side * 7}px`;
      element.style.top = `${position.y - Math.cos(direction) * side * 7}px`;
      element.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('viewBox', '0 0 26 48');
      icon.setAttribute('focusable', 'false');
      const impression = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      impression.setAttribute('href', '#wedding-footprint');
      if (side === 1) impression.setAttribute('transform', 'translate(26 0) scale(-1 1)');
      icon.append(impression);
      element.append(icon);
      footprints.append(element);
      return { element, distance };
    });
    journey.classList.add('path-ready');
    journey.classList.toggle('journey-animated', !reducedMotion.matches);
    if (reducedMotion.matches) walkedDistance = pathLength;
    paintJourney();
    requestJourneyUpdate();
  }

  measureJourney();
  addEventListener('scroll', requestJourneyUpdate, { passive: true });
  addEventListener('resize', measureJourney, { passive: true });
  reducedMotion.addEventListener('change', measureJourney);
  if ('ResizeObserver' in window) new ResizeObserver(measureJourney).observe(journey.querySelector('.journey-events'));
  if (document.fonts) document.fonts.ready.then(measureJourney);
}
setupEventJourney();

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
}

if (!reducedMotion.matches) {
  const petals = document.querySelector('.petals');
  for (let index = 0; index < 9; index += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${8 + index * 10}%`;
    petal.style.animationDelay = `${index * 2.3}s`;
    petal.style.animationDuration = `${17 + index % 4}s`;
    petals.append(petal);
  }
}

const weddingDate = new Date('2026-11-21T19:30:00+05:30');
function updateCountdown() {
  const remaining = Math.max(0, Math.floor((weddingDate.getTime() - Date.now()) / 1000));
  const values = {
    days: Math.floor(remaining / 86400),
    hours: Math.floor(remaining / 3600) % 24,
    minutes: Math.floor(remaining / 60) % 60,
    seconds: remaining % 60,
  };
  Object.entries(values).forEach(([name, value]) => {
    document.getElementById(name).textContent = String(value).padStart(2, '0');
  });
  if (!remaining) document.getElementById('countdown-message').textContent = 'Our forever has begun.';
}
updateCountdown();
setInterval(updateCountdown, 1000);

let notificationTimer;
function notify(message) {
  clearTimeout(notificationTimer);
  document.getElementById('status').textContent = message;
  notificationTimer = setTimeout(() => { document.getElementById('status').textContent = ''; }, 4500);
}

document.getElementById('share').addEventListener('click', async () => {
  const text = 'You are invited to the wedding of Sravan Kumar & Sreelekha! November 21, 2026, 7:30 PM (IST). Kusuma Satya Convention Hall - 2, Nadakuduru, Kakinada.';
  const hostname = location.hostname;
  const isLocal = ['localhost', '127.0.0.1', '::1', '[::1]'].includes(hostname)
    || hostname.endsWith('.local') || /^10\./.test(hostname)
    || /^192\.168\./.test(hostname) || /^172\.(1[6-9]|2\d|3[01])\./.test(hostname);
  const isPublic = location.protocol.startsWith('http') && !isLocal;
  const data = {
    title: 'Sravan Kumar & Sreelekha | Wedding Invitation',
    text,
    ...(isPublic ? { url: location.href.split('#')[0] } : {}),
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text + (isPublic ? `\n${data.url}` : ''));
      notify(isPublic ? 'Invitation link copied.' : 'Wedding details copied. Publish the site to share its link.');
    } else {
      notify('Sharing is not available in this browser.');
    }
  } catch (error) {
    if (error.name !== 'AbortError') notify('Sharing is unavailable. Please try again.');
  }
});

const musicButton = document.getElementById('music');
const weddingMusic = document.getElementById('wedding-music');
const musicStartTime = 4;
weddingMusic.volume = 0.3;

function setMusicState(playing) {
  musicButton.setAttribute('aria-pressed', String(playing));
  musicButton.title = playing ? 'Pause Thana Pranale Neevani' : 'Play Thana Pranale Neevani';
  musicButton.setAttribute('aria-label', musicButton.title);
}
setMusicState(false);

function stopMusic() {
  weddingMusic.pause();
  setMusicState(false);
}

weddingMusic.addEventListener('playing', () => setMusicState(true));
weddingMusic.addEventListener('pause', () => setMusicState(false));
weddingMusic.addEventListener('ended', () => {
  setMusicState(false);
  if (!document.hidden) playMusic();
});
function reportMusicError() {
  stopMusic();
  musicButton.disabled = false;
  notify(location.protocol === 'file:'
    ? 'Music is unavailable in this local-file preview.'
    : 'Music could not load. Please reload the invitation.');
}
weddingMusic.addEventListener('error', reportMusicError);
weddingMusic.querySelector('source:last-child').addEventListener('error', reportMusicError);

async function playMusic() {
  musicButton.disabled = true;
  try {
    if (weddingMusic.ended || weddingMusic.currentTime < musicStartTime) {
      weddingMusic.currentTime = musicStartTime;
    }
    await weddingMusic.play();
    if (document.hidden) stopMusic();
  } catch (error) {
    stopMusic();
    if (error.name !== 'AbortError') notify('Music could not play. Please tap the music button again.');
  } finally {
    musicButton.disabled = false;
  }
}

musicButton.addEventListener('click', () => {
  if (!weddingMusic.paused) stopMusic();
  else playMusic();
});

window.addEventListener('invitation:opening', () => {
  if (weddingMusic.paused) playMusic();
}, { once: true });

document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopMusic();
});