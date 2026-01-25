let isCoolingDown = false;

document.addEventListener('mousemove', (e) => {
    if (isCoolingDown) return;

    createRipple(e.clientX, e.clientY);

    isCoolingDown = true;

    setTimeout(() => {
        isCoolingDown = false;
    }, 120); 
});

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1200);
}