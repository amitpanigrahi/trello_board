export const h__handleDragOver = (e) => {
  e.preventDefault();
};
export const h__handleDragStart = (e, parentId) => {
  e.dataTransfer.setData("dragEventData", JSON.stringify({id: e.target.id, parentId: parentId}));
};
