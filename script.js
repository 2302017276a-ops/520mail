const form = document.querySelector("#wishForm");
const intro = document.querySelector("#intro");
const gift = document.querySelector("#gift");
const envelope = document.querySelector("#envelope");
const giftLine = document.querySelector("#giftLine");
const giftHint = document.querySelector("#giftHint");
const stage = document.querySelector("#stage");
const music = document.querySelector("#bgMusic");
const textLayer = document.querySelector("#textLayer");
const sparkLayer = document.querySelector("#sparkLayer");
const finalMessage = document.querySelector("#finalMessage");
const finalRecipient = document.querySelector("#finalRecipient");
const finalBlessing = document.querySelector("#finalBlessing");
const finalSender = document.querySelector("#finalSender");
const previewActions = document.querySelector("#previewActions");
const replayButton = document.querySelector("#replayButton");
const copyLinkButton = document.querySelector("#copyLinkButton");
const productActions = document.querySelector("#productActions");
const saveImageButton = document.querySelector("#saveImageButton");
const forwardMomentButton = document.querySelector("#forwardMomentButton");
const madeWithButton = document.querySelector("#madeWithButton");
const toast = document.querySelector("#toast");
const linkPanel = document.querySelector("#linkPanel");
const shareLinkText = document.querySelector("#shareLinkText");
const closeLinkPanel = document.querySelector("#closeLinkPanel");
const momentPanel = document.querySelector("#momentPanel");
const momentHelpText = document.querySelector("#momentHelpText");
const madeWithPanel = document.querySelector("#madeWithPanel");
const blessingInput = document.querySelector("#blessingText");
const EDIT_PAGE_TITLE = "给ta的一份惊喜";

const MIN_USER_SEGMENTS = 3;
const USER_PRIORITY_MULTIPLIER = 2.2;
const MIN_FLY_POOL = 92;

const MUSIC_START = 48;
const MUSIC_VOLUME = 0.42;
const MUSIC_FADE_IN_MS = 500;
const HEART_ASSEMBLE_AT = 12600;
const HEART_BEAT_AFTER_ASSEMBLE = 1380;
const FINAL_SHOW_AFTER_HEART = 1700;
const builtInBlessing = "愿你一路有花，眼里有光，心里有被珍惜的甜";
const colors = [
  "#ff5f8f",
  "#ff6f9f",
  "#ff8db2",
  "#ff8667",
  "#ffd166",
  "#a06bff",
  "#43c6ac",
  "#38a3ff",
  "#ffb703",
  "#fb6f92"
];
const heartColors = ["#ff3f84", "#ff5f8f", "#ff6f9f", "#ff7ba9", "#d44c78"];
const easings = [
  "cubic-bezier(.15,.88,.25,1)",
  "cubic-bezier(.38,.01,.2,1.34)",
  "cubic-bezier(.22,1,.36,1)",
  "cubic-bezier(.7,0,.18,1)"
];
const motions = ["drift", "cross", "mirror", "arc"];
const heartTemplate = [
  "   xxxx   xxxx   ",
  "  xxxxxx xxxxxx  ",
  " xxxxxxxxxxxxxxx ",
  "xxxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxxx",
  " xxxxxxxxxxxxxxx ",
  "  xxxxxxxxxxxxx  ",
  "   xxxxxxxxxxx   ",
  "    xxxxxxxxx    ",
  "     xxxxxxx     ",
  "      xxxxx      ",
  "       xxx       ",
  "        x        "
];
const flyMessages = [
  "愿你被认真喜欢",
  "今天也要闪闪发光",
  "把好运和温柔都送给你",
  "快乐不止今天",
  "愿每一天都能顺顺利利",
  "万事顺意",
  "平安喜乐",
  "好梦常在",
  "愿你一路有晴天",
  "每一天都有小惊喜",
  "愿你今天有彩虹",
  "愿快乐准时抵达",
  "愿小幸运排着队",
  "暴富",
  "越来越好看",
  "越来越顺",
  "好运爆棚",
  "钱包鼓鼓",
  "升职加薪",
  "逢考必过",
  "天天开心",
  "身体倍儿棒",
  "吃嘛嘛香",
  "烦恼退散",
  "好运连连",
  "状态满分",
  "一路开挂",
  "发量稳稳",
  "皮肤发光",
  "睡得香香",
  "睡到自然醒",
  "心想事成",
  "万事不难",
  "好运常在",
  "快乐翻倍",
  "灵感爆发",
  "效率拉满",
  "好运加码",
  "天天有钱花",
  "出门遇好事",
  "做啥都顺手",
  "精神满格",
  "元气满满",
  "压力清零",
  "顺遂",
  "安康",
  "无忧",
  "出彩",
  "自在",
  "绽放",
  "如愿",
  "腾达",
  "赤诚",
  "称心",
  "得志"
];
const heartWords = [
  "暴富",
  "快乐",
  "温柔",
  "幸运",
  "甜甜",
  "发光",
  "顺遂",
  "安康",
  "无忧",
  "出彩",
  "自在",
  "绽放",
  "如愿",
  "腾达",
  "赤诚",
  "称心",
  "得志"
];
const heartEmojis = ["💗", "💕", "✨", "🌷", "🍬", "🎀", "💫", "💖"];
const flyEmojis = ["💗", "💕", "✨", "🌷", "🍬", "🎀", "💫", "💖", "🌈", "🌟", "⭐", "🍭"];
const heartWordColorGroups = {
  career: {
    words: ["暴富", "腾达", "得志", "出彩", "发光"],
    colors: ["#f5a400", "#ffb703", "#d99000"]
  },
  attitude: {
    words: ["温柔", "赤诚", "自在", "绽放"],
    colors: ["#2fbf71", "#28a96b", "#43c6ac"]
  },
  life: {
    words: ["快乐", "幸运", "甜甜", "顺遂", "安康", "无忧", "如愿", "称心"],
    colors: ["#2f9bff", "#38a3ff", "#4f8cff"]
  },
  accent: {
    colors: ["#ff4d6d", "#e63946"]
  }
};

let currentPayload = {
  sender: "我",
  recipient: "你",
  blessing: builtInBlessing
};
let currentMode = "preview";
let hasOpenedGift = false;
let heartTimer;
let beatTimer;
let finalTimer;
let toastTimer;
let musicFadeFrame;
let screenshotModeTimer;

if (blessingInput) {
  blessingInput.placeholder = "可用分号分句，例如：暴富；顺顺利利；天天开心\n也可以空着";
}

function clampText(value, fallback, maxLength) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return (normalized || fallback).slice(0, maxLength);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  const output = [...items];

  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }

  return output;
}

function dedupeTextList(items) {
  const unique = [];
  const seen = new Set();

  items.forEach((item) => {
    const key = item.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    unique.push(item);
  });

  return unique;
}

function parseUserBlessings(blessingRaw) {
  const chunks = String(blessingRaw || "")
    .replace(/\r/g, "")
    .split(/[\uFF1B;\n]+/)
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((item) => !/^[\s,.\uFF0C\u3002!?\uFF01\uFF1F\u3001:\uFF1A;\uFF1B~\-\u2014]+$/.test(item));

  return dedupeTextList(chunks);
}

function formatFinalBlessing(blessingRaw) {
  const segments = parseUserBlessings(blessingRaw);
  if (!segments.length) return builtInBlessing;
  return segments.join(" ");
}

function cycleFill(items, count) {
  if (!items.length || count <= 0) return [];
  const output = [];

  for (let index = 0; index < count; index += 1) {
    output.push(items[index % items.length]);
  }

  return output;
}

function signedViewportDistance(min, max) {
  const value = random(min, max);
  return Math.random() > 0.5 ? `${value}vw` : `${-value}vw`;
}

function hideAll() {
  intro.classList.add("is-hidden");
  gift.classList.remove("is-active", "is-leaving");
  stage.classList.remove("is-active");
  gift.setAttribute("aria-hidden", "true");
  stage.setAttribute("aria-hidden", "true");
}

function updatePageTitle(mode, recipient) {
  if (mode === "product") {
    document.title = `给${recipient}的一份惊喜`;
    return;
  }
  document.title = EDIT_PAGE_TITLE;
}

function createSparkles() {
  sparkLayer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 44; index += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${random(2, 98)}%`;
    spark.style.top = `${random(4, 96)}%`;
    spark.style.setProperty("--size", `${random(2, 6)}px`);
    spark.style.setProperty("--duration", `${random(3.1, 6.8)}s`);
    spark.style.setProperty("--delay", `${random(-4, 1.5)}s`);
    spark.style.setProperty("--drift-x", `${random(-18, 18)}px`);
    spark.style.setProperty("--drift-y", `${random(-28, 12)}px`);
    fragment.appendChild(spark);
  }

  sparkLayer.appendChild(fragment);
}

function buildFlyMessages({ recipient, blessing }) {
  const header = `给${recipient}`;
  const parsedUserBlessings = parseUserBlessings(blessing);
  const hasCustomBlessing = blessing !== builtInBlessing;
  const useUserBlessings = hasCustomBlessing && parsedUserBlessings.length > 0;
  let textPool;

  if (useUserBlessings) {
    const userTarget = Math.max(
      24,
      parsedUserBlessings.length * 5,
      Math.ceil(flyMessages.length * 0.46 * USER_PRIORITY_MULTIPLIER)
    );
    const userPool = cycleFill(parsedUserBlessings, userTarget);

    const builtInTarget =
      parsedUserBlessings.length < MIN_USER_SEGMENTS
        ? Math.max(10, 16 - parsedUserBlessings.length * 2)
        : Math.max(8, Math.floor(userTarget * 0.42));

    const builtInPool = cycleFill(flyMessages, builtInTarget);
    textPool = [...userPool, ...builtInPool];

    while (textPool.length < Math.min(MIN_FLY_POOL - 12, 74)) {
      textPool.push(userPool[textPool.length % userPool.length]);
      if (textPool.length % 4 === 0) {
        textPool.push(flyMessages[textPool.length % flyMessages.length]);
      }
    }
  } else {
    textPool = [blessing, ...flyMessages];
  }

  const messages = [header, ...textPool, ...flyEmojis];
  while (messages.length < MIN_FLY_POOL) {
    messages.push(
      textPool[messages.length % textPool.length],
      flyEmojis[messages.length % flyEmojis.length]
    );
  }

  return messages;
}

function buildHeartSlots() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const rows = heartTemplate.length;
  const cols = Math.max(...heartTemplate.map((line) => line.length));
  const safeBottom = width <= 620 ? Math.max(132, height * 0.2) : Math.max(122, height * 0.16);
  const availableHeight = Math.max(260, height - safeBottom - 50);
  const maxWidth = width * (width <= 620 ? 0.8 : 0.56);
  const maxHeight = availableHeight * (width <= 620 ? 0.74 : 0.74);
  const cell = Math.min(
    maxWidth / Math.max(cols - 1, 1),
    maxHeight / Math.max(rows - 1, 1),
    width <= 620 ? 18 : 23
  );
  const centerCol = (cols - 1) / 2;
  const centerRow = (rows - 1) / 2;
  const centerY = -Math.max(32, safeBottom * 0.31);
  const rowsSlots = heartTemplate.map(() => []);

  heartTemplate.forEach((line, row) => {
    [...line].forEach((char, col) => {
      if (char === " ") return;

      const baseX = (col - centerCol) * cell;
      const baseY = (row - centerRow) * cell * 0.92 + centerY;
      rowsSlots[row].push({ x: baseX, y: baseY, weight: 1, row, col });
    });
  });

  const accentSlots = [
    { x: -cell * 3.2, y: centerY - cell * 5.65, weight: 1.04, priority: "edge" },
    { x: cell * 3.2, y: centerY - cell * 5.65, weight: 1.04, priority: "edge" },
    { x: -cell * 5.8, y: centerY - cell * 3.2, weight: 0.98, priority: "edge" },
    { x: cell * 5.8, y: centerY - cell * 3.2, weight: 0.98, priority: "edge" },
    { x: 0, y: centerY + cell * 5.78, weight: 1.16, priority: "edge" }
  ];

  const selected = [];
  rowsSlots.forEach((rowSlots, row) => {
    const keep = row <= 1 || row >= rows - 5 ? rowSlots.length : Math.ceil(rowSlots.length * 0.64);
    const step = rowSlots.length / Math.max(keep, 1);

    for (let index = 0; index < keep; index += 1) {
      const slotIndex = Math.min(rowSlots.length - 1, Math.floor(index * step));
      selected.push(rowSlots[slotIndex]);
    }
  });

  const byPosition = new Map();
  [...selected, ...accentSlots].forEach((slot) => {
    const key = `${Math.round(slot.x)}:${Math.round(slot.y)}`;
    byPosition.set(key, slot);
  });

  return [...byPosition.values()];
}

function buildHeartTexts(count) {
  const emojiCount = Math.floor(count / 2);
  const types = shuffle([
    ...Array.from({ length: count - emojiCount }, () => "word"),
    ...Array.from({ length: emojiCount }, () => "emoji")
  ]);

  return Array.from({ length: count }, (_, index) => {
    return types[index] === "emoji" ? pick(heartEmojis) : pick(heartWords);
  });
}

function buildParticles(payload, slots) {
  const messages = buildFlyMessages(payload);
  const heartTexts = buildHeartTexts(slots.length);

  return slots.map((slot, index) => ({
    text: messages[index % messages.length],
    heartText: heartTexts[index],
    slot
  }));
}

function getHeartWordColor(word, index) {
  if (index % 17 === 0) {
    return heartWordColorGroups.accent.colors[(index / 17) % heartWordColorGroups.accent.colors.length | 0];
  }

  for (const group of [heartWordColorGroups.career, heartWordColorGroups.attitude, heartWordColorGroups.life]) {
    if (group.words.includes(word)) {
      return group.colors[index % group.colors.length];
    }
  }

  return heartWordColorGroups.life.colors[index % heartWordColorGroups.life.colors.length];
}

function createTextParticle(item, index) {
  const node = document.createElement("span");
  const { text, heartText, slot } = item;
  const isEmoji = /[\u{1F300}-\u{1FAFF}]/u.test(text);
  const isHeartEmoji = /[\u{1F300}-\u{1FAFF}]/u.test(heartText);
  const motion = isEmoji ? pick(["drift", "arc", "cross"]) : motions[index % motions.length];
  const lane = index % 4;
  const startPoints = [
    { x: "-72vw", y: `${random(-40, 38)}vh` },
    { x: "72vw", y: `${random(-40, 38)}vh` },
    { x: `${random(-42, 42)}vw`, y: "-64vh" },
    { x: `${random(-42, 42)}vw`, y: "64vh" }
  ];
  const endPoints = [
    { x: "76vw", y: `${random(-40, 42)}vh` },
    { x: "-76vw", y: `${random(-42, 40)}vh` },
    { x: `${random(-48, 48)}vw`, y: "68vh" },
    { x: `${random(-48, 48)}vw`, y: "-68vh" }
  ];
  const flyFontSize = isEmoji ? random(17, 27) : text.length > 12 ? random(12, 15) : random(14, 20);
  const heartFontSize = isHeartEmoji ? random(18, 22) : random(16, 18);
  const heartScale = isHeartEmoji ? random(0.82, 0.92) : random(0.86, 0.96);

  node.className = "flying-text";
  node.textContent = text;
  node.dataset.heartText = heartText;
  node.dataset.motion = motion;
  node.dataset.style = isEmoji ? "emoji" : text.length > 8 ? "soft" : "bold";
  node.dataset.heartStyle = isHeartEmoji ? "emoji" : "word";
  node.dataset.beat = String(index % 4);

  node.style.setProperty("--color", pick(colors));
  node.style.setProperty("--heart-color", isHeartEmoji ? "#ff5f8f" : getHeartWordColor(heartText, index));
  node.style.setProperty("--font-size", `${flyFontSize}px`);
  node.style.setProperty("--heart-font-size", `${heartFontSize}px`);
  node.style.setProperty("--duration", `${random(6.4, 10.8)}s`);
  node.style.setProperty("--delay", `${index * 0.07 + random(0, 0.45)}s`);
  node.style.setProperty("--ease", pick(easings));
  node.style.setProperty("--from-x", startPoints[lane].x);
  node.style.setProperty("--from-y", startPoints[lane].y);
  node.style.setProperty("--from-z", `${random(-120, 70)}px`);
  node.style.setProperty("--from-r", `${random(-28, 28)}deg`);
  node.style.setProperty("--from-s", `${random(0.72, 0.96)}`);
  node.style.setProperty("--mid-x", signedViewportDistance(8, 34));
  node.style.setProperty("--mid-y", `${random(-34, 34)}vh`);
  node.style.setProperty("--arc-y", `${random(-46, -18)}vh`);
  node.style.setProperty("--mid-r", `${random(-16, 16)}deg`);
  node.style.setProperty("--near-x", `${random(-28, 28)}vw`);
  node.style.setProperty("--near-y", `${random(-24, 24)}vh`);
  node.style.setProperty("--near-r", `${random(-10, 10)}deg`);
  node.style.setProperty("--to-x", endPoints[lane].x);
  node.style.setProperty("--to-y", endPoints[lane].y);
  node.style.setProperty("--to-z", `${random(-120, 80)}px`);
  node.style.setProperty("--to-r", `${random(-36, 36)}deg`);
  node.style.setProperty("--to-s", `${random(0.76, 1.12)}`);
  node.style.setProperty("--rx", `${random(-34, 34)}deg`);
  node.style.setProperty("--ry", `${random(-36, 36)}deg`);
  node.style.setProperty("--heart-x", `${slot.x}px`);
  node.style.setProperty("--heart-y", `${slot.y}px`);
  node.style.setProperty("--heart-s", `${heartScale * slot.weight}`);
  node.style.setProperty("--heart-s-pop", `${heartScale * slot.weight * 1.048}`);
  node.style.setProperty("--heart-s-rest", `${heartScale * slot.weight * 0.994}`);
  node.style.setProperty("--heart-delay", `${Math.min(index * 8, 620)}ms`);
  node.style.setProperty("--beat-delay", `${(index % 4) * 90 + random(0, 60)}ms`);

  return node;
}

function resetAnimationUi() {
  clearTimeout(heartTimer);
  clearTimeout(beatTimer);
  clearTimeout(finalTimer);
  textLayer.innerHTML = "";
  textLayer.classList.remove("is-heart", "is-beating");
  finalMessage.classList.remove("is-visible");
  previewActions.classList.remove("is-visible");
  productActions.classList.remove("is-visible");
  toast.classList.remove("is-visible");
  hideAllPanels();
}

function prepareFinalText() {
  finalRecipient.textContent = `给 ${currentPayload.recipient}`;
  finalBlessing.textContent = formatFinalBlessing(currentPayload.blessing);
  finalSender.textContent = `来自 ${currentPayload.sender}`;
}

function startAnimation(mode = "preview") {
  currentMode = mode;
  hideAll();
  resetAnimationUi();
  stage.classList.add("is-active");
  stage.setAttribute("aria-hidden", "false");
  createSparkles();
  prepareFinalText();

  const slots = buildHeartSlots();
  const particles = buildParticles(currentPayload, slots);
  const fragment = document.createDocumentFragment();
  particles.forEach((item, index) => {
    fragment.appendChild(createTextParticle(item, index));
  });
  textLayer.appendChild(fragment);

  heartTimer = window.setTimeout(() => {
    assembleHeart();
  }, HEART_ASSEMBLE_AT);
}

function assembleHeart() {
  if (textLayer.classList.contains("is-heart")) return;

  clearTimeout(heartTimer);
  textLayer.querySelectorAll(".flying-text").forEach((node) => {
    node.textContent = node.dataset.heartText;
  });
  textLayer.classList.add("is-heart");

  beatTimer = window.setTimeout(() => {
    textLayer.classList.add("is-beating");
  }, HEART_BEAT_AFTER_ASSEMBLE);

  finalTimer = window.setTimeout(() => {
    finalMessage.classList.add("is-visible");
    if (currentMode === "preview") {
      previewActions.classList.add("is-visible");
    } else {
      productActions.classList.add("is-visible");
    }
  }, HEART_BEAT_AFTER_ASSEMBLE + FINAL_SHOW_AFTER_HEART);
}

function showGift(payload, mode) {
  currentPayload = payload;
  currentMode = mode;
  hasOpenedGift = false;
  updatePageTitle(mode, payload.recipient);
  hideAll();
  resetAnimationUi();
  envelope.classList.remove("is-open", "is-release");
  giftLine.textContent = `“${currentPayload.sender}”给你的一份惊喜`;
  giftHint.textContent = "点击打开信封";
  gift.classList.add("is-active");
  gift.setAttribute("aria-hidden", "false");
}

async function playMusicFromCue() {
  try {
    if (music.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      music.src = "assets/love-remix.mp3";
      music.load();
    }
    if (music.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      showToast("音乐文件未随网站发布，请确认 love-remix.mp3 已上传");
      return;
    }
    music.pause();
    if (musicFadeFrame) {
      cancelAnimationFrame(musicFadeFrame);
      musicFadeFrame = null;
    }
    music.volume = 0;
    music.currentTime = MUSIC_START;
    await music.play();
    const fadeStart = performance.now();
    const fadeIn = (now) => {
      const progress = Math.min((now - fadeStart) / MUSIC_FADE_IN_MS, 1);
      music.volume = MUSIC_VOLUME * progress;
      if (progress < 1) {
        musicFadeFrame = requestAnimationFrame(fadeIn);
      } else {
        musicFadeFrame = null;
      }
    };
    musicFadeFrame = requestAnimationFrame(fadeIn);
  } catch {
    if (music.error) {
      showToast("音乐文件加载失败，请确认 love-remix.mp3 已发布");
    } else {
      showToast("音乐被浏览器拦截了，动画会继续播放");
    }
  }
}

function openGift() {
  if (hasOpenedGift) return;

  hasOpenedGift = true;
  playMusicFromCue();
  envelope.classList.add("is-open");
  giftHint.textContent = "礼物正在打开";

  window.setTimeout(() => {
    envelope.classList.add("is-release");
  }, 760);

  window.setTimeout(() => {
    gift.classList.add("is-leaving");
    startAnimation(currentMode);
  }, 1220);
}

function makeProductUrl() {
  const params = new URLSearchParams({
    d: encodePayload(currentPayload)
  });
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

function encodePayload(payload) {
  const raw = JSON.stringify([payload.sender, payload.recipient, payload.blessing]);
  const bytes = new TextEncoder().encode(raw);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodePayload(value) {
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const [sender, recipient, blessing] = JSON.parse(new TextDecoder().decode(bytes));

    return {
      sender: clampText(String(sender || ""), "我", 16),
      recipient: clampText(String(recipient || ""), "你", 16),
      blessing: clampText(String(blessing || ""), builtInBlessing, 88)
    };
  } catch {
    return null;
  }
}

async function copyProductUrl() {
  const url = makeProductUrl();
  window.history.replaceState(null, "", url);

  if (await copyText(url)) {
    showToast("发送链接已复制，发给 ta 就能直接看");
    return;
  }

  showLinkPanel(url);
  showToast("复制失败，请长按链接手动复制");
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.top = "0";
  helper.style.left = "-9999px";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.focus();
  helper.select();
  helper.setSelectionRange(0, helper.value.length);

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(helper);
  }
}

function showLinkPanel(url) {
  shareLinkText.value = url;
  linkPanel.classList.add("is-visible");
  linkPanel.setAttribute("aria-hidden", "false");
  window.setTimeout(() => {
    shareLinkText.focus();
    shareLinkText.select();
    shareLinkText.setSelectionRange(0, shareLinkText.value.length);
  }, 50);
}

function hideLinkPanel() {
  linkPanel.classList.remove("is-visible");
  linkPanel.setAttribute("aria-hidden", "true");
}

function isLikelyMobile() {
  return window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 768;
}

function isWeChatBrowser() {
  return /MicroMessenger/i.test(window.navigator.userAgent);
}

function openModalPanel(panel) {
  panel.classList.add("is-visible");
  panel.setAttribute("aria-hidden", "false");
}

function closeModalPanel(panel) {
  panel.classList.remove("is-visible");
  panel.setAttribute("aria-hidden", "true");
}

function hideAllPanels() {
  hideLinkPanel();
  [momentPanel, madeWithPanel].forEach(closeModalPanel);
}

function exitSystemScreenshotMode() {
  clearTimeout(screenshotModeTimer);
  screenshotModeTimer = null;
  document.body.classList.remove("is-capturing");
  saveImageButton.disabled = false;
  saveImageButton.textContent = "保存到图片";
}

function saveFinalImage() {
  hideAllPanels();
  toast.classList.remove("is-visible");
  clearTimeout(screenshotModeTimer);

  const tip = isLikelyMobile()
    ? "点击确定后，下方三个按钮会隐藏 5 秒。请立刻使用手机系统截图保存。"
    : "点击确定后，下方三个按钮会隐藏 5 秒。请使用电脑系统截图保存。";

  window.alert(tip);

  document.body.classList.add("is-capturing");
  saveImageButton.disabled = true;
  saveImageButton.textContent = "截图中...";
  screenshotModeTimer = window.setTimeout(exitSystemScreenshotMode, 5000);
}

function showMomentPanel(copied) {
  if (copied) {
    momentHelpText.textContent = isWeChatBrowser()
      ? "链接已复制。点右上角选择分享到朋友圈，或先保存图片后发朋友圈。"
      : "链接已复制。可以粘贴给朋友，也可以先保存图片后发朋友圈。";
  } else {
    momentHelpText.textContent = "分享面板没有打开。可以先保存图片，再手动发到朋友圈。";
  }
  openModalPanel(momentPanel);
}

async function shareToMoment() {
  const url = makeProductUrl();
  window.history.replaceState(null, "", url);
  const shareData = {
    title: document.title,
    text: `${currentPayload.sender}给${currentPayload.recipient}的一份惊喜`,
    url
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showToast("已打开系统分享面板");
      return;
    } catch (error) {
      if (error && error.name === "AbortError") return;
    }
  }

  if (await copyText(url)) {
    showMomentPanel(true);
    showToast("链接已复制");
    return;
  }

  showLinkPanel(url);
  showToast("复制失败，请长按链接手动复制");
}

function openMadeWithPanel() {
  openModalPanel(madeWithPanel);
}

function showToast(message = "图片已准备好") {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3600);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const payload = {
    sender: clampText(String(data.get("senderName") || ""), "我", 16),
    recipient: clampText(String(data.get("recipientName") || ""), "你", 16),
    blessing: clampText(String(data.get("blessingText") || ""), builtInBlessing, 88)
  };
  window.history.replaceState(null, "", window.location.pathname);
  showGift(payload, "preview");
});

envelope.addEventListener("click", openGift);
replayButton.addEventListener("click", () => showGift(currentPayload, "preview"));
copyLinkButton.addEventListener("click", copyProductUrl);
saveImageButton.addEventListener("click", saveFinalImage);
forwardMomentButton.addEventListener("click", shareToMoment);
madeWithButton.addEventListener("click", openMadeWithPanel);
closeLinkPanel.addEventListener("click", hideLinkPanel);
linkPanel.addEventListener("click", (event) => {
  if (event.target === linkPanel) hideLinkPanel();
});
[momentPanel, madeWithPanel].forEach((panel) => {
  panel.addEventListener("click", (event) => {
    if (event.target === panel || event.target.closest("[data-modal-close]")) {
      closeModalPanel(panel);
    }
  });
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideAllPanels();
});

const initialParams = new URLSearchParams(window.location.search);
const compactPayload = initialParams.get("d") ? decodePayload(initialParams.get("d")) : null;
if (compactPayload || initialParams.get("product") === "1") {
  const payload = compactPayload || {
    sender: clampText(initialParams.get("from") || "", "我", 16),
    recipient: clampText(initialParams.get("to") || "", "你", 16),
    blessing: clampText(initialParams.get("wish") || "", builtInBlessing, 88)
  };
  window.addEventListener("load", () => showGift(payload, "product"));
}


