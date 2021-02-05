document.addEventListener('DOMContentLoaded', function () {
    let menuBtn = document.querySelector('.menu');
    let menu = document.querySelector('.menu__list');
    let settingBtn = document.querySelector('.settings');
    let settingWindow = document.querySelector('.settings__window');

    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    })
    settingBtn.addEventListener('click', function(){
        settingBtn.classList.toggle('active');
        settingWindow.classList.toggle('active');
    })
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
});