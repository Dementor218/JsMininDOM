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
		completed: true,
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
});


let modalWindow = (index, name, status)=> {

	// Обертка модального окна
	let modalWindowOverlay = document.createElement('div');
	modalWindowOverlay.className = 'modal-overlay';

	let modalWindowDelete = document.createElement('div');
	modalWindowDelete.className = 'delete-modal';
	modalWindowOverlay.append(modalWindowDelete);

	let modalWindowTitle = document.createElement('h3');
	modalWindowTitle.className = 'delete-modal__question';

	if(status === true) {
		modalWindowTitle.textContent = `Вы действительно хотите удалить задачу "${name}", которая была Выполнена ?`;	
	} else {
		modalWindowTitle.textContent = `Вы действительно хотите удалить задачу "${name}", которая была НЕ выполнена ?`;
	}
	modalWindowDelete.prepend(modalWindowTitle);

	let modalWindowButtons = document.createElement('div');
	modalWindowButtons.className = 'delete-modal__buttons';
	modalWindowDelete.append(modalWindowButtons);

	let modalWindowButtonCancel = document.createElement('button');
	modalWindowButtonCancel.className = 'delete-modal__button delete-modal__cancel-button';
	modalWindowButtonCancel.textContent = 'Отмена';
	modalWindowButtons.prepend(modalWindowButtonCancel);

	let modalWindowButtonConfirm = document.createElement('button');
	modalWindowButtonConfirm.className = 'delete-modal__button delete-modal__confirm-button';
	modalWindowButtonConfirm.textContent = 'Удалить';
	modalWindowButtons.append(modalWindowButtonConfirm);

	return modalWindowOverlay;

}



createTaskList.addEventListener('click', (event)=> {
	const buttonDelete = event.target.closest('.task-item__delete-button');
	if(buttonDelete) {
		const deleteID = event.target.getAttribute("data-delete-task-id");
		const deleteTask = tasks.findIndex(element => element.id === deleteID);
		
		console.log(tasks);
		if(deleteTask !== -1) {

			console.log(tasks[deleteTask]);
			createTaskList.prepend(modalWindow(deleteTask, tasks[deleteTask].text, tasks[deleteTask].completed));

			let ButtonModalCancel = document.querySelector('.delete-modal__cancel-button');
			let ButtonModalConfirm = document.querySelector('.delete-modal__confirm-button');
			if(ButtonModalCancel) {
				ButtonModalCancel.addEventListener('click', (event)=> {
					let modalWindowForm = document.querySelector('.modal-overlay');
					modalWindowForm.remove();
				});
			}
			if(ButtonModalConfirm) {
				ButtonModalConfirm.addEventListener('click', (event)=> {
					tasks.splice(deleteTask, 1);
					
					let elementDelete = document.querySelector(`.task-item[data-task-id="${deleteID}"]`);
					elementDelete.remove();

					let modalWindowForm = document.querySelector('.modal-overlay');
					modalWindowForm.remove();
				});
			}

		} else {
			alert('Женя! Всё **йня, давай заново!');
		}
	}
});

let isDark = false;

const changeTheme = ({
    bodyBackground,
    taskItemTextColor,
    buttonBorder,
}) => {
    document.body.style.background = bodyBackground;
    document.querySelectorAll('.task-item').forEach((taskItem) => {
        taskItem.style.color = taskItemTextColor;
    });
    document.querySelectorAll('button').forEach((button) => {
        button.style.border = buttonBorder;
    });
}

window.addEventListener('keydown', (event) => {
    const { code } = event;
    if (code === 'Tab') {
        event.preventDefault();
        isDark = !isDark;
        if (isDark) {
            changeTheme({
                bodyBackground: '#24292E',
                taskItemTextColor: '#ffffff',
                buttonBorder: '1px solid #ffffff',
            });
        } else {
            changeTheme({
                bodyBackground: 'initial',
                taskItemTextColor: 'initial',
                buttonBorder: 'none',
            });
        }
    }
});




