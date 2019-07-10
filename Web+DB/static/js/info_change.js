function check_profile(){
	// alert('in func')
    var username = $("#form_name").val(),
		email = $("#form_email").val(),
		cellphone = $("#form_cellphone").val(),
		age = $("#form_age").val(),
		pay_id = $("#form_pay_id").val(),
		gender = $("#form_gender").val(),
		introduction = $("#form_introduction").val();
    if(username_check(username) && email_check(email) && cellphone_check(cellphone) && age_check(age)
		&& pay_id_check(pay_id) && gender_check(gender) && introduction_check(introduction))return true;
    else{
    	return false;
	}
}

function username_check(username){
	// alert('username')
	if(username == ""){
		alert('invalid username.')
    	return false;
	}
	for (var i=0; i<username.length; i++){
		if(username[i] < 'a' || username[i] > 'z'){
			alert('invalid username.')
			return false;
		}
	}
	return true;
}

function email_check(email){
	// alert('email')
    var apos=email.indexOf("@");
    var dotpos=email.lastIndexOf(".");
    if(apos<1||dotpos-apos<2){
    	alert('invalid email.')
    	return false;
    }
    else return true;
}

function cellphone_check(cellphone){
	// alert(cellphone)
	return true;
// 	if(cellphone.length == 0)return true;
// 	if(cellphone.length != 11){
// 		alert('invalid cellphone.')
// 		return false;
// 	}
// 	var re = /^[1-9]+.?[0-9]*$/;
// 	if (!re.test(cellphone)) {
// 　　　　alert('invalid cellphone.')
// 			return false;
// 　　}
// 	return false;
}

function age_check(age){
	// alert('age')
	if(age.length == 0)return true;
	if(age.length > 2 || isNaN(age)){
		alert('invalid age.')
		return false;
    }
	return true;
}

function pay_id_check(pay_id){
	// alert("pay_id")
	if(pay_id.length != 0 || pay_id.length > 30){
		alert('invalid pay_id.')
		return false;
	}
	return true;
}

function gender_check(gender){
	return true;
}

function introduction_check(introduction){
	// alert("introduction")
	if(introduction.length > 100){
		alert('invalid introduction.')
		return false;
	}
	return true;
}