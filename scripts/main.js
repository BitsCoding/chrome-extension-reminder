$('#add__task').click(function() {
    console.log('hello');
    var date = new Date($('#date').val());
    var time = $('#time').val();
    var about = $('#about').val();
    if (!(date && time && about)) {
        return;
    }
    var task = `<div class="task">
        <div class="flex space-between align-center">
            <div>
                <h4>${date.toDateString()}</h4>
                <p>${time}</p>
            </div>
            <div>
                <h5>completed icon</h5>
            </div>
        </div>
        <p>${about}</p>
    </div>`;
    $('#task__list').append(task);

    return false;
});