$(document).ready(function () {
	
	//讀取某篇文章的所有資訊
	var getID = window.location.hash.replace("#","");
	$.ajax({
		type:'GET',
		url:'https://richegg.top/posts',
		contentType:'application/json',
		xhrFields: {
      		withCredentials: true
   		},
   		success: function(data,status,xhr){
   			for(let i=0;i<data.length;i++){
   				if( getID == data[i].id){
   					$('#fullArticleContainer').html(
						'<div class="full-art" data-id="'+ data[i].id +'">' +
						'<div class="title"> <h1>'+ data[i].title +
						'</h1></div>' +
						'<h3><div class="content">'+ data[i].content +'</div></h3>' +
						'<div class="createT">Create at '+ data[i].created_at +'</div>' +
						'<div class="updateT">update at '+ data[i].updated_at +'</div>' +
						'<div class="authorUn">Username:'+data[i].author.username+
						'&nbsp;&nbsp;&nbsp;<span class="authorN">Name:'+data[i].author.name+
						'&nbsp;&nbsp;&nbsp;</span><span class="authorG">Gender:'+data[i].author.gender+
						'&nbsp;&nbsp;&nbsp;</span><span class="authorA">Adress:'+data[i].author.address+
						'</div><div class="tags">Tags: '+ data[i].tags +'</div>'+ 
						'<div class="btn-group col col-md-6 col-md-offset-11"><button class="update glyphicon glyphicon-pencil btn btn-edit" title="Edit"></button>&nbsp;<button class="delete glyphicon glyphicon-trash btn btn-del" aria-hidden="true" title="Delete" id="btn-del"></button></div>'+
						'</div> <hr>'
					);
   				};
   			};
			
		},
		error: function(jqXHR,status,error){
			console.log(Error);
			alert(jqXHR.status);
			alert(jqXHR.error);
		}
	});

	//刪除文章
	$('body').on('click','.btn-del',function(){
		var fullArt = $(this).attr('.full-art');
		var id = window.location.hash.replace("#","");
		$.ajax({
			type: 'DELETE',
			data:fullArt,
			url: 'https://richegg.top/posts/'+id,
			contentType:'application/json',
			xhrFields: {
	      		withCredentials: true
	   		},
			success: function(data,status,xhr){
				alert('Delete success!');
				$('.full-art').remove();
				location.href = 'Home.html';
			},
			error: function(jqXHR,status,error){
				console.log('error');
			}
		});
		return false;
	});

	//開啟編輯模式
	$('body').on('click','.btn-edit',function(){
		var id = window.location.hash.replace("#","");
		$.ajax({
			type:'GET',
			url:'https://richegg.top/posts/'+id,
			contentType:'application/json',
			xhrFields: {
      			withCredentials: true
   			},
			success: function(data,status,xhr){
				console.log(data);
				$('#fullArticleContainer').html(
					'<form id="article_modal"><label for="artTitle" style="color: black">Title</label><input id="artTitle" type="text" class="form-control" value="'+data.title+'">'+
					'<label for="artContent" style="color: black">Content</label><span class="textarea"><textarea id="artContent" type="text" class="form-control" rows="10">'+data.content+'</textarea></span>'+
				    '<label for="artTags" style="color: black">Tags</label><input id="artTags" type="text" class="form-control" value="'+data.tags+'"></form>'+
				    '<br><div class="row"><div class="col col-md-8 col-md-offset-5"><button id="btn-saveArt" class="btn btn-primary btn-saveArt" style="width:100px;">Save</button></div></div>'					
				);
				
			},
			error: function(jqXHR,status,error){
				console.log(Error);
				alert(jqXHR.status);
				alert(jqXHR.error);
			}
		});	
		return false;
	});

	//儲存編輯後的文章
	$('body').on('click','.btn-saveArt',function(){
		var id = window.location.hash.replace("#","");
		var title = $('#artTitle').val();
		var content = $('#artContent').val();
		var tags = $('#artTags').val();
		var submitA = {
			title: title,
			content: content,
			tags: [tags]
		};
		submitA = JSON.stringify(submitA);
		$.ajax({
			type:'PATCH',
			url:'https://richegg.top/posts/'+id,
			data:submitA,
			contentType:'application/json',
			xhrFields: {
      			withCredentials: true
   			},
   			success: function(data,status,xhr){
   				alert('Edit success!');
				console.log('success!');
				window.location.reload();
			},
			error: function(jqXHR,status,error){
				alert('fail');
				alert(jqXHR.status);
				alert(jqXHR.error);
				console.log('fail');
			}
		});
		return false;
	});

	//取得資料
	$('#infoBtn').on('click',function(){
		$.ajax({
			type:'GET',
			url:'https://richegg.top/authors/test1',
			contentType:'application/json',
			xhrFields: {
      			withCredentials: true
   			},
			success: function(data,status,xhr){
				console.log(data);
				$('#infoForm').html(
					'<form><label for="infoUsername" style="color: black">Username</label><input id="infoUsername" type="text" class="form-control" value="'+data.username+'">'+
					'<label for="infoName" style="color: black">Name</label><input id="infoName" type="text" class="form-control" value="'+data.name+'">'+
				    '<label for="infoGender" style="color: black">Gender</label><input id="infoGender" type="text" class="form-control" value="'+data.gender+'">'+
				    '<label for="infoAddress" style="color: black">Address</label><input id="infoAddress" type="text" class="form-control" value="'+data.address+'"></form>'	
				);
			},
			error: function(jqXHR,status,error){
				console.log(Error);
				alert(jqXHR.status);
				alert(jqXHR.error);
			}
		});
		return false;
	});

	//編輯個人資料
	$('body').on('click','.btn-saveCng',function(){
		var username = $('#infoUsername').val();
		var name = $('#infoName').val();
		var gender = $('#infoGender').val();
		var address = $('#infoAddress').val();
		var submiT = {
			username: username,
			name: name,
			gender: gender,
			address: address
		};
		submiT = JSON.stringify(submiT);
		$.ajax({
			type:'PATCH',
			url:'https://richegg.top/authors/test1',
			data:submiT,
			contentType:'application/json',
			xhrFields: {
      			withCredentials: true
   			},
   			success: function(data,status,xhr){
   				alert('Edit success!');
				console.log('success!');
				window.location.reload();
			},
			error: function(jqXHR,status,error){
				alert('fail');
				console.log('fail');
			}
		});
		return false;
	});

});
/*
var fullArt = $(this).attr('.full-art');
		var title = $('.title').text();
		var content = $('.content').text();
		var tags = $('.tags').text();
		var editTemplate = 
			'<div>Title：<input type="text" class="title" value="'+ title +'" required></div>' +
			'<div>Content：<input type="text" class="content" value="'+ content +'"></div>' +
			'<div>Tags：<input type="text" class="tags" value="'+ tags +'" required></div>' +
			'<div><button class="btn btn-save btn-primary"></button></div>';
		fullArt.html(editTemplate);
		$('.btn-save').on(click,function(){
			title = fullArt.find('.title').val();
			content = fullArt.find('.content').val();
			tags = fullArt.find('.tags').val();
			$.ajax({
				type: 'POST',
				data:fullArt,
				url: 'https://moli.rocks:774/posts/12563ec35391415246',
				contentType:'application/json',
				xhrFields: {
		      		withCredentials: true
		   		},
				success: function(data,status,xhr){
					alert('success');
					window.location.reload();
				},
				error: function(jqXHR,status,error){
					console.log('error');
				}
			});

		});*/