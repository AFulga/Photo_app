//pma.innerHTML = pmaTemplates.login;

xhrPromise( 'POST','album', {"userId" : "1", "name" : "ddddd"} )
.then( () =>xhrPromise( 'POST','user', {"username" : "fulga3", "password" : "sdfd8888"} ) )
.then( () => xhrPromise( 'POST','album', {"userId" : "1", "name" : "deal"} ) )
.then( (result) => {
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
      console.log(addFolder)

        addDataToDB('album', {"userId" : userId, "name" : albumName.value}) 
        .then( data => {
          console.log(data.response,'|',data.status)
          if(data.response == 'true' && data.status == 200 && albumName.value.length > 0) {
            console.log('in render')
            removeModal('addFolder');
            renderPageAlbums(userId);
            albumName.value = "";
          } else {
            console.log('in error')
            let errorMsg = "Provide a valid name";
            if(data.response == "false")
              errorMsg = "Folder already exists";
            showError("#addFolderError", errorMsg);
          }
          
        });
      

    });

  renderPageAlbums(userId);

});