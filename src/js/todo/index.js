const FIREBASE_DB_TODO_REF = firebase.database().ref('todo');

class Todo {
  constructor(options) {
    this.title = options.title || '';
    this.done = options.done || false;
    this.id = options.id
  }
}

function addTodo(todo) {
  let set = FIREBASE_DB_TODO_REF.push({
    title: todo.title,
    done: todo.done
  });

  return set.then(() => {
    return Promise.resolve(todo);
  });
}

function fetchTodos() {
  let get = FIREBASE_DB_TODO_REF.once('value');

  return get.then(snapshot => {
    let data = [];
    snapshot.forEach(childSnapshot => {
      let childData = childSnapshot.val();
      childData.id = childSnapshot.key;

      data.push(childData);
    });

    return Promise.resolve(data);
  });
}

export default Todo;
export { addTodo, fetchTodos };
