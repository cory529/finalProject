/*Login function*/
$(document).ready(function () {
	$('#loginSubmit').on('click',function(){
		console.log(' button clicked');
		var logindata = $('#loginForm input');
		var login = {
			username: logindata[0].value,
			password: logindata[1].value
		 };
		 login = JSON.stringify(login);
		$.ajax({
			type:'POST',
			url:'https://richegg.top/login',
			data:login,
			contentType:'application/json',
			xhrFields: {
      			withCredentials: true
   			},
			success: function(data,status,xhr){
				alert("Welcome~");
				console.log('success!');
				location.href = 'Home.html';
			},
			error: function(jqXHR,status,error){
				console.log('fail');
				alert(jqXHR.status);
			}
		});
		return false;
	});

});