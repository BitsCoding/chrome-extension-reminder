$('#add__task').click(function() {
    var date = new Date($('#date').val());
    var time = $('#time').val();
    var about = $('#about').val();
    if (!(date && time && about)) {
        return;
    }
    var task = `<div class="task">
                    <div class="flex space-between">
                        <div class="task_detail">
                            <h4>${date.toDateString()}</h4>
                            <p class="time">${time}</p>
                            <p class="about">${about}</p>
                        </div>
                        <div onclick="destroy(this)" class="done flex flex-center align-center">
                            <i class="fas fa-check"></i>
                        </div>
                    </div>
                </div>`;
    $('#task__list').append(task);

    $('#date').val('');
    $('#time').val('');
    $('#about').val('');

    return false;
});

function destroy(element) {
    $(element).parent().remove();
}