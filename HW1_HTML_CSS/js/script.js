document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-refs');
    const panel = document.querySelector('.references-panel');
    const footer = document.getElementById('references-footer');
    if (!toggleBtn || !panel){
        return;
    }
    toggleBtn.addEventListener('click', () => {
        panel.classList.toggle('open');
        toggleBtn.classList.toggle('active');
    });
});