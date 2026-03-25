let currentLevel = 0;
let score = 0;
let wrongCount = 0;       // تتبع الأخطاء
const maxWrong = 4;       // الحد الأقصى للأخطاء

const levelsArray = [
    'lvl1next1',
    'lvl1next2',
    'lvl1next3',
    'lvl1next4',
    'lvl1next5',
    'lvl1next6',
    'lvl1next7',
    'lvl1next8',
    'lvl1next9',
    'lvl1next10',
    'lvl1next11',
    'lvl1next12'
];

const timerDiv = document.getElementById('timer');
const message = document.getElementById('message');
let timeLeft = 8;
let interval;

// توليد لون عشوائي للأزرار
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// تلوين الأزرار
function buttonsColor(lvlId) {
    const buttons = document.querySelectorAll(`#${lvlId} button`);
    buttons.forEach(btn => btn.style.backgroundColor = getRandomColor());
}

// دالة الانتقال للمستوى التالي
function nextlvl(isCorrect) {
    clearInterval(interval);

    if (!isCorrect) {
        score = Math.max(0, score - 1);
        wrongCount++; // زيادة عدد الأخطاء
        message.innerHTML = `غلط! نقاطك: ${score} | أخطاء: ${wrongCount}/${maxWrong}`;

        if (wrongCount >= maxWrong) {
            // الخسارة
            document.querySelectorAll('.lvls').forEach(q => q.style.display = 'none');
            message.innerHTML = `خسرت! ارتكبت ${wrongCount} أخطاء. حاول مرة أخرى.`;

            // إظهار زر إعادة البداية
            const restartBtn = document.createElement('button');
            restartBtn.textContent = "إعادة المحاولة";
            restartBtn.onclick = restartGame;
            message.appendChild(restartBtn);
            document.getElementById('lose').play();
            clearInterval(interval);
            return;
        }
    } else {
        score++;
        message.innerHTML = `صحيح! نقاطك: ${score}`;
        currentLevel++;
    }

    if (currentLevel >= levelsArray.length) {
        message.innerHTML = `لقد أكملت الاختبار! مجموع نقاطك: ${score}`;
        timerDiv.textContent = 0;
        document.querySelectorAll('.lvls').forEach(q => q.style.display = 'none');
        document.getElementById('next_act').style.display = 'flex';
        document.getElementById('win').play();
        return;
    }

    const nextId = levelsArray[currentLevel];
    document.querySelectorAll('.lvls').forEach(q => q.style.display = 'none');
    document.getElementById(nextId).style.display = 'block';
    buttonsColor(nextId);
    startTimer();
}

// إعادة اللعبة من البداية
function restartGame() {
    currentLevel = 0;
    score = 0;
    wrongCount = 0;
    message.innerHTML = '';
    document.getElementById(levelsArray[currentLevel]).style.display = 'block';
    buttonsColor(levelsArray[currentLevel]);
    startTimer();
}

// التايمر
function startTimer() {
    timeLeft = 8;
    timerDiv.textContent = timeLeft;

    interval = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);
            score = Math.max(0, score - 1);
            message.innerHTML = `انتهى الوقت! نقاطك: ${score}`;

            const currentId = levelsArray[currentLevel];
            document.getElementById(currentId).style.display = 'block';
            buttonsColor(currentId);
            startTimer();
        }
    }, 1000);
}

// بدء الاختبار عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById(levelsArray[currentLevel]).style.display = 'block';
    buttonsColor(levelsArray[currentLevel]);
    startTimer();
});
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