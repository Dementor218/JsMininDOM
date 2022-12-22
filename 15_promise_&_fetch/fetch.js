// fetch

// fetch(url);

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

const createTodoElement = (text) => {
	const todoElement = document.createElement('li');
	const todoElementAnchor = document.createElement('a');
	todoElementAnchor.href = '#';
	todoElementAnchor.textContent = text;
	todoElement.append(todoElementAnchor);

	return todoElement;
}

const toggleLoader = () => {
	const loaderHTML = document.querySelector('#loader');

	const isHidden = loaderHTML.hasAttribute('hidden');
	if (isHidden) {
		loaderHTML.removeAttribute('hidden');
	} else {
		loaderHTML.setAttribute('hidden', '');
	}
}

const dataContainer = document.querySelector('#data-container');

const getAllTodos = () => {
	toggleLoader();
	const result = fetch(TODOS_URL, {
		method: 'GET',
	});

	console.log(result);

	result
		.then((response) => {
			if(!response.ok) throw new Error('Ошибка запроса')
			return response.json();
		})
		.then((todos) => {
			console.log(todos);
			todos.forEach((todo) => {
				const todoHTML = createTodoElement(todo.title);
				dataContainer.append(todoHTML);
			});
		})
		.catch((error) => {
			console.log(error);
		})
		.finally(()=> {
			toggleLoader();
		})
}

getAllTodos(); 
