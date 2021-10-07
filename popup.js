(() => {
	let tasks_list = document.getElementById('tasks-list'),
		add_task_menu = document.getElementById('add-task-menu'),
		main_title = document.getElementById('main-title'),
		add_btn = document.getElementById('add-btn'),
		back_btn = document.getElementById('back-btn'),
		save_btn = document.getElementById('save-btn'),
		title_input = document.getElementById('title'),
		detail_input = document.getElementById('detail'),
		date_input = document.getElementById('date'),
		time_input = document.getElementById('time'),
		repeat_input = document.getElementById('repeat');

	function clearForm() {
		title_input.innerText = '';
		detail_input.innerText = '';
		date_input.value = '';
		time_input.value = '';
		repeat_input.value = '';
	}

	function timeLeft(date) {
		let time_left = '';
		let types = [ 'year', 'month', 'week', 'day', 'hour', 'minute', 'second' ];
		for (let i = 0; i < types.length; i++) {
			let diff = date.diff(moment(), types[i]);
			if (diff == 1) {
				time_left = diff + ' ' + types[i];
				break;
			} else if (diff) {
				time_left = diff + ' ' + types[i] + 's';
				break;
			}
		}
		return time_left;
	}

	function removeTask(target, task) {
		chrome.storage.sync.get('reminder_tasks', ({ reminder_tasks }) => {
			reminder_tasks = reminder_tasks.filter(({ id }) => id != task.id);
			chrome.storage.sync.set({ reminder_tasks });
		});
		target.parentElement.remove();
	}

	function editTask(target, task) {
		openForm();

		title_input.innerText = task.title;
		detail_input.innerText = task.detail;
		date_input.value = task.date;
		time_input.value = task.time;
		repeat_input.value = task.repeat;
	}

	function insertTaskElement(task) {
		const taskElement = document.createElement('div');
		taskElement.classList.add('task');

		let datetime = moment(task.date + ' ' + task.time);

		const task_text = document.createElement('div');
		task_text.classList.add('task__content');
		task_text.innerHTML = `
		<div class="task__title">${task.title}</div>
		<div class="task__time">${datetime.format('h:mm a').toUpperCase()}</div>
		<div class="task__desc text-muted">${task.detail}</div>
		<div class="task__time-left text-muted">${timeLeft(datetime)}</div>
		`;

		const delete_btn = document.createElement('button');
		delete_btn.classList.add('task__action');
		delete_btn.classList.add('btn');
		delete_btn.classList.add('btn--red');
		delete_btn.innerHTML = '<i class="icon icon--delete"></i>';

		taskElement.appendChild(task_text);
		taskElement.appendChild(delete_btn);
		tasks_list.appendChild(taskElement);

		delete_btn.addEventListener('click', () => {
			removeTask(delete_btn, task);
		});
		task_text.addEventListener('click', () => {
			editTask(task_text, task);
		});
	}

	chrome.storage.sync.get('reminder_tasks', ({ reminder_tasks }) => {
		if (reminder_tasks) {
			reminder_tasks.forEach(insertTaskElement);
		}
	});

	function back() {
		tasks_list.classList.remove('slide-out');
		tasks_list.classList.add('slide-back-in');

		add_task_menu.classList.remove('slide-in');
		add_task_menu.classList.add('slide-back-out');

		main_title.innerText = 'Reminders';

		add_btn.classList.remove('hidden');
		back_btn.classList.add('hidden');
		save_btn.classList.add('hidden');

		clearForm();
	}

	function openForm() {
		tasks_list.classList.remove('slide-back-in');
		tasks_list.classList.add('slide-out');

		add_task_menu.classList.remove('slide-back-out');
		add_task_menu.classList.add('slide-in');

		main_title.innerText = 'Add Task';

		add_btn.classList.add('hidden');
		back_btn.classList.remove('hidden');
		save_btn.classList.remove('hidden');
	}

	function saveTask() {
		const task = {
			id: moment().valueOf(),
			title: title_input.innerText,
			detail: detail_input.innerText,
			date: date_input.value,
			time: time_input.value,
			repeat: repeat_input.value
		};
		chrome.storage.sync.get('reminder_tasks', ({ reminder_tasks }) => {
			if (reminder_tasks) reminder_tasks = [ ...reminder_tasks, task ];
			else reminder_tasks = [ task ];
			chrome.storage.sync.set({ reminder_tasks });
			insertTaskElement(task);
		});

		clearForm();

		back();
	}

	add_btn.addEventListener('click', openForm);

	back_btn.addEventListener('click', back);

	save_btn.addEventListener('click', saveTask);
})();
