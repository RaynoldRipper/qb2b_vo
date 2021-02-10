// global functions 
function fadeDelete(time, elem) {
    elem.style.transition = 'all .' + time + 's'
    elem.style.opacity = '0';
    setTimeout(() => {
        elem.style.display = 'none';
        elem.remove();
    }, time);
}

function hide(time, elem) {
    elem.style.transition = 'all .' + time + 's'
    elem.style.opacity = '0';
    setTimeout(() => {
        elem.style.display = 'none';
    }, time);
}

function show(time, elem) {
    elem.style.display = 'block';
    setTimeout(() => {
        elem.style.transition = 'all .' + time + 's'
        elem.style.opacity = '1';
    }, 1);
}

document.addEventListener('DOMContentLoaded', function() {
    let menuBtn = document.querySelector('.menu');
    let menu = document.querySelector('.menu__list');
    let settingBtn = document.querySelector('.settings');
    let settingWindow = document.querySelector('.settings__window');

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    })
    settingBtn.addEventListener('click', function() {
        settingBtn.classList.toggle('active');
        settingWindow.classList.toggle('active');
    })

    // Функция для текстовых полей
    if (document.querySelector('.line-form')) {
        let form = document.querySelector('.line-form');
        let inputs = form.querySelectorAll('input[type=text]');
        inputs.forEach(element => {
            element.addEventListener('focus', (e) => {
                let field = e.target.closest('.line-form__field');
                field.classList.add('field-focus')
            })
            element.addEventListener('blur', (e) => {
                let field = e.target.closest('.line-form__field');
                field.classList.remove('field-focus')
            })
        });
    }
    if (document.querySelector('input[type=text], input[type=number], input[type=tel]')) {
        let inputs = document.querySelectorAll('input[type=text], input[type=number], input[type=tel], textarea');
        inputs.forEach(element => {
            element.addEventListener('input', function() {
                var inputClass;
                if (element.classList.contains('custom-form__input')) {
                    inputClass = '.custom-form__input-wrapper';
                } else if (element.classList.contains('custom__text-input')) {
                    inputClass = '.custom__text';
                }
                if (!element.closest(inputClass).classList.contains('input__filled') && element.value.length >= 1) {
                    element.closest(inputClass).classList.add('input__filled');
                } else if (element.value.length <= 0) {
                    element.closest(inputClass).classList.remove('input__filled');
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

        let getTrackStyleStr = function(el, j) {
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

        let setDragStyleStr = function(evt) {
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
            element.addEventListener('input', function() {
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
                if (e.target != element &&
                    e.target != element.closest('.main-table__btn-wrapper') &&
                    e.target != element.closest('.main-table__btn-wrapper').querySelector('.main-table__link')) {
                    element.closest('.main-table__btn-wrapper').classList.remove('active')
                }
            })
        });

    }
    if (document.querySelector('.task .custom-form input')) {
        let form = document.querySelector('.custom-form')
        let inputFile = form.querySelector('#task-files')
        let fileContainer = document.querySelector('.custom-form__file-list')
        const dt = new DataTransfer()
        dt.items.add(new File([], 'a.txt'))
        inputFile.files = dt.files

        function deleteFile() {
            let deletBtn = document.querySelectorAll('.custom-form__file-delete');
            deletBtn.forEach(element => {
                element.addEventListener('click', function(e) {
                    const dt_1 = new DataTransfer()
                    for (let i = 0; i < inputFile.files.length; i++) {
                        if (i != element.dataset.number) {
                            let currentFile = inputFile.files[i];
                            dt_1.items.add(currentFile)
                        }
                    }
                    inputFile.onchange = null // remove event listener
                    inputFile.files = dt_1.files // this will trigger a change event
                    fadeDelete(500, element.closest('.custom-form__file-item'));
                })
            });
        }
        inputFile.addEventListener('change', (e) => {
            const dt = new DataTransfer()
            fileContainer.innerHTML = '';
            for (let i = 0; i < inputFile.files.length; i++) {
                let currentFile = inputFile.files[i];
                dt.items.add(currentFile)
                let html = `<div class="custom-form__file-item">` +
                    currentFile.name + `<a class="custom-form__file-delete" data-number=` + i + `>x</a></div>`
                fileContainer.insertAdjacentHTML('beforeend', html);
            }
            inputFile.onchange = null // remove event listener
            inputFile.files = dt.files // this will trigger a change event

            if (document.querySelector('.custom-form__file-item')) deleteFile();
        })
    }
    if (document.querySelector('.main-table__rating-item')) {
        let ratingStars = document.querySelectorAll('.main-table__rating-item');
        for (let i = 0; i < ratingStars.length; i++) {
            var raitClass;
            let element = ratingStars[i];
            element.addEventListener('mouseover', () => {
                if (element.dataset.rating < 3) raitClass = 'main-table__rating-item--low'
                else if (element.dataset.rating == 3) raitClass = 'main-table__rating-item--medium'
                else if (element.dataset.rating > 3) raitClass = 'main-table__rating-item--high'
                let currentTask = element.closest('.main-table__row ')
                currentTask.querySelectorAll('.main-table__rating-item').forEach(elem => {
                    if (elem.dataset.rating <= element.dataset.rating) {
                        elem.classList.add(raitClass);
                    }
                });
            })
            element.addEventListener('mouseout', () => {
                ratingStars.forEach(elem => {
                    if (elem.dataset.rating <= element.dataset.rating) {
                        elem.classList.remove(raitClass);
                    }
                });
            })

        }

        // ratingStars.forEach(element => {
        //     element.addEventListener('mouseover', () => {
        //         console.log(element.dataset.rating);
        //     })
        // });
    }
    $(function() {
        $('[data-toggle="popover"]').popover()
    })
});