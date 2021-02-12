var dropZone = $('.upload-container');

dropZone.on('drag dragstart dragend dragover dragenter dragleave drop', function() {
    return false;
});

dropZone.on('dragover dragenter', function(e) {
    $(this).addClass('dragover');
});

dropZone.on('dragleave', function(e) {
    let dx = e.pageX - dropZone.offset().left;
    let dy = e.pageY - dropZone.offset().top;
    if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
        $(this).removeClass('dragover');
    }
});

dropZone.on('drop', function(e) {
    let files = e.originalEvent.dataTransfer.files;
    sendFiles(files);
});

$('.file-input').change(function(e) {
    var div_file = $(this).parents('form');
    let files = this.files;
    div_file.addClass('dragover');

    sendFiles(files);
});


function sendFiles(files) {
    event.stopPropagation(); // Остановка происходящего
    event.preventDefault(); // Полная остановка происходящего
    if (typeof files == 'undefined') return;
    var data_file = new FormData();
    var ajax_respond = $(".upload-container.dragover").find('.ajax-respond');
    var type_input = $(".upload-container.dragover").find('input[name="type_file"]');

    $.each(files, function(key, value) {
        data_file.append(key, value);
    });
    data_file.append("id", "company_formdocument");
    data_file.append("type_input", type_input.val());


    $.ajax({
        url: url,
        type: "post",
        cache: false,
        dataType: 'json',
        data: data_file,
        contentType: false,
        processData: false,
        success: function(respond, textStatus, jqXHR) {

            if (respond.error === false) {
                $(".upload-container.dragover").addClass('dragover-ok');
                $(".upload-container.dragover").removeClass('dragover');
                ajax_respond.html("Файл загружен.<br>Ожидайте проверку модерацией.");
            } else {
                console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('ОШИБКИ AJAX запроса: ' + textStatus);
        }
    });
}