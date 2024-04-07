document.addEventListener('DOMContentLoaded', () => {
    const paddle_1 = document.querySelector('.paddle_1');
    const paddle_2 = document.querySelector('.paddle_2');
    const ball = document.querySelector('.ball');


    let dx = Math.floor(Math.random() * 4) + 3; 
    let dy = Math.floor(Math.random() * 4) + 3; 


    let rounds = 0;

    function moveBall() {
        let ballRect = ball.getBoundingClientRect();
        let paddle1Rect = paddle_1.getBoundingClientRect();
        let paddle2Rect = paddle_2.getBoundingClientRect();


        if (ballRect.top <= 0 || ballRect.bottom >= window.innerHeight) {
            dy = -dy;
        }

        if (ballRect.left <= 0 || ballRect.right >= window.innerWidth) {
            dx = -dx;
        }


        if (ballRect.left <= paddle1Rect.right && ballRect.top < paddle1Rect.bottom && ballRect.bottom > paddle1Rect.top) {
            dx = Math.abs(dx); 
            rounds++; 
        }


        if (ballRect.right >= paddle2Rect.left && ballRect.top < paddle2Rect.bottom && ballRect.bottom > paddle2Rect.top) {
            dx = -Math.abs(dx); 
            rounds++; 
        }


        ball.style.left = ballRect.left + dx + 'px';
        ball.style.top = ballRect.top + dy + 'px';

        autoMovePaddle1();

        if (rounds >= 8) {
            window.location.href = 'index.html';
            return; 
        }

        requestAnimationFrame(moveBall);
    }

    function autoMovePaddle1() {
        let ballRect = ball.getBoundingClientRect();
        let paddle1Height = paddle_1.getBoundingClientRect().height;


        let paddle1NewTop = ballRect.top + (ballRect.height / 2) - (paddle1Height / 2);

  
        paddle1NewTop = Math.max(0, Math.min(window.innerHeight - paddle1Height, paddle1NewTop));

        paddle_1.style.top = paddle1NewTop + 'px';
    }

    document.addEventListener('mousemove', (e) => {
        let newTop = e.clientY - (paddle_2.getBoundingClientRect().height / 2);
        newTop = Math.max(0, Math.min(window.innerHeight - paddle_2.getBoundingClientRect().height, newTop));
        paddle_2.style.top = newTop + 'px';
    });

    moveBall(); 
});
