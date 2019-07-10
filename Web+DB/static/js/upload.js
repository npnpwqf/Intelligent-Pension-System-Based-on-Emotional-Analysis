//上传类
$(function(){

//上传头像
 $('#jinsom-upload-avatar').die('click').live('change', function(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
$('.jinsom-member-avatar span').css('display','inline-block');
$('.jinsom-member-avatar span').html('<i class="fa fa-spinner fa-spin"></i> 上传中...');

$("#jinsom-upload-avatar-form").ajaxSubmit({
success:function(data){
$('.jinsom-member-avatar span').hide();
$('.jinsom-member-avatar span').html('点击修改头像');
$('#jinsom-upload-avatar').val('');
if(data == 0){
return false;
}else if(data==1){
layer.msg('只能上传格式：'+ajax_url_a.upload_publish_avatar_type+'的文件');
}else if(data==2){
layer.msg('大小不能超过'+ajax_url_a.upload_publish_avatar_max+'M');
}else if(data==3){
layer.msg('上传出错了！');
}else{
layer.msg('修改成功！');
$('.jinsom-member-avatar img').attr('src',data);
}
}, 
error:function(){
$('.jinsom-member-avatar span').hide();
$('.jinsom-member-avatar span').html('点击修改头像');
$('#jinsom-upload-avatar').val('');    
layer.msg('上传失败！'); 
} 
});
});


//上传本地音乐
$('#jinsom-upload-music').die('click').live('change', function(){
var bar = $('.jinsom-music-bar');
var percent = $('.jinsom-music-percent');
var progress = $(".jinsom-music-progress");
    
$("#jinsom-upload-music-form").ajaxSubmit({
beforeSend: function() {
progress.show();
var percentVal = '0%';
bar.width(percentVal);
percent.html(percentVal);
},
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
bar.width(percentVal);
percent.html(percentVal);
if(percentVal=='100%'){
percent.html('正在处理中...<i class="fa fa-spinner fa-spin"></i>');	
}
},
success:function(data){
$('.jinsom-music-progress').hide();
if(data == 0){
}else if(data==1){
bar.width('0');
percent.children('i').remove();
layer.msg('只能上传格式：'+ajax_url_a.upload_publish_music_type+'的文件');
}else if(data==2){
bar.width('0');
percent.children('i').remove();
layer.msg('大小不能超过'+ajax_url_a.upload_publish_music_max+'M');
}else if(data==3){
bar.width('0');
percent.children('i').remove();
layer.msg('上传出错了！');
}else{
$('.jinsom-music-show').before('<div id="jinsom_music_show" class="aplayer"></div>');
percent.children('i').remove();
$('span.music_bar i').css('display','inline-block');
$('#jinsom-music-url').val(data);
var jinsom_music_show = new APlayer({
element: document.getElementById('jinsom_music_show'),
narrow: false,
autoplay: false,
showlrc: false,
music: {
title: 'music_title',
author:'music_author',
url: data
}
});
$('#jinsom-upload-music').val('');
$('.layui-layer-close').click(function(){
jinsom_music_show.pause();
});

}
}, 
error:function(){
percent.children('i').remove();
layer.msg('上传失败！');
bar.width('0');
$('.jinsom-music-progress').hide();
return false;
} 
});
});


//上传背景音乐
$('#jinsom-upload-user-bg-music').die('click').live('change', function(){
var bar = $('.jinsom-bg-music-bar');
var percent = $('.jinsom-bg-music-percent');
var progress = $(".jinsom-bg-music-progress");
    
$("#jinsom-upload-user-bg-music-form").ajaxSubmit({
beforeSend: function() {
progress.show();
var percentVal = '0%';
bar.width(percentVal);
percent.html(percentVal);
},
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
bar.width(percentVal);
percent.html(percentVal);
},
success:function(data){
$('.jinsom-bg-music-progress').hide();
if(data == 0){
}else if(data==1){
bar.width('0');
layer.msg('只能上传格式：'+ajax_url_a.upload_publish_music_type+'的文件');
}else if(data==2){
bar.width('0');
layer.msg('大小不能超过'+ajax_url_a.upload_publish_music_max+'M');
}else if(data==3){
bar.width('0');
layer.msg('上传出错了！');
}else{

$('#jinsom-bg-music-url').val(data);
$('#jinsom-upload-user-bg-music').val('');


}
}, 
error:function(){
layer.msg('上传失败！');
bar.width('0');
$('.jinsom-bg-music-progress').hide();
$('#jinsom-upload-user-bg-music').val('');
return false;
} 
});
});


//群聊上传图片
$('#jinsom-upload-group-img').die('click').live('change', function(){
    
$("#jinsom-upload-group-img-form").ajaxSubmit({
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
$('.jinsom-upload-group-img-loading').html('<i class="fa fa-spinner fa-spin"></i> 上传中...'+percentVal);
if(percentVal=='100%'){
$('.jinsom-upload-group-img-loading').html('正在处理中...<i class="fa fa-spinner fa-spin"></i>');	
}
},
success:function(data){
$('#jinsom-upload-group-img').val();
$('.jinsom-upload-group-img-loading').empty();
if(data == 0){
}else if(data==1){
layer.msg('只能上传图片格式的文件');
}else if(data==2){
layer.msg('大小不能超过2M');
}else if(data==3){
layer.msg('上传出错了！');
}else{
$('.jinsom-chat-message-group-list').append('<li class="myself"><div class="jinsom-chat-message-list-user-info">'+ajax_url_a.avatar+'</div><div class="jinsom-chat-message-list-content">'+data+'</div></li>');
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);

//图片加载完毕执行
$(".jinsom-chat-message-list-content img").load( function(){
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
} );

}
}, 
error:function(){
layer.msg('上传失败！');
$('.jinsom-upload-group-img-loading').empty();
$('#jinsom-upload-group-img').val();
return false;
} 
});
});



//上传本地附件
$('#bbs_file_local_input').die('click').live('change', function(){
var bar = $('.file_bar');
var percent = $('.file_percent');
var progress = $(".file_progress");

if(percent.children('i').length==0){

$("#add_file_local").ajaxSubmit({
dataType : "json",
timeout: 120000,//120秒退出
beforeSend: function() {
$('#bbs_file_local_select_btn').hide();
progress.show();
var percentVal = '0%';
bar.width(percentVal);
percent.html(percentVal);
},
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
bar.width(percentVal);
percent.html(percentVal+' <i class="fa fa-spinner fa-spin"></i>');
if(percentVal=='100%'){
percent.html('正在处理中...<i class="fa fa-spinner fa-spin"></i>');	
}
},
success:function(data){
$('#bbs_file_local_input').val('');
if(data.code != 0){
// 
}
if(data.code == 0){
return false;
}else if(data.code==1){
$('#bbs_file_local_select_btn').show();
progress.hide();
percent.children('i').remove();
layer.msg(data.msg);
return false;
}else if(data.code==2){
$('#bbs_file_local_select_btn').show();
progress.hide();
percent.children('i').remove();
layer.msg(data.msg);
return false;
}else if(data.code==3){     
$('#bbs_file_local_select_btn').show();
progress.hide();
percent.children('i').remove();
layer.msg(data.msg);
return false;
}else{
$('#file_url').val(data.url);
// $('#file_name').val('');
percent.html('上传成功，请点击插入附件');
percent.children('i').remove();
}
}, 
error:function(){
$('#bbs_file_local_input').val('');
layer.msg('上传失败！服务器配置问题！');
$('#bbs_file_local_select_btn').show();
progress.hide();
return false;
} });

}
return false;


  });





















});