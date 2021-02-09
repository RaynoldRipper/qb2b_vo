document.addEventListener('DOMContentLoaded', function () {
    let menuBtn = document.querySelector('.menu');
    let menu = document.querySelector('.menu__list');
    let settingBtn = document.querySelector('.settings');
    let settingWindow = document.querySelector('.settings__window');

    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    })
    settingBtn.addEventListener('click', function () {
        settingBtn.classList.toggle('active');
        settingWindow.classList.toggle('active');
    })
    if (document.querySelector('input[type=text], input[type=number], input[type=tel]')) {
        let inputs = document.querySelectorAll('input[type=text], input[type=number], input[type=tel]');
        inputs.forEach(element => {
            element.addEventListener('input', function () {
                if (!element.closest('.custom__text').classList.contains('input__filled') && element.value.length >= 1) {
                    element.closest('.custom__text').classList.add('input__filled');
                } else if (element.value.length <= 0) {
                    element.closest('.custom__text').classList.remove('input__filled');
                }
            })
        });
    }
    if (document.querySelector('input[type=range]')) {
        let r = document.querySelectorAll('input[type=range]'),
            prefs = ['webkit-slider-runnable', 'moz-range'],
            styles = [],
            l = prefs.length,
            n = r.length;

        let getTrackStyleStr = function (el, j) {
            let str = '',
                min = el.min || 0,
                perc = (el.max) ? ~~(100 * (el.value - min) / (el.max - min)) : el.value,
                val = perc + '% 100%';

            el.previousElementSibling.querySelector('.range__count').textContent = el.value;
            if (!el.previousElementSibling.querySelector('.range__total').classList.contains('hide')) {
                el.previousElementSibling.querySelector('.range__total').classList.add('hide')
                el.previousElementSibling.querySelector('.range__count').classList.add('active')
            }
            if (el.value <= 0) {
                el.previousElementSibling.querySelector('.range__total').classList.remove('hide')
                el.previousElementSibling.querySelector('.range__count').classList.remove('active')

            }

            for (let i = 0; i < l; i++) {
                str += "input[type=range][data-rangeId='" + j + "']::-" + prefs[i] + '-track{background-size:' + val + '} ';
            }
            return str;
        };

        let setDragStyleStr = function (evt) {
            let trackStyle = getTrackStyleStr(evt.target, this);
            styles[this].textContent = trackStyle;
        };

        for (let i = 0; i < n; i++) {
            let s = document.createElement('style');
            document.body.appendChild(s);
            styles.push(s);
            r[i].setAttribute('data-rangeId', i);
            r[i].addEventListener('input', setDragStyleStr.bind(i));
        }

        r.forEach(element => {
            element.addEventListener('input', function () {
                let slider = element.previousElementSibling.querySelector('.range__count');
                let radius = this.scrollHeight;
                let dxPixels = radius / 2 + (this.valueAsNumber - parseInt(this.min)) * (this.scrollWidth - radius) / (parseInt(this.max) - parseInt(this.min));
                slider.style.left = dxPixels - (slider.offsetWidth / 2) + 'px';
                if (this.value > 0) this.classList.add('active');
                else this.classList.remove('active');
            })
        });
    }
    if (document.querySelector('.main-table__btn-wrapper .btn')) {
        let downBtn = document.querySelectorAll('.main-table__btn-wrapper .btn');
        downBtn.forEach(element => {
            document.addEventListener('click', (e) => {
                if (e.target == element) {
                    element.closest('.main-table__btn-wrapper').classList.toggle('active');
                }  
                if ( e.target != element 
                    && e.target != element.closest('.main-table__btn-wrapper')
                    && e.target != element.closest('.main-table__btn-wrapper').querySelector('.main-table__link')) {
                    element.closest('.main-table__btn-wrapper').classList.remove('active')
                }
            })
        });

    }
    if (document.querySelector('.task .custom-form input')){
        let form = document.querySelector('.custom-form')
        let inputFile  = form.querySelector('#task-files')
        let fileArray = Array.from(fileList);
        form.addEventListener('change',(e)=>{
            console.log(inputFile.files);
            console.log(e);
        })
    }
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
});