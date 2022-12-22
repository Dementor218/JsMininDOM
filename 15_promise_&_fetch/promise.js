//setTimeout(()=> {
//	console.log('setTimeout');
//}, 3000);

//console.log(developer);

//setInterval(() => {
//	console.log('setInterval');
//}, 1000);

// pending
// fulfilled
// rejected
const developer = {
	name: 'Maxim',
	isJSDev: true,
};

const promise = new Promise((resolve, reject)=> {
	if (developer.isJSDev) {
		setTimeout(() => {
			resolve(`${developer.name} является JavaScript-разработчиком`);
		}, 3000);
	} else {
		reject(`${developer.name} НЕ является JavaScript-разработчиком`);
	}
});

console.log(promise);


promise
	.then((successMessage)=> {
		console.log('successMessage', successMessage);
	})
	.catch((error)=> {
		console.log('error', error); 
	})
	.finally(()=> {
		console.log('finally');
	})