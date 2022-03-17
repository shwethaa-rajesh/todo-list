export const checkIfItemIdMatchesIdToSelect = (item, idToSelect) =>
  item.key === parseInt(idToSelect);

export const getItemBasedOnId = (itemList, idToSelect) =>
  itemList?.find((item) => checkIfItemIdMatchesIdToSelect(item, idToSelect));

export const replacePathParamsInRoute = (route, pathParamToValueMapping) =>
  Object.keys(pathParamToValueMapping).reduce(
    (derivedRoute, pathParamToReplace) =>
      derivedRoute.replace(
        `:${pathParamToReplace}`,
        pathParamToValueMapping[pathParamToReplace]
      ),
    route
  );