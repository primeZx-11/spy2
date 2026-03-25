let currentLevel = 0; 
let score = 0;
let wrongCount = 0;        // تتبع الأخطاء
const maxWrong = 4;        // الحد الأقصى للأخطاء قبل الخسارة

const levelsArray = [
    'lvl1next1','lvl1next2','lvl1next3','lvl1next4','lvl1next5',
    'lvl1next6','lvl1next7','lvl1next8','lvl1next9','lvl1next10',
    'lvl1next11','lvl1next12'
];

const timerDiv = document.getElementById('timer');
const message = document.getElementById('message');

let timeLeft = 10;
let interval;

const sound = new Audio('samuelfjohanns-nervous-rhythmic-drivers-05-120840 (1).mp3');

// توليد لون عشوائي للأزرار
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i=0;i<6;i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function colorButtons(levelId) {
    const buttons = document.querySelectorAll(`#${levelId} button`);
    buttons.forEach(btn => btn.style.backgroundColor = getRandomColor());
}

// الانتقال للسؤال التالي
function nextlvl(isCorrect){
    clearInterval(interval);

    if(!isCorrect){
        score = Math.max(0, score - 1);
        wrongCount++; // زيادة الأخطاء
        message.innerHTML = `خاطئ! نقاطك: ${score} | أخطاء: ${wrongCount}/${maxWrong}`;
        const lose = document.getElementById('incorrect');
        lose.play();

        // تحقق إذا وصل للحد الأقصى
        if(wrongCount >= maxWrong){
            document.querySelectorAll('.lvl').forEach(q => q.style.display = 'none');
            message.innerHTML = `خسرت! ارتكبت ${wrongCount} أخطاء.`;
            
            // زر إعادة المحاولة
            const restartBtn = document.createElement('button');
            restartBtn.textContent = "إعادة المحاولة";
            restartBtn.onclick = restartGame;
            message.appendChild(restartBtn);
            return;
        }
    } else {
        score++;
        message.innerHTML = `صحيح! نقاطك: ${score}`;
        currentLevel++;
        const crct = document.getElementById('nice');
        crct.play();
    }

    if(currentLevel >= levelsArray.length){
        message.innerHTML = `لقد أكملت الاختبار! مجموع نقاطك: ${score}`;
        timerDiv.textContent = 0;
        document.querySelectorAll('.lvl').forEach(q => q.style.display = 'none');
        document.getElementById('next_act').style.display = 'flex';
        const win = document.getElementById('plsound');
        win.play();
        return;
    }

    const nextId = levelsArray[currentLevel];
    document.querySelectorAll('.lvl').forEach(q => q.style.display = 'none');
    document.getElementById(nextId).style.display = 'block';
    colorButtons(nextId);

    startTimer();
}

// إعادة اللعبة من البداية
function restartGame() {
    currentLevel = 0;
    score = 0;
    wrongCount = 0;
    message.innerHTML = '';
    const first = document.getElementById(levelsArray[currentLevel]);
    first.style.display = 'block';
    colorButtons(levelsArray[currentLevel]);
    startTimer();
}

// التايمر
function startTimer(){
    timeLeft = 10;
    timerDiv.textContent = timeLeft;

    interval = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = timeLeft;

        if(timeLeft <= 0){
            clearInterval(interval);
            sound.currentTime = 0;
            sound.play();
            score = Math.max(0, score - 1);
            message.innerHTML = `انتهى الوقت! خسرت نقطة! نقاطك: ${score}`;

            const currentId = levelsArray[currentLevel];
            document.getElementById(currentId).style.display = 'block';
            colorButtons(currentId);
            startTimer();
        }
    }, 1000);
}

// بدء الاختبار عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const first = document.getElementById(levelsArray[currentLevel]);
    first.style.display = 'block';
    colorButtons(levelsArray[currentLevel]);
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