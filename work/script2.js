//////////////////////////////
// 1️⃣ تعريف المتغيرات
//////////////////////////////
let currentLevel = 0; // المرحلة الحالية
let score = 0;        // النقاط
let wrongCount = 0;   // عدد الأخطاء
const maxWrong = 4;   // الحد الأقصى للأخطاء

const levelsArray = [
  'lvl1next1','lvl1next2','lvl1next3','lvl1next4','lvl1next5',
  'lvl1next6','lvl1next7','lvl1next8','lvl1next9','lvl1next10',
  'lvl1next11','lvl1next12','lvl1next13','lvl1next14','lvl1next15',
  'lvl1next16'
];

// عناصر الصفحة
const timerDiv = document.getElementById('timer');
const message = document.getElementById('message');
const alarm = document.getElementById('alarmSound');
const container = document.getElementById('container');

// عرض النقاط
const scoreDiv = document.createElement('p');
scoreDiv.id = 'score';
container.prepend(scoreDiv);

let timeLeft = 10;
let interval;


//////////////////////////////
// 2️⃣ توليد لون عشوائي للأزرار
//////////////////////////////
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function colorButtons(levelId) {
    const buttons = document.querySelectorAll(`#${levelId} button`);
    buttons.forEach(btn => {
        btn.style.backgroundColor = getRandomColor();
    });
}


//////////////////////////////
// 3️⃣ التايمر
//////////////////////////////
function startTimer() {
    clearInterval(interval);
    timeLeft = 10;
    timerDiv.textContent = timeLeft;

    interval = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = timeLeft;

        if(timeLeft <= 0){
            clearInterval(interval);
            alarm.currentTime = 0;
            alarm.play();
            message.textContent = "انتهى الوقت!";
            registerError(); // نعتبره خطأ
        }
    }, 1000);
}


//////////////////////////////
// 4️⃣ تسجيل الأخطاء
//////////////////////////////
function registerError() {
    wrongCount++;
    score = Math.max(0, score - 1);
    message.textContent = `خاطئ! نقاطك: ${score} | أخطاء: ${wrongCount}/${maxWrong}`;
    const lose = document.getElementById('incorrect');
    lose.play();

    if(wrongCount >= maxWrong){
        // الخسارة التلقائية
        document.querySelectorAll('.lvl').forEach(el => el.style.display = 'none');
        message.textContent = `خسرت! ارتكبت ${wrongCount} أخطاء.`;
        
        // زر إعادة المحاولة
        const restartBtn = document.createElement('button');
        restartBtn.textContent = "إعادة المحاولة";
        restartBtn.onclick = restartGame;
        message.appendChild(restartBtn);
        clearInterval(interval);
    } else {
        // إعادة عرض نفس المستوى بعد خطأ
        const levelId = levelsArray[currentLevel];
        const levelElement = document.getElementById(levelId);
        if(levelElement){
            levelElement.style.display = 'block';
            colorButtons(levelId);
            startTimer();
        }
    }
}


//////////////////////////////
// 5️⃣ الانتقال للمستوى التالي
//////////////////////////////
function nextlvl(isCorrect){
    // اخفاء كل المستويات
    levelsArray.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = 'none';
    });

    // مسح الرسالة السابقة
    message.textContent = '';

    if(isCorrect){
        score++;
        message.textContent = 'صحيح!';
        const crct = document.getElementById('nice');
        crct.play();
        currentLevel++; // زيادة المرحلة فقط عند الاجابة الصحيحة
    } else {
        registerError();
        return;
    }

    scoreDiv.textContent = `النقاط: ${score}`;

    // اذا خلصت كل المراحل
    if(currentLevel >= levelsArray.length){
        message.textContent = `لقد أكملت اللعبة! نقاطك: ${score}`;
        clearInterval(interval);
        const nextact = document.getElementById('next_act');
        if(nextact) nextact.style.display = 'flex';
        const win = document.getElementById('plsound');
        win.play();
        return;
    }

    // عرض المستوى الحالي
    const levelId = levelsArray[currentLevel];
    const levelElement = document.getElementById(levelId);
    if(levelElement){
        levelElement.style.display = 'block';
        colorButtons(levelId);
        startTimer();
    }
}


//////////////////////////////
// 6️⃣ إعادة اللعبة من البداية
//////////////////////////////
function restartGame() {
    currentLevel = 0;
    score = 0;
    wrongCount = 0;
    message.textContent = '';
    const firstLevel = document.getElementById(levelsArray[currentLevel]);
    if(firstLevel){
        firstLevel.style.display = 'block';
        colorButtons(levelsArray[currentLevel]);
        startTimer();
    }
}


//////////////////////////////
// 7️⃣ بدء اللعبة من المرحلة الأولى
//////////////////////////////
nextlvl(true);
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