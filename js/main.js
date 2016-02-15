var mouseObj = $('.img-mouse'),
    hole = $('.hole'),
    holeLength = hole.length,
    checkUp = [],
    mouseLeft,
    mouseTop,
    randNum,
    score = 0,
    time = 30
    timeInterv = null,
    startInterv = null,
    grText = {
       'win': 'Well done!',
        'lose': 'Oops!!'
    };

function mouseUp(index){
    if(!checkUp[index]){
        mouseObj.eq(index).removeClass('down clicked').addClass('up transition');
        checkUp[index] = true;
        mouseDown(index);
    };
}

function mouseDown(index){
    if(checkUp[index] == true){
        setTimeout(function(){
            mouseObj.eq(index).removeClass('up clicked').addClass('down transition');
            checkUp[index] = false;
        },1300);
    };
}

function mouseClick(){
    mouseObj.click(function(){
        $(this).removeClass('up transition').addClass('clicked down');
        mouseLeft = $(this).offset().left;
        mouseTop = $(this).offset().top;
        $('#canvas1').append('<span class="count-item">+10</span>');
        $('.count-item').last().offset({ top: mouseTop-110, left: mouseLeft-10 }).animate({top: '-=15'},300,function(){
            $(this).remove();
        });
        score += 10;
        $('#score').html(score);
    });
    $('#game').mousedown(function(){
        $('#game').css({'cursor':'url(images/img-chuizi.ico),auto'})
    });
    $('#game').mouseup(function(){
        $('#game').css({'cursor':'url(images/img-chuizi-p.ico),auto'})
    });
}

function countdown(){
    timeInterv = setInterval(function(){
        time -= 1;
        if(time == 0){
            time = 0;
            clearInterval(timeInterv);//clear time
            gameEnd();
        }
        $('#time').html(time);
    },1000);
}

function gameEnd(){
    mouseObj.removeClass('up down clicked');
    clearInterval(startInterv);//stop
    if(score >= 300){
        $('#gr-text').html(grText.win);
        $('#gr-score').html(score);
        $('#btn-replay').html('Play again');
    }else{
        $('#gr-text').html(grText.lose);
        $('#gr-score').html('only '+score);
        $('#btn-replay').html('Try again');
    };
    $('#game-result').fadeIn(300);
}

function start(){
    startInterv = setInterval(function(){
        randNum = parseInt(Math.random() * ((holeLength-1) - 0 + 1) + 0);
        for(var i =0; i<holeLength;i++){
            if(i == randNum){
                mouseUp(i);
            };
        };
    },500);
    countdown();
    $('#btn-start').hide();
}

function init(){
    score = 0;
    time = 30;
    checkUp = [];
    $('#score').html(score);
    $('#time').html(time);
    $('#game-result').fadeOut(300);
    $('#btn-start').show();
}

$(function(){
    init();
    $('#btn-start').click(function(){
        start();
    });
    $('#btn-replay').click(function(){
        init();
    });
    mouseClick();
})