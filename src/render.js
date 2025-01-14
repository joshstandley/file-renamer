const dragArea = document.getElementById('drag-area');
const browseFilesButton = document.getElementById('browse-files');
const fileList = document.getElementById('file-list');

let files = [];

// Handle drag over event
dragArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  dragArea.classList.add('dragging');
});

// Handle drag leave event
dragArea.addEventListener('dragleave', () => {
  dragArea.classList.remove('dragging');
});

// Handle drop event
dragArea.addEventListener('drop', (event) => {
  event.preventDefault();
  dragArea.classList.remove('dragging');

  const droppedFiles = Array.from(event.dataTransfer.files).map(file => ({
    name: file.name,
    path: file.path,
  }));

  files = [...files, ...droppedFiles];
  updateFileList();
});

// Handle browse files button
browseFilesButton.addEventListener('click', async () => {
  const { filePaths } = await window.electronAPI.openFileDialog();
  if (filePaths) {
    const selectedFiles = filePaths.map(filePath => ({
      name: filePath.split('/').pop(),
      path: filePath,
    }));

    files = [...files, ...selectedFiles];
    updateFileList();
  }
});

// Update file list in the UI
function updateFileList() {
  fileList.innerHTML = files.map(file => `<p>${file.name}</p>`).join('');
}
