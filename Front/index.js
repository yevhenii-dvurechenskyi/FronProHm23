const BASE_API = 'http://localhost:8080';

let todos = [];

const removeTodo = (id) => {
    fetch(`${BASE_API}/todos/${id}`, {
        method: 'DELETE',
    })
        .then(() => getTodos())
        .catch(() => alert('Невозможно удалить((('));
};

const renderTodos = () => {
    const content = document.querySelector('.content');
    content.innerHTML = '';

    todos.forEach((todo) => {
        const div = document.createElement('div');

        const h3 = document.createElement('h3');
        h3.innerText = todo.title;

        const checkbox = document.createElement('input');
        checkbox.addEventListener('click', () => changeIsComplited(todo.id));
        checkbox.type = 'checkbox';
        checkbox.checked = todo.isCompited;

        const button = document.createElement('button');
        button.addEventListener('click', () => removeTodo(todo.id));
        button.innerText = 'delete';

        div.append(h3, checkbox, button);

        content.append(div);
    });
};

const getTodos = async () => {
    try {
        const response = await fetch(`${BASE_API}/todos`)
        const data = await response.json();   
        
        todos = data;
        renderTodos();
    } catch (e) {
        alert('Незоможно загрузить тудушки!')
    }
}

getTodos();


const changeIsComplited = (id) => {
    fetch(`${BASE_API}/todos`, {
        method: 'PUT',
        body: JSON.stringify({id}),
    })
        .then(() => getTodos())
        .catch(() => {
            todos = todos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, isCompited: false}
                }
        
                return todo;
            });
            
            renderTodos();
            alert('Невозможно обновить(((')
        });
}


const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = e.target.querySelector('#title').value;

    if (title === '') return;

    fetch(`${BASE_API}/todos`, {
        method: 'POST',
        body: JSON.stringify({title}),
    })
        .then(() => getTodos())
        .catch(() => alert('Невозможно создать((('));;

    e.target.reset();
})