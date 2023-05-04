const dino = document.getElementById('dino')
let hit = false
const score = document.getElementById('score')
const hscore = document.getElementById('hScore')
let highScore = ()=>{
    if(localStorage.getItem('highScore') == null)
    return 0
    else
    return localStorage.getItem('highScore')
}
window.onload = ()=>{
    hscore.innerHTML = 'High Score: ' + highScore()
}
let count = 0;
let t;

function jump() {
    if(dino.classList.contains('down')) {return}

    dino.classList.add('up')

    setTimeout(() => {
        dino.classList.add('down')
        dino.classList.remove('up')
    }, 250);
    
    setTimeout(() => {
        dino.classList.remove('down')
    }, 500);
}

function start(interval) {

    setTimeout(() => {
        if(hit) return;
        interval = (Math.floor(Math.random()*15 + 5) * 100);
        start(interval)
        generateBarriers()
    }, interval)
}

function generateBarriers() {
    const d2 = document.createElement('div');
    d2.classList.add('obs')
    dino.after(d2)

    setTimeout(() => {
        d2.style.right = '100%'
    }, 2);

    const t = setInterval(()=> {
        if(d2.offsetLeft < 150 && d2.offsetLeft > 50 && dino.offsetTop > 240) {
            crash()
            clearInterval(t)
            return
        }
    }, 1)

    t = setTimeout(() => {
        clearInterval(t)
        if(!hit) {
            count++;
            score.innerHTML = `SCORE: ${count}`
            d2.remove()
        }
    }, 2002);
}

window.onkeydown = (e) => {
    if(e.keyCode == 32) {
        if (!hit) {jump()}
        else {
        location.href = location.href
        start(2000)
        document.getElementsByClassName('crash')[0].style.scale = 0;
        }
        if (document.getElementsByClassName('crash')[0].style.scale != 0) {
            start(2000)
            document.getElementsByClassName('crash')[0].style.scale = 0;
        }
    }
}

window.onclick = (e) => {
    if (!hit) {jump()}
    else {
    location.href = location.href
    start(2000)
    document.getElementsByClassName('crash')[0].style.scale = 0;
    }
    if (document.getElementsByClassName('crash')[0].style.scale != 0) {
        start(2000)
        document.getElementsByClassName('crash')[0].style.scale = 0;
    }
}

function crash() {
    hit = true;
    let arr = document.getElementsByClassName('obs')
    for(item of arr) {

        item.style.left = item.offsetLeft + 'px'
    }
    // dino.style.bottom = '75px'
    dino.classList.remove('down')
    dino.classList.add('up')
    
    setTimeout(() => {
        dino.classList.add('down')
        dino.style.rotate = '90deg'
        dino.classList.remove('up')
    }, 250);
    
    dino.style.rotate = '75deg'
    document.getElementsByClassName('crash')[0].style.scale = 1;
    document.getElementsByClassName('crash')[0].innerHTML = 'GAME OVER';
    if(highScore() < count) {
        localStorage.setItem('highScore', count)
    }
    count--;
}
