'use strict';
// support variables
var render = 0;
var renderedItem;
let ajaxurl = '/wp-admin/admin-ajax.php';
let handlerurl = '/wp-content/themes/qb2b-vo/functions/handler.php'
let ajaxData = {
    'action': 'handler',
    'nonce_code': myajax.nonce
}

// global functions 

// Тосты уведомлений
function toast(title = '', body = '', extraClass = '', subTitle = '') {
    jQuery(function($) {
        $(document).ready(function() {
            let toastContainer = document.querySelector('.toast-container')
            if (document.querySelector('.dynamic-toast-wrapper')) {
                let toasts = document.querySelectorAll('.dynamic-toast-wrapper')
                let lastToast;
                toasts.forEach(element => {
                    lastToast = element.dataset.toaster
                });
                lastToast++
                let html = document.createElement('div')
                html.className = 'dynamic-toast-wrapper dynamic-toast-' + lastToast;
                html.dataset.toaster = lastToast
                html.innerHTML = `
                <div class="toast dynamic-toast ${extraClass}" role="alert" aria-live="assertive" data-animation="true" aria-atomic="true">
                    <div class="toast-header">
                        <div class="sub-logo" class="rounded mr-2"></div>
                        <strong class="mr-auto">${title}</strong>
                        <small class="text-muted">${subTitle}</small>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="toast-body">
                        ${body}
                    </div>
                </div>`
                toastContainer.append(html);
                $('.dynamic-toast-' + lastToast + ' .toast').toast({
                    delay: 6000,
                    autohide: true
                })
                $('.dynamic-toast-' + lastToast + ' .toast').toast('show')
                $('.dynamic-toast-' + lastToast + ' .toast').on('hidden.bs.toast', (e) => {
                    $('.dynamic-toast-' + lastToast).remove();
                })
            } else {
                let html = document.createElement('div')
                html.className = 'dynamic-toast-wrapper dynamic-toast-1'
                html.dataset.toaster = 1
                html.innerHTML = `
                <div class="toast dynamic-toast ${extraClass}" role="alert" aria-live="assertive" data-animation="true" aria-atomic="true">
                    <div class="toast-header">
                        <div class="sub-logo" class="rounded mr-2"></div>
                        <strong class="mr-auto">${title}</strong>
                        <small class="text-muted">${subTitle}</small>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="toast-body">
                        ${body}
                    </div>
                </div>`
                toastContainer.append(html);
                $('.toast').toast({
                    delay: 6000,
                    autohide: true
                })
                $('.toast').toast('show')
                $('.toast').on('hidden.bs.toast', (e) => {
                    $('.dynamic-toast-1').remove();
                })
            }
        });
    });

}

function ajaxDataReset() {
    ajaxData = {
        'action': 'handler',
        'nonce_code': myajax.nonce
    }
}

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

function onClickClose(elem) { // вызвать в момент показа окна, где elem - окно
    var localListen = 0;

    function outsideClickListener(event) {
        if (!elem.contains(event.target) && isVisible(elem) && localListen == 1) { // проверяем, что клик не по элементу и элемент виден
            fadeDelete(300, elem)
            render = 0
            renderedItem = null
            document.removeEventListener('click', outsideClickListener);
            localListen = 0;
            if (elem.closest('.company__documents-item').querySelector('.three-dots__btn')) {
                let btn = elem.closest('.company__documents-item').querySelector('.three-dots__btn')
                btn.classList.remove('active');
            }
        } else {
            localListen = 1;
        }
    }
    document.addEventListener('click', outsideClickListener)
}

function isVisible(elem) { //открыто ли условное окно
    return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

function moreBtn(elem) {
    event.preventDefault();
    // elem.classList.toggle('active')

    if (elem.closest('.company__documents-item')) {
        let elemItem = elem.closest('.company__documents-item');
        let html =
            `<div class="poop">
                    <h2 class="text-5 wrapper-title pb-1">Действие</h2>
                    <div class="poop__buttons">
                        <a href="#" class="poop__btn text-3 poop__btn--success">Скачать файл</a>
                        <a href="#" class="poop__btn text-3 poop__btn--warninig">Удалить</a>
                    </div>
                </div>`;

        if (elemItem !== renderedItem && elemItem.querySelector('.poop') === null && render === 0) {
            elem.classList.add('active')
            elemItem.insertAdjacentHTML('beforeend', html)
            renderedItem = elemItem;
            let poop = elemItem.querySelector('.poop');
            show(300, poop);
            render = 1
            onClickClose(poop)
        } else if (elemItem !== renderedItem && renderedItem !== null && typeof renderedItem !== 'undefined' && render === 1) {
            let renderedPoop = renderedItem.querySelector('.poop')
            let renderedDots = renderedItem.querySelector('.three-dots__btn')
            renderedDots.classList.remove('active')
            fadeDelete(300, renderedPoop)
            elemItem.insertAdjacentHTML('beforeend', html)
            elem.classList.add('active')
            renderedItem = elemItem;
            let poop = elemItem.querySelector('.poop');
            show(500, poop);
            onClickClose(poop)
            render = 1;
        } else if (elemItem == renderedItem && render === 1) {
            let renderedPoop = renderedItem.querySelector('.poop')
            let renderedDots = renderedItem.querySelector('.three-dots__btn')
            renderedDots.classList.remove('active')
            fadeDelete(300, renderedPoop)
            renderedItem = ''
            render = 0
        }

    }
}

document.addEventListener('DOMContentLoaded', function() {
    let menuBtn = document.querySelector('.menu');
    let menu = document.querySelector('.menu__list');
    let settingBtn = document.querySelector('.settings');
    let settingWindow = document.querySelector('.settings__window');

    menuBtn.addEventListener('click', function() {
        event.preventDefault();
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    })
    settingBtn.addEventListener('click', function() {
        event.preventDefault();
        settingBtn.classList.toggle('active');
        settingWindow.classList.toggle('active');
    })

    // Функции для форм с сайта **************************************************************************************************************
    if (document.querySelector('.line-form')) {
        let form = document.querySelector('.line-form');
        let fields = document.querySelectorAll('.line-form__field');
        let inputs = form.querySelectorAll('input[type=text],input[type=tel], input[type=password], input[type=email]');

        // Проверка на предзаполненность
        function form_load_check(el) {
            el.forEach(element => {
                let currentField = element.closest('.line-form__field');
                if (element.value.length > 0) {
                    currentField.classList.add('line-form__field--filled')
                }
            });
        }
        setTimeout(() => {
            form_load_check(inputs)
        }, 10);

        inputs.forEach(element => {
            element.addEventListener('focus', (e) => {
                let field = e.target.closest('.line-form__field');
                field.classList.add('field-focus')
                console.log(element.checkValidity())
                if (element.checkValidity() === true) {
                    field.classList.add('field-unvalid')
                } else field.classList.remove('field-unvalid')
            })
            element.addEventListener('blur', (e) => {
                let field = e.target.closest('.line-form__field');
                field.classList.remove('field-focus')
                if (element.checkValidity() === true) {
                    field.classList.add('field-unvalid')
                } else field.classList.remove('field-unvalid')
            })
            element.addEventListener('input', (e) => {
                let currentField = element.closest('.line-form__field');
                if (element.value.length > 0) {
                    currentField.classList.add('line-form__field--filled')
                } else if (element.value.length <= 0) {
                    currentField.classList.remove('line-form__field--filled');
                }

                if (element.checkValidity() === true) {
                    currentField.classList.add('field-unvalid')
                } else currentField.classList.remove('field-unvalid')
            })
        });
    }
    if (document.querySelector('input[type=text], input[type=number], input[type=tel]') && !document.querySelector('.line-form')) {
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

    // Drag and drop form
    if (document.querySelector('.drop-form')) {
        let dropForm = document.querySelector('.drop-form');
        let dropContainer = document.querySelector('.company__drop-field');

        // ************************ Drag and drop ***************** //

        // Prevent default drag behaviors
        ;
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropContainer.addEventListener(eventName, preventDefaults, false)
            document.body.addEventListener(eventName, preventDefaults, false)
        })

        // Highlight drop area when item is dragged over it
        ;
        ['dragenter', 'dragover'].forEach(eventName => {
            dropContainer.addEventListener(eventName, highlight, false)
        })

        ;
        ['dragleave', 'drop'].forEach(eventName => {
            dropContainer.addEventListener(eventName, unhighlight, false)
        })

        // Handle dropped files
        dropContainer.addEventListener('drop', handleDrop, false)

        function preventDefaults(e) {
            e.preventDefault()
            e.stopPropagation()
        }

        function highlight(e) {
            dropContainer.classList.add('dragged')
        }

        function unhighlight(e) {
            dropContainer.classList.remove('dragged')
        }

        function handleDrop(e) {
            var dt = e.dataTransfer
            var files = dt.files

            handleFiles(files)
        }

        let uploadProgress = []
        let progressBar = document.querySelector('.progress-bar')

        function initializeProgress(numFiles) {
            progressBar.value = 0
            uploadProgress = []

            for (let i = numFiles; i > 0; i--) {
                uploadProgress.push(0)
            }
        }

        function updateProgress(fileNumber, percent) {
            uploadProgress[fileNumber] = percent
            let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
            console.debug('update', fileNumber, percent, total)
            progressBar.style.width = total + '%';
        }

        function handleFiles(files) {
            files = [...files]
            console.log(files);
            initializeProgress(files.length)
            files.forEach(uploadFile)
            files.forEach(fileList)
                // files.forEach(previewFile)
        }

        function fileList(file) {
            let sizeMb = ((file.size / 1024) / 1024).toFixed(2)
            let sizeKb = (file.size / 1024).toFixed(2)
            let sizeOutput;
            let fileType = file.name.split('.')[file.name.split('.').length - 1]
            let docList = document.querySelector('.company__documents-list')
            if (sizeMb < 0.1) sizeOutput = sizeKb + ' kb';
            else sizeOutput = sizeMb + 'mb';
            let template = `
            <div class="company__documents-item mb-3">
                <div class="company__documents-picture">
                    <img class="company__documents-image" src="http://192.168.88.59/wp-content/uploads/site-pictures/mime-image.png" alt="">
                </div>
                <div class="company__documents-descriptins">
                    <div class="company__documents-name text-4">${file.name}</div>
                    <div class="company__documents-type text-3">*.${fileType} ${sizeOutput}</div>
                </div>
                <button class="three-dots__btn" onclick="moreBtn(this)">
                    <i class="three-dots__icon"></i>
                </button>
            </div>`
            docList.insertAdjacentHTML('beforeend', template);
        }

        function previewFile(file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = function() {
                let img = document.createElement('img')
                img.src = reader.result
                document.getElementById('gallery').appendChild(img)
            }
        }

        function uploadFile(file, i) {
            var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
            var xhr = new XMLHttpRequest()
            var formData = new FormData()
            xhr.open('POST', url, true)
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

            // Update progress (can be used to show progress indicator)
            xhr.upload.addEventListener("progress", function(e) {
                updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
            })

            xhr.addEventListener('readystatechange', function(e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    updateProgress(i, 100) // <- Add this
                } else if (xhr.readyState == 4 && xhr.status != 200) {
                    // Error. Inform the user
                }
            })

            formData.append('upload_preset', 'ujpu6gyk')
            formData.append('file', file)
            xhr.send(formData)
        }

        // let count = 0;

        // dropContainer.addEventListener('dragenter', (e) => {
        //     let element = e.target;
        //     dropContainer.classList.add('dragged')
        //     count++
        // })
        // dropContainer.addEventListener('dragleave', (e) => {
        //     count--
        //     let element = e.target;
        //     if (count === 0) {
        //         dropContainer.classList.remove('dragged')
        //     }
        // })
        // dropContainer.addEventListener('drop', (e) => {
        //     // e.preventDefault();
        //     // let element = e.target;
        //     console.log('1')
        // })
    }
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
        //* Обработчик файлов при постановке задачи *************************************************************************************
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
    jQuery(function($) {
        $(document).ready(function() {
            $(function() {
                $('[data-toggle="popover"]').popover()
            })
        });
    });


    // Переключатель видимости пароля 
    if (document.querySelector('.line-form__icon--pass-visible')) {
        let passToggler = document.querySelector('.line-form__icon--pass-visible');
        let svgIcon = passToggler.querySelector('.line-form__icon-svg use')
        let passInput = passToggler.closest('form').querySelectorAll('input[type=password]')

        passToggler.addEventListener('click', function(e) {
            if (svgIcon.href.baseVal == 'http://192.168.88.59/wp-content/uploads/2021/02/sprite.svg#pass-visible') {
                svgIcon.href.baseVal = 'http://192.168.88.59/wp-content/uploads/2021/02/sprite.svg#pass-invisible'
                for (let i = 0; passInput.length > i; i++) {
                    passInput[i].type = 'text'
                }
            } else {
                svgIcon.href.baseVal = 'http://192.168.88.59/wp-content/uploads/2021/02/sprite.svg#pass-visible'
                for (let i = 0; passInput.length > i; i++) {
                    passInput[i].type = 'password'
                }
            }
        })
    }

    // Обработчик формы регистрации
    jQuery(function($) {
        $(document).ready(function() {
            if (document.getElementById('registration-form')) {
                let registrationForm = document.getElementById('registration-form');
                let registrationBtn = document.getElementById('registration-btn');
                registrationBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let formData = new FormData(registrationForm)
                    formData.append('action', 'handler')
                    formData.append('nonce_code', myajax.nonce)
                    formData.append('function', 'registration')
                        // ajaxData.function = 'registration'
                    $.ajax({
                        url: ajaxurl,
                        type: 'POST',
                        contentType: false,
                        processData: false,
                        data: formData,
                        success: function(data) {
                            var array = data.split("[").join("").split("]").slice(0, -1);
                            array.forEach(element => {
                                toast('Ошибка', element, 'validation-error')
                            });
                        }
                    })
                    ajaxDataReset();
                })
            }
        });
    });

    // Маска для номеров телефона
    if (document.querySelector('input[type=tel]')) {
        let phones = document.querySelectorAll('input[type=tel]')
        for (let i = 0; phones.length > i; i++) {
            phones[i].addEventListener('input', function(e) {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                e.target.value = (x[1] ? ' ' + 8 : '') + (x[2] ? ' ' + x[2] : '') + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
            });
        }
    }

    // if (document.querySelector('.line-form__icon--pass-visible')) {
    //     let passToggler = document.querySelector('.line-form__icon--pass-visible');
    //     let svgIcon = passToggler.querySelector('.line-form__icon-svg use')
    //     let passInput = passToggler.closest('.line-form__field').querySelector('.line-form__input')
    //     passToggler.addEventListener('click', function(e) {
    //         if (svgIcon.href.baseVal == './img/dest/sprite.svg#pass-visible') {
    //             svgIcon.href.baseVal = './img/dest/sprite.svg#pass-invisible'
    //             passInput.type = 'text'
    //         } else {
    //             svgIcon.href.baseVal = './img/dest/sprite.svg#pass-visible'
    //             passInput.type = 'password'
    //         }
    //     })
    // }
});