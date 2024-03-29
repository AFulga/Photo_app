//pma.innerHTML = pmaTemplates.login;

/*xhrPromise( 'POST','album', {"userId" : "1", "name" : "ddddd"} )
.then( () =>xhrPromise( 'POST','user', {"username" : "fulga3", "password" : "sdfd8888"} ) )
.then( () => xhrPromise( 'POST','album', {"userId" : "1", "name" : "deal"} ) )
.then( (result) =>*/
(function() {
  const userId = 1;  
  function renderPagePhotos (name, albumId) {    
    renderImagesPage(name, albumId);
    renderDbImages(albumId);
    showButtns(1);
    addEventToBackButton(renderPageAlbums, userId);
  }

  function renderPageAlbums(userId) {
    showButtns(0);
    
    pma.innerHTML = pmaTemplates.collectionTemplate;
    const albumsContainer = document.querySelector('.albums-container');
    fetchUserAlbums(userId)
    .then( result=> {
      result.map( ( {name, id} )  => {
        albumsContainer.innerHTML += pmaTemplates.collection(name, id);
      });
      addEventAlbumShowBtn(renderPagePhotos);
      addEventAlbumdeletBtn();
    });
 
    
  }

  const createFolder = document.getElementById('createFolder');
    createFolder.addEventListener('click', () => {
      const albumName = document.getElementById('albumName');
      
      showError("#addFolderError", "");
      console.log(addFolder);

      if(albumName.value.length > 0) {
        addDataToDB('album', {"userId" : userId, "name" : albumName.value}) 
        .then( data => {
          console.log(data.response,'|',data.status)
          if(data.response == 'true' && data.status == 200) {
            console.log('in render')
            removeModal('addFolder');
            renderPageAlbums(userId);
            albumName.value = "";
          } else {
            console.log('in error')
            let errorMsg = data.response == "false" ? "Folder already exists" : "Provide a valid name";
            showError("#addFolderError", errorMsg);
          }
          
        });
      } else {
        showError("#addFolderError", "Provide a valid name");
      }
      

    });

  renderPageAlbums(userId);

})();