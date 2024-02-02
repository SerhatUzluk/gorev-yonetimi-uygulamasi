import { Add, Delete, Change, Clear } from "./actionType";

export const InitialState= {
    tasks: [],
    personalTasks: {} 
}

export const taskReducer = (state, action) => {
    switch(action.type){
        case Add:
            const personId = action.payload.personId;
            const newTask = { id: Date.now(), text: action.payload.text, completed: false };

            // Eğer personId ile ilgili bir personalTasks yoksa, yeni bir obje oluştur
            const updatedPersonalTasks = state.personalTasks[personId] || [];
            
            return {
                ...state,
                personalTasks: {
                    ...state.personalTasks,
                    [personId]: [...updatedPersonalTasks, newTask],
                },
            };
        case Delete:
            // Silme işlemi sırasında belirli bir personId'ye ait görevi filtrele
            const personIdToDelete = action.payload.personId;
            const taskIdToDelete = action.payload.taskId;

            if (!state.personalTasks[personIdToDelete]) {
                return state; // Eğer personId'ye ait görev yoksa, state'i değiştirmeden geri dön
            }

            const updatedTasksAfterDelete = state.personalTasks[personIdToDelete].filter(
                task => task.id !== taskIdToDelete
            );

            return {
                ...state,
                personalTasks: {
                    ...state.personalTasks,
                    [personIdToDelete]: updatedTasksAfterDelete,
                },
            };
        case Change:
            // Değiştirme işlemi sırasında belirli bir personId'ye ait görevin durumunu güncelle
            const personIdToChange = action.payload.personId;
            const taskIdToChange = action.payload.taskId;

            if (!state.personalTasks[personIdToChange]) {
                return state; // Eğer personId'ye ait görev yoksa, state'i değiştirmeden geri dön
            }

            const updatedTaskStatus = state.personalTasks[personIdToChange].map(
                task =>
                    task.id === taskIdToChange
                        ? { ...task, completed: !task.completed }
                        : task
            );

            return {
                ...state,
                personalTasks: {
                    ...state.personalTasks,
                    [personIdToChange]: updatedTaskStatus,
                },
            };
        default:
            return state;            
    }
};