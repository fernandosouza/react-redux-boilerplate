export const LOAD_TODOS = 'LOAD_TODOS';
export const NEW_TODO = 'NEW_TODO';

export function addNewTodo(todo) {
  let set = firebase.database().ref('todo').push({
    title: todo.title,
    done: todo.done
  });

  return {
    type: NEW_TODO,
    payload: set.then(() => {
      return Promise.resolve(todo);
    })
  };
}

export function loadTodos() {
  let get = firebase.database().ref('todo').once('value');

  let payload = get.then(snapshot => {
    let data = [];
    snapshot.forEach(childSnapshot => {
      let childData = childSnapshot.val();
      childData.id = childSnapshot.key;

      data.push(childData);
    });

    return Promise.resolve(data);
  });

  return {
    type: LOAD_TODOS,
    payload: payload
  }
}
