//判断密码是否符合规范 两次输入是否一致
//后端判断原密码是否正确
function change_password(){
    var change_origin_password = $("#change_origin_password").val(),
        change_new_password = $("#change_new_password").val(),
        change_re_new_password = $("#change_re_new_password").val(),
        flag = true,
        len_ = change_origin_password.length,
        len__ = change_new_password.length;
    if(len_<6){
        alert('origin password too short.')
        flag = false;
    }else if(len__<6){
        alert('new password too short.')
        flag = false;
    }else if(change_new_password != change_re_new_password){
        alert('password mismatch.')
        flag = false;
    }
    return flag;
}