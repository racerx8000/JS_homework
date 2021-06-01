function allowDrop(allowDropEvent) {
  allowDropEvent.preventDefault();
}

function drag(dragEvent) {
  dragEvent.dataTransfer.setData("html", dragEvent.target.id  );
}

function drop(dropEvent) {
  dropEvent.preventDefault();
  const data = dropEvent.dataTransfer.getData("html");
  dropEvent.target.appendChild(document.getElementById(data));
}
