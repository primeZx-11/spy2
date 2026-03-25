<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="لعبة اختبار الذكاء و الثقافة العامة مع أسئلة ممتعة لكل الأعمار">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="quiz, game, test, ذكاء, اختبر معرفتك ,لعبة أسئلة ذكاء, ">
     <meta name="author" content="Cyclops">
    <meta name="theme-color" content="#ff8c00">  
    <title>اختبر معرفتك - لعبة أسئلة ذكاء</title>
    <link rel="stylesheet" href="style1.css">
    <link rel="stylesheet" href="bothpages.css">
</head>
<body>
    <p id="start"><button>play sound</button></p><audio id="bgAudio" src="samuelfjohanns-nervous-rhythmic-drivers-05-120840 (1).mp3" loop></audio>
    <nav>
        <div class="btn">
       <a href="main_game.html" target="_blank"> <button> game </button></a> <a href="https"><button> exit </button></a>
        </div>
    </nav>
    <footer>
       <a href="#"> <h4>
            facebook
        </h4></a>
        <a href="#"><h4>
            instagram
        </h4></a>
        <a href="#"><h4>
            youtube
        </h4></a>
    </footer>
    <script>
        const btn = document.getElementById('start');
const audio = document.getElementById('bgAudio');

btn.addEventListener('click', () => {
    audio.volume = 0.5;
    audio.play();
    btn.style.display = 'none'; // إخفاء الزر بعد التشغيل
});

    </script>
</body>
</html>
