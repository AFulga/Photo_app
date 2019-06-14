const pmaTemplates = {};

pmaTemplates.login = `<div class="login-container">
				            <div class="row">
				                <div class="col-md-6 login-form-1">
				                	<form>
				                		<div class='logo avatar'><img src="https://image.flaticon.com/icons/svg/1322/1322620.svg" alt="" /></div>
				                    	<h3 class='yellow1'>pma</h3>
				                    	<h3 class='yellow2'>Login</h3>
				                    
				                        <div class="form-group">
				                            <input type="text" id="username" class="form-control" placeholder="Username *" value="" />
				                        </div>
				                        <div class="form-group">
				                            <input type="password" id="pass" class="form-control" placeholder="Password *" value="" />
				                        </div>
				                        <div class="form-group">
				                            <input type="submit" class="btnSubmitLogin" value="Login" />
				                        </div>
				                        <div class="form-group">
				                            <a href="#" class="btnRegister">Register here</a>
				                        </div>
				                    

				                    </form>
				                </div>
				            </div>
				        </div>`;

pmaTemplates.register = `<div class="login-container">
				            <div class="row">
				                <div class="col-md-6 login-form-1">
				                	<form>
				                    	<div class='logo avatar'><img src="https://image.flaticon.com/icons/svg/1322/1322620.svg" alt="" /></div>
				                    	<h3 class='yellow1'>pma</h3>
				                    	<h3 class='yellow2'>Registration</h3>
				                        <div class="form-group">
				                            <input type="text" id="username" class="form-control" placeholder="Username *" value="" />
				                        </div>
				                        <div class="form-group">
				                            <input type="password"id="pass"  class="form-control" placeholder="Password *" value="" />
				                        </div>
				                        <div class="form-group">
				                            <input type="password" id="pass2"class="form-control" placeholder="Confirm Password *" value="" />
				                        </div>
				                        <div class="form-group">
				                            <input type="submit" class="btnSubmitRegister" value="Register" />
				                        </div>		                    

				                    </form>
				                </div>
				            </div>
				        </div>`;

pmaTemplates.collectionTemplate = `<div class="case-study-gallery">
									<h1 class="title">GALLERIES</h1>
									<div class="albums-container">
										
									</div>								  
								</div>`;

pmaTemplates.collection = function(name, id) {
	return `<div class="case-study study${id}" >
				<div class="case-study__overlay">
					<h2 class="case-study__title">${name}</h2>
					<div class="case-study__link show-btn" data-album-name="${name}" data-album-id="${id}">Show images</div>
					<button data-album-id="${id}" type="button" class="case-study__link btn btn-warning delete-btn">Delete</button>
				</div>
			</div>`;

} 

pmaTemplates.addImages = function(name) {
	return `<div id="app">	
				<h1 class="title">${name}</h1>				  
			<div class='thumbnails-container'><div id="thumbnails"></div></div>
			</div>`;
}
pmaTemplates.thumbnail = function (url, name, date, id) {
	return `<img data-toggle="modal" data-target="#myModal" src="${url}">
					<div class="caption">
						<h6>${name}</h6>
						<h6>Data: ${date}</h6>
						<button data-image-id="${id}" type="button" class="btn btn-warning">Delete</button>
					</div>`;
}

pmaTemplates.thumbnailAlbum = function (url, name, date, id) {
	return `<img data-toggle="modal" data-target="#myModal" src="${url}">
					<div class="caption">
						<h6>${name}</h6>
						<h6>Data: ${date}</h6>
						<button data-image-id="${id}" type="button" class="btn btn-warning">Delete</button>
					</div>`;
}