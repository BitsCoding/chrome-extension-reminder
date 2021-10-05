(() => {
	let tasks_list = document.getElementById('tasks-list'),
		add_task_menu = document.getElementById('add-task-menu'),
		main_title = document.getElementById('main-title'),
		add_btn = document.getElementById('add-btn'),
		back_btn = document.getElementById('back-btn'),
		save_btn = document.getElementById('save-btn');

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

	back_btn.addEventListener('click', () => {
		tasks_list.classList.remove('slide-out');
		tasks_list.classList.add('slide-back-in');

		add_task_menu.classList.remove('slide-in');
		add_task_menu.classList.add('slide-back-out');

		main_title.innerText = 'Reminders';

		add_btn.classList.remove('hidden');
		back_btn.classList.add('hidden');
		save_btn.classList.add('hidden');
	});
})();
