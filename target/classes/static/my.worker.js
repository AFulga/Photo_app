onmessage = e => {
  const file = e.data;
 
  getUrl(file);
};
function getUrl(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    postMessage({ data: e.target.result, name: file.name } );
  };
  reader.readAsDataURL(file);
  
}