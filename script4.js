// ========== المتغيرات الأساسية ==========
const btn = document.getElementById('start');
const audio = document.getElementById('bgAudio');
const buttons = document.querySelectorAll(".color-btn");
const scoreDiv = document.getElementById("score");
const stageDiv = document.getElementById("stage");
const messageDiv = document.getElementById("message");

const colors = ["red","green","blue","yellow","purple","orange","pink","cyan","lime","magenta","brown","grey"];
let sequence = [];
let playerSequence = [];
let score = 0;
let stage = 1;
const maxStages = 15;

// ========== تشغيل الموسيقى عند الضغط على start ==========
btn.addEventListener('click', () => {
    audio.volume = 0.5;
    audio.play();
    btn.style.display = 'none'; // إخفاء الزر بعد التشغيل
    startGame(); // بدء اللعبة مباشرة
});

// ========== إضافة مستمع لكل زر ألوان ==========
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const color = btn.dataset.color;
        playerSequence.push(color);
        checkPlayerInput();
    });
});

// ========== دالة بدء اللعبة ==========
function startGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    stage = 1;
    scoreDiv.textContent = `نقاطك: ${score}`;
    stageDiv.textContent = `المرحلة: ${stage}`;
    messageDiv.textContent = "";
    addColorToSequence();
    playSequence();
}

// ========== إضافة لون جديد للمسلسل ==========
function addColorToSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
}

// ========== تشغيل المسلسل (sequence) ==========
function playSequence() {
    let i = 0;
    // إزالة تأثير الـ active من كل الأزرار
    buttons.forEach(btn => btn.classList.remove("active"));

    const interval = setInterval(() => {
        buttons.forEach(btn => btn.classList.remove("active"));

        if(i < sequence.length){
            const btn = document.querySelector(`.color-btn[data-color="${sequence[i]}"]`);
            btn.classList.add("active");
            i++;
        } else {
            clearInterval(interval);
        }
    }, 400);

    playerSequence = [];
}

// ========== التحقق من إدخال اللاعب ==========
function checkPlayerInput() {
    const currentIndex = playerSequence.length - 1;

    // إذا ارتكب خطأ
    if(playerSequence[currentIndex] !== sequence[currentIndex]) {
        score = Math.max(0, score - 1);
        scoreDiv.textContent = `نقاطك: ${score}`;
        messageDiv.textContent = "خطأ! حاول مجددًا.";
        playerSequence = [];
        playSequence();
        return;
    }

    // إذا أدخل كل الألوان صح
    if(playerSequence.length === sequence.length) {
        score++;
        scoreDiv.textContent = `نقاطك: ${score}`;
        messageDiv.textContent = "صحيح! المرحلة التالية...";

        if(stage < maxStages){
            stage++;
            stageDiv.textContent = `المرحلة: ${stage}`;
            setTimeout(() => {
                addColorToSequence();
                playSequence();
            }, 500);
        } else {
            messageDiv.textContent = `مبروك! أكملت جميع المراحل! نقاطك النهائية: ${score}`;
        }
    }
}
function saveScore(player_id, username, score){
    fetch('save_score.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `player_id=${player_id}&score=${score}&username=${encodeURIComponent(username)}`
    })
    .then(res => res.text())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

// مثال: عند نهاية اللعبة
saveScore(player_id, username, finalScore);