const fetchTasks = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);

    const taskData = await response.json();
    return taskData;
}

export {fetchTasks};