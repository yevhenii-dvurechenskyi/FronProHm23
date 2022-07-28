let todos = [];

export function getTodos() {
    return todos;
};

export function addTodo(todo) {
    todos.push(todo);
};

export function changeIsCompited(id) {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return {...todo, isCompited: !todo.isCompited}
        }

        return todo;
    });
};

export function deleteTodo(id) {
    const deleteTodo = todos.find((todo) => todo.id === id);

    if (!deleteTodo) {
        return { status: false };
    }

    todos = todos.filter((todo) => todo.id !== id);

    return { status: true, deletedTodo: deleteTodo };
};