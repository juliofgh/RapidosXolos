new Vue({
			el: '#main',
			data: {
				lists: [],
				idNota: '',
				result: '',
			},
			methods:{
				generateArticleSucces(response){
					return '<!doctype html>\n'+
							'<html lang="en" prefix="op: http://media.facebook.com/op#">\n'+
								'<head>\n'+
								   	'<meta charset="utf-8">\n'+
								   	'<link rel="canonical" href="'+response.data.post[0].permalink+'">\n'+
								   	'<meta property="op:markup_version" content="v1.0">\n'+
								   	'<meta property="fb:article_style" content="Estilo Rojo">\n'+
								  	'<meta property="fb:use_automatic_ad_placement" content="enable=true ad_density=default">\n'+
								    '<meta property="fb:op-recirculation-ads" content="placement_id=981670025319962_981674121986219">\n'+
							 	'</head>\n'+
								'<body>\n'+
							   		'<article>\n'+
							     		'<header>\n'+
									        '<!-- Titulo -->\n'+
									        '<h1>'+response.data.post[0].title+'</h1>\n'+
									        '<!-- Fecha de publicacion de la nota -->\n'+
									        '<time class="op-published" datetime="'+response.data.post[0].publish_date+'T15:00:00Z"></time>\n'+
									        '<!-- Autor de la Nota -->\n'+
									        '<address>\n'+
									       		'Club Tijuana\n'+
									        '</address>\n'+
									        '<!-- Imagen principal de la Nota -->\n'+
									        '<figure>\n'+
									        	'<img src="'+response.data.post[0].imagen_interior+'"/>\n'+
									        '</figure>\n'+
									        '<!-- Introduccion de la Nota(balazo) -->\n'+
									        '<h2 class="op-kicker">'+response.data.post[0].balazo+'</h2>\n'+
								 			'<figure class="op-ad">\n'+
								 				'<iframe src="https://www.facebook.com/adnw_request?placement=981670025319962_981673211986310&adtype=banner300x250" width="300" height="250">\n'+
								 				'</iframe>\n'+
								 			'</figure>\n'+
								    	'</header>\n'+
								    	'<!-- Cuerpo del Articulo(Nota) -->\n'+
								        '<p>'+response.data.post[0].content+'</p>\n'+
										'<iframe width="560" height="315" src= frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n'+
										'<footer>\n'+
											'<!-- Creditos del Articulo -->\n'+
											'<aside>'+response.data.post[0].nombre+'</aside>\n'+
											'<!-- Copyright -->\n'+
											'<small>© Club Tijuana</small>\n'+
							       		'</footer>\n'+
							     	'</article>\n'+
							   	'</body>\n'+
							'</html>\n';
				},
				generateArticleError(error){
					return '<h4>' + error.message + '</h4>'+
              		'<h5>Status:</h5> ' +
              		'<h4>' + error.response.status + ' ' + error.response.statusText + '</h4>';
				},
				errorAlert(){
				    swal({
				    	title: 'Error',
				    	text: 'EL ID DE LA NOTA NO EXISTE!',
				    	icon: 'error',
				    	dangerMode: true,
				    	closeOnClickOutside: false,
				    	timer: 3000
				    })
				    this.idNota = ''
				},
				getNota: function(){
					let results = document.getElementById("result")
					results.innerHTML = ""
					var id = this.idNota;
					var urlNota = 'https://cors-anywhere.herokuapp.com/http://xolos.com.mx/api/v1/comunicacions/'+id+'/noticias/es/idiomas.json';
					axios.get(urlNota).then(response => {
						//console.log(response)
						this.lists = response.data.post
						results.innerHTML = this.generateArticleSucces(response)
						//this.lists = response.data.post
					})
					.catch(error => {
						this.errorAlert()
					})
				}
			},
		});