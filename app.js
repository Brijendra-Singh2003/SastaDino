const dino = document.getElementById('dino')
let hit = true;
const score = document.getElementById('score')
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
    if(!hit) {
        setTimeout(() => {
            interval = (Math.floor(Math.random()*15 + 5) * 100);
            start(interval)
            generateBarriers()
        }, interval)
    }
}

function generateBarriers() {
    const d2 = document.createElement('div');
    d2.classList.add('obs')
    dino.after(d2)

    setTimeout(() => {
        d2.style.right = '100%'
    }, 20);

    setTimeout(() => {

        if(dino.offsetTop > 250) {
            crash()
            return
        }
        
        setTimeout(() => {
            if(dino.offsetTop > 250) {
                crash()
                return
            }
        }, 140);

    }, 1730);

    t = setTimeout(() => {
        count++;
        score.innerHTML = `SCORE: ${count}`
        d2.remove()
    }, 2020);
}

window.onkeydown = (e) => {
    if(e.keyCode == 32) {
        if(!hit) {jump()}
        else {
            dino.removeAttribute('style')
            dino.classList.remove('down')
            hit = false;
            count = 0;
            score.innerHTML = `SCORE: ${count}`
            document.getElementsByClassName('crash')[0].style.scale = 0;
            start(2000)
        }
    }
}

function crash() {
    count--;
    hit = true;
    dino.style.rotate = '90deg'
    dino.style.bottom = '75px'
    document.getElementsByClassName('crash')[0].style.scale = 1;
    document.getElementsByClassName('crash')[0].innerHTML = 'GAME OVER';
}