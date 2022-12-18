/*document.body.innerHTML = `
	<form class="create-user-form">
       <label>
           Имя
           <input type="text" name="userName" placeholder="Введите ваше имя" />
       </label>
       <label>
           Пароль
           <input type="password" name="password" placeholder="Придумайте Пароль" />
       </label>
       <button type="submit">
           Подтвердить
       </button>
   </form>
`;*/


/*const createInputBlock = (label, typeInput, nameInput, placeholder)=> {

	const InputWithLabel = document.createElement('label');
	InputWithLabel.innerText = label;

	const inputElement = document.createElement('input');
	inputElement.type = typeInput;
	inputElement.name = nameInput;
	inputElement.placeholder = placeholder;

	InputWithLabel.append(inputElement);

	return InputWithLabel;
}

const formContainer = document.createElement('form');
formContainer.className = 'create-user-form';

let inputCreateName = createInputBlock('Имя', 'text', 'Тестовый', 'Введите тестовое имя');
let inputCreatePass = createInputBlock('Пароль', 'password', 'password', 'Придумайте Пароль');

const confirmButton = document.createElement('button');
confirmButton.type = 'submit';
confirmButton.innerText = 'Подтвердить';

formContainer.append(inputCreateName, inputCreatePass, confirmButton);
document.body.prepend(formContainer);*/


const tasks = [
	{
		id: '1138465078061',
		completed: false,
		text: 'Посмотреть новый урок по JavaScript',
	},
	{
		id: '1138465078062',
		completed: false,
		text: 'Выполнить тест после урока',
	},
	{
		id: '1138465078063',
		completed: false,
		text: 'Выполнить ДЗ после урока',
	},
]



let createTaskBlockForm = document.querySelector('.create-task-block');
let createNewTaskButton = document.querySelector('.create-task-block__button');

let createTaskList = document.querySelector('.tasks-list');



let addTaskToList = (id, status, text)=> {
	let TaskItem = document.createElement('div');
	TaskItem.className = 'task-item';
	TaskItem.dataset.taskId = id;

	let TaskContainer = document.createElement('div');
	TaskContainer.className = 'task-item__main-container';
	TaskItem.prepend(TaskContainer);

	let TaskContent = document.createElement('div');
	TaskContent.className = 'task-item__main-content';
	TaskContainer.prepend(TaskContent);

	let TaskForm = document.createElement('form');
	TaskForm.classList = 'checkbox-form';
	TaskContent.prepend(TaskForm);

	let TaskFormInput = document.createElement('input');
	TaskFormInput.classList = 'checkbox-form__checkbox';
	TaskFormInput.type = 'checkbox';
	TaskFormInput.id = `task-${id}`;
	TaskForm.prepend(TaskFormInput);

	let TaskFormInputLabel = document.createElement('label');
	TaskFormInputLabel.htmlFor = `task-${id}`
	TaskForm.append(TaskFormInputLabel);

	let TaskContentSpan = document.createElement('span');
	TaskContentSpan.className = 'task-item__text';
	TaskContentSpan.textContent = `${text}`;
	TaskForm.append(TaskContentSpan);

	let TaskButtonDelete = document.createElement('button');
	TaskButtonDelete.className = 'task-item__delete-button default-button delete-button';
	TaskButtonDelete.dataset.deleteTaskId = `${id}`;
	TaskButtonDelete.textContent = 'Удалить';
	TaskContainer.append(TaskButtonDelete);

	return TaskItem;
}

let errorMessage = (errorMessage)=> {
	const errorBlock = document.createElement('span');
	errorBlock.innerText = errorMessage;
	errorBlock.className = 'error-message-block';
	return errorBlock;
}


createTaskBlockForm.addEventListener('submit', (event)=> {
	event.preventDefault(event);
	const { target } = event;
	const taskNameInput = target.taskName;
	const inputValue = taskNameInput.value;

	const errorMessageBlockFromDOM = createTaskBlockForm.querySelector('.error-message-block');

	const validateInput = (event.target.taskName.value || '').trim();
	const isTaskExist = tasks.some((task) => task.text === validateInput);

	if(!validateInput) {
		const errorBlock = errorMessage('Название задачи не должно быть пустым');
		createTaskBlockForm.append(errorBlock);
	} else if (isTaskExist) {
		const errorBlock = errorMessage('Задача с таким названием уже существует.');
		createTaskBlockForm.append(errorBlock);
	} else {
		tasks.push({id: Date.now(), completed: false, text: `${inputValue}`});
		let newZad = addTaskToList(Date.now(), false, inputValue);
		return createTaskList.append(newZad);
	}
	if (errorMessageBlockFromDOM) {
		errorMessageBlockFromDOM.remove();
	}
	 
});

tasks.forEach((element) => {
	const addTaskItem = addTaskToList(element.id, element.completed, element.text )
	return createTaskList.append(addTaskItem);
})