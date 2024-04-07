$(document).ready(function() {
    generateCircles();
    updateAvailableColors(); // Initialize available colors list and set initial cursor
    setInterval(moveCircles, 3000); // Move circles every 3000 milliseconds
});

function generateCircles() {
    const numberOfCircles = 20;
    const maxDiameter = 100;
    const minDiameter = 50;
    const containerWidth = $('.circle-container').width();
    const containerHeight = $('.circle-container').height();
    const gradientColors = [
        { start: '#FD550C', end: '#5808BD' }, // Purple gradient
        { start: '#FBA7C7', end: '#8C8CEC' }, // Orange gradient
        { start: '#D7BDA6', end: '#FD550C' }  // Beige gradient
    ];

    for (let i = 0; i < numberOfCircles; i++) {
        const gradient = gradientColors[i % gradientColors.length];
        const diameter = Math.random() * (maxDiameter - minDiameter) + minDiameter;
        const x = Math.random() * (containerWidth - diameter);
        const y = Math.random() * (containerHeight - diameter);

        $('<div class="circle"></div>').css({
            'width': diameter + 'px',
            'height': diameter + 'px',
            'top': y + 'px',
            'left': x + 'px',
            'background-image': `radial-gradient(circle at center, ${gradient.start}, ${gradient.end})`,
            'border-radius': '50%',
            'position': 'absolute',
        }).appendTo('.circle-container').data('color', gradient.end);
    }
}

let availableColors = ['#5808BD', '#FD550C', '#8C8CEC'];
let currentColor = '';

function changeCursorColor() {
    if (availableColors.length > 0) {
        const colorIndex = Math.floor(Math.random() * availableColors.length);
        currentColor = availableColors[colorIndex];
        setCursor(currentColor);
    } else {
        $('body').css('cursor', 'auto');
    }
}

function setCursor(color) {
    const svgCursor = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="15" fill="none" stroke="${color}" stroke-width="2"/>
    </svg>`;
    const cursorUrl = `url('data:image/svg+xml;base64,${window.btoa(svgCursor)}') 16 16, auto`;
    $('body').css('cursor', cursorUrl);
}

function updateAvailableColors() {
    availableColors = ['#5808BD', '#FD550C', '#8C8CEC'].filter(color => {
        return $('.circle').toArray().some(circle => $(circle).data('color') === color);
    });
    changeCursorColor();
}

$('.circle-container').on('mouseenter', '.circle', function() {
    if ($(this).data('color') === currentColor) {
        $(this).fadeOut(300, function() { 
            $(this).remove();
            updateAvailableColors();
            if ($('.circle-container').children().length === 0) {
                window.location.href = 'index2.html';
            }
        });
    }
});

function moveCircles() {
    $('.circle').each(function() {
        const containerWidth = $('.circle-container').width();
        const containerHeight = $('.circle-container').height();
        const diameter = $(this).width();
        const newX = Math.random() * (containerWidth - diameter);
        const newY = Math.random() * (containerHeight - diameter);

        $(this).animate({
            'left': newX + 'px',
            'top': newY + 'px'
        }, 500); // Smooth transition to the new position in 500 milliseconds
    });
}
