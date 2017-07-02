$(document).ready(function () {
	
	//讀取文張列表
	$.ajax({
		type:'GET',
		url:'https://richegg.top/posts',
		contentType:'application/json',
		xhrFields: {
      		withCredentials: true
   		},
   		success: function(data,status,xhr){
			for(let i=0;i<data.length;i++){
				$('#articleContainer').append(
					'<div class="full-art" data-id="'+ data[i].id +'">' +
					'<div class="title"> <h3>'+ data[i].title +
					'</h3><div class="btn-group col col-md-6 col-md-offset-11"><button class="btn btn-read" style="font-size: 10px;">Read More</button></div>'+
					'<br><hr>'
				);
			};	
		},
		error: function(jqXHR,status,error){
			console.log(Error);
			alert(jqXHR.status);
			alert(jqXHR.error);
		}
	});

	//讀取某篇文章
	$('body').on('click','.btn-read',function(){
		var getID = $(this).parent().parent().parent().attr("data-id");
		$.ajax({
			type:'GET',
			url:'https://richegg.top/posts',
			contentType:'application/json',
			xhrFields: {
	      		withCredentials: true
	   		},
	   		success: function(data,status,xhr){
	   			console.log(getID);
	   			location.href = 'article.html#'+getID;
			},
			error: function(jqXHR,status,error){
				console.log(Error);
				alert(jqXHR.status);
				alert(jqXHR.error);
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

	//新增文章
	$('#btn-addArticle').on('click',function(){
		var title = $('#input-title').val();
		var content = $('#input-content').val();
		var tags =$('#input-tag').val();
		var input = {
			title: title,
			content: content,
			tags: [tags]
		};
		input = JSON.stringify(input);
		$.ajax({
			type:'POST',
			url:'https://richegg.top/posts',
			data:input,
			contentType:'application/json',
			xhrFields: {
      			withCredentials: true
   			},
			success: function(data,status,xhr){
				console.log('success!');
				window.location.reload();
			},
			error: function(jqXHR,status,error){
				console.log('fail');
				window.location.reload();
			}
		});
		return false;
	});

});