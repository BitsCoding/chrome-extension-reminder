(function() {
    chrome.storage.sync.get('task__list', function(task__list) {
        if (task__list) {
            task__list.forEach(task_object => {
                add_task(task_object);
            });
        }
    });
})();

function add_task(task_object) {
    var task = `<div class="task">
                    <div class="flex space-between">
                        <div class="task_detail">
                            <h4>${task_object.date.toDateString()}</h4>
                            <p class="time">${task_object.time}</p>
                            <p class="about">${task_object.about}</p>
                        </div>
                        <div onclick="destroy(this)" class="done flex flex-center align-center">
                            <i class="fas fa-check"></i>
                        </div>
                    </div>
                </div>`;
    $('#task__list').append(task);
}

$('#add__task').click(function() {
    var date = new Date($('#date').val());
    var time = $('#time').val();
    var about = $('#about').val();
    if (!(date && time && about)) {
        return;
    }
    var task_object = { 'date': date, 'time': time, 'about': about };
    add_task(task_object);

    var task__list = chrome.storage.sync.get("task__list");
    if (task__list == null) {
        task__list = new Array();
    }
    task__list.push(task_object);
    chrome.storage.sync.set("task__list", task__list);
    console.log(task__list);

    $('#date').val('');
    $('#time').val('');
    $('#about').val('');

});

function destroy(element) {
    $(element).parent().remove();
}