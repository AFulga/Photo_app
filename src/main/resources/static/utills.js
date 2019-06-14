const pma = document.querySelector("#pma");
const largeImage = document.querySelector(".modal-body img");
function addZoomOption(imgContainer) {
    imgContainer.querySelector('img').addEventListener("click", function(e) { 
        showLargeImage(this, largeImage);
    });
}

function fetchAlbumImages(albumId){
    return fetch(location.origin + `/photo/${albumId}`)
      .then(function(response) {
        return response.json();
      });;
}

function fetchUserAlbums(userId){
    return fetch(location.origin + `/album/${userId}`)
      .then(function(response) {
        return response.json();
      });
}


function renderDbImages(albumId) {
    fetchAlbumImages(albumId)
    .then( response => {
        response.map(imgObj => {
          const imgContainer = addThumbnail(loaderImg(), largeImage);
          

            imgContainer.innerHTML = pmaTemplates.thumbnail( "data:image/jeg;base64," + imgObj.photoData, imgObj.name, formatDate ( new Date(imgObj.uploadDate) ), imgObj.id );
            
            addZoomOption(imgContainer);
            deletePhoto(imgContainer);
          //}
          
        });
      });
}

function xhrPromise(method, pathname, obj) {
    return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, location.origin + '/' + pathname);
        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                resolve(this);
            }
        }
        xhr.addEventListener('error', (e) => reject(e));
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send( obj ? JSON.stringify(obj) : obj );
    });
    
}

//add images as thumbnails
function addThumbnail(url, largeImage) {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    imgContainer.innerHTML = `<img src="${url}" />`;
  
    thumbnails.appendChild(imgContainer);
  
    //return imgContainer.querySelector("img");
    return imgContainer;
  }
  

function deleteDataFromDB(pathname, obj) {
    return xhrPromise("DELETE", pathname, obj);
}

function addDataToDB(pathname, obj) {
  return xhrPromise("POST", pathname, obj);
}

function getDataFromDB(pathname, obj) {
  return xhrPromise("GET", pathname, obj);
}


function formatDate ( date ) {
    const options = {  year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('ro-RO', options)
  }

  // change the src for enlarged image with the one of the clicked thumbnail
function showLargeImage(element, largeImage) {
	largeImage.src = element.src;
}


function loaderImg() {
	return "https://www.darkmatter.ae/media/1525/wait.gif";
}

function deletePhoto(imgContainer) {
    const deleteBtn = imgContainer.querySelector('.btn-warning');
    deleteBtn.addEventListener("click", function(e) { 
        const image = this.closest(".img-container");
        deleteDataFromDB(`/photo/${this.dataset.imageId}`, null)
        .then(function() { 
            image.parentNode.removeChild(image);
        } )
    });
}

// create worker
function createWorker() {
  const worker = new Worker('my.worker.js');
  worker.onerror = err => console.log(err);
  return worker;
}
const worker = createWorker();

function renderImagesPage(name, albumId) {
	pma.innerHTML = pmaTemplates.addImages(name);
	const input = document.querySelector("input");

	input.addEventListener("change", e => {
    const arr = Array.from(e.target.files);
    runWorker(arr,  worker, largeImage, albumId);
    //initWorker(arr, largeImage, albumId);
	});
}


// initiailze worker and run it
function initWorker(arr, worker, largeImage, albumId) {
    runWorker(arr,  worker, largeImage, albumId);
  }

// run worker function
function runWorker(arr, worker, largeImage, albumId) {
  
    worker.onmessage = e => {
        const obj = {"album" : {"id" : albumId}, "name" : e.data.name.split('.')[0], "photoData" : e.data.data.split(',')[1]};
        addDataToDB('photo', obj)
        .then(() => {
          fetchAlbumImages(albumId)
          .then( response => {
            const imgObj = response[response.length - 1];
            const imgContainer = addThumbnail(loaderImg(), largeImage);
            imgContainer.innerHTML = pmaTemplates.thumbnail( "data:image/jeg;base64," + imgObj.photoData, imgObj.name, formatDate ( new Date(imgObj.uploadDate) ), imgObj.id );
            //add zoom option on thumbnail
            addZoomOption(imgContainer);
            deletePhoto(imgContainer);
            // run the same worker for all images, when job is finished
            // this way the browser will not crush due too many workers created
            if (arr.length > 0) runWorker(arr, worker, largeImage, albumId);
    
          });
        });
      
    };
    worker.onmessageerror = (event) => {
      console.error(`Error receiving message from worker: ${event}`);
  };
    worker.postMessage(arr.shift());
  }


function addEventAlbumShowBtn(renderPagePhotos) {
  document.querySelectorAll('.show-btn').forEach( (element) => {
    element.addEventListener('click', function(e) { 
      const name = e.target.dataset.albumName;
      const id = e.target.dataset.albumId;
      renderPagePhotos(name, id); 
    });
  });
}

function addEventToBackButton(renderPageAlbums, userId) {
  const backbtn = document.getElementById('backToAlbums');
  backbtn.addEventListener('click', () => renderPageAlbums(userId));
}

function addEventAlbumdeletBtn() {
  document.querySelectorAll('.delete-btn').forEach( (element) => {
    element.addEventListener('click', function(e) { 
      const id = e.target.dataset.albumId;
      const album = document.querySelector(`.study${id}`);

      deleteDataFromDB(`/album/${id}`, null)
        .then(function() { 
            album.parentNode.removeChild(album);
        } )
    });
  });
}

function showButtns(sh) {
  const backBtn = document.getElementById('backToAlbums');
  const uploadBtn = document.querySelector('[for="#uploadFiles"]');
  const addFolderBtn = document.getElementById('addFolderBtn');
  if(sh){
    backBtn.classList.remove('hide');
    uploadBtn.classList.remove('hide');
    addFolderBtn.classList.add('hide');
  } else {
    backBtn.classList.add('hide');
    uploadBtn.classList.add('hide');
    addFolderBtn.classList.remove('hide');
  }
  
}


function removeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("show", "in");
  modal.style.display = "none";
  document.querySelectorAll('.modal-backdrop.fade').forEach(element => {
    element.parentNode.removeChild(element);
  });
}

function showError(selector, errorMsg) {
  const element = document.querySelector(selector);
  console.log('error: ', element)
  element.innerText = errorMsg;
}