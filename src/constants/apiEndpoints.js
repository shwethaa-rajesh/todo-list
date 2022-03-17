export const BACKEND_URL = 'http://localhost:3000';
export const getTasksInList = (listId) => ({ method: 'get', url: `${BACKEND_URL}/${listId}` });
export const getLists = () => ({ method: 'get', url: `${BACKEND_URL}/` });
export const addList= (listData)=> ({ method: 'post', url: `${BACKEND_URL}/` ,data:listData});
export const addTask = (listId,taskData) => ({ method: 'post', url: `${BACKEND_URL}/${listId}`,data:taskData});

export const updateTask = (taskId,taskData) => ({ method: 'put', url: `${BACKEND_URL}/${taskId}`,data:taskData});


// export const BACKEND_URL = 'https://tacforce.azurewebsites.net';

// export const getMatchEndpoint = (matchId) => ({ method: 'get', url: `${BACKEND_URL}/matches/${matchId}` });
// export const agentsEndpoint = { method: 'get', url: `${BACKEND_URL}/agents` };