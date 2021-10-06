(() => {
	let tasks_list = document.getElementById('tasks-list'),
		add_task_menu = document.getElementById('add-task-menu'),
		main_title = document.getElementById('main-title'),
		add_btn = document.getElementById('add-btn'),
		back_btn = document.getElementById('back-btn'),
		save_btn = document.getElementById('save-btn');

	function insertTaskElement(task) {
		const taskElement = document.createElement('div');
		taskElement.classList.add('task');
		taskElement.innerText = task.title;
		tasks_list.appendChild(taskElement);
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
	}

	add_btn.addEventListener('click', () => {
		tasks_list.classList.remove('slide-back-in');
		tasks_list.classList.add('slide-out');

		add_task_menu.classList.remove('slide-back-out');
		add_task_menu.classList.add('slide-in');

		main_title.innerText = 'Add Task';

		add_btn.classList.add('hidden');
		back_btn.classList.remove('hidden');
		save_btn.classList.remove('hidden');
	});

	back_btn.addEventListener('click', back);

	save_btn.addEventListener('click', () => {
		const title_input = document.getElementById('title');
		const detail_input = document.getElementById('detail');
		const date_input = document.getElementById('date');
		const time_input = document.getElementById('time');
		const repeat_input = document.getElementById('repeat');

		const task = {
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

		title_input.innerText = '';
		detail_input.innerText = '';
		date_input.value = '';
		time_input.value = '';
		repeat_input.value = '';

		back();
	});
})();
