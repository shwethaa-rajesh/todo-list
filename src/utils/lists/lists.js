// import { checkIfItemIdMatchesIdToSelect } from "../common/common";

// export const getListDataWithUpdatedTask = (
//   listData,
//   listId,
//   taskId,
//   updatedTask
// ) =>
//   listData.map((list) =>
//     checkIfItemIdMatchesIdToSelect(list, listId)
//       ? {
//           ...list,
//           tasks: list.tasks.map((task) =>
//             checkIfItemIdMatchesIdToSelect(task, taskId) ? updatedTask : task
//           ),
//         }
//       : list
//   );

// export const getListDataWithNewList = (listData, newListName) => [
//   ...listData,
//   {
//     id: Math.floor(Math.random() * 100), 
//     name: newListName,
//     tasks: [],
//   },
// ];

import { checkIfItemIdMatchesIdToSelect } from "../common/common";

export const getListDataWithUpdatedTask = (
  listData,
  listId,
  taskId,
  updatedTask
) =>
  listData.map((list) =>
    checkIfItemIdMatchesIdToSelect(list, listId)
      ? {
          ...list,
          tasks: list.tasks.map((task) =>
            checkIfItemIdMatchesIdToSelect(task, taskId) ? updatedTask : task
          ),
        }
      : list
  );

export const getListDataWithNewList = (listData, newListName) => [
  ...listData,
  {
    key: Math.floor(Math.random() * 100), 
    name: newListName,
    tasks: [],
  },
];