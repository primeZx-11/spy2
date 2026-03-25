let currentLevel = 0; // index البداية
let score = 0; // متغير النقاط
const levelsArray = [
    'lvl1', 
    'lvl1next1', 
    'lvl1next2', 
    'lvl1next3',
    'lvl1next4' // أضفت السؤال الرابع
];

const timerDiv = document.getElementById('timer');
const message = document.getElementById('message');
const sound = document.getElementById('alarmSound');
let timeLeft = 10;let wrongCount = 0; // عدد الأخطاء المتتالية
const maxWrong = 4;

function nextlvl(isCorrect){
    clearInterval(interval);
    document.querySelectorAll('.lvls').forEach(lvl => lvl.style.display = 'none');

    if(!isCorrect){
        wrongCount++;
        score = Math.max(0, score - 1);
        message.innerHTML = `خاطئ! نقاطك: ${score} | أخطاء: ${wrongCount}/${maxWrong}`;
        const incorrect = document.getElementById('incorrect');
        incorrect.play();

        if(wrongCount >= maxWrong){
            message.innerHTML = `خسرت اللعبة! ارتكبت ${wrongCount} أخطاء.`;
            const restartBtn = document.createElement('button');
            restartBtn.textContent = "إعادة المحاولة";
            restartBtn.onclick = restartGame;
            message.appendChild(restartBtn);
            return;
        }

        document.getElementById(levelsArray[currentLevel]).style.display = 'flex';
        colorButtons(levelsArray[currentLevel]);
        startTimer();
        return;
    }

    // الإجابة صحيحة → إعادة تعيين الأخطاء
    wrongCount = 0;
    score++;
    message.innerHTML = `صحيح! نقاطك: ${score}`;
    currentLevel++;

    if(currentLevel >= levelsArray.length){
        message.innerHTML = `لقد أكملت اللعبة! نقاطك النهائية: ${score}`;
        timerDiv.textContent = 0;
        const nextact = document.getElementById('next_act');
        nextact.style.display = 'flex';
        const music = document.getElementById('plsound');
        music.play();
        return;
    }

    const levelId = levelsArray[currentLevel];
    document.getElementById(levelId).style.display = 'flex';
    colorButtons(levelId);
    startTimer();
}

function restartGame(){
    currentLevel = 0;
    score = 0;
    wrongCount = 0;
    message.innerHTML = '';
    document.getElementById(levelsArray[currentLevel]).style.display = 'flex';
    colorButtons(levelsArray[currentLevel]);
    startTimer();
}
let interval;

// دالة توليد لون عشوائي
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i=0;i<6;i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

// تلوين أزرار المستوى الحالي
function colorButtons(levelId) {
    const buttons = document.querySelectorAll(`#${levelId} button`);
    buttons.forEach(btn => {
        btn.style.backgroundColor = getRandomColor();
    });
}

// دالة الانتقال للمستوى التالي
function nextlvl(isCorrect){
    clearInterval(interval); // ايقاف التايمر السابق

    // إخفاء كل المستويات
    document.querySelectorAll('.lvls').forEach(lvl => lvl.style.display = 'none');

    if(!isCorrect){
        message.innerHTML = 'خاطئ، حاول مرة أخرى!';
        document.getElementById(levelsArray[currentLevel]).style.display = 'flex';
        colorButtons(levelsArray[currentLevel]);
        startTimer(); // إعادة التايمر لنفس المستوى
        const incorrect = document.getElementById('incorrect');
        incorrect.play();
        return;
    }

    score++; // زيادة النقاط عند الإجابة الصحيحة
    message.innerHTML = `صحيح! نقاطك: ${score}`;



    currentLevel++;
   let nextact = document.getElementById('next_act');
    if(currentLevel >= levelsArray.length){
        message.innerHTML = `لقد أكملت اللعبة! نقاطك النهائية: ${score}`;
        timerDiv.textContent = 0;
        nextact.style.display = 'flex';
        const music = document.getElementById('plsound');
        music.play();
        return;
    }

    const levelId = levelsArray[currentLevel];
    document.getElementById(levelId).style.display = 'flex';
    colorButtons(levelId);
    startTimer();
}



// دالة التايمر
function startTimer(){
    timeLeft = 10; // 15 ثانية لكل سؤال
    timerDiv.textContent = timeLeft;

    interval = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = timeLeft;

        if(timeLeft <= 0){
            clearInterval(interval);
            sound.currentTime = 0;
            sound.play();
            score = Math.max(0, score - 1); // خصم نقطة
            message.innerHTML = `انتهى الوقت! خسرت نقطة! نقاطك: ${score}`;

            // إعادة عرض نفس السؤال
            document.getElementById(levelsArray[currentLevel]).style.display = 'flex';
            colorButtons(levelsArray[currentLevel]);
            startTimer(); // إعادة التايمر
        }
    }, 1000);
}

// بدء اللعبة من السؤال الأول
document.getElementById(levelsArray[currentLevel]).style.display = 'flex';
colorButtons(levelsArray[currentLevel]);
startTimer();
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