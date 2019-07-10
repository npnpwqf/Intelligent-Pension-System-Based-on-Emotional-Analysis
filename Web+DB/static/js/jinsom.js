

var jinsom_user_chat_ajax = null,jinsom_user_chat_group_ajax = null; 
//删除动态
function jinsom_delete_posts(post_id,author_id){
layer.confirm('你要删除这个内容吗？', {
  btn: ['删除','取消'] //按钮
}, function(){
  layer.load(1);
             $.ajax({
            type: "POST",
            url:  ajax_url_a.jinsom_ajax_url+"/delete_posts.php",
            data: {delete_post_id:post_id,delete_author_id:author_id},
            success: function(msg){
            layer.closeAll('loading');
            layer.msg('删除成功！');
            function d(){window.location.href=ajax_url_a.home_url;}setTimeout(d,2500);
            }
            });
            return false;
});
}

//删除动态评论
function jinsom_delete_post_comments(comment_id,post_id,obj){//我的评论页面
var this_dom=obj;
layer.confirm('确定要删除评论？', {
  btn: ['确定','取消'] //按钮
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  ajax_url_a.jinsom_ajax_url+"/delete_comments.php",
data: {delete_post_comment:comment_id,post_id:post_id},
success: function(msg){
layer.closeAll('loading');
layer.msg('删除成功！');
$(this_dom).parent('.comment_bar').prev('.comment_body').html('<i class="fa fa-trash"></i> 该评论已被删除.');
$(this_dom).remove();
}
});
}); 
}

//删除帖子评论
function jinsom_delete_bbs_comments(comment_id,post_id,obj){
if($(obj).parents('.bbs_single_c').hasClass('answer_adopt_floor')){
layer.msg('被采纳的回帖不能删除！');	
return false;
}
layer.confirm('确定要删除评论？', {
btn: ['确定','取消'] //按钮
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  ajax_url_a.jinsom_ajax_url+"/delete_comments.php",
data: {delete_bbs_comment:comment_id,post_id:post_id},
success: function(msg){
layer.closeAll('loading');
layer.msg('删除成功！');
$(obj).parents('.bbs_box').remove();
}
});
return false;
}); 
}

//删除帖子评论
function jinsom_delete_bbs_comments_er(comment_id,post_id,obj){
layer.confirm('确定要删除评论？', {
btn: ['确定','取消'] //按钮
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  ajax_url_a.jinsom_ajax_url+"/delete_comments.php",
data: {delete_bbs_comment_er:comment_id,post_id:post_id},
success: function(msg){
layer.closeAll('loading');
layer.msg('删除成功！');
$(obj).parents('li').remove();
}
});
return false;
}); 
}

//删除帖子
function jinsom_delete_bbs_posts(post_id,author_id){
layer.confirm('你要删除这个内容吗？', {
  btn: ['删除','取消'] //按钮
}, function(){
  layer.load(1);
             $.ajax({
            type: "POST",
            url:  ajax_url_a.jinsom_ajax_url+"/delete_posts.php",
            data: {delete_bbs_id:post_id,delete_author_id:author_id},
            success: function(msg){
            setTimeout(function(){layer.closeAll('loading');});
            layer.msg('删除成功！');
            function d(){window.location.reload();}setTimeout(d,2500);
            }
            });
});
}

//置顶动态
function jinsom_sticky_post(post_id,author_id,obj){
layer.confirm('你要置顶这条内容吗？', {
  btn: ['置顶','取消'] //按钮
}, function(){
  layer.load(1);
$.ajax({
type: "POST",
url:  ajax_url_a.jinsom_ajax_url+"/commend_posts.php",
data: {sticky_post_id:post_id,sticky_author_id:author_id},
success: function(msg){
layer.closeAll('loading');
layer.msg('置顶成功！');
$(obj).parents('.jinsom-post-setting').prev().children('.jinsom-post-user-info-name').append('<span class="jinsom-mark jinsom-top">置顶</span>');
$(obj).after('<li onclick="jinsom_cancel_sticky_post('+post_id+','+author_id+',this)">取消置顶</li>');
$(obj).remove();
}
});
return false;
});
}

//取消置顶动态
function jinsom_cancel_sticky_post(post_id,author_id,obj){
layer.confirm('你要置顶这条内容吗？', {
  btn: ['确定','取消'] //按钮
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  ajax_url_a.jinsom_ajax_url+"/commend_posts.php",
data: {cancel_sticky_post_id:post_id,cancel_sticky_author_id:author_id},
success: function(msg){
layer.closeAll('loading');
layer.msg('取消成功！');
$(obj).parents('.jinsom-post-setting').prev().children('.jinsom-post-user-info-name').find('.jinsom-top').remove();
$(obj).after('<li onclick="jinsom_sticky_post('+post_id+','+author_id+',this)">置顶内容</li>');
$(obj).remove();
}
});
return false;
});
}



//推荐动态
function jinsom_commend_posts(post_id,author_id,obj){
layer.confirm('你要推荐这条内容吗？', {
  btn: ['推荐','取消'] //按钮
}, function(){
  layer.load(1);
$.ajax({
type: "POST",
url:  ajax_url_a.jinsom_ajax_url+"/commend_posts.php",
data: {commend_post_id:post_id,commend_author_id:author_id},
success: function(msg){
layer.closeAll('loading');
layer.msg('推荐成功！');
$(obj).parents('.jinsom-post-setting').prev().children('.jinsom-post-user-info-name').append('<i class="jinsom-icon commend" title="推荐内容">&#xe6bd;</i>');
$(obj).after('<li onclick="jinsom_cancel_commend_posts('+post_id+','+author_id+',this)">取消推荐</li>');
$(obj).remove();
}
});
return false;
});
}

//取消推荐动态
function jinsom_cancel_commend_posts(post_id,author_id,obj){
layer.confirm('你要取消推荐这条内容吗？', {
  btn: ['确定','按错了'] //按钮
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  ajax_url_a.jinsom_ajax_url+"/commend_posts.php",
data: {cancel_commend_post_id:post_id,cancel_commend_author_id:author_id},
success: function(msg){
layer.closeAll('loading');
layer.msg('取消成功！');
$(obj).parents('.jinsom-post-setting').prev().children('.jinsom-post-user-info-name').children('i').remove();
$(obj).after('<li onclick="jinsom_commend_posts('+post_id+','+author_id+',this)">推荐内容</li>');
$(obj).remove();
}
});
return false;
});
}


//置顶帖子
function jinsom_commend_bbs_post(post_id,obj){
layer.confirm('你要置顶这条帖子吗？', {
  btn: ['置顶','取消'] //按钮
}, function(){
  layer.load(1);
$.ajax({
type: "POST",
url:  ajax_url_a.jinsom_ajax_url+"/commend_posts.php",
data: {commend_bbs_post:post_id},
success: function(msg){
layer.closeAll('loading');
layer.msg('置顶成功！');
$('.bbs_single h1 a').after('<span class="bbs_zhiding">置顶</span>');
$(obj).after('<li id="bbs_quxiaozhiding" onclick="jinsom_cancel_commend_bbs_post('+post_id+',this)">取消置顶</li>');
$(obj).remove();
}
});
return false;
});
}

//取消置顶帖子
function jinsom_cancel_commend_bbs_post(post_id,obj){
layer.confirm('你要取消置顶这条帖子吗？', {
  btn: ['确定','按错了'] //按钮
}, function(){
  layer.load(1);
             $.ajax({
            type: "POST",
            url:  ajax_url_a.jinsom_ajax_url+"/commend_posts.php",
            data: {cancel_commend_bbs_post:post_id},
            success: function(msg){
            layer.closeAll('loading');
            layer.msg('取消成功！');
            $('.bbs_zhiding').remove();
            $(obj).after('<li id="bbs_zhiding" onclick="jinsom_commend_bbs_post('+post_id+',this)">置顶帖子</li>');
            $(obj).remove();
            }
            });
            return false;
});
}


//加精帖子
function jinsom_bbs_post_excellent(post_id,obj){
layer.confirm('你要加精这条帖子吗？', {
  btn: ['加精','取消'] //按钮
}, function(){
  layer.load(1);
             $.ajax({
            type: "POST",
            url:  ajax_url_a.jinsom_ajax_url+"/commend_posts.php",
            data: {bbs_post_excellent:post_id},
            success: function(msg){
            layer.closeAll('loading');
            layer.msg('加精成功！');
            $('.bbs_single h1').append('<span class="bbs_jiajing">精华</span>');
            $(obj).after('<li id="bbs_quxiaojiajing" onclick="jinsom_cancel_bbs_post_excellent('+post_id+',this)">取消加精</li>');
            $(obj).remove();
            }
            });
            return false;
});
}

//取消加精帖子
function jinsom_cancel_bbs_post_excellent(post_id,obj){
layer.confirm('你要取消加精这条帖子吗？', {
  btn: ['确定','按错了'] //按钮
}, function(){
  layer.load(1);
             $.ajax({
            type: "POST",
            url:  ajax_url_a.jinsom_ajax_url+"/commend_posts.php",
            data: {cancel_bbs_post_excellent:post_id},
            success: function(msg){
            layer.closeAll('loading');
            layer.msg('取消成功！');
            $('.bbs_jiajing').remove();
            $(obj).after('<li id="bbs_jiajing" onclick="jinsom_bbs_post_excellent('+post_id+',this)">加精帖子</li>');
            $(obj).remove();
            }
            });
            return false;
});
}





//弹窗登录
function jinsom_pop_up_login(){
	    var pop_up_username=$("#pop_login_username").val();
        var pop_up_password=$("#pop_login_password").val();
        var pop_up_current_url=ajax_url_a.current_url;
        if(pop_up_username==''){
        	layer.msg('请输入帐号！');
        	return false;
        }
        if(pop_up_password==''){
        	layer.msg('请输入密码！');
        	return false;
        }
            layer.load(1);
            $.ajax({
            type: "POST",
            url:  ajax_url_a.jinsom_ajax_url+"/login.php",
            data: {username:pop_up_username,password:pop_up_password},
            success: function(msg){
            layer.closeAll('loading');
        if(msg==0){
           layer.msg('帐号或密码有误！');
        }else{
           layer.msg('登录成功，欢迎回来！');
        	function c(){window.location.href=pop_up_current_url;}
        	setTimeout(c,1500);
            }
            }
            });
            
}

//侧栏登录
function jinsom_sidebar_login(){
	    var sidebar_username=$("#sidebar_username").val();
        var sidebar_password=$("#sidebar_password").val();
        var sidebar_current_url=ajax_url_a.current_url;
        if(sidebar_username==''){
        	layer.msg('请输入帐号！');
        	return false;
        }
        if(sidebar_password==''){
        	layer.msg('请输入密码！');
        	return false;
        }
            layer.load(1);
            $.ajax({
            type: "POST",
            url:  ajax_url_a.jinsom_ajax_url+"/login.php",
            data: {username:sidebar_username,password:sidebar_password},
            success: function(msg){
            layer.closeAll('loading');
        if(msg==0){
           layer.msg('帐号或密码有误！');
        }else{
           layer.msg('登录成功，欢迎回来！');
        	function c(){window.location.href=sidebar_current_url;}
        	setTimeout(c,1500);
            }
            }
            });
            return false;
            
}


//付费可见
function jinsom_pay_for_visible(pay_type,post_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
            layer.load(1);
            $.ajax({
            type: "POST",
            url:  ajax_url_a.jinsom_ajax_url+"/Pay_for_visible.php",
            data: {pay_post_id:post_id,pay_type:pay_type},
            success: function(msg){
            layer.closeAll('loading');
            if(msg==1){
           layer.msg('购买成功！');
           function d(){window.location.href=ajax_url_a.home_url+'/?p='+post_id;}
            setTimeout(d,1500);
            }else if(msg==8){
layer.msg('你已经购买过了！');
}else{
            layer.msg('你的'+ajax_url_a.credit_name+'不足！');
           }
            }
            });
            return false;       
}


//电脑签到
function jinsom_sign(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
layer.load(1); 
$.ajax({
type: "POST",
url:  ajax_url_a.jinsom_ajax_url+"/sign.php",
data: {sign:1},
dataType:'json',
success: function(msg){ 
layer.closeAll('loading');
if(msg.code==1){
layer.msg(msg.msg);
}else if(msg.code==2){//连续签到
layer.msg(msg.msg);
$('.jinsom-sidebar-sign').empty();   
$('.jinsom-sidebar-sign').append(msg.content);
}else if(msg.code==3){//断签
layer.msg(msg.msg);
$('.jinsom-sidebar-sign').empty();
$('.jinsom-sidebar-sign').append(msg.content);
}else{
layer.msg(msg.msg);
}
}
});
return false;
}

//添加卡密
function jinsom_get_secret_key(){
        secret_key_price=$("#secret_key_price").val();
        secret_key_number=$("#secret_key_number").val();
        secret_key_date=$("#secret_key_date").val();
        if(secret_key_price==''){
       layer.msg('卡密面值不能为空！');
       return false;
        }
        if(secret_key_price<0){
       layer.msg('卡密面值至少为0！');
       return false;
        }
         if(secret_key_number==''){
       layer.msg('卡密数量不能为空！');
       return false;
        }
        if(secret_key_number>200||secret_key_number<1){
       layer.msg('每次生成数量只能为在1-200之间！');
       return false;
        }
            layer.load(1);
            $.ajax({
            type: "POST",
            url:ajax_url_a.jinsom_ajax_url+"/add_secret_key.php",
            data: {secret_key_price:secret_key_price,secret_key_number:secret_key_number,secret_key_date:secret_key_date},
            beforeSend: function () {
            $("#get_key_button").attr("disabled", true);
            },
            success: function(msg){
            layer.closeAll('loading');
            layer.msg('卡密已经生成！');
            function d(){window.location.reload();}
            setTimeout(d,1500);
            }
            });
            return false;
}

//更新论坛设置信息
function jinsom_update_bbs_setting(){
            layer.load(1);
            select_value=parseInt($("#power_form").val());
            power_lv=$("input[name='power_lv']").val();
            showposts=$("input[name='showposts']").val();
            credit_post_number=$("input[name='credit_post_number']").val();
            credit_reply_number=$("input[name='credit_reply_number']").val();
            credit_post_times=$("input[name='credit_post_times']").val();
            credit_reply_times=$("input[name='credit_reply_times']").val();
            last_reply_time=$("input[name='last_reply_time']").val();
            if(select_value==6){
                if(power_lv==''){//若选择了权限为指定等级，判断是否输入值
                    setTimeout(function(){layer.closeAll('loading');});
                    layer.msg('请输入发帖权限->满足经验的用户');
                    return false;
                }
            }
            //判断必填项是否为空
            if(showposts==''){setTimeout(function(){layer.closeAll('loading');});layer.msg('请输入帖子相关->帖子数量');return false;}
            if(showposts<5){setTimeout(function(){layer.closeAll('loading');});layer.msg('帖子数量要大于或等于5');return false;}
            if(credit_post_number==''){setTimeout(function(){layer.closeAll('loading');});layer.msg('请输入帖子相关->发帖积分');return false;}
            if(credit_reply_number==''){setTimeout(function(){layer.closeAll('loading');});layer.msg('请输入帖子相关->回帖积分');return false;}
            var input_data = $('#update_bbs_info_form').serialize();
            $.ajax({
            type: "POST",
            url:ajax_url_a.jinsom_ajax_url+"/update_bbs_setting.php",
            data: input_data,
            beforeSend: function () {
            $("#bbs_update_button").attr("disabled", true);
            },
            success: function(msg){
            setTimeout(function(){layer.closeAll('loading');});
            layer.msg('论坛设置已更新');
            //function d(){window.location.reload();}
            //setTimeout(d,2500);
            }
            });
            return false;
}

//喜欢动态
function jinsom_like_posts(post_id,obj){
if(!ajax_url_a.is_login){
jinsom_pop_login_style();	
return false;
}
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
var like_num=$(obj).children('span');
var user_id=ajax_url_a.user_id;
var avatar=ajax_url_a.avatar;
if($(obj).hasClass('jinsom-had-like')){
$(obj).removeClass('jinsom-had-like');    
$(obj).addClass('jinsom-no-like');
$(obj).children('i').html('&#xe608;');
like_num.html(parseInt(like_num.html())-1); 
$(obj).parent().next().children('#had_like_'+user_id).remove();
}else{
$(obj).removeClass('jinsom-no-like');    
$(obj).addClass('jinsom-had-like');
$(obj).children('i').html('&#xe66f;');
like_num.html(parseInt(like_num.html())+1);  
$(obj).parent().next().prepend('<a href="#" id="had_like_'+user_id+'">'+avatar+ajax_url_a.verify+'</a>');
if(ajax_url_a.user_like_post_times<ajax_url_a.like_post_times){
layer.msg('喜欢成功，<span class="jinsom-gold-icon"></span> +'+ajax_url_a.like_post_credit+'，<span class="jinsom-exp-icon"></span> +2');
}else{
layer.msg('喜欢成功！');
}
}
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/like_posts.php",
type:'POST',   
data:{like_post_id:post_id,like_type:'post'},    
success:function(results){   
if(results==0){   
layer.msg('你还没有登录');   
}   
}   
}); 
}

//评论动态
function jinsom_comment_posts(post_id,obj){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
if(ajax_url_a.certification){
if(!ajax_url_a.have_phone){
layer.msg('需要绑定手机号才可以进行评论！');	
return false;
}
}
if(ajax_url_a.comments_post_credit<0){
if(ajax_url_a.credit< Math.abs(ajax_url_a.comments_post_credit)){
layer.msg('你的'+ajax_url_a.credit_name+'不足，评论需要'+Math.abs(ajax_url_a.comments_post_credit)+ajax_url_a.credit_name+'！'); 
return false;  
}
}

var comments_cnt=$.trim($("#post_comments"+post_id).val());

var avatar=ajax_url_a.avatar;
var name=ajax_url_a.current_user_name;
var user_id=ajax_url_a.user_id;

if(comments_cnt==''){
layer.msg('评论内容不能为空！');
  return false;
}

comments_cnt=comments_cnt.replace(/\n|\r\n/g,"[br]"); 
layer.load(1);
$.ajax({
type:"POST",
url:ajax_url_a.jinsom_ajax_url+"/comments.php",
data: {comment_content:comments_cnt,comment_post_id:post_id},
success: function(msg) {
layer.closeAll('loading');
if(msg==0){
layer.msg('你还没有登录！', function(){});
}else{
if(ajax_url_a.user_comment_post_times<ajax_url_a.comments_post_times){
if(ajax_url_a.comments_post_credit>0){	
layer.msg('评论成功，<span class="jinsom-gold-icon"></span> +'+ajax_url_a.comments_post_credit+'，<span class="jinsom-exp-icon"></span> +3');
}else{
layer.msg('评论成功，<span class="jinsom-gold-icon"></span> '+ajax_url_a.comments_post_credit+'，<span class="jinsom-exp-icon"></span> +3');	
}
}else{
layer.msg('评论成功！');
}
$('#post_comments'+post_id).val('');
$(obj).parent('#author_textarea').next('.post_comment_list').prepend('<li><div class="avatar">'+avatar+ajax_url_a.verify+'</div><div class="reply"><div class="pc_comment_info"><a href="/?author='+user_id+'?info=home">'+name+'</a>'+ajax_url_a.lv+ajax_url_a.vip+ajax_url_a.honor+'</div><div class="pc_comment_time">刚刚</div></div><div class="comment_body">'+msg+'</div></li>');   

}
},
});
}


//弹窗视频
function jinsom_pop_video(video_url,video_width,video_height,obj){
var title =$(obj).attr('data');
if(title==''){title='每日视频推荐';}
layer.open({
  type: 1,
  title: title,
  area: [video_width+'px',video_height+'px'],
  shade: 0.3,
  resize:false,
  skin:'pop_video',
  closeBtn: 1,
  anim:1,
  shadeClose: false,
  content: '<div id="pop_video"></div>'
});

var dp_pop = new DPlayer({
    element: document.getElementById('pop_video'),
    screenshot: true,
    logo: ajax_url_a.video_logo,
    video: {
        url: video_url
    },
    contextmenu: [ {text:ajax_url_a.site_name,link:ajax_url_a.home_url}]
});

dp_pop.play();
dp_pop.on("error", function(){
layer.msg('视频地址加载失败！');
});
dp_pop.on("fullscreen", function(){
$('.layui-layer-shade').hide();
$('.menu-bar,.jinsom-right-bar').hide();

});
dp_pop.on("fullscreen_cancel", function(){
$('.layui-layer-shade').show();
$('.menu-bar,.jinsom-right-bar').show();
});
}

//ajax更新获取随机标签
function jinsom_get_rand_tags(){
            layer.load(1);
             $.ajax({
            type: "POST",
            url:ajax_url_a.jinsom_ajax_url+"/rand_tags.php",
            data: {get_rand_tags:1},
            success: function(msg){
            setTimeout(function(){layer.closeAll('loading');});
            $('.post_tag_list').empty();
            $('.post_tag_list').html(msg);
            }
            });
            return false;  
}
//ajax更新获取随机标签【文章高级编辑器】
function jinsom_get_rand_tags_page(){
            layer.load(1);
             $.ajax({
            type: "POST",
            url:ajax_url_a.jinsom_ajax_url+"/rand_tags.php",
            data: {get_rand_tags_page:1},
            success: function(msg){
            setTimeout(function(){layer.closeAll('loading');});
            $('.post_tag_list').empty();
            $('.post_tag_list').html(msg);
            }
            });
            return false;  
}
//喜欢论坛
function jinsom_bbs_like(cat_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
   var n=$("#guanzhu_num").val();
  if ($('#bbs_guanzhu').hasClass('had')){
    
            layer.load(1);
            $.ajax({
            type: "POST",
            url:ajax_url_a.jinsom_ajax_url+"/bbs_like.php",
            data: {no_guanzhu:cat_id},
            success: function(msg){
              setTimeout(function(){layer.closeAll('loading');});
              layer.msg('已取消关注！');
              $("#bbs_guanzhu").removeClass("had");
              $("#bbs_guanzhu").html('<i class="jinsom-icon">&#xe6c9;</i> 关 注');
              var n=$("#guanzhu_num").text();
                 n--;
                $("#guanzhu_num").text(n); 
            }
            });
  
  }else{
            layer.load(1);
            $.ajax({
            type: "POST",
            url:ajax_url_a.jinsom_ajax_url+"/bbs_like.php",
            data: {guanzhu:cat_id},
            success: function(msg){
              setTimeout(function(){layer.closeAll('loading');});
              layer.msg('关注成功！');
              $("#bbs_guanzhu").addClass("had");
              $("#bbs_guanzhu").html('<i class="jinsom-icon">&#xe7bc;</i> 已关注');
              var n=$("#guanzhu_num").text();
                 n++;
                $("#guanzhu_num").text(n); 
            }
            });
   
  } 
}
//收藏帖子
function jinsom_like_bbs_posts(post_id,user_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
layer.load(1);
         $.ajax({   
            url:ajax_url_a.jinsom_ajax_url+"/like_posts.php",
            type:'POST',   
            data:{like_post_id:post_id,like_type:'bbs'},    
            success:function(results){   
                if(results==0){   
                    setTimeout(function(){layer.closeAll('loading');});
                    layer.msg('你还没有登录');   
  
                }   
                if (results==2){  //还没喜欢记录 
                     setTimeout(function(){layer.closeAll('loading');});
                    layer.msg('收藏成功！'); 
                    $('#bbs_single_like_num').html('已收藏');
}   
                if (results==1){   
                     setTimeout(function(){layer.closeAll('loading');});
                     layer.msg('取消成功！'); 
                   $('#bbs_single_like_num').html('收藏');
                }  
            }   
        }); 
}









//展示打赏页面
function jinsom_show_reward_page(post_id,author_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/show_reward_page.php",
type:'POST',   
data:{post_id:post_id,author_id},    
success:function(results){
 layer.open({
  title:false,
  type: 1,
  closeBtn: 0,
  skin: 'pop_reward_page', 
  area: ['400px', '363px'], 
  content: results
});
layer.closeAll('loading');
$('.close_reward').click(function(){
layer.closeAll();//关闭打赏页面
});

}   
});  
}
//修改打赏金额
function jinsom_reward_edior_number(number){
    if($('#reward_edior').hasClass('rewarding')){
     $('#reward_edior').removeClass('rewarding');
      $('#reward_edior').html('修改金额');
    $('#change_reward').html('<span>'+number+'.00</span><input type="hidden" name="reward_number" value="'+number+'"></input>');
    }else{
        $('#reward_edior').html('取消');
        $('#reward_edior').addClass('rewarding');
    $('#change_reward').html('<input type="text" id="rewarding_input"  maxlength="4"  name="reward_number"></input>');
    $('#rewarding_input').focus();
}
}

//提交打赏
function put_the_reward_number(post_id){
var reward_number=parseInt($("input[name='reward_number']").val());
var credit_name=ajax_url_a.credit_name;
var avatar=ajax_url_a.avatar;
var name=ajax_url_a.current_user_name;
var vip=ajax_url_a.is_vip;
var user_id=ajax_url_a.user_id;
layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/reward_posts.php",
type:'POST',   
data:{reward_number:reward_number,reward_post_id:post_id},    
success:function(msg){
layer.closeAll('loading');
if(msg==0){
layer.msg('你的'+credit_name+'不足请充值再进行打赏！');
}else if(msg==1){
    layer.msg('打赏的'+credit_name+'只能为'+ajax_url_a.reward_min+'-'+ajax_url_a.reward_max+'！');
}else if(msg==2){
if(vip){
vip='<span class="layui-badge vip_5">vip</span>';
}else{
vip='';
}
layer.msg('已成功打赏'+reward_number+credit_name+'！');
function d(){
layer.closeAll();
$('#post_comments'+post_id).parent('#author_textarea').next('.post_comment_list').prepend('<li><div class="avatar">'+avatar+'</div><div class="reply"><div class="pc_comment_info"><a href="/?author='+user_id+'?info=home">'+name+'</a>'+vip+'</div><div class="pc_comment_time">刚刚</div></div><div class="comment_body"><span class="redbag_icon"></span>打赏了'+reward_number+credit_name+'</div></li>');   

}
setTimeout(d,2500);

}else if(msg==3){
    layer.msg('不能给自己打赏！');	
}else{
    layer.msg('打赏的失败！');
}
}   

});

}

//弹出转载表单、分享表单
function jinsom_reprint_posts_form(post_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}


layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/reprint_posts_form.php",
type:'POST',   
data:{post_id:post_id},    
success:function(results){
var reprint_posts_form=layer.open({
  title:false,
  type: 1,
  closeBtn: 0,
  skin: 'reprint_posts_form', 
  area: ['475px', '325px'], 
  content: results
});
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
});
layer.closeAll('loading');
$('.close_reprint').click(function(){
layer.close(reprint_posts_form);
});

}   
});
}



// 一级转载
function jinsom_reprint_posts(post_id){
if(ajax_url_a.certification){
if(!ajax_url_a.have_phone){
layer.msg('需要绑定手机号才可以进行分享！'); 
return false;
}
}

var content = $('#reprint_content').val();
var reprint_comment=$('#reprint_comment').is(':checked');

if(content==''){content='分享内容';}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/reprint_posts.php",
data: {reprint_content:content,reprint_post_id:post_id,reprint_comment:reprint_comment},
success: function(msg){
layer.closeAll('loading');
if(msg==1){
layer.msg('分享的内容不能超过100字！');
}else{
layer.msg('分享成功！');
function c(){window.location.reload();}
setTimeout(c,1500);
}

}
});

}





// 二级转载
function jinsom_reprint_posts_again(post_id,user_id){
if(ajax_url_a.certification){
if(!ajax_url_a.have_phone){
layer.msg('需要绑定手机号才可以进行分享！'); 
return false;
}
}

var content = $('#reprint_content').val();
var reprint_comment=$('#reprint_comment').is(':checked');
var reprint_comment_source=$('#reprint_comment_source').is(':checked');

if(content==''){content='分享内容';}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/reprint_posts.php",
data: {reprint_again_content:content,reprint_again_post_id:post_id,reprint_again_author_id:user_id,reprint_comment:reprint_comment,reprint_comment_source:reprint_comment_source},
success: function(msg){
layer.closeAll('loading');
if(msg==1){
layer.msg('分享的内容不能超过100字！');
}else{
layer.msg('分享成功！');
function c(){window.location.reload();}
setTimeout(c,1500);
}

}
});

}

//弹出生成密钥的界面
function jinsom_get_key_form(){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_key_form.php",
data: {get_key_form:1},
success: function(msg){

setTimeout(function(){layer.closeAll('loading');});
 layer.open({
  title:'批量生成卡密',
  type: 1,
  area: ['400px', '350px'], 
  content: msg
});

}

});    
}

//弹出论坛设置界面
function jinsom_get_bbs_setting_form(cat_id){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_bbs_setting.php",
data: {cat_id:cat_id},
success: function(msg){

setTimeout(function(){layer.closeAll('loading');});
 layer.open({
 	maxmin: true,
  title:'更新论坛信息',
  type: 1,
  area: ['800px', '600px'], 
  content: msg
});
layui.use('form', function(){
var form = layui.form;
form.render();
form.on('select(power_form)', function(data){
$select_value=parseInt($("#power_form").val());
if($select_value==6){
$("#power_lv").show();    
}else{
$("#power_lv").hide();     
}
});

form.on('select(visit_power_form)', function(data){
$select_value=parseInt($("#visit_power_form").val());
if($select_value==5){
$("#jinsom-visit-power-pass").show();    
}else{
$("#jinsom-visit-power-pass").hide();     
}
});

});
}

});    
}



//弹出购买付费内容
function jinsom_show_pay_form(type,post_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/Pay_for_visible_form.php",
data: {pay_type:type,pay_post_id:post_id},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'购买付费内容',
type: 1,
area: ['600px', '290px'], 
content: msg
});
}
});
}



//显示二级评论框
function jinsom_show_bbs_text_er(obj){
$(obj).parents('.bbs_single_huifu').next().toggle();
}








//快速添加内容到输入框
function jinsom_set_input(dom_id,content) {
$("#"+dom_id).val($("#"+dom_id).val()+content);
$("#"+dom_id).focus();
}




//我的账户页面
function jinsom_show_mycredit_form(){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/show_mywallet_form.php",
data: {show_mycredit:1},
success: function(msg){
layer.closeAll('loading');
 layer.open({
  title:'我的账户钱包',
  type: 1,
  area: ['700px', '550px'], 
  content: msg
});



}
});
}

//充值页面
function jinsom_get_credit_form(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
 // layer.closeAll();
 layer.open({
  title:'账户充值',
  type: 1,
  skin: 'layui-layer-rim', 
  area: ['500px', '450px'], 
  content: $('#get_credit_form'),
  end: function(){
  $('#get_credit_form').hide();
}
});	
}







//动态列表点击显示评论列表
function list_comments_show(obj){
$(obj).parent().siblings('.comments').toggle();
}



//查看密码动态
function jinsom_get_password_posts(post_id,obj){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}

var post_password= $(obj).prev('#post_password_input').val();
if(post_password==''){
layer.msg('请输入密码！');
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/password_posts.php",
data: {post_id:post_id,password:post_password},
success: function(msg){
layer.closeAll('loading');
if(msg==1){
layer.msg('密码正确！');
function d(){window.location.href=ajax_url_a.home_url+'/?p='+post_id;}
setTimeout(d,2500);
}else{
layer.msg('密码错误！');
}
}
});
}

//弹窗选择发表动态方式
function jinsom_publish_style(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
if(ajax_url_a.certification){
if(!ajax_url_a.have_phone){
layer.msg('需要绑定手机号才可以发表内容！');	
return false;
}
}

layer.closeAll(); 
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/publish_posts_style.php",
data: {publish_posts_style:1},
success: function(msg){
setTimeout(function(){layer.closeAll('loading');});
 layer.open({
title:false,
btn: false,
area: ['470px', '150px'],
skin: 'publish_posts_style',
content: msg
})
}
});   
}

//弹窗弹出发表普通动态（文字）表单
function jinsom_publish_words(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
if(ajax_url_a.certification){
if(!ajax_url_a.have_phone){
layer.msg('需要绑定手机号才可以发表动态！');	
return false;
}
}

var power=ajax_url_a.posts_power;
var lv=ajax_url_a.exp;
var psots_lv=ajax_url_a.posts_power_lv;
var vip=ajax_url_a.is_vip;
var admin=ajax_url_a.is_admin;
var verif=ajax_url_a.user_verify;
if(power=='bb'){
  if(vip||admin){
    jinsom_publish_words_js(); 
  }else{
    layer.msg('VIP用户才可以发表！');
    return false;
  }
}else if(power=='cc'){
  if(verif==1||verif==2||admin){
    jinsom_publish_words_js(); 
  }else{
    layer.msg('认证用户才可以发表！');
    return false;
  }
}else if(power=='dd'){
  if(admin){
    jinsom_publish_words_js(); 
  }else{
    layer.msg('管理员才可以发表！');
    return false;
  }
}else if(power=='ee'){
  if(lv>=psots_lv||admin){
    jinsom_publish_words_js(); 
  }else{
    layer.msg('需要'+psots_lv+'经验值才可以发表！');
    return false;
  }
}else{

jinsom_publish_words_js(); 

}//判断发表权限

}


function jinsom_publish_words_js(){
layer.closeAll(); 
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/publish_posts.php",
data: {publish_words:1},
success: function(msg){
setTimeout(function(){layer.closeAll('loading');});
 layer.open({
title:false,
btn: false,
type: 1,
scrollbar: false,
area: ['600px', '610px'],
skin: 'publish_posts',
content: msg,
cancel: function(index, layero){ 
layer.confirm('确定要关闭么', {
  btn: ['确定','取消']
}, function(){
layer.closeAll();
}, function(){

});
return false; 
}
});

 $('#add_tag').tagEditor({ maxLength:10,  placeholder: '请输入标签...' }).attr('readonly', true);

$(".publish_power_a input:first").attr("checked","checked");//设置第一个radio被选中
if ($('#publish_pay').attr("checked")) {
$('.pay_area').show();
}
if ($('#publish_password').attr("checked")) {
$('.publish_password').show();
}
if ($('#publish_private').attr("checked")) {
$('.publish_private_info').show();
$('.publish_hot_tag,.tag-editor').hide();
}

layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
form.on('switch(publish_title)', function (data) {
var publish_title= data.elem.checked; 
if(publish_title==true){
$("#publish_title").show();
$('.publish_title span').html('关闭标题');
}else{
$("#publish_title").hide();
$('.publish_title span').html('开启标题');
}
});

form.on('switch(pay_cnt)', function(data){//监听
pay_cnt_switch=data.elem.checked;
if(pay_cnt_switch){
$('#publish_pay_cnt').show();
}else{
$('#publish_pay_cnt').hide();    
}

});  

form.on('radio(publish_power)', function(data){
  //publish_power=console.log(data.elem); //得到radio原始DOM对象
  publish_power=data.value; //被点击的radio的value值
//判断权限选中项i
if(publish_power==0){
$('.pay_area').hide();   //付费权限模块
$('.publish_password').hide(); //密码权限模块
$('.tag-editor').show();//添加标签模块
$('.publish_hot_tag').show();//热门标签模块
$('.publish_private_info').hide();//私密提醒模块
}
if(publish_power==1){
$('.pay_area').show();  
$('.publish_password').hide(); 
$('.tag-editor').show(); 
$('.publish_hot_tag').show();
$('.publish_private_info').hide();
}
if(publish_power==2){
$('.publish_password').show();
$('.pay_area').hide();
$('.tag-editor').show();
$('.publish_hot_tag').show();
$('.publish_private_info').hide();
}
if(publish_power==3){
$('.pay_area').hide();   
$('.publish_password').hide(); 
$('.tag-editor').hide();
$('.publish_hot_tag').hide();
$('.publish_private_info').show();
}
if(publish_power==4){
$('.pay_area').hide();   
$('.publish_password').hide(); 
$('.tag-editor').show();
$('.publish_hot_tag').show();
$('.publish_private_info').hide();
}


});


});


var upload_total = 9;//最多上传数量
var post_uploader = new plupload.Uploader({//创建实例的构造方法
runtimes: 'gears,html5,html4,silverlight,flash', //上传插件初始化选用那种方式的优先级顺序
browse_button: ['btn2'], // 上传按钮
url: ajax_url_a.jinsom_ajax_url+"/upload_multiple_post_img.php", //远程上传地址
flash_swf_url: 'plupload/Moxie.swf', //flash文件地址
silverlight_xap_url: 'plupload/Moxie.xap', //silverlight文件地址
filters: {
max_file_size: '10mb', //最大上传文件大小（格式100b, 10kb, 10mb, 1gb）
mime_types: [//允许文件上传类型
{title: "files", extensions: "jpg,png,gif,jpeg"}
]
},
multi_selection: true, //true:ctrl多文件上传, false 单文件上传
init: {
FilesAdded: function(up, files) { //文件上传前
var length_has_upload = $("#ul_pics").children("li").length;
if (files.length >= upload_total) { //超过上传总数量则隐藏
$("#local_upload").hide();
}
var li = '';
plupload.each(files, function(file) { //遍历文件
if (length_has_upload <= upload_total) {
li += "<li class='li_upload' id='" + file['id'] + "'><div class='multi_progress'><span class='multi_bar'></span><span class='multi_percent'>0%</span></div></li>";
}
length_has_upload++;
});
$("#ul_pics").prepend(li);
post_uploader.start();
},
UploadProgress: function(up, file) { //上传中，显示进度条
var percent = file.percent;
$("#" + file.id).find('.multi_bar').css({"width": percent + "%"});
$("#" + file.id).find(".multi_percent").text(percent + "%");
},
FileUploaded: function(up, file, info) { //文件上传成功的时候触发
var uploaded_length = $(".img_common").length;
if (uploaded_length <= upload_total) {
var data = eval("(" + info.response + ")");//解析返回的json数据
if (data.message != undefined) {
$("#" + file.id).remove();
layer.msg(data.message);
return false;
}
if(data.error=="0"){
$("#" + file.id).html("<img class='img_common' src='" + data.pic_thum + "' aaaa='"+data.pic+"' bbbb='"+data.pic_thum+"' /><span class='picbg'></span><div  class='uploading-tip' style='overflow: hidden; height: 0px;'><span class='onLandR' onclick='jinsom_reverse_left($(this))'>&lt;</span><span class='onLandR' onclick='jinsom_reverse_right($(this))'>&gt;</span><i class='onDelPic' onclick=jinsom_delPic('" + data.pic + "','" + file.id + "')>×</i></div>");
}else if(data.error=="1"){
layer.msg(data.msg);	
$("#ul_pics").children('li:first').remove();
}else{
layer.msg('上传出错！(10007)');		
}
}
jinsom_showUploadBtn();
jinsom_hover_li();
},
Error: function(up, err) { //上传出错的时候触发
layer.msg(err.message);	
}
}
});
post_uploader.init();



}
});   
}
















//弹窗弹出发表音乐动态（文字）表单
function jinsom_publish_music(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}

if(ajax_url_a.certification){
if(!ajax_url_a.have_phone){
layer.msg('需要绑定手机号才可以发表音乐！');	
return false;
}
}

var power=ajax_url_a.music_power;
var lv=ajax_url_a.exp;
var music_lv=ajax_url_a.music_power_lv;
var vip=ajax_url_a.is_vip;
var admin=ajax_url_a.is_admin;
var verif=ajax_url_a.user_verify;
if(power=='bb'){
  if(vip||admin){
    jinsom_publish_music_js(); 
  }else{
    layer.msg('VIP用户才可以发表！');
    return false;
  }
}else if(power=='cc'){
  if(verif==1||verif==2||admin){
    jinsom_publish_music_js(); 
  }else{
    layer.msg('认证用户才可以发表！');
    return false;
  }
}else if(power=='dd'){
  if(admin){
    jinsom_publish_music_js(); 
  }else{
    layer.msg('管理员才可以发表！');
    return false;
  }
}else if(power=='ee'){
  if(lv>=music_lv||admin){
    jinsom_publish_music_js(); 
  }else{
    layer.msg('需要'+music_lv+'经验值才可以发表！');
    return false;
  }
}else{

jinsom_publish_music_js(); 

}//判断发表权限

}


function jinsom_publish_music_js(){
layer.closeAll(); 
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/publish_posts.php",
data: {publish_music:1},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:false,
btn: false,
scrollbar: false,
type: 1,
area: ['600px', '610px'],
skin: 'publish_posts',
content: msg,
cancel: function(index, layero){ 
layer.confirm('确定要关闭么', {
  btn: ['确定','取消']
}, function(){
layer.closeAll();
}, function(){

});
return false; 
}
});

 $('#add_tag').tagEditor({ maxLength:10, delimiter: ', ', placeholder: '请输入标签...' }).attr('readonly', true);

$(".publish_power_a input:first").attr("checked","checked");//设置第一个radio被选中
if ($('#publish_pay').attr("checked")) {
$('.pay_area').show();
}
if ($('#publish_password').attr("checked")) {
$('.publish_password').show();
}
if ($('#publish_private').attr("checked")) {
$('.publish_private_info').show();
$('.publish_hot_tag,.tag-editor').hide();
}

layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
form.on('switch(publish_title)', function (data) {
var publish_title= data.elem.checked; 
if(publish_title==true){
$("#publish_title").show();
$('.publish_title span').html('关闭标题');
}else{
$("#publish_title").hide();
$('.publish_title span').html('开启标题');
}
});

form.on('radio(publish_power)', function(data){
  //publish_power=console.log(data.elem); //得到radio原始DOM对象
  publish_power=data.value; //被点击的radio的value值
//判断权限选中项i
if(publish_power==0){
$('.pay_area').hide();   //付费权限模块
$('.publish_password').hide(); //密码权限模块
$('.tag-editor').show();//添加标签模块
$('.publish_hot_tag').show();//热门标签模块
$('.publish_private_info').hide();//私密提醒模块
}
if(publish_power==1){
$('.pay_area').show();  
$('.publish_password').hide();   
$('.tag-editor').show(); 
$('.publish_hot_tag').show();
$('.publish_private_info').hide();
}
if(publish_power==2){
$('.publish_password').show();
$('.pay_area').hide(); 
$('.tag-editor').show();
$('.publish_hot_tag').show();
$('.publish_private_info').hide();
}
if(publish_power==3){
$('.pay_area').hide();   
$('.publish_password').hide(); 
$('.tag-editor').hide();
$('.publish_hot_tag').hide();
$('.publish_private_info').show();
}
if(publish_power==4){
$('.pay_area').hide();   
$('.publish_password').hide(); 
$('.tag-editor').show();
$('.publish_hot_tag').show();
$('.publish_private_info').hide();
}

});

});
}
});   
}

//弹窗弹出发表视频表单-发布视频
function jinsom_publish_video(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');   
return false;
}

if(ajax_url_a.certification){
if(!ajax_url_a.have_phone){
layer.msg('需要绑定手机号才可以发表音乐！');   
return false;
}
}

var power=ajax_url_a.video_power;
var lv=ajax_url_a.exp;
var video_lv=ajax_url_a.video_power_lv;
var vip=ajax_url_a.is_vip;
var admin=ajax_url_a.is_admin;
var verif=ajax_url_a.user_verify;
if(power=='bb'){
  if(vip||admin){
    jinsom_publish_video_js(); 
  }else{
    layer.msg('VIP用户才可以发表！');
    return false;
  }
}else if(power=='cc'){
  if(verif==1||verif==2||admin){
    jinsom_publish_video_js(); 
  }else{
    layer.msg('认证用户才可以发表！');
    return false;
  }
}else if(power=='dd'){
  if(admin){
    jinsom_publish_video_js(); 
  }else{
    layer.msg('管理员才可以发表！');
    return false;
  }
}else if(power=='ee'){
  if(lv>=video_lv||admin){
    jinsom_publish_video_js(); 
  }else{
    layer.msg('需要'+video_lv+'经验值才可以发表！');
    return false;
  }
}else{

jinsom_publish_video_js(); 

}//判断发表权限

}



//弹窗弹出发表文章表单
function jinsom_publish_single(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
if(ajax_url_a.certification){
if(!ajax_url_a.have_phone){
layer.msg('需要绑定手机号才可以发表文章！');	
return false;
}
}

var power=ajax_url_a.single_power;
var lv=ajax_url_a.exp;
var single_lv=ajax_url_a.single_power_lv;
var vip=ajax_url_a.is_vip;
var admin=ajax_url_a.is_admin;
var verif=ajax_url_a.user_verify;
if(power=='bb'){
if(vip||admin){
window.location.href=ajax_url_a.home_url+'/?author='+ajax_url_a.user_id+'&info=publish_single';
}else{
layer.msg('VIP用户才可以发表！');
return false;
}
}else if(power=='cc'){
  if(verif==1||verif==2||admin){
window.location.href=ajax_url_a.home_url+'/?author='+ajax_url_a.user_id+'&info=publish_single';
  }else{
    layer.msg('认证用户才可以发表！');
    return false;
  }
}else if(power=='dd'){
  if(admin){
window.location.href=ajax_url_a.home_url+'/?author='+ajax_url_a.user_id+'&info=publish_single'; 
  }else{
    layer.msg('管理员才可以发表！');
    return false;
  }
}else if(power=='ee'){
  if(lv>=single_lv||admin){
window.location.href=ajax_url_a.home_url+'/?author='+ajax_url_a.user_id+'&info=publish_single'; 
  }else{
    layer.msg('需要'+single_lv+'经验值才可以发表！');
    return false;
  }
}else{

window.location.href=ajax_url_a.home_url+'/?author='+ajax_url_a.user_id+'&info=publish_single'; 

}//判断发表权限

}







//弹出选择背景封面图的窗口
function jinsom_publish_posts_skin(){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/publish_posts_skin.php",
data: {publish_posts_skin:1},
success: function(msg){
setTimeout(function(){layer.closeAll('loading');});
 layer.open({
title:false,
btn: false,
area: ['630px', '400px'],
skin: 'publish_posts_skin',
content: msg
})
}
});   
}

//改变动态背景封面图
function jinsom_change_post_skin(skin_id){
var index = layer.open();
layer.close(index);
$('#publish_content').css("background-image","url("+ajax_url_a.theme_url+"/images/style/"+skin_id+".png)");
$('#publish_post_skin').val(skin_id);
}

//移除已经添加的图片(动态&音乐封面)
function jinsom_remove_post_img(obj){
   file_url=$(obj).parent().attr('aaaa');
   $(obj).parent().remove();
   $('.add_new_music_dom').show();
   $('.add_single_images_page').children('m').show();
   $('#publish_single_images').val('');//清空已经选的封面图的值
   $('#select_music_title').parent().siblings('.pop_music_player').find('.music_player_logo').attr('src',ajax_url_a.theme_url+'/images/music_logo.png');
//ajax 后端删除
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/delete_upload_file.php",
data: {file_url:file_url},
success: function(msg){
//删除完成不执行任何
}
});
}

function jinsom_remove_multiple_img(obj){
$(obj).parent().remove();
}



//ajax发表普通动态_提交动态
function jinsom_publish_posts_words(){
	
if(ajax_url_a.publish_post_credit<0){
if(ajax_url_a.credit< Math.abs(ajax_url_a.publish_post_credit)){
layer.msg('你的'+ajax_url_a.credit_name+'不足，发表需要'+Math.abs(ajax_url_a.publish_post_credit)+ajax_url_a.credit_name+'！'); 
return false;  
}
}


    var title=$('#publish_title').val();
    var content=$('#publish_content').val();
    var content_bg=$('#publish_post_skin').val();
    var power=$("input[name='publish_power']:checked").val();
    var pay=$('#publish_pay_number').val();
    var password=$('#publish_password_number').val();
    var tag=$('#add_tag').val();
    var pay_img_on_off=$('#pay_img_on_off').is(':checked');
    var pay_cnt_on_off=$('#pay_cnt_on_off').is(':checked');
    var publish_pay_cnt=$('#publish_pay_cnt').val();
if($.trim(content)==''){
    layer.msg('内容不能为空！');
    return false;
}

if(power==1){
    if(pay==''){
        layer.msg('售价不能为空！');
        return false;
    }
    if(pay_cnt_on_off){
    if(publish_pay_cnt==''){
        layer.msg('请输入隐藏的内容！');
        return false;
    }
    if(publish_pay_cnt.length>500){
        layer.msg('隐藏的内容不能超过500字符！');
        return false;
    }        
}
}

if(power==2){
    if(password==''){
        layer.msg('密码不能为空！');
        return false;
    }
}
if(ajax_url_a.tag_admin){
if(ajax_url_a.is_admin){
if(tag==''&&power!=3){
    layer.msg('至少输入一个标签！');
    return false;
}
}
}else{
if(tag==''&&power!=3){
    layer.msg('至少输入一个标签！');
    return false;
}	
}

var img=[];
var thum=[];
$("#ul_pics").find(".img_common").each(function() {
img.push($(this).attr('aaaa'));
thum.push($(this).attr('src'));
})
new_img=img.join(",");
new_thum=thum.join(",");



content=content.replace(/\n|\r\n/g,"[br]"); 

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/publish_words.php",
data: {post_title:title,post_content:content,post_img:new_img,post_thum:new_thum,post_content_bg:content_bg,post_power:power,post_tag:tag,post_pay:pay,post_password:password,pay_img_on_off:pay_img_on_off,pay_cnt_on_off:pay_cnt_on_off,publish_pay_cnt:publish_pay_cnt},
traditional: true,  
success: function(msg){
layer.closeAll('loading');
if(msg==7){
layer.msg('标题不能超过'+ajax_url_a.posts_title_words+'字！');    
}else if(msg==8){
layer.msg('内容不能超过'+ajax_url_a.posts_cnt_words+'字！');
}else if(msg==9){
layer.msg('售价范围为'+ajax_url_a.publish_price_mini+'-'+ajax_url_a.publish_price_max+'之间！');
}else{
$('#publish_content').val('');

if(ajax_url_a.user_publish_post_times<ajax_url_a.publish_post_times){
if(ajax_url_a.publish_post_credit>0){	
layer.msg('发表成功，<span class="jinsom-gold-icon"></span> +'+ajax_url_a.publish_post_credit+'，<span class="jinsom-exp-icon"></span> +5');
}else{
layer.msg('发表成功，<span class="jinsom-gold-icon"></span> '+ajax_url_a.publish_post_credit+'，<span class="jinsom-exp-icon"></span> +5');	
}
}else{
layer.msg('发表成功！');
}

function d(){window.location.href=ajax_url_a.home_url;}
setTimeout(d,2500);
}

}
});  
}

//ajax发表音乐动态_提交动态
function jinsom_publish_posts_music(){
if(ajax_url_a.publish_post_credit<0){
if(ajax_url_a.credit< Math.abs(ajax_url_a.publish_post_credit)){
layer.msg('你的'+ajax_url_a.credit_name+'不足，发表需要'+Math.abs(ajax_url_a.publish_post_credit)+ajax_url_a.credit_name+'！'); 
return false;  
}
}

var title=$('#publish_title').val();
var content=$('#publish_content').val();
var content_bg=$('#publish_post_skin').val();
var power=$("input[name='publish_power']:checked").val();
var pay=$('#publish_pay_number').val();
var password=$('#publish_password_number').val();
var tag=$('#add_tag').val();
var music_url=$('#jinsom-music-url').val();
if($.trim(content)==''){
layer.msg('内容不能为空！');
return false;
}

if(music_url==''){
layer.msg('你还没有添加音乐！');
return false;
}
if(power==1){
if(pay==''){
layer.msg('售价不能为空！');
return false;
}   
}

if(power==2){
if(password==''){
layer.msg('密码不能为空！');
return false;
}
}

if(ajax_url_a.tag_admin){
if(ajax_url_a.is_admin){
if(tag==''&&power!=3){
layer.msg('至少输入一个标签！');
return false;
}
}
}else{
if(tag==''&&power!=3){
layer.msg('至少输入一个标签！');
return false;
}	
}

content=content.replace(/\n|\r\n/g,"[br]"); 
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/publish_music.php",
data: {post_title:title,post_content:content,post_content_bg:content_bg,post_power:power,post_tag:tag,post_pay:pay,post_password:password,publish_music:1,music_url:music_url},
traditional: true,  
success: function(msg){
layer.closeAll('loading');
if(msg==7){
layer.msg('标题不能超过'+ajax_url_a.posts_title_words+'字！');    
}else if(msg==8){
layer.msg('内容不能超过'+ajax_url_a.posts_cnt_words+'字！');
}else if(msg==9){
layer.msg('售价范围为'+ajax_url_a.publish_price_mini+'-'+ajax_url_a.publish_price_max+'之间！');
}else{
$('#publish_title').val('');
$('#publish_content').val('');


if(ajax_url_a.user_publish_post_times<ajax_url_a.publish_post_times){
if(ajax_url_a.publish_post_credit>0){	
layer.msg('发表成功，<span class="jinsom-gold-icon"></span> +'+ajax_url_a.publish_post_credit+'，<span class="jinsom-exp-icon"></span> +5');
}else{
layer.msg('发表成功，<span class="jinsom-gold-icon"></span> '+ajax_url_a.publish_post_credit+'，<span class="jinsom-exp-icon"></span> +5');	
}
}else{
layer.msg('发表成功！');
}

function d(){window.location.href=ajax_url_a.home_url;}
setTimeout(d,2000);
}
}
});  
}




//ajax发表文章_提交文章_【高级编辑器】
function jinsom_publish_posts_single_page(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}


    var title=$('#bbs_post_title_page').val();
    var content=ue_single.getContent();
    var content_bg=$('#publish_post_skin_page').val();
    var power=$("input[name='publish_power_page']:checked").val();
    var pay=$('#publish_pay_number_page').val();
    var password=$('#publish_password_number_page').val();
    var tag=$('#add_tag_single_page').val();
    var comment_on_off=$('#jinsom-post-comment-on-off').is(':checked');
if($.trim(content)==''||$.trim(title)==''){
    layer.msg('内容和标题不能为空！');
    return false;
}

if(power==1){
    if(pay==''){
        layer.msg('售价不能为空！');
        return false;
    }
}

if(power==2){
    if(password==''){
        layer.msg('密码不能为空！');
        return false;
    }
}




if(ajax_url_a.tag_admin){
if(ajax_url_a.is_admin){
if(tag==''&&power!=3){
    layer.msg('至少输入一个标签！');
    return false;
}
}
}else{
if(tag==''&&power!=3){
    layer.msg('至少输入一个标签！');
    return false;
}	
}



layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/publish_single.php",
data: {post_title:title,post_content:content,post_content_bg:content_bg,post_power:power,post_tag:tag,post_pay:pay,post_password:password,comment_on_off:comment_on_off},
traditional: true,  
success: function(msg){
layer.closeAll('loading');
if(msg==7){
layer.msg('标题不能超过'+ajax_url_a.single_title_max+'字！');    
}else if(msg==8){
layer.msg('内容字数范围'+ajax_url_a.single_cnt_min+'-'+ajax_url_a.single_cnt_max+'字！');
}else if(msg==9){
layer.msg('售价范围为'+ajax_url_a.publish_price_mini+'-'+ajax_url_a.publish_price_max+'之间！');
}else if(msg==6){
layer.msg('你还没有登录，请刷新网页重试！');
}else{
ue_single.execCommand('cleardoc');


if(ajax_url_a.user_publish_post_times<ajax_url_a.publish_post_times){
if(ajax_url_a.publish_post_credit>0){	
layer.msg('发表成功，<span class="jinsom-gold-icon"></span> +'+ajax_url_a.publish_post_credit+'，<span class="jinsom-exp-icon"></span> +5');
}else{
layer.msg('发表成功，<span class="jinsom-gold-icon"></span> '+ajax_url_a.publish_post_credit+'，<span class="jinsom-exp-icon"></span> +5');	
}
}else{
layer.msg('发表成功！');
}
$(window).unbind('beforeunload');
function d(){window.location.href=ajax_url_a.home_url;}
setTimeout(d,2500);
}

}
});  
}


//更新文章数据
function jinsom_update_post_single(post_id){

    var title=$('#bbs_post_title_page').val();
    var content=ue_single.getContent();
    var content_bg=$('#publish_post_skin_page').val();
    var power=$("input[name='publish_power_page']:checked").val();
    var pay=$('#publish_pay_number_page').val();
    var password=$('#publish_password_number_page').val();
    var tag=$('#add_tag_single_page').val();
    var comment_on_off=$('#jinsom-post-comment-on-off').is(':checked');
if($.trim(content)==''||$.trim(title)==''){
    layer.msg('内容和标题不能为空！');
    return false;
}

if(power==1){
    if(pay==''){
        layer.msg('售价不能为空！');
        return false;
    }
}

if(power==2){
    if(password==''){
        layer.msg('密码不能为空！');
        return false;
    }
}


if(ajax_url_a.tag_admin){
if(ajax_url_a.is_admin){
if(tag==''&&power!=3){
    layer.msg('至少输入一个标签！');
    return false;
}
}
}else{
if(tag==''&&power!=3){
    layer.msg('至少输入一个标签！');
    return false;
}   
}


layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update-post/single.php",
data: {post_id:post_id,title:title,content:content,post_content_bg:content_bg,post_power:power,post_tag:tag,post_pay:pay,post_password:password,comment_on_off:comment_on_off},
traditional: true,  
success: function(msg){
layer.closeAll('loading');
if(msg==7){
layer.msg('标题不能超过'+ajax_url_a.single_title_max+'字！');    
}else if(msg==8){
layer.msg('内容字数范围'+ajax_url_a.single_cnt_min+'-'+ajax_url_a.single_cnt_max+'字！');
}else if(msg==9){
layer.msg('售价范围为'+ajax_url_a.publish_price_mini+'-'+ajax_url_a.publish_price_max+'之间！');
}else{

layer.msg('更新成功！');
$(window).unbind('beforeunload');
function d(){window.location.href=ajax_url_a.home_url+'/?p='+post_id;}
setTimeout(d,2500);
}

}
});  






}


//弹窗选择登录方式、登录表单
function jinsom_pop_login_style(){
layer.closeAll(); 
if(!ajax_url_a.qq_login&&!ajax_url_a.weibo_login){
jinsom_pop_login_form();
}else{//QQ和微博登录都没有开启时，直接弹出正常登录
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/pop_login_style.php",
data: {pop_login_style:1},
success: function(msg){
setTimeout(function(){layer.closeAll('loading');});
 layer.open({
title:'支持以下方式登录',
btn: false,
area: ['auto', '180px'],
skin: 'pop_login_style',
content: msg
})
}
});  
} 
}

//弹窗选择注册方式
function jinsom_pop_reg_style(){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/pop_reg_style.php",
data: {pop_reg_style:1},
success: function(msg){
layer.closeAll(); 
setTimeout(function(){layer.closeAll('loading');});
 layer.open({
title:'支持以下方式注册',
btn: false,
area: ['auto', '180px'],
skin: 'pop_reg_style',
content: msg
})
}
});   
}



//弹窗弹出登录框
function jinsom_pop_login_form(){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/pop_login_form.php",
data: {pop_login_form:1},
success: function(msg){
layer.closeAll(); 
setTimeout(function(){layer.closeAll('loading');});
 layer.open({
title:'欢迎回来',
btn: false,
type: 1,
resize:false,
area: ['380px', '250px'],
skin: 'pop_login',
content: msg
})
//弹窗回车登录
$("#pop_login_password").keypress(function(e) {  
if(e.which == 13) {  
   jinsom_pop_up_login(); 
       }  
}); 
}
});   
} 

//弹窗弹出手机注册
function jinsom_pop_reg_phone_form(){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/pop_reg_phone_form.php",
data: {pop_reg_phone_form:1},
success: function(msg){
layer.closeAll(); 
setTimeout(function(){layer.closeAll('loading');});
 layer.open({
title:'手机号注册',
btn: false,
type: 1,
resize:false,
// area: ['380px', '370px'],
skin: 'pop_reg',
content: msg
})

}
});   
} 

//发送手机验证码倒计时
function jinsom_reg_phone_showtime(t){
var reg_username=$('#pop_reg_username').val();
var reg_phone=$('#pop_reg_phone').val();
if(reg_username==''){layer.msg('用户名不能为空！');return false;}
if(reg_phone==''){layer.msg('手机号不能为空！');return false;}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_code.php",
data: {reg_phone_code:reg_phone},
success: function(msg){
layer.closeAll('loading');
if(msg==1){
layer.msg('验证码已发送到你的手机！');  
$('.reg_get_code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time(" + i + ","+t+")", i * 1000);
    }    
}else if(msg==3){
layer.msg('2分钟只能获取一次验证码！');  
}else if(msg==6){
layer.msg('手机号格式错误！');
}else if(msg==7){
layer.msg('该手机号已经注册过了！'); 
}else{
layer.msg(msg, {icon: 2,time: 5000});   //阿里云配置错误 
}

}
}); 
}


//弹窗弹出邮箱注册
function jinsom_pop_reg_mail_form(){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/pop_reg_mail_form.php",
data: {pop_reg_mail_form:1},
success: function(msg){
layer.closeAll(); 
setTimeout(function(){layer.closeAll('loading');});
 layer.open({
title:'邮箱注册',
btn: false,
type: 1,
resize:false,
// area: ['380px', '370px'],
skin: 'pop_reg',
content: msg
})

}
});   
} 

//发送邮箱验证码倒计时
function jinsom_reg_mail_showtime(t){
var reg_username=$('#pop_reg_username').val();
var reg_mail=$('#pop_reg_email').val();
if(reg_username==''){layer.msg('用户名不能为空！');return false;}
if(reg_mail==''){layer.msg('邮箱不能为空！');return false;}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_code.php",
data: {reg_mail_code:reg_mail},
success: function(msg){
layer.closeAll('loading');
if(msg==0){
layer.msg('该邮箱已经被注册！');  
return false;  
}else if(msg==1){
layer.msg('邮箱格式错误！');      
}else if(msg==3){
layer.msg('一分钟只能获取一次！');  
}else if(msg==2){
layer.msg('验证码已发送到邮箱！'); 
$('.reg_get_code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time(" + i + ","+t+")", i * 1000);
    }
}else{
layer.msg('无法获取验证码，请联系管理员！');     
}

}
}); 
}
function jinsom_reg_update_time(num,t) {
if(num == t) {
$(".reg_get_code").val('获取验证码');
$('.reg_get_code').attr("disabled",false); 
$('.reg_get_code').removeClass('no');
}else {
printnr = t-num;
$(".reg_get_code").val('('+ printnr +')重新获取');
$('.reg_get_code').addClass('no');
}

}


//手机号注册
function jinsom_pop_reg_phone(){
var reg_username=$('#pop_reg_username').val();
var reg_phone=$('#pop_reg_phone').val();
var reg_password=$('#pop_reg_password').val();
var reg_code=$('#pop_reg_code').val();
if(reg_code==''){layer.msg('验证码不能为空！');return false;}
if(reg_password==''){layer.msg('密码不能为空！');return false;}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/reg.php",
data: {reg_phone_username:reg_username,reg_phone:reg_phone,reg_phone_password:reg_password,reg_phone_code:reg_code},
success: function(msg){
layer.closeAll('loading');
if(msg==0){
layer.msg('用户名不合法！');  
}else if(msg==1){
layer.msg('该用户名已经被注册！');      
}else if(msg==2){
layer.msg('用户名长度为'+ajax_url_a.reg_name_min+'-'+ajax_url_a.reg_name_max+'字符！');  
}else if(msg==3){
layer.msg('密码长度为'+ajax_url_a.reg_password_min+'-'+ajax_url_a.reg_password_max+'字符！'); 
}else if(msg==6){
layer.msg('获取验证码的手机号与提交的手机号不一致！'); 
}else if(msg==5){
layer.msg('验证码有误！'); 
}else if(msg==4){
layer.msg('注册成功！欢迎你加入！'); 
function a(){window.location.reload();}
setTimeout(a,2500); 
}else{
layer.msg('注册失败！请联系管理员');    
}

}
}); 
}

//邮箱注册
function jinsom_pop_reg_mail(){
var reg_username=$('#pop_reg_username').val();
var reg_mail=$('#pop_reg_email').val();
var reg_password=$('#pop_reg_password').val();
var reg_code=$('#pop_reg_code').val();
var reg_code_switch=ajax_url_a.reg_mail_code_switch;
if(reg_code_switch){
if(reg_code==''){layer.msg('验证码不能为空！');return false;}
}
if(reg_username==''){layer.msg('用户名不能为空！');return false;}
if(reg_mail==''){layer.msg('邮箱不能为空！');return false;}
if(reg_password==''){layer.msg('密码不能为空！');return false;}

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/reg.php",
data: {reg_mail_username:reg_username,reg_mail_email:reg_mail,reg_mail_password:reg_password,reg_mail_code:reg_code},
success: function(msg){
layer.closeAll('loading');

if(reg_code_switch){//开启邮箱验证码的情况
if(msg==0){
layer.msg('用户名不合法！');  
}else if(msg==1){
layer.msg('该用户名已经被注册！');      
}else if(msg==2){
layer.msg('用户名长度为'+ajax_url_a.reg_name_min+'-'+ajax_url_a.reg_name_max+'字符！');  
}else if(msg==3){
layer.msg('密码长度为'+ajax_url_a.reg_password_min+'-'+ajax_url_a.reg_password_max+'字符！'); 
}else if(msg==6){
layer.msg('获取验证码的邮箱与提交的邮箱不一致！'); 
}else if(msg==5){
layer.msg('验证码有误！'); 
}else if(msg==4){
layer.msg('注册成功！欢迎你加入！'); 
function a(){window.location.reload();}
setTimeout(a,2500); 
}else{
layer.msg('注册失败！请联系管理员');     
}

}else{//不开启邮箱验证码的情况

if(msg==0){
layer.msg('用户名不合法！');  
}else if(msg==1){
layer.msg('该用户名已经被注册！');      
}else if(msg==2){
layer.msg('用户名长度为'+ajax_url_a.reg_name_min+'-'+ajax_url_a.reg_name_max+'字符！');  
}else if(msg==8){
layer.msg('该邮箱已经被注册！');      
}else if(msg==9){
layer.msg('邮箱格式有误！');      
}else if(msg==3){
layer.msg('密码长度为'+ajax_url_a.reg_password_min+'-'+ajax_url_a.reg_password_max+'字符！'); 
}else{
layer.msg('注册成功！欢迎你加入！'); 
function a(){window.location.reload();}
setTimeout(a,2500);    
}

}


}
}); 
}

//发表动态，快捷插入标签
function jinsom_shortcut_add_tag(tag_name,obj){
    var all_tag=$('#add_tag').val();
    var arr=new Array();
    arr=all_tag.split(',');
    tag_num=arr.length;
    if(tag_num>2){
        layer.msg('最多只能添加三个标签！'); 
    }else{
      $("#add_tag").tagEditor("addTag",tag_name);
      obj.remove();
    }
}
//高级编辑器
function jinsom_shortcut_add_tag_page(tag_name,obj){
    var all_tag=$('#add_tag_single_page').val();
    var arr=new Array();
    arr=all_tag.split(',');
    tag_num=arr.length;

      $("#add_tag_single_page").tagEditor("addTag",tag_name);
      obj.remove();

}

//统计标签个数 函数
function jinsom_get_all_tag_num(){
if($("#add_tag").length>0){
var all_tag=$('#add_tag').val();//获取原始模型
}else{
var all_tag=$('#add_tag_single_page').val();//获取原始模型
}
    var arr=new Array();
    arr=all_tag.split(',');
    return arr.length;
}

//重新上传音乐
function jinsom_afresh_upload_music(){
jinsom_publish_selete_music();//弹出选择音乐层
}


//弹窗VIP开通
function jinsom_show_vip_form(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
layer.load(1);
if(ajax_url_a.is_vip){
    vip_title='帐号：'+ajax_url_a.current_user_name+' - 续费会员服务';
}else{
    vip_title='帐号：'+ajax_url_a.current_user_name+' - 开通会员服务';
}
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/show_vip_form.php",
data: {show_vip_form:1},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:vip_title,
btn: false,
type: 1,
resize:false,
area: ['450px', '350px'],
skin: 'show_vip_form',
content: msg
})
vip_time=$('#time_type_month').val();
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
form.on('radio(vip_time_type)', function(data){//选择付费模式
  select_vip_time_type=data.value; 
if(select_vip_time_type==0){
$('.time_type_month').show();
$('.time_type_year').hide();
    vip_time=$('#time_type_month').val();
$('#pay_type_credit').html(Math.round((ajax_url_a.vip_pay)*vip_time));
$('#pay_type_yuan').html(Math.round((((ajax_url_a.vip_pay)*vip_time)/ajax_url_a.recharge_ratio)*0.90));
$('#WIDtotal_fee').val(Math.round((((ajax_url_a.vip_pay)*vip_time)/ajax_url_a.recharge_ratio)*0.90));
}
if(select_vip_time_type==1){
$('.time_type_month').hide();
$('.time_type_year').show();
    vip_time=$('#time_type_year').val();
$('#pay_type_credit').html(Math.round((ajax_url_a.vip_pay)*vip_time*12*0.95));
$('#pay_type_yuan').html(Math.round((((ajax_url_a.vip_pay)*vip_time*12)/ajax_url_a.recharge_ratio)*0.90*0.95));
$('#WIDtotal_fee').val(Math.round((((ajax_url_a.vip_pay)*vip_time*12)/ajax_url_a.recharge_ratio)*0.90*0.95));

}

}); //选择付费模式

$("#time_type_month").keyup(function(){
    vip_time=$('#time_type_month').val();
$('#pay_type_credit').html(Math.round((ajax_url_a.vip_pay)*vip_time));
$('#pay_type_yuan').html(Math.round((((ajax_url_a.vip_pay)*vip_time)/ajax_url_a.recharge_ratio)*0.90));
$('#WIDtotal_fee').val(Math.round((((ajax_url_a.vip_pay)*vip_time)/ajax_url_a.recharge_ratio)*0.90));
});
$("#time_type_month").blur(function(){//失去焦点
    vip_time=$('#time_type_month').val();
$('#pay_type_credit').html(Math.round((ajax_url_a.vip_pay)*vip_time));
$('#pay_type_yuan').html(Math.round((((ajax_url_a.vip_pay)*vip_time)/ajax_url_a.recharge_ratio)*0.90));
$('#WIDtotal_fee').val(Math.round((((ajax_url_a.vip_pay)*vip_time)/ajax_url_a.recharge_ratio)*0.90));
});
$("#time_type_year").keyup(function(){
    vip_time=$('#time_type_year').val();
$('#pay_type_credit').html(Math.round((ajax_url_a.vip_pay)*vip_time*12*0.95));
$('#pay_type_yuan').html(Math.round((((ajax_url_a.vip_pay)*vip_time*12)/ajax_url_a.recharge_ratio)*0.90*0.95));
$('#WIDtotal_fee').val(Math.round((((ajax_url_a.vip_pay)*vip_time*12)/ajax_url_a.recharge_ratio)*0.90*0.95));
});
$("#time_type_year").blur(function(){//失去焦点
    vip_time=$('#time_type_year').val();
$('#pay_type_credit').html(Math.round((ajax_url_a.vip_pay)*vip_time*12*0.95));
$('#pay_type_yuan').html(Math.round((((ajax_url_a.vip_pay)*vip_time*12)/ajax_url_a.recharge_ratio)*0.90*0.95));
$('#WIDtotal_fee').val(Math.round((((ajax_url_a.vip_pay)*vip_time*12)/ajax_url_a.recharge_ratio)*0.90*0.95));
});
$('.open_vip_btn').click(function(){
if(vip_time<=0){
    layer.msg('数据无效！10003');
    return false;
}
jinsom_open_vip_credit();//默认付费方式-使用金币
});
form.on('radio(vip_pay_type)', function(data){//选择开通方式
  select_vip_pay_type=data.value; 
if(select_vip_pay_type==0){
$('.pay_type_credit').show();
$('.pay_type_yuan').hide();
$(".open_vip_btn").unbind();//移除提交按钮的点击事件
$('.open_vip_btn').click(function(){
if(vip_time<0){
    layer.msg('数据无效！10003');
    return false;
}
jinsom_open_vip_credit();
});

}
if(select_vip_pay_type==1){
$('.pay_type_credit').hide();
$('.pay_type_yuan').show();
$(".open_vip_btn").unbind();//移除提交按钮的点击事件

//提交支付宝
$('.open_vip_btn').click(function(){
if($('input[name="vip_time_type"]:checked').val()==0){
    vip_time=$('#time_type_month').val();
    vip_fee=Math.round((((ajax_url_a.vip_pay)*vip_time)/ajax_url_a.recharge_ratio)*0.90);
}else{
    vip_time=$('#time_type_year').val();
    vip_fee=Math.round((((ajax_url_a.vip_pay)*vip_time*12)/ajax_url_a.recharge_ratio)*0.90*0.95);    
}
if(Math.round($('#WIDtotal_fee').val())!=vip_fee){
    layer.msg('数据无效！10001');
}else{

var vip_no=$('#alipay_vip_no').val();
var vip_time_type=$('input[name="vip_time_type"]:checked').val();
if(vip_time_type==0){
var vip_time=$('#time_type_month').val();    
}else{
var vip_time=$('#time_type_year').val();     
}

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/open_vip.php",
data: {vip_no:vip_no,vip_time_type:vip_time_type,vip_time:vip_time},
async: false,
success: function(msg){
layer.closeAll('loading');
if(msg==1){
$("form.alipay_vip_form").submit();
jinsom_check_pay_vip(vip_no);
   
}else{
   layer.msg('提交失败！登录信息失效。（10002）'); 

}

}

});    

}
});

}

}); //选择开通方式



}); 



}
});      
}

//使用金币开通VIP会员
function jinsom_open_vip_credit(){
var vip_time_type=$('input[name="vip_time_type"]:checked').val();
if(vip_time_type==0){
var vip_time=$('#time_type_month').val();    
}else{
var vip_time=$('#time_type_year').val();     
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/open_vip.php",
data: {open_vip_credit:1,vip_time_type:vip_time_type,vip_time:vip_time},
async: false,
success: function(msg){
layer.closeAll('loading');
if(msg==1){
layer.msg('你的'+ajax_url_a.credit_name+'不足，请充值！'); 
}else if(msg==2){
layer.msg('开通成功！'); 
function a(){window.location.reload();}
setTimeout(a,2500);  
}else{
   layer.msg('提交失败！登录信息失效。（10002）'); 

}

}

});    
}



//检测判断是否成功付费VIP会员 支付宝
function jinsom_check_pay_vip(vip_no){
layer.closeAll();
layer.confirm(
'<p>请您在新打开页面完成付款！</p><p style="font-size:12px;color: #808080;">支付完成前请不要关闭此窗口。</p>', 
{icon: 3, title:'提示',btn:['支付成功','支付遇到问题'],area: '300px;'}, 
function(index){
layer.close(index);
layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/alipay.php",
type:'POST',   
data:{alipay_vip:vip_no},    
success:function(results){   
if(results==0){   
setTimeout(function(){layer.closeAll('loading');});
layer.msg('您未支付成功！请重试！');   
} else{
setTimeout(function(){layer.closeAll('loading');});
layer.msg('开通成功！');  
} 
}   
}); 
},
//支付失败回调
function(index){
layer.closeAll('loading');
layer.close(index);
jinsom_show_vip_form();//弹出开通会员窗口 
}
); 

}



//弹窗支付宝充值金币、积分
function jinsom_show_recharge_credit_form(){
// layer.closeAll();
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/show_recharge_credit_form.php",
data: {show_recharge_credit_form:1},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'帐号：'+ajax_url_a.current_user_name+' - 充值'+ajax_url_a.credit_name+'服务 - 支付宝',
btn: false,
type: 1,
resize:false,
area: ['450px', '350px'],
skin: 'show_recharge_credit_form',
content: msg
});
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
$("#WIDtotal_fee").keyup(function(){
    recharge_number=$('#WIDtotal_fee').val();
$('#recharge_number').html(recharge_number);
});
$("#WIDtotal_fee").blur(function(){//失去焦点
    recharge_number=$('#WIDtotal_fee').val();
$('#recharge_number').html(recharge_number);
});

});//表单重渲染


}
});
}


//支付宝充值金币提交
function jinsom_alipay_credit_btn(pay_id){
var recharge_num=parseInt($("input[name='WIDtotal_fee']").val());
if(recharge_num<=0){
layer.msg('充值金额至少为1元');  
return false;  
}
$("form.alipay_credit_form").submit();
layer.closeAll();
layer.confirm('<p>请您在新打开页面完成付款！</p><p style="font-size:12px;color: #808080;">支付完成前请不要关闭此窗口。</p>', {icon: 3, title:'提示',btn:['支付成功','支付遇到问题'],area: '300px;'}, 
//支付成功回调
function(index){
layer.close(index);
layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/alipay.php",
type:'POST',   
data:{alipay_credit:pay_id},    
success:function(results){   
if(results==0){   
setTimeout(function(){layer.closeAll('loading');});
layer.msg('您的支付未成功！请重试！'); 
} else{
layer.closeAll('loading');
recharge_number=results*ajax_url_a.recharge_ratio;
layer.msg('充值成功！充值了'+recharge_number+ajax_url_a.credit_name);  
} 
}   
}); 
},
//支付失败回调
function(index){
layer.closeAll('loading');
layer.close(index);
jinsom_show_recharge_credit_form();
}
);    
}



//弹窗卡密充值金币、积分表单
function jinsom_show_secret_recharge_form(){
// layer.closeAll();
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/show_secret_recharge_form.php",
data: {show_secret_recharge_form:1},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'帐号：'+ajax_url_a.current_user_name+' - 充值'+ajax_url_a.credit_name+'服务',
btn: false,
type: 1,
resize:false,
area: ['450px', '250px'],
skin: 'show_secret_recharge_form',
content: msg
});
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
});


}
});
}


//卡密充值金币，积分提交
function jinsom_secret_recharge(){
    var secret_key=$("#secret_number").val();
    if(secret_key==''){
        layer.msg('请输入密钥');
        return false;
    }
            layer.load(1);
            $.ajax({
            type: "POST",
            url:  ajax_url_a.jinsom_ajax_url+"/secret_recharge.php",
            data: {secret_key:secret_key},
            success: function(msg){
        if(msg=='a'){
            setTimeout(function(){layer.closeAll('loading');});
           layer.msg('你输入的密钥已经过期');
        }else if(msg==0){
            setTimeout(function(){layer.closeAll('loading');});
           layer.msg('你输入的密钥不正确');
            }else if(msg=='b'){
            setTimeout(function(){layer.closeAll('loading');});
            layer.msg('你输入的密钥已经被使用了');
            }else if(msg=='c'){
            setTimeout(function(){layer.closeAll('loading');});
            layer.msg('请登录再进行使用');
            }else{
            setTimeout(function(){layer.closeAll('loading');});
            layer.msg('你已成功充值'+msg);
            function d(){window.location.reload();}
            setTimeout(d,1500);
            }
            }
            });
            return false;   
}


//弹窗选择充值方式
function jinsom_recharge_style(){ 
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
layer.open({
content: '请选择你要充值的类型'
,btn: ['支付宝', '卡密充值']
,skin: 'recharge_style'
,btnAlign: 'c'
,yes: function(index, layero){
jinsom_show_recharge_credit_form();
}
,btn2: function(index, layero){
jinsom_show_secret_recharge_form();
}
,cancel: function(){ 
}
});
}


//关注按钮
function jinsom_follow(follow_id,obj){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/follow.php",
data: {follow_id:follow_id},
success: function(msg){
layer.closeAll('loading');
if(msg==0){
layer.msg('已经取消关注！'); 
$(obj).removeClass('has');
$(obj).addClass('no');  
$(obj).html('<i class="jinsom-icon">&#xe68e;</i>关注');
}else if(msg==1){
layer.msg('关注成功！');
$(obj).removeClass('no');
$(obj).addClass('has'); 
$(obj).html('<i class="jinsom-icon">&#xe68d;</i> 已关');     
}else{
layer.msg('相互关注成功！'); 
$(obj).removeClass('no');
$(obj).addClass('has');  
$(obj).html('<i class="jinsom-icon">&#xe63a;</i>互关');    
}
}
}); 
}




//更新用户资料

//基本
function jinsom_update_profile_base(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
var input_data = $('#base_form').serialize();
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_user_profile.php",
data: input_data,
beforeSend: function () {
$("#base_form").attr("disabled", true);
},
success: function(msg){
layer.closeAll('loading');
layer.msg('资料已更新！');
}

}); 
}
//账户设置
function jinsom_update_profile_account(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
var input_data = $('#account_form').serialize();
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_user_profile.php",
data: input_data,
beforeSend: function () {
$("#account_form").attr("disabled", true);
},
success: function(msg){
layer.closeAll('loading');
layer.msg('资料已更新！');
}

});     
}

//账户设置
function jinsom_update_profile_money(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
var input_data = $('#money_form').serialize();
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_user_profile.php",
data: input_data,
success: function(msg){
layer.closeAll('loading');
layer.msg('信息已更新！');
}

});     
}


//修改密码
function jinsom_update_profile_password(user_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
var password_1= $('#pass1').val();
var password_2= $('#pass2').val();
if(password_1==''||password_2==''){
layer.msg('请输入要修改的密码！'); 
return false;   
}
if(password_1!=password_2){
layer.msg('两次输入的密码不一样！');   
return false;    
}

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_user_profile.php",
data: {user_id:user_id,pass1:password_1,pass2:password_2},
beforeSend: function () {
$("#password_form").attr("disabled", true);
},
success: function(msg){
layer.closeAll('loading');
if(msg==5){
layer.msg('密码长度要求为'+ajax_url_a.reg_password_min+'-'+ajax_url_a.reg_password_max+'字符！');     
}else if(msg==2){
layer.msg('两次输入的密码不一样！');
}else{
layer.msg('密码已修改，请重新登录！');
function d(){window.location.href=ajax_url_a.home_url;}setTimeout(d,2500);
}
}

});     
}

//其他资料
function jinsom_update_profile_other_profile(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
var input_data = $('#other_profile_form').serialize();
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_user_profile.php",
data: input_data,
beforeSend: function () {
$("#other_profile_form").attr("disabled", true);
},
success: function(msg){
layer.closeAll('loading');
layer.msg('资料已更新！');
}

});     
}

//修改背景音乐
function jinsom_update_profile_bg_music(){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
var user_id =$('.jinsom-page').attr('user_id');
var bg_music_url=$('#jinsom-bg-music-url').val();
var bg_music_on_off=$('#jinsom-bg-music-on-off').is(':checked');
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_user_profile.php",
data: {user_id:user_id,bg_music_url:bg_music_url,bg_music_on_off:bg_music_on_off},
beforeSend: function () {
$("#other_profile_form").attr("disabled", true);
},
success: function(msg){
layer.closeAll('loading');
layer.msg('资料已更新！');
}

});
}




//修改邮箱
function jinsom_update_user_mail(user_name,user_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_mail_form.php",
data: {user_id:user_id},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'帐号：'+user_name+' - 修改安全邮箱',
btn: false,
type: 1,
resize:false,
area: ['450px', '230px'],
skin: 'update_user_mail',
content: msg
});
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
});


}
});
}



//修改邮箱  获取邮箱验证码
function jinsom_update_mail_get_code(t){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
var mail=$('#user_mail').val();
if(mail==''){
layer.msg('请输入邮箱！');
return false;    
}

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_code.php",
data: {update_mail:mail},
success: function(msg){
layer.closeAll('loading');

if(msg==5){
layer.msg('该邮箱已经被注册！');  
}else if(msg==1){
layer.msg('邮箱格式错误！');      
}else if(msg==3){
layer.msg('一分钟只能获取一次！');  
}else if(msg==2){
layer.msg('验证码已发送到邮箱！'); 
$('.get_mail_code_btn').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_mail_update_time(" + i + ","+t+")", i * 1000);
    }
}else{
layer.msg('无法获取验证码，请联系管理员！');     
}


}
});

}
function jinsom_mail_update_time(num,t) {
if(num == t) {
$(".get_mail_code_btn").val('获取验证码');
$('.get_mail_code_btn').attr("disabled",false); 
$('.get_mail_code_btn').removeClass('no');
}else {
printnr = t-num;
$(".get_mail_code_btn").val('('+ printnr +')重获');
$('.get_mail_code_btn').addClass('no');
}

}

//提交修改邮箱的表单
function jinsom_update_mail(user_id){
var mail=$('#user_mail').val();
var mail_code=$('#mail_code').val();
if(mail==''){
layer.msg('请输入邮箱！');
return false;    
}
if(mail_code==''){
layer.msg('请输入验证码！');
return false;    
}

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_mail.php",
data: {user_id:user_id,update_mail:mail,mail_code:mail_code},
success: function(msg){
layer.closeAll('loading');
if(msg==3){
layer.msg('验证码错误！'); 
}else if(msg==5){
layer.msg('该邮箱已经被绑定！请用该邮箱登录解绑后再尝试！');
}else if(msg==6){
layer.msg('邮箱格式错误！');
}else{
layer.closeAll();
layer.msg('修改成功！'); 
$('#safe_mail').val(msg);
$('.layui-form-mid.mail i.aa').text('修改');
}

}
});

}

//修改手机号
function jinsom_update_user_phone(user_name,user_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_phone_form.php",
data: {user_id:user_id},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'帐号：'+user_name+' - 修改安全手机号',
btn: false,
type: 1,
resize:false,
area: ['450px', '230px'],
skin: 'update_user_phone',
content: msg
});
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
});


}
});
}

//修改手机号  获取手机验证码
function jinsom_update_phone_get_code(t){
var phone=$('#user_phone').val();
if(phone==''){
layer.msg('请输入手机号！');
return false;    
}

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_code.php",
data: {update_phone:phone},
success: function(msg){
layer.closeAll('loading');

if(msg==0){
layer.msg('无法获取验证码（阿里大鱼配置错误或余额不足）');  //阿里大鱼那边的错误
return false;  
}else if(msg==1){
layer.msg('验证码已发送到你的手机！');  
$('.reg_get_code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_phone_update_time(" + i + ","+t+")", i * 1000);
    }    
}else if(msg==3){
layer.msg('2分钟只能获取一次验证码！');  
}else if(msg==6){
layer.msg('手机号格式错误！');
}else if(msg==7){
layer.msg('该手机号已经注册过了！'); 
}else{
layer.msg('无法获取验证码，错误代码：100001（其他原因错误）');   //其他原因错误  
}


}
});

}
function jinsom_phone_update_time(num,t) {
if(num == t) {
$(".get_phone_code_btn").val('获取验证码');
$('.get_phone_code_btn').attr("disabled",false); 
$('.get_phone_code_btn').removeClass('no');
}else {
printnr = t-num;
$(".get_phone_code_btn").val('('+ printnr +')重获');
$('.get_phone_code_btn').addClass('no');
}

}


//提交修改手机号的表单
function jinsom_update_phone(user_id){
var phone=$('#user_phone').val();
var phone_code=$('#phone_code').val();
if(phone==''){
layer.msg('请输入手机号！');
return false;    
}
if(phone_code==''){
layer.msg('请输入验证码！');
return false;    
}

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_phone.php",
data: {user_id:user_id,update_phone:phone,phone_code:phone_code},
success: function(msg){
layer.closeAll('loading');
if(msg==3){
layer.msg('验证码错误！'); 
}else if(msg==5){
layer.msg('该手机号已经被绑定！请解绑后再尝试！');
}else if(msg==6){
layer.msg('手机号格式错误！');
}else{
layer.closeAll();
layer.msg('修改成功！'); 
$('#safe_phone').val(msg);
$('.layui-form-mid.phone i.aa').text('修改');
}

}
});

}



//弹出修改密码表单
function jinsom_update_password_form(user_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}

layer.open({
title:'帐号：'+ajax_url_a.current_user_name+' - 修改密码',
btn: false,
type: 1,
resize:false,
area: ['340px', '225px'],
skin: 'update_password_form',
content: '<div class="layui-form layui-form-pane"><div class="layui-form-item"><label class="layui-form-label">新密码</label><div class="layui-input-inline"><input type="password" id="pass1" placeholder="请输入新密码" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">重复密码</label><div class="layui-input-inline"><input type="password" id="pass2" placeholder="请再次输入密码" class="layui-input"></div></div><div class="update_profile_btn" onclick="jinsom_update_profile_password('+user_id+');">提交修改</div></div>'
});





}


//解绑邮箱
function jinsom_remove_mail(user_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
layer.confirm('你确定要解除邮箱绑定吗', {
  btn: ['确定','按错了'] 
}, function(){

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_mail.php",
data: {user_id:user_id,remove_mail:1},
success: function(msg){
layer.closeAll('loading');
if(msg==1){
layer.msg('解绑成功！'); 
$('.layui-form-mid.mail i.a').remove();
$('#safe_mail').val('');
$('.layui-form-mid.mail i.aa').text('设置');
}else{
layer.msg('解绑失败！请联系管理员');
}

}
});

});
}

//解绑手机号
function jinsom_remove_phone(user_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
layer.confirm('你确定要解除手机号绑定吗', {
  btn: ['确定','按错了'] 
}, function(){

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_phone.php",
data: {user_id:user_id,remove_phone:1},
success: function(msg){
layer.closeAll('loading');
if(msg==1){
layer.msg('解绑成功！'); 
$('.layui-form-mid.phone i.a').remove();
$('.layui-form-mid.phone i.aa').text('设置');
$('#safe_phone').val('');
}else{
layer.msg('解绑失败！请联系管理员');
}

}
});

});
}



//宽屏、窄屏阅读函数
function jinsom_big_screen(obj){

if($(obj).hasClass('no')){
$('.jinsom-content-right').show();
$('.jinsom-content-left').css("width","740px");
$('.bbs_single_c').css("width","580px");
$('.bbs_textarea_er').css({"width":"484px","max-width":"484px"});
$(obj).html('<i class="fa fa-expand"></i> 宽屏阅读');
$(obj).removeClass('no');
}else{
$('.jinsom-content-right').hide();
$('.jinsom-content-left').css("width","1065px");
$('.bbs_single_c').css("width","885px");
$('.bbs_textarea_er').css({"width":"790px","max-width":"790px"});
$(obj).html('<i class="fa fa-compress"></i> 窄屏阅读');
$(obj).addClass('no');
}

}

//忘记密码 第一步 输入用户名/手机号/邮箱
function jinsom_get_password_one_form(){
layer.closeAll();
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_password_form.php",
data: {get_password_one_form:1},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'忘记密码--输入用户信息 1/3',
btn: false,
type: 1,
resize:false,
area: ['450px', '200px'],
skin: 'get_password_one_form',
content: msg
});
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
});

}
});    
}

function jinsom_get_password_two_form(){
var user_name= $('#login_name').val();
if($.trim(user_name)==''){
layer.msg('请输入你的登录账户！');    
return false; 
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_password.php",
data: {get_password_two:1,user_name:user_name},
success: function(msg){
if(msg==0){
layer.closeAll('loading');
layer.msg('你输入的账户不存在！');  
}else{

$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_password_form.php",
data: {get_password_two_form:1,user_id:msg},
success: function(msg){
layer.closeAll();
layer.open({
title:'账户：'+user_name+'--密码找回 2/3',
btn: false,
type: 1,
resize:false,
area: ['450px', '200px'],
skin: 'get_password_two_form',
content: msg
});
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
});

}
});

  
}

}
}); 
    
}

function jinsom_get_password_three_form(user_name){
var get_password_style = $('.get_password_style_form input[name="get_password_style"]:checked ').val();
layer.closeAll();
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_password_form.php",
data: {get_password_three_form:user_name,get_password_style:get_password_style},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'账户：'+user_name+'--密码找回 3/3',
btn: false,
type: 1,
resize:false,
area: ['460px', '280px'],
skin: 'get_password_three_form',
content: msg
});
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
});

}
}); 
}

function jinsom_get_password_finish_form(user_name){
var style=$('#get_password_style').val();
var password_code=$('#get_password_code').val();
var new_password=$('#new_password').val();

if($.trim(password_code)==''||$.trim(new_password)==''){
layer.msg('信息不能为空！'); 
return false;	
}

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_password.php",
data: {style:style,password_code:password_code,new_password:new_password,user_name:user_name},
success: function(msg){
layer.closeAll('loading');

if(msg==5){
layer.msg('密码长度为'+ajax_url_a.reg_password_min+'-'+ajax_url_a.reg_password_max+'字符！'); 
}else if(msg==1){
layer.closeAll();
jinsom_pop_login_form();
function d(){layer.msg('密码重置成功！');}
setTimeout(d,500);

}else{
layer.msg('验证码错误！');	
}

}
}); 

}


//重置密码  获取邮箱验证码
function jinsom_get_password_mail_code(t){
var user_id=$('#get_password_user_id').val();

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_code.php",
data: {get_password_mail_code:user_id},
success: function(msg){
layer.closeAll('loading');

if(msg==5){
layer.msg('非法修改数据！');  
}else if(msg==3){
layer.msg('一分钟只能获取一次！');  
}else if(msg==2){
layer.msg('验证码已发送到邮箱！'); 
$('.get_mail_code_btn').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_password_mail_code_time(" + i + ","+t+")", i * 1000);
    }
}else{
layer.msg('无法获取验证码，请联系管理员！');     
}


}
});

}

function jinsom_password_mail_code_time(num,t) {
if(num == t) {
$(".get_mail_code_btn").val('获取验证码');
$('.get_mail_code_btn').attr("disabled",false); 
$('.get_mail_code_btn').removeClass('no');
}else {
printnr = t-num;
$(".get_mail_code_btn").val('('+ printnr +')重获');
$('.get_mail_code_btn').addClass('no');
}

}



//重置密码  获取手机验证码
function jinsom_get_password_phone_code(t){
var user_id=$('#get_password_user_id').val();

layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/get_code.php",
data: {get_password_phone_code:user_id},
success: function(msg){
layer.closeAll('loading');

if(msg==4){
layer.msg('无法获取验证码（阿里大鱼配置错误或余额不足）');  //阿里大鱼那边的错误
return false;  
}else if(msg==1){
layer.msg('验证码已发送到你的手机！');  
$('.reg_get_code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_password_phone_code_time(" + i + ","+t+")", i * 1000);
    }    
}else if(msg==3){
layer.msg('2分钟只能获取一次验证码！');  
}else if(msg==5){
layer.msg('非法数据！');
}else{
layer.msg('无法获取验证码，错误代码：100001（其他原因错误）');   //其他原因错误  
}


}
});

}

function jinsom_password_phone_code_time(num,t) {
if(num == t) {
$(".get_phone_code_btn").val('获取验证码');
$('.get_phone_code_btn').attr("disabled",false); 
$('.get_phone_code_btn').removeClass('no');
}else {
printnr = t-num;
$(".get_phone_code_btn").val('('+ printnr +')重获');
$('.get_phone_code_btn').addClass('no');
}

}

//完善资料表单
function jinsom_perfect_form(){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/perfect_form.php",
data: {perfect_form:1},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'完善个人信息',
btn: false,
type: 1,
closeBtn: 0,
resize:false,
area: ['450px', '230px'],
skin: 'perfect_form',
content: msg
});
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
});


}
});
}
//完善资料后端处理
function jinsom_perfect(){
var user_name=$('#user_name').val();
if(user_name==''){
layer.msg('请输入你的用户名！');     
return false; 
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/perfect_information.php",
data: {user_name:user_name},
success: function(msg){
layer.closeAll('loading');

if(msg==0){
layer.msg('输入的用户名不合法！'); 
}else if(msg==1){
layer.msg('该用户名已经被注册！'); 
}else if(msg==2){
layer.msg('用户名长度为'+ajax_url_a.reg_name_min+'-'+ajax_url_a.reg_name_max+'字！');  
}else{
layer.msg('设置成功！'); 
function d(){window.location.reload();}
setTimeout(d,2000);
}


}
});
}

//侧栏小工具 分享到微信功能
function jinsom_sidebar_share_wechat(share_url){
layer.load(1);
layer.open({
title:'分享到微信',
btn: false,
type: 1,
resize:false,
area: ['350px', '320px'],
skin: 'sidebar_share_wechat',
content: '<img src="http://qr.liantu.com/api.php?bg=f3f3f3&fg=ff0000&gc=222222&el=l&w=200&m=10&text='+share_url+'"/><p>用微信“扫一扫”</p>',
success: function(layero, index){
layer.closeAll('loading');
}
});    
}

//一键清空所有提醒的消息
function jinsom_clean_all_notice(){
layer.confirm('你确定要清空所有的消息吗？', {
  btn: ['确定','取消'] 
}, function(){

$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/clean_all_notice.php",
data: {clean_all_notice:1},
success: function(msg){   
if(msg==1){
$('#content_tips').html('<div class="empty_tips">有关动态、帖子、系统的消息会显示在这里</div>');
$('#follow_tips').html('<div class="empty_tips">有人喜欢你动态/帖子时会显示在这里</div>');
$('#like_tips').html('<div class="empty_tips">有人关注你时会显示在这里</div>');
$('#head_bell span').remove();
$('.layui-tab-title .content_tips span').remove();
$('.layui-tab-title .follow_tips span').remove();
$('.layui-tab-title .like_tips span').remove();
layer.msg('已经全部清空！');

}else{
layer.msg('清空失败！');
}

}
});

}); 

}

//-----------------首页ajax获取各种类型数据

//ajax后加载要执行的脚本
function jinsom_ajax_get_data_post_js(){
$(".jinsom-post-read-more").click(function(){
if($(this).prev().hasClass('hidden')){
$(this).prev().removeClass('hidden');
$(this).html("收起内容");
}else{
$(this).prev().addClass('hidden');
$(this).html("查看全文");
}
});

//评论框点击变高
$('.post_comments,.bbs_textarea_er').focus(function(){
$(this).css('height','85px');
});

//资料小卡片
$(".jinsom-post-user-info-avatar").hover(function(){
$(this).children('.jinsom-user-info-card').show();
var user_id=$(this).attr('user-data');
if($(this).find('.info_card_loading').css('display')!='none'){
$this=$(this);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/info_card.php",
data: {user_id:user_id,info_card:1},
success: function(msg){
$this.find('.info_card_loading').hide();
$this.find('.info_card_loading').after(msg);
}
});
}
},function(){
$(this).children('.jinsom-user-info-card').hide();
});


}


//获取首页内容的数据
function jinsom_ajax_get_index_posts(obj){
if($('.home_ajax_loading').length>0){
return false;	
}
if($(obj).parent().hasClass('ui-sortable')){
return false;    
}
$('.jinsom-post-list').empty();
$(obj).addClass('on');
$(obj).siblings().removeClass('on');
$('.myself_list').children('li').removeClass('on');
$('.jinsom-post-list').append('<div class="home_ajax_loading"><i class="fa fa-spinner fa-spin"></i> 加载中....</div>');
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/home/get_index_posts.php",
data: {get_index_posts:1},
success: function(msg){   
$('.jinsom-post-list').children('.home_ajax_loading').remove();
$('.jinsom-post-list').append(msg);

//ajax后加载要执行的脚本
jinsom_ajax_get_data_post_js();

}
});

}



//获取动态数据
function jinsom_get_post_data(post_type,obj){
if($('.home_ajax_loading').length>0){
return false;	
}
if($(obj).parent().hasClass('ui-sortable')){
return false;    
}
user_id=$(obj).attr('user_id');
$('.jinsom-post-list').empty();
$(obj).addClass('on');
$(obj).siblings().removeClass('on');
$('.myself_list').children('li').removeClass('on');
$('.jinsom-post-list').append('<div class="home_ajax_loading"><i class="fa fa-spinner fa-spin"></i> 加载中....</div>');
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/home/jinsom_get_post_data.php",
data: {post_type:post_type,user_id:user_id},
success: function(msg){   
$('.jinsom-post-list').children('.home_ajax_loading').remove();
$('.jinsom-post-list').append(msg);
//ajax后加载要执行的脚本
jinsom_ajax_get_data_post_js();
}
});
}




//获取我关注的用户的数据
function jinsom_ajax_get_follow_posts(obj){
if($('.home_ajax_loading').length>0){
return false;	
}
if($(obj).parent().hasClass('ui-sortable')){
return false;    
}
$('.jinsom-post-list').empty();
$(obj).addClass('on');
$(obj).siblings().removeClass('on');
$(obj).parents('.myself').addClass('on');
$(obj).parents('.myself').siblings().removeClass('on');
$('.jinsom-post-list').append('<div class="home_ajax_loading"><i class="fa fa-spinner fa-spin"></i> 加载中....</div>');
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/home/get_follow_posts.php",
data: {get_follow_posts:1},
success: function(msg){   
$('.jinsom-post-list').children('.home_ajax_loading').remove();
$('.jinsom-post-list').append(msg);

//ajax后加载要执行的脚本
jinsom_ajax_get_data_post_js();


}
});

}



//获取我喜欢的动态的数据
function jinsom_ajax_get_like_posts(obj){
if($('.home_ajax_loading').length>0){
return false;	
}
if($(obj).parent().hasClass('ui-sortable')){
return false;    
}
user_id=$(obj).attr('user_id');
$('.jinsom-post-list').empty();
$(obj).addClass('on');
$(obj).siblings().removeClass('on');
$(obj).parents('.myself').addClass('on');
$(obj).parents('.myself').siblings().removeClass('on');
$('.jinsom-post-list').append('<div class="home_ajax_loading"><i class="fa fa-spinner fa-spin"></i> 加载中....</div>');
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/home/get_like_posts.php",
data: {get_like_posts:1,user_id:user_id},
success: function(msg){   
$('.jinsom-post-list').children('.home_ajax_loading').remove();
$('.jinsom-post-list').append(msg);

//ajax后加载要执行的脚本
jinsom_ajax_get_data_post_js();


}
});

}




//获取我自己的动态的数据
function jinsom_ajax_get_my_posts(obj){
user_id=$(obj).attr('user_id');
$('.jinsom-post-list').empty();
$(obj).addClass('on');
$(obj).siblings().removeClass('on');
$(obj).parents('.myself').addClass('on');
$(obj).parents('.myself').siblings().removeClass('on');
$('.jinsom-post-list').append('<div class="home_ajax_loading"><i class="fa fa-spinner fa-spin"></i> 加载中....</div>');
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/home/get_my_posts.php",
data: {get_my_posts:1,user_id:user_id},
success: function(msg){   
$('.jinsom-post-list').children('.home_ajax_loading').remove();
$('.jinsom-post-list').append(msg);


//ajax后加载要执行的脚本
jinsom_ajax_get_data_post_js();


}
});

}

//ajax获取设置页面
function jinsom_ajax_get_setting(obj){
user_id=$(obj).attr('user_id');
$('.jinsom-post-list').empty();
$(obj).addClass('on');
$(obj).siblings().removeClass('on');
$('.jinsom-post-list').append('<div class="home_ajax_loading"><i class="fa fa-spinner fa-spin"></i> 加载中....</div>');
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/home/jinsom-profile.php",
data: {user_id:user_id},
success: function(msg){   
$('.jinsom-post-list').children('.home_ajax_loading').remove();
$('.jinsom-post-list').append(msg);
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
});
}
});
}


//---------------------------此处是ajax加载更多内容

//首页全部的加载更多
function jinsom_ajax_get_more_index(obj){
var page=$(obj).attr('data');
$(obj).html('<i class="fa fa-spinner fa-spin"></i> 加载中....');
ajax_obj=obj;
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/more/get_more_index.php",
data: {page:page},
success: function(msg){   
$(ajax_obj).html('加载更多内容');
if(msg==0){
$(ajax_obj).html('暂没有更多内容');
}else{
$(ajax_obj).before(msg);
paged=parseInt(page)+1;
$(ajax_obj).attr('data',paged);	
}

//ajax后加载要执行的脚本
jinsom_ajax_get_data_post_js();


}
});
}





//获取动态数据_加载更多
function jinsom_get_post_data_more(post_type,obj){
var page=$(obj).attr('data');
user_id=$(obj).attr('user_id');
$(obj).html('<i class="fa fa-spinner fa-spin"></i> 加载中....');
ajax_obj=obj;
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/more/jinsom_get_post_data_more.php",
data: {page:page,user_id:user_id,post_type:post_type},
success: function(msg){   
$(ajax_obj).html('加载更多内容');
if(msg==0){
$(ajax_obj).html('暂没有更多内容');
}else{
$(ajax_obj).before(msg);
paged=parseInt(page)+1;
$(ajax_obj).attr('data',paged);	
}

//ajax后加载要执行的脚本
jinsom_ajax_get_data_post_js();

}
});	
}





//我关注的加载更多
function jinsom_ajax_get_more_follow(obj){
var page=$(obj).attr('data');
$(obj).html('<i class="fa fa-spinner fa-spin"></i> 加载中....');
ajax_obj=obj;
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/more/get_more_follow.php",
data: {page:page},
success: function(msg){   
$(ajax_obj).html('加载更多内容');
if(msg==0){
$(ajax_obj).html('暂没有更多内容');
}else{
$(ajax_obj).before(msg);
paged=parseInt(page)+1;
$(ajax_obj).attr('data',paged);	
}

//ajax后加载要执行的脚本
jinsom_ajax_get_data_post_js();


}
});
}


//我喜欢的加载更多
function jinsom_ajax_get_more_like(obj){
var page=$(obj).attr('data');
var user_id=$(obj).attr('user_id');
$(obj).html('<i class="fa fa-spinner fa-spin"></i> 加载中....');
ajax_obj=obj;
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/more/get_more_like.php",
data: {page:page,user_id:user_id},
success: function(msg){   
$(ajax_obj).html('加载更多内容');
if(msg==0){
$(ajax_obj).html('暂没有更多内容');
}else{
$(ajax_obj).before(msg);
paged=parseInt(page)+1;
$(ajax_obj).attr('data',paged);	
}

//ajax后加载要执行的脚本
jinsom_ajax_get_data_post_js();


}
});
}


//我自己的加载更多
function jinsom_ajax_get_more_self(obj){
var page=$(obj).attr('data');
user_id=$(obj).attr('user_id');
$(obj).html('<i class="fa fa-spinner fa-spin"></i> 加载中....');
ajax_obj=obj;
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/more/get_more_self.php",
data: {page:page,user_id:user_id},
success: function(msg){   
$(ajax_obj).html('加载更多内容');
if(msg==0){
$(ajax_obj).html('暂没有更多内容');
}else{
$(ajax_obj).before(msg);
paged=parseInt(page)+1;
$(ajax_obj).attr('data',paged);	
}

//ajax后加载要执行的脚本
jinsom_ajax_get_data_post_js();


}
});
}


//---------------------ajax加载更多结束








function jinsom_more_bbs_commend_posts(obj){
if($(obj).prev('.bbs_cnt').hasClass('had')){
$(obj).prev('.bbs_cnt').removeClass('had');
$(obj).html('收起列表 <i class="fa fa-angle-up">');	
}else{
$(obj).prev('.bbs_cnt').addClass('had');
$(obj).html('查看更多 <i class="fa fa-angle-down">');
}
}


//投票
function jinsom_bbs_vote(post_id){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
obj = document.getElementsByName("vote_select");
vote_data = [];
for(k in obj){
if(obj[k].checked)
vote_data.push(obj[k].value);
}

if(vote_data.length>0){
vote_data_a = vote_data.join(",");
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/vote.php",
data: {post_id:post_id,vote_data:vote_data_a},
success: function(msg){
if(msg==1){
layer.msg('登录的身份已经失效，请重新登录！');	
}else if(msg==2){
layer.msg('数据异常！');
}else if(msg==3){
layer.msg('你选择的项数太多了！');	
}else if(msg==4){
layer.msg('投票时间已经结束！');	
}else if(msg==5){
layer.msg('你已经投过票了！');	
}else if(msg==7){
layer.msg('新注册用户，当天不能投票！');	
}else if(msg==6){
layer.msg('投票成功！');	
function d(){window.location.reload();}
setTimeout(d,1500);
}else{
layer.msg('投票失败！请联系管理员');	
}

}
});


}else{ //判断是否选择了投票选项

layer.msg('请至少选择一项！');
}

}

//打开链接
function jinsom_post_link(obj){
var post_url=$(obj).parents('a').attr('href');
$(obj).parents('a').removeAttr('href');
var link=$(obj).attr('data');
window.open(link);
function d(){$(obj).parents('a').attr('href',post_url);}
setTimeout(d,1500);

}


//论坛附件类型
function jinsom_bbs_file_style(type){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
layer.open({
content: '请选择你要上传附件的类型'
,btn: ['本地', '外链', '网盘']
,btnAlign: 'c'
,yes: function(index, layero){
layer.closeAll(); 
jinsom_bbs_file_local_add(type);

}
,btn2: function(index, layero){
jinsom_bbs_file_outlink_add(type);
}
,btn3: function(index, layero){
jinsom_bbs_file_pan_add(type);
}
,cancel: function(){ 
}
});
}
//添加本地上传 
function jinsom_bbs_file_local_add(type){

layer.open({
  title:'添加附件-本地',
  type: 1,
  area: ['282px', '230px'], //宽高
  content: '<div class="bbs_add_file_form"><div class="file_progress"><span class="file_bar"></span><span class="file_percent">0%</span></div><div id="bbs_file_local_select_btn" class="bbs_file_local_select_btn opacity"><i class="fa fa-plus"></i> 选择文件<form id="add_file_local" method="post" enctype="multipart/form-data" action="'+ajax_url_a.jinsom_ajax_url+'/upload/file.php"><input id="bbs_file_local_input" type="file" name="file"></form></div><input type="text"  placeholder="请输入附件名称" id="file_name"><input type="hidden"  placeholder="附件地址，需要带http://" id="file_url"><div class="bbs_add_file_btn opacity" onclick="jinsom_bbs_file_insert_local('+type+');">插入附件</div></div>'
});


}




//添加外链 
function jinsom_bbs_file_outlink_add(type){
layer.open({
  title:'添加附件-外链',
  type: 1,
  area: ['282px', '230px'], //宽高
  content: '<div class="bbs_add_file_form"><input type="text"  placeholder="附件地址，需要带http://" id="file_url"><input type="text"  placeholder="附件名称" id="file_name"><div class="bbs_add_file_btn opacity" onclick="jinsom_bbs_file_insert_out('+type+');">插入附件</div></div>'
});
$('#file_url').focus();
}
//添加网盘 
function jinsom_bbs_file_pan_add(type){
layer.open({
  title:'添加附件-网盘',
  type: 1,
  area: ['282px', '280px'], //宽高
  content: '<div class="bbs_add_file_form"><input type="text"  placeholder="附件地址，需要带http://" id="file_url"><input type="text"  placeholder="附件名称" id="file_name"><input type="text"  placeholder="下载密码" id="file_pass"><div class="bbs_add_file_btn opacity" onclick="jinsom_bbs_file_insert_pan('+type+');">插入附件</div></div>'
});
$('#file_url').focus();
}

//编辑器插入-网盘
function jinsom_bbs_file_insert_pan(type){	
var file_url=$('#file_url').val();
var name=$('#file_name').val();
var pass=$('#file_pass').val();
if((name&&file_url)==''){
layer.msg('信息不能为空！');	
return false;
}
if(type==1){
ue.execCommand('inserthtml',' [file url="'+file_url+'" name="'+name+'" pass="'+pass+'" type="3"] ');	
}else if(type==2){
ue_pay.execCommand('inserthtml',' [file url="'+file_url+'" name="'+name+'" pass="'+pass+'" type="3"] ');	
}else{
ue_single.execCommand('inserthtml',' [file url="'+file_url+'" name="'+name+'" pass="'+pass+'" type="3"] ');	
}
layer.closeAll(); 
}
//编辑器插入-本地
function jinsom_bbs_file_insert_local(type){	
var file_url=$('#file_url').val();
var name=$('#file_name').val();
if(file_url==''||name==''){
layer.msg('信息不能为空！');	
return false;
}
if(type==1){
ue.execCommand('inserthtml',' [file url="'+file_url+'" name="'+name+'" type="1"] ');	
}else if(type==2){
ue_pay.execCommand('inserthtml',' [file url="'+file_url+'" name="'+name+'" type="1"] ');
}else{
ue_single.execCommand('inserthtml',' [file url="'+file_url+'" name="'+name+'" type="1"] ');
}

layer.closeAll(); 
}

//编辑器插入-外链
function jinsom_bbs_file_insert_out(type){	
var file_url=$('#file_url').val();
var name=$('#file_name').val();
if((name&&file_url)==''){
layer.msg('信息不能为空！');	
return false;
}

if(type==1){
ue.execCommand('inserthtml',' [file url="'+file_url+'" name="'+name+'" type="2"] ');	
}else if(type==2){
ue_pay.execCommand('inserthtml',' [file url="'+file_url+'" name="'+name+'" type="2"] ');	
}else{
ue_single.execCommand('inserthtml',' [file url="'+file_url+'" name="'+name+'" type="2"] ');	
}
layer.closeAll(); 
}



//显示附件二维码
function jinsom_show_file_code(obj){
down_url=$(obj).attr('data');
layer.load(1);
layer.open({
title:false,
btn: false,
type: 1,
resize:false,
area: ['200px', '200px'],
skin: 'show_file_code',
content: '<img src="http://qr.liantu.com/api.php?el=l&w=200&m=10&text='+down_url+'"/>',
success: function(layero, index){
layer.closeAll('loading');
}
}); 	
}
//显示提现二维码
function jinsom_show_cash_code(obj){
down_url=$(obj).attr('data');
layer.load(1);
layer.open({
title:false,
btn: false,
type: 1,
resize:false,
area: ['200px', '200px'],
skin: 'jinsom-show-cash-code',
content: '<img src="'+down_url+'"/>',
success: function(layero, index){
layer.closeAll('loading');
}
}); 	
}






function jinsom_showUploadBtn() { //是否显示上传按钮
var upload_total=9;
var uploaded_length = $(".img_common").length;
$("#uploaded_length").text(uploaded_length);
var other_length = (upload_total - uploaded_length) > 0 ? upload_total - uploaded_length : 0;
$("#upload_other").text(other_length);
var uploaded_length = $(".img_common").length;
if (uploaded_length >= upload_total) {
$("#local_upload").hide();
} else {
$("#local_upload").show();
}
}

function jinsom_hover_li() {
$("#ul_pics").children(".li_upload").hover(function() {
$(this).find(".uploading-tip").stop().animate({height: '25px'}, 200);
}, function() {
$(this).find(".uploading-tip").stop().animate({height: '0'}, 200);
})
}
   
//向左移动图片
function jinsom_reverse_left(obj) {
var obj_li = obj.parents("li");
var obj_prev = obj_li.prev("li");
if (obj_prev.hasClass("li_upload")) {
obj_li.insertBefore(obj_prev);
obj_li.find(".uploading-tip").css({"height": 0});
}
}

//向右移动图片
function jinsom_reverse_right(obj) {
var obj_li = obj.parents("li");
var obj_next = obj_li.next("li");
if (obj_next.hasClass("li_upload")) {
obj_li.insertAfter(obj_next);
obj_li.find(".uploading-tip").css({"height": 0});
}
}
           
//获取第一张图片(封面)和所有上传的图片
function jinsom_getPics() {
var pics = "";
$("#ul_pics").find(".img_common").each(function() {
pics += $(this).attr("src") + ",";
})
var logo = "";
if ($("#ul_pics").find(".img_common").length > 0) {
logo = $("#ul_pics").find(".img_common").eq(0).attr("src");
}
alert("第一张图片：" + logo + "\n\所有图片：" + pics)
}

//删除图片
function jinsom_delPic(pic, file_id) { //删除图片 参数1图片路径  参数2 随机数
// $.post("del.php", {pic: pic}, function(data) {
$("#" + file_id).remove();
jinsom_showUploadBtn();
// })
}



//弹出提现表单
function jinsom_show_cash_form(){
var cash_ratio=parseInt(ajax_url_a.cash_ratio);
var credit=parseInt(ajax_url_a.credit);
var yuan=parseInt(credit/cash_ratio);
if(ajax_url_a.wechat_cash){
var wechat_cash='<input type="radio" name="cash_type" class="cash_form_type" checked="" title="微信" value="1">';	
}else{
var wechat_cash='';	
}
if(ajax_url_a.alipay_cash){
var alipay_cash='<input type="radio" name="cash_type" class="cash_form_type" checked="" title="支付宝" value="2">';	
}else{
var alipay_cash='';	
}
window.cash_form=layer.open({
  title:'发起提现 - '+ajax_url_a.current_user_name,
  type: 1,
  area: ['282px', '265px'], //宽高
  content: '<div class="show_cash_form layui-form"><div class="cash_form_tip"><p>'+cash_ratio+' '+ajax_url_a.credit_name+' = 1 人民币</p><p>你最多可以申请提现 '+yuan+' 元</p></div><input type="number" id="cash_number"placeholder="提现金额至少'+ajax_url_a.cash_mini_number+'元起"><div class="cash_form_select_type">'+wechat_cash+alipay_cash+'</div><div class="cash_form_btn opacity" onclick="jinsom_add_cash();">申请提现</div></div>'
});
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
});
}

//删除提现收款二维码
function jinsom_delete_cash_img(type,user_id,obj){
$(obj).next('img').remove();
$(obj).remove();
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/update_user_profile.php",
type:'POST',   
data:{cash_type:type,user_id:user_id},    
success:function(results){}
});
}

//提交提现
function jinsom_add_cash(){
var number =$('#cash_number').val();
var type =$("input[name='cash_type']:checked").val();
if(number==''){
layer.msg('请输入提现金额！');	
return false;	
}
layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/cash.php",
type:'POST',   
dataType:'json',
data:{add_cash:1,number:number,type:type},    
success:function(msg){
layer.closeAll('loading');
if(msg.code==1){
layer.msg(msg.msg);
function c(){layer.close(cash_form);}
setTimeout(c,2000);	
}else{
layer.msg(msg.msg);
}

}
});

}

//拒绝提现
function jinsom_refuse_cash(id,user_id,number){
layer.prompt({title: '请填写拒绝原因', formType: 2}, function(text, index){
if(text==''){
layer.msg('原因不能为空！');
return false;	
}else{
layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/cash.php",
type:'POST',   
dataType:'json',
data:{update_cash:id,content:text,status:2,user_id:user_id,number:number},    
success:function(msg){
layer.closeAll('loading');
layer.msg('已经拒绝！');
function c(){layer.close(index);}
setTimeout(c,2000);	
}
});


}
});
}

//通过提现
function jinsom_agree_cash(id){
layer.confirm('你确定要通过吗？', {
  btn: ['确定','取消'] 
}, function(){

layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/cash.php",
type:'POST',   
dataType:'json',
data:{update_cash:id,status:1},    
success:function(msg){
layer.closeAll('loading');
layer.msg('已经通过！');
}
});

});
}

//删除提现
function jinsom_delete_cash(id,obj){
var this_dom=obj;
layer.confirm('你确定要删除记录吗？', {
  btn: ['确定','取消'] 
}, function(){

layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/cash.php",
type:'POST',   
dataType:'json',
data:{delete_cash:id},    
success:function(msg){
layer.closeAll('loading');
layer.msg('删除成功！');
$(this_dom).parents('tr').remove();
}
});

});
}


//偏好设置
function jinsom_preference_setting(){
if($(".preference_setting").css("bottom")=='-182px'){
$('.preference_setting').show();
$(".preference_setting").animate({bottom:"-2px"});
if ($(".preference_skin_list ul").length==0){
$('.preference_skin_list').append('<div class="preference_loading"><i class="fa fa-spinner fa-spin"></i> 加载中...</div>');
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/preference.php",
data: {preference:1},
success: function(msg){
$('.preference_loading').remove();
$('.preference_skin_list').append(msg);


//设置单栏

var bg_skin=GetCookie("bg_skin");


if(bg_skin=='01.css'){
$('.bg_default').removeClass('using');
$('.bg_01').addClass('using');
}else if(bg_skin=='02.css'){
$('.bg_default').removeClass('using');
$('.bg_02').addClass('using');    
}else if(bg_skin=='03.css'){
$('.bg_default').removeClass('using');
$('.bg_03').addClass('using');    
}else if(bg_skin=='04.css'){
$('.bg_default').removeClass('using');
$('.bg_04').addClass('using');    
}else if(bg_skin=='05.css'){
$('.bg_default').removeClass('using');
$('.bg_05').addClass('using');    
}else if(bg_skin=='06.css'){
$('.bg_default').removeClass('using');
$('.bg_06').addClass('using');    
}else if(bg_skin=='07.css'){
$('.bg_default').removeClass('using');
$('.bg_07').addClass('using');    
}else if(bg_skin=='08.css'){
$('.bg_default').removeClass('using');
$('.bg_08').addClass('using');    
}else if(bg_skin=='09.css'){
$('.bg_default').removeClass('using');
$('.bg_09').addClass('using');    
}else{}






}
});
}    

}else{
$(".preference_setting").animate({bottom:"-182px"});
}
}


//关闭偏好设置
function jinsom_close_preference_setting(){
$(".preference_setting").animate({bottom:"-182px"});
}


//获取邀请码
function jinsom_get_invite_code(){
layer.confirm('你确定要获取邀请码吗？', {
  btn: ['确定','取消'] 
}, function(){

layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/invite_code.php",
type:'POST',   
data:{get_invite_code:1},    
success:function(msg){
layer.closeAll();
if(msg==1){
layer.msg('你已经免费获取过了！');	
}else{
layer.msg('获取成功！'); 
$('.setting_invite_form').html(msg);	
}
}
});

});	
}

//获取邀请码
function jinsom_buy_invite_code(){
layer.confirm('你确定要购买邀请码吗？', {
  btn: ['确定','取消'] 
}, function(){

layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/invite_code.php",
type:'POST',   
data:{buy_invite_code:1},    
success:function(msg){
layer.closeAll();
if(msg==1){
layer.msg('你的'+ajax_url_a.credit_name+'不足！');	
}else{
layer.msg('购买成功！'); 
$('.setting_invite_form').html(msg);
}
}
});

});	
}

//弹出邀请注册界面
function jinsom_pop_reg_invite_form(){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/pop_reg_invite_form.php",
data: {pop_reg_invite_form:1},
success: function(msg){
layer.closeAll(); 
 layer.open({
title:'邀请码注册',
btn: false,
type: 1,
resize:false,
// area: ['380px', '370px'],
skin: 'pop_reg',
content: msg
})

}
});   
} 
//提交邀请码注册
function jinsom_pop_reg_invite(){
var user_name=$('#pop_reg_username').val();
var code=$('#pop_reg_code').val();
var pass=$('#pop_reg_password').val();
if(user_name==''){
layer.msg('请输入用户名！');	
return false;
}
if(code==''){
layer.msg('请输入邀请码！');	
return false;
}
if(pass==''){
layer.msg('请输入密码！');	
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/reg.php",
data: {invite_user_name:user_name,invite_code:code,invite_pass:pass},
success: function(msg){
layer.closeAll('loading');
if(msg==1){
layer.msg('邀请码错误！');	
}else if(msg==2){
layer.msg('该邀请码已经被使用！');	
}else if(msg==3){
layer.msg('用户名不合法！');	
}else if(msg==4){
layer.msg('该用户名已经被注册！');	
}else if(msg==5){
layer.msg('用户名长度为'+ajax_url_a.reg_name_min+'-'+ajax_url_a.reg_name_max+'字符！');	
}else if(msg==6){
layer.msg('密码长度为'+ajax_url_a.reg_password_min+'-'+ajax_url_a.reg_password_max+'字符！'); 	
}else if(msg==7){
layer.msg('注册成功！欢迎你加入！'); 
function a(){window.location.reload();}	
setTimeout(a,2500); 
}else{
layer.msg('邀请注册-未知错误！');	
}
  


}
});

}

//追加悬赏
function jinsom_add_bbs_answer_number(post_id){
layer.prompt({title: '请输入要追加的金额',},function(value, index, elem){
var re = /^[0-9]+.?[0-9]*$/;
if (!re.test(value)) {
layer.msg('请输入合法的金额！');	
return false;
}
if(value<=0){
layer.msg('请输入大于0的金额！');	
return false;
}
if(parseInt(ajax_url_a.credit)<value){
layer.msg('你的余额不足！');	
return false;	
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/answer.php",
data: {answer_number:value,post_id:post_id},
success: function(msg){
layer.closeAll('loading');
if(msg==1){
layer.msg('追加成功！');
function a(){layer.closeAll();}	
setTimeout(a,2000); 
}else{
layer.msg('你的余额不足！');	
}
}
});

});	
}

//采纳答案
function jinsom_answer_adopt(obj,post_id){
var comment_id=$(obj).attr('data');
layer.confirm('你要采纳这个答案吗？', {
  btn: ['确定','取消']
}, function(){
layer.msg('采纳成功！');
$(obj).parents('.bbs_single_c').addClass('answer_adopt_floor');
$('.bbs_answer_adopt').remove();
$('#add_bbs_answer_number').remove();
$('.bbs_answer').addClass('ok');
$('.bbs_answer').html('已解决');

$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/answer.php",
data: {answer_adopt:comment_id,post_id:post_id},
success: function(msg){
//
}
});
});
}



//退出登录
function jinsom_login_out(){
layer.confirm('你确定要退出本帐号吗？', {
  btn: ['确定','按错了'] 
}, function(){
layer.msg('已退出，欢迎再次回来！');
$.ajax({
type: "POST",
url:ajax_url_a.jinsom_ajax_url+"/update_user_profile.php",
data: {login_out:1},
success: function(msg){}
});

function d(){window.location.reload();}setTimeout(d,2500);
  
});
}


//动态类型系列

//公开
function jinsom_post_type_open(){
layer.alert('内容',{
title:'公开动态',
skin: 'pop_post_type',
btnAlign: 'c',
content:'这是一篇公开的动态，任何用户都可以看见。'
})    
}
//转载
function jinsom_post_type_reprint(){
layer.alert('内容',{
title:'转载动态',
skin: 'pop_post_type',
btnAlign: 'c',
content:'这是一篇转载类型的动态。'
})    
}

//私密
function jinsom_post_type_private(){
layer.alert('内容',{
title:'私密动态',
skin: 'pop_post_type',
btnAlign: 'c',
content:'这是一篇私密的动态，只有你自己可以看见。'
})    
}

//付费可见
function jinsom_post_type_pay(post_id){
layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/get_post_type_info.php",//获取动态类型说明
type:'POST',   
data:{post_type_pay:post_id},    
success:function(results){
layer.closeAll('loading');
layer.alert('内容', {
title:'付费可见动态',
skin: 'pop_post_type',
btnAlign: 'c',
content:results
}) 
}   
});   
}

//密码可见
function jinsom_post_type_password(post_id){
layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/get_post_type_info.php",//获取动态类型说明
type:'POST',   
data:{post_type_password:post_id},    
success:function(results){
layer.closeAll('loading');
layer.alert('内容', {
title:'密码可见动态',
skin: 'pop_post_type',
btnAlign: 'c',
content:results
}) 
}   
}); 
}

//VIP可见
function jinsom_post_type_vip(post_id){
layer.load(1);
$.ajax({   
url:ajax_url_a.jinsom_ajax_url+"/get_post_type_info.php",//获取动态类型说明
type:'POST',   
data:{post_type_vip:post_id},    
success:function(results){
layer.closeAll('loading');
layer.alert('内容', {
title:'VIP可见动态',
skin: 'pop_post_type',
btnAlign: 'c',
content:results
}) 
}   
});
   
}
//查询当前积分（金币）
function jinsom_check_credit(){
layer.alert('内容',{
title:ajax_url_a.credit_name+'查询',
skin: 'pop_post_type',
btnAlign: 'c',
content:'你当前的'+ajax_url_a.credit_name+'为:<span style="color: rgb(255, 102, 0);font-size: 17px;">'+ajax_url_a.credit+'<span>'
})     
}








//改变动态列表样式
function jinsom_change_post_list_style(url){
     if(url!=""){
           post_style.href=ajax_url_a.theme_url+'/assets/style/'+url;
           var expdate=new Date();
           expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
           SetCookie("post_list_style",url,expdate,"/",null,false);
     }
}

//改变单栏样式
function jinsom_change_layout_style(url){
     if(url!=""){
           single_layout_style.href=ajax_url_a.theme_url+'/assets/style/'+url;
           var expdate=new Date();
           expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
           SetCookie("layout_style",url,expdate,"/",null,false);
     }
}

//菜单固定
function jinsom_change_menu_fixed(url){
     if(url!=""){
           menu_fixed_style.href=ajax_url_a.theme_url+'/assets/style/'+url;
           var expdate=new Date();
           expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
           SetCookie("menu_fixed",url,expdate,"/",null,false);
     }
}

//帖子间隔
function jinsom_change_posts_space(url){
     if(url!=""){
           posts_space_style.href=ajax_url_a.theme_url+'/assets/style/'+url;
           var expdate=new Date();
           expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
           SetCookie("posts_space",url,expdate,"/",null,false);
     }
}

//幻灯片窄屏
function jinsom_change_slides_width(url){
     if(url!=""){
           slides_width_style.href=ajax_url_a.theme_url+'/assets/style/'+url;
           var expdate=new Date();
           expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
           SetCookie("slides_width",url,expdate,"/",null,false);
     }
}

//背景图片
function jinsom_change_bg_skin(bg_url){
     if(bg_url!=""){
           bg_skin_style.href=ajax_url_a.theme_url+'/assets/style/bg/'+bg_url;
           var expdate=new Date();
           expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
           SetCookie("bg_skin",bg_url,expdate,"/",null,false);
     }
}


//弹出添加友链表单
function jinsom_add_link_form(){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/add_link_form.php",
data: {add_link_form:1},
success: function(msg){
layer.closeAll('loading');

layer.open({
title:'添加友链',
type: 1,
area: ['350px'],
skin: 'jinsom-add-link-form',
anim: 0,
content:msg
});	
layui.use('form', function(){
var form = layui.form;
form.render();
});

}
});
}

//提交添加友链
function jinsom_add_link(){
name=$('#jinsom-link-name').val();	
link=$('#jinsom-link-url').val();
avatar=$('#jinsom-link-avatar').val();
desc=$('#jinsom-link-desc').val();
if(name==''){
layer.msg('网站名称不能为空！');
return false;
}
if(link==''){
layer.msg('网站地址不能为空！');
return false;
}
if(desc==''){
layer.msg('网站介绍不能为空！');
return false;
}
if(avatar==''){
layer.msg('网站logo不能为空！');
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/add_link.php",
data: {link:link,desc:desc,name:name,avatar:avatar},
success: function(msg){
layer.closeAll('loading');
layer.msg('添加成功！');
function a(){window.location.reload();}
setTimeout(a,2500); 
}
});

}

//上传友链logo
$('#jinsom-add-link-avatar').die('click').live('change', function(){
$('.jinsom-add-link-avatar span').css('display','inline-block');
$('.jinsom-add-link-avatar span').html('<i class="fa fa-spinner fa-spin"></i> 上传中...');
$("#jinsom-add-link-avatar-form").ajaxSubmit({
success:function(data){
$('.jinsom-add-link-avatar span').hide();
$('.jinsom-add-link-avatar span').html('上传网站logo');
if(data == 0){
return false;          
}else if(data==1){
layer.msg('只能上传图片格式的图片！');
}else if(data==2){
layer.msg('图片大小不能超过2M！');
}else if(data==3){
layer.msg('上传出错了！');
}else{
$('.jinsom-add-link-avatar .avatar').attr('src',data);
$('#jinsom-add-link-avatar').val('');
$('#jinsom-link-avatar').val(data);
}
}, 
error:function(){
layer.msg('上传失败！');
$('.jinsom-add-link-avatar span').hide();
$('.jinsom-add-link-avatar span').html('上传网站logo'); 
$('#jinsom-add-link-avatar').val(''); 
} });
return false;


});


//弹出更新友链表单
function jinsom_update_link_form(id){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/update_link_form.php",
data: {id:id},
success: function(msg){
layer.closeAll('loading');

layer.open({
title:'修改友链',
type: 1,
area: ['350px'],
skin: 'jinsom-add-link-form',
anim: 0,
content:msg
});	
layui.use('form', function(){
var form = layui.form;
form.render();
});

}
});
}

//提交修改友链表单
function jinsom_update_link(id){
name=$('#jinsom-link-name').val();	
link=$('#jinsom-link-url').val();
avatar=$('#jinsom-link-avatar').val();
desc=$('#jinsom-link-desc').val();
number=$('#jinsom-link-number').val();
if(name==''){
layer.msg('网站名称不能为空！');
return false;
}
if(link==''){
layer.msg('网站地址不能为空！');
return false;
}
if(desc==''){
layer.msg('网站介绍不能为空！');
return false;
}
if(number==''){
layer.msg('访问次数不能为空！');
return false;
}
if(avatar==''){
layer.msg('网站logo不能为空！');
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/update_link.php",
data: {id:id,link:link,desc:desc,name:name,avatar:avatar,number:number},
success: function(msg){
layer.closeAll('loading');
layer.msg('修改成功！');
function a(){window.location.reload();}
setTimeout(a,2500); 
}
});
}

//删除友链
function jinsom_delete_link(id){
layer.confirm('确定要删除么', {
  btn: ['确定','取消']
}, function(){
layer.closeAll();
layer.msg('删除成功！');
function a(){window.location.reload();}
setTimeout(a,1500);
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/delete_link.php",
data: {id:id},
success: function(msg){}
});

}, function(){

});
}

//统计友链访问次数
function jinsom_link_visit(id){
times=$('.link_'+id).children('n').html();
$('.link_'+id).children('n').html(parseInt(times)+1);	
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/visit_link.php",
data: {id:id},
success: function(msg){}
});
}


//评论点赞
function jinsom_single_comment_up(comment_id,obj){
if(!ajax_url_a.is_login){
jinsom_pop_login_style();	
return false;
}
if($(obj).hasClass('on')){
// number=parseInt($(obj).children('m').html())-1;	
// $(obj).html('<i class="fa fa-thumbs-o-up"></i><m>'+number+'</m>');
// $(obj).removeClass('on');
layer.msg('你已经点赞！');
}else{
number=parseInt($(obj).children('m').html())+1;	
$(obj).html('<i class="fa fa-thumbs-up"></i><m>'+number+'</m>');
$(obj).addClass('on');	
if(ajax_url_a.user_comment_like_times<ajax_url_a.comment_like_times){
layer.msg('点赞成功，<span class="jinsom-gold-icon"></span> +'+ajax_url_a.comment_like_credit+'，<span class="jinsom-exp-icon"></span> +1');
}else{
layer.msg('点赞成功！');	
}
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/comment_up.php",
data: {comment_id:comment_id,type:2},//点赞
success: function(msg){}
});

}
}

//快捷插入表情
function jinsom_add_smile(a,obj){
content=$(obj).parents('.jinsom-single-expression-btn').prev('textarea').val();
$(obj).parents('.jinsom-single-expression-btn').prev('textarea').val(content+a);
$(obj).parents('.jinsom-single-expression-btn').prev('textarea').focus();
}

//打开单人聊天模式
function jinsom_open_user_chat(user_id,obj){
if($('.jinsom-chat-windows-loading').length>0){
return false;
}
$(obj).children('.jinsom-chat-list-tips').remove();
name=$(obj).find('.name').text();
desc=$(obj).attr('desc');
avatar=$(obj).children('.jinsom-chat-content-recent-user-avatar').html();
count=$(obj).attr('data-count');
status=$(obj).attr('online');
if($('.jinsom-chat-user-window').length==0){
layer.open({
type:1,
anim: 5,
skin: 'jinsom-chat-user-window',
area: ['600px', '540px'],
title: 'jinsom',
shade: 0,
maxmin: true,
resizing: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
$('.jinsom-chat-message-list').css('height',content_height);
},
full: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
$('.jinsom-chat-message-list').css('height',content_height);	
},
restore: function(layero){
$('.jinsom-chat-user-window').css({"top":"0","bottom":"0","margin":"auto","height":540});
$('.jinsom-chat-message-list').css('height',250);

},
end: function(layero){
jinsom_stop_user_Ajax();//关闭窗口时，终止前一个ajax；
},
content: '<div class="jinsom-chat-message-list"></div><div class="jinsom-chat-windows-footer"><div class="jinsom-chat-windows-footer-bar clear"><span class="jinsom-icon" onclick="jinsom_test()">&#xe62a;</span><span class="image one" onclick="jinsom_test()"></span><span class="redbag" onclick="jinsom_test()"></span>	</div><textarea class="jinsom-chat-textarea"></textarea><div class="jinsom-chat-windows-footer-send clear"><div class="jinsom-chat-send-message-btn opacity">发送</div></div></div>'
});  
}else{
jinsom_stop_user_Ajax();//打开另外一个聊天时，终止前一个ajax；
}

$('.jinsom-chat-user-window .layui-layer-title').html('<div class="jinsom-chat-windows-user-header" data="'+user_id+'" count="'+count+'"><div class="jinsom-chat-windows-user-avatar">'+avatar+'</div><div class="jinsom-chat-windows-user-info"><div class="jinsom-chat-windows-user-name">'+name+'</div><span class="jinsom-chat-online-status">'+status+'</span><div class="jinsom-chat-windows-user-desc">'+desc+'</div>	</div></div>');
$('.jinsom-chat-message-list').empty();
$('.jinsom-chat-message-list').append('<div class="jinsom-chat-windows-loading"></div>');

$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-chat-message-list.php",
data: {user_id:user_id},
success: function(msg){
$('.jinsom-chat-message-list').empty();
$('.jinsom-chat-message-list').append(msg); 
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight); 
}
});


jinsom_ajax_get_messages();//发起长轮询


}


//单对单聊天长轮询
function jinsom_ajax_get_messages(){
count=$('.jinsom-chat-user-window .jinsom-chat-windows-user-header').attr('count');
user_id=$('.jinsom-chat-user-window .jinsom-chat-windows-user-header').attr('data');
jinsom_user_chat_ajax = $.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-chat-message-list-ajax.php",
timeout:30000,
dataType: 'json',
data: {user_id:user_id,count:count},
success: function(msg){
if(msg.code==1){
// layer.msg('暂没有消息！');	
jinsom_ajax_get_messages();	
}else if(msg.code==2){
$('.jinsom-chat-message-list').append(msg.msg);	
audio = document.getElementById('audio');
audio.play();
$('.jinsom-chat-user-window .jinsom-chat-windows-user-header').attr('count',msg.count);
$('.jinsom-chat-content-recent-user').children('li[data-id="'+user_id+'"]').attr('data-count',msg.count);
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight);
jinsom_ajax_get_messages();
}else if(msg.code==3){
// layer.msg('关闭了！不再ajax了');
}else{
jinsom_ajax_get_messages();	
}
},
error:function(XMLHttpRequest,textStatus,errorThrown){ 
if(textStatus=="timeout"){ 
jinsom_ajax_get_messages();
} 
} 
});	
}

//终止单对单ajax长轮询
function jinsom_stop_user_Ajax(){   
if(jinsom_user_chat_ajax) {jinsom_user_chat_ajax.abort();}  
}  



//打开群组聊天模式
function jinsom_open_group_chat(bbs_id,obj){
if($('.jinsom-chat-windows-group-loading').length>0){
return false;
}
name=$(obj).find('.name').text();
desc=$(obj).attr('desc');
avatar=$(obj).children('.jinsom-chat-content-recent-user-avatar').html();
notice=$(obj).attr('notice');
number=$(obj).attr('number');
if($('.jinsom-chat-group-window').length==0){
layer.open({
type:1,
anim: 5,
skin: 'jinsom-chat-group-window',
area: ['750px', '540px'],
title: 'jinsom',
shade: 0,
maxmin: true,
resizing: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
right_height=459+add_height;
$('.jinsom-chat-windows-right').css('height',right_height);
$('.jinsom-chat-message-group-list').css('height',content_height);
},
full: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
right_height=459+add_height;
$('.jinsom-chat-windows-right').css('height',right_height);
$('.jinsom-chat-message-group-list').css('height',content_height);	
},
restore: function(layero){
$('.jinsom-chat-group-window').css({"top":"0","bottom":"0","margin":"auto","height":540});
$('.jinsom-chat-message-group-list').css('height',250);
$('.jinsom-chat-windows-right').css('height',459);
},
end: function(layero){
jinsom_stop_group_Ajax();//关闭窗口时，终止前一个ajax；
},
content: '<div class="jinsom-chat-windows-left"><div class="jinsom-chat-message-group-list"></div><div class="jinsom-chat-windows-footer"><div class="jinsom-chat-windows-footer-bar clear"><span class="jinsom-icon" onclick="jinsom_test()">&#xe62a;</span><span class="image group"><form id="jinsom-upload-group-img-form" method="post" enctype="multipart/form-data" action="'+ajax_url_a.module_url+'/upload/group-img.php"><input id="jinsom-upload-group-img" type="file" name="file" title="点击上传图片"><input type="hidden" name="bbs_id" id="jinsom-upload-group-bbs-id" value="'+bbs_id+'"></form></span><span class="redbag" onclick="jinsom_test()"></span><span class="touzi" onclick="jinsom_test()"></span><span class="jinsom-upload-group-img-loading"></span>	</div><textarea class="jinsom-chat-textarea-group"></textarea><div class="jinsom-chat-windows-footer-send clear"><div class="jinsom-chat-send-message-btn-group opacity">发送</div></div></div></div><div class="jinsom-chat-windows-right"><div class="jinsom-chat-group-notice"><div class="jinsom-chat-group-notice-title">群公告</div><div class="jinsom-chat-group-notice-desc"></div></div><div class="jinsom-chat-group-user"><div class="jinsom-chat-group-user-number">群成员 <span></span></div><div class="jinsom-chat-group-user-list"></div></div></div>'
});  
}else{
jinsom_stop_group_Ajax();//打开另外一个群组时，终止前一个ajax；
}


$('.jinsom-chat-group-window .layui-layer-title').html('<div class="jinsom-chat-windows-user-header" bbs-id="'+bbs_id+'"><div class="jinsom-chat-windows-user-avatar">'+avatar+'</div><div class="jinsom-chat-windows-user-info"><div class="jinsom-chat-windows-user-name">'+name+'</div><div class="jinsom-chat-windows-user-desc">'+desc+'</div>	</div></div>');
$('.jinsom-chat-group-notice-desc').html(notice);
$('.jinsom-chat-group-user-number span').html('（'+number+'人）');
$('.jinsom-chat-message-group-list').empty();//群组记录
$('.jinsom-chat-group-user-list').empty();//群组成员
$('.jinsom-chat-message-group-list').append('<div class="jinsom-chat-windows-group-loading"></div>');
$('.jinsom-chat-group-user-list').append('<div class="jinsom-chat-group-user-list-loading"></div>');
$('#jinsom-upload-group-bbs-id').val(bbs_id);

//获取群组消息
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-chat-message-group-list.php",
data: {bbs_id:bbs_id},
dataType: 'json',
success: function(msg){
$('.jinsom-chat-group-window .jinsom-chat-windows-user-header').attr('count',msg.count);
$('.jinsom-chat-message-group-list').empty();
$('.jinsom-chat-message-group-list').append(msg.msg); 
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);

//图片加载完毕执行
$(".jinsom-chat-message-list-content img").load( function(){
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
} );


}
});

//获取群组侧栏成员
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-chat-group-user-list.php",
data: {bbs_id:bbs_id},
success: function(msg){
$('.jinsom-chat-group-user-list').empty();
$('.jinsom-chat-group-user-list').append(msg); 
}
});

jinsom_ajax_get_messages_group();//发起长轮询

}


//群组聊天长轮询
function jinsom_ajax_get_messages_group(){
count=$('.jinsom-chat-group-window .jinsom-chat-windows-user-header').attr('count');
bbs_id=$('.jinsom-chat-group-window .jinsom-chat-windows-user-header').attr('bbs-id');
jinsom_user_chat_group_ajax = $.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-chat-message-group-list-ajax.php",
timeout:30000,
dataType: 'json',
data: {bbs_id:bbs_id,count:count},
success: function(msg){
if(msg.code==1){
// layer.msg('暂没有消息！');	
jinsom_ajax_get_messages_group();	
}else if(msg.code==2){
$('.jinsom-chat-message-group-list').append(msg.msg);	
// audio = document.getElementById('audio');
// audio.play();
$('.jinsom-chat-group-window .jinsom-chat-windows-user-header').attr('count',msg.count);
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
function c(){
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
}
setTimeout(c,300);
jinsom_ajax_get_messages_group();
}else if(msg.code==3){
// layer.msg('关闭了！不再ajax了');
jinsom_ajax_get_messages_group();
}
},
error:function(XMLHttpRequest,textStatus,errorThrown){ 
if(textStatus=="timeout"){ 
jinsom_ajax_get_messages_group();
} 
} 
});	
}

//终止群组ajax长轮询
function jinsom_stop_group_Ajax(){   
if(jinsom_user_chat_group_ajax) {jinsom_user_chat_group_ajax.abort();}  
}  


// 个人主页单独打开单人聊天
function jinsom_open_user_chat_home(user_id,obj){
if($('.jinsom-chat-windows-loading').length>0){
return false;
}
name=$('.jinsom-member-username h1').html();
desc=$('.jinsom-member-desc').html();
avatar=$('.jinsom-member-avatar').children('img').attr('src');
count=$(obj).attr('count');
status=$(obj).attr('online');
if($('.jinsom-chat-user-window').length==0){
layer.open({
type:1,
anim: 5,
skin: 'jinsom-chat-user-window',
area: ['600px', '540px'],
title: 'jinsom',
shade: 0,
maxmin: true,
resizing: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
$('.jinsom-chat-message-list').css('height',content_height);
},
full: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
$('.jinsom-chat-message-list').css('height',content_height);	
},
restore: function(layero){
$('.jinsom-chat-user-window').css({"top":"0","bottom":"0","margin":"auto","height":540});
$('.jinsom-chat-message-list').css('height',250);
},
end: function(layero){
jinsom_stop_user_Ajax();//关闭窗口时，终止前一个ajax；
},
content: '<div class="jinsom-chat-message-list"></div><div class="jinsom-chat-windows-footer"><div class="jinsom-chat-windows-footer-bar clear"><span class="jinsom-icon" onclick="jinsom_test()">&#xe62a;</span><span class="image one" onclick="jinsom_test()"></span><span class="redbag" onclick="jinsom_test()"></span>	</div><textarea class="jinsom-chat-textarea"></textarea><div class="jinsom-chat-windows-footer-send clear"><div class="jinsom-chat-send-message-btn opacity">发送</div></div></div>'
});  
}else{
jinsom_stop_user_Ajax();//打开另外一个聊天时，终止前一个ajax；
}

$('.jinsom-chat-user-window .layui-layer-title').html('<div class="jinsom-chat-windows-user-header" data="'+user_id+'" count="'+count+'"><div class="jinsom-chat-windows-user-avatar"><img src="'+avatar+'"></div><div class="jinsom-chat-windows-user-info"><div class="jinsom-chat-windows-user-name">'+name+'</div><span class="jinsom-chat-online-status">'+status+'</span><div class="jinsom-chat-windows-user-desc">'+desc+'</div>	</div></div>');
$('.jinsom-chat-message-list').empty();
$('.jinsom-chat-message-list').append('<div class="jinsom-chat-windows-loading"></div>');

$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-chat-message-list.php",
data: {user_id:user_id},
success: function(msg){
$('.jinsom-chat-message-list').empty();
$('.jinsom-chat-message-list').append(msg); 
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight); 
}
});

jinsom_ajax_get_messages();//发起长轮询

}

//资料卡片单独打开单人聊天
function jinsom_open_user_chat_card(user_id,obj){
$('.jinsom-group-user-info').remove();
if($('.jinsom-chat-windows-loading').length>0){
return false;
}
name=$(obj).parent('.info_card_btn').siblings('.info_card_bg').find('.info_card_user_name').html();
desc=$(obj).parent('.info_card_btn').siblings('.info_card_bg').children('.info_card_desc').html();
avatar=$(obj).parent('.info_card_btn').siblings('.info_card_bg').children('.info_card_avatar').html();
count=$(obj).attr('count');
status=$(obj).attr('online');
if($('.jinsom-chat-user-window').length==0){
layer.open({
type:1,
anim: 5,
skin: 'jinsom-chat-user-window',
area: ['600px', '540px'],
title: 'jinsom',
shade: 0,
maxmin: true,
resizing: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
$('.jinsom-chat-message-list').css('height',content_height);
},
full: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
$('.jinsom-chat-message-list').css('height',content_height);	
},
restore: function(layero){
$('.jinsom-chat-user-window').css({"top":"0","bottom":"0","margin":"auto","height":540});
$('.jinsom-chat-message-list').css('height',250);
},
end: function(layero){
jinsom_stop_user_Ajax();//关闭窗口时，终止前一个ajax；
},
content: '<div class="jinsom-chat-message-list"></div><div class="jinsom-chat-windows-footer"><div class="jinsom-chat-windows-footer-bar clear"><span class="jinsom-icon" onclick="jinsom_test()">&#xe62a;</span><span class="image one" onclick="jinsom_test()"></span><span class="redbag" onclick="jinsom_test()"></span>	</div><textarea class="jinsom-chat-textarea"></textarea><div class="jinsom-chat-windows-footer-send clear"><div class="jinsom-chat-send-message-btn opacity">发送</div></div></div>'
});  
}else{
jinsom_stop_user_Ajax();//打开另外一个聊天时，终止前一个ajax；
}

$('.jinsom-chat-user-window .layui-layer-title').html('<div class="jinsom-chat-windows-user-header" data="'+user_id+'" count="'+count+'"><div class="jinsom-chat-windows-user-avatar">'+avatar+'</div><div class="jinsom-chat-windows-user-info"><div class="jinsom-chat-windows-user-name">'+name+'</div><span class="jinsom-chat-online-status">'+status+'</span><div class="jinsom-chat-windows-user-desc">'+desc+'</div>	</div></div>');
$('.jinsom-chat-message-list').empty();
$('.jinsom-chat-message-list').append('<div class="jinsom-chat-windows-loading"></div>');

$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-chat-message-list.php",
data: {user_id:user_id},
success: function(msg){
$('.jinsom-chat-message-list').empty();
$('.jinsom-chat-message-list').append(msg); 
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight); 
}
});
jinsom_ajax_get_messages();//发起长轮询
}


//群组里打开群成员的聊天窗口
function jinsom_open_user_chat_group_user_list(user_id,obj){
if(user_id==ajax_url_a.user_id){layer.msg('你不能跟自己聊天！');return false;}
if($('.jinsom-chat-windows-loading').length>0){
return false;
}
name=$(obj).children('span').html();
desc=$(obj).attr('desc');
avatar=$(obj).children('img').attr('src');
count=$(obj).attr('count');
status=$(obj).attr('online');
if($('.jinsom-chat-user-window').length==0){
layer.open({
type:1,
anim: 5,
skin: 'jinsom-chat-user-window',
area: ['600px', '540px'],
title: 'jinsom',
shade: 0,
maxmin: true,
resizing: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
$('.jinsom-chat-message-list').css('height',content_height);
},
full: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
$('.jinsom-chat-message-list').css('height',content_height);	
},
restore: function(layero){
$('.jinsom-chat-user-window').css({"top":"0","bottom":"0","margin":"auto","height":540});
$('.jinsom-chat-message-list').css('height',250);
},
end: function(layero){
jinsom_stop_user_Ajax();//关闭窗口时，终止前一个ajax；
},
content: '<div class="jinsom-chat-message-list"></div><div class="jinsom-chat-windows-footer"><div class="jinsom-chat-windows-footer-bar clear"><span class="jinsom-icon" onclick="jinsom_test()">&#xe62a;</span><span class="image one" onclick="jinsom_test()"></span><span class="redbag" onclick="jinsom_test()"></span>	</div><textarea class="jinsom-chat-textarea"></textarea><div class="jinsom-chat-windows-footer-send clear"><div class="jinsom-chat-send-message-btn opacity">发送</div></div></div>'
});  
}else{
jinsom_stop_user_Ajax();//打开另外一个聊天时，终止前一个ajax；
}

$('.jinsom-chat-user-window .layui-layer-title').html('<div class="jinsom-chat-windows-user-header" data="'+user_id+'" count="'+count+'"><div class="jinsom-chat-windows-user-avatar"><img src="'+avatar+'"></div><div class="jinsom-chat-windows-user-info"><div class="jinsom-chat-windows-user-name">'+name+'</div><span class="jinsom-chat-online-status">'+status+'</span><div class="jinsom-chat-windows-user-desc">'+desc+'</div>	</div></div>');
$('.jinsom-chat-message-list').empty();
$('.jinsom-chat-message-list').append('<div class="jinsom-chat-windows-loading"></div>');

$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-chat-message-list.php",
data: {user_id:user_id},
success: function(msg){
$('.jinsom-chat-message-list').empty();
$('.jinsom-chat-message-list').append(msg); 
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight); 
}
});
jinsom_ajax_get_messages();//发起长轮询
}

//群聊显示用户资料卡片
function jinsom_chat_group_show_user_info(user_id,obj){
this_dom=obj;
if($('.jinsom-group-user-info').length==0){
$(this_dom).prepend('<i class="fa fa-spinner fa-spin"></i>');
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/info_card.php",
data: {user_id:user_id,info_card:1},
success: function(msg){
$(this_dom).find('i').remove();
layer.open({
title:false,
type:1,
area: ['375px', '260px'],
shade: 0,
skin: 'jinsom-group-user-info',
move: '.info_card_bg',
content: msg
}); 
}
});	
}else{
layer.msg('请关闭另外一个资料卡');
return false;	
}
}


//加入群聊
function jinsom_join_group_chat(bbs_id,obj){
if(ajax_url_a.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
this_dom=obj;
$(this_dom).html('<i class="fa fa-spinner fa-spin"></i> 进入中...');
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-join-group-chat.php",
data: {bbs_id:bbs_id},
success: function(msg){
$(this_dom).html('加入群聊');
if(msg==1){
jinsom_open_group_chat_bbs(bbs_id);
}else if(msg==2){
layer.msg('请先关注论坛才可以加入群聊！');	
}else if(msg==3){
jinsom_pop_login_style();
}
}
});	
}


//论坛页面打开群聊窗口
function jinsom_open_group_chat_bbs(bbs_id){
if($('.jinsom-chat-windows-group-loading').length>0){
return false;
}
name=$('.bbs_header_c .bbs_name').text();
desc=$('.bbs_jianjie p').html();
avatar=$('.bbs_header_avatar a').html();
notice=$('.jinsom-join-group-chat').attr('notice');
number=$('.jinsom-join-group-chat').attr('number');
if($('.jinsom-chat-group-window').length==0){
layer.open({
type:1,
anim: 5,
skin: 'jinsom-chat-group-window',
area: ['750px', '540px'],
title: 'jinsom',
shade: 0,
maxmin: true,
resizing: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
right_height=459+add_height;
$('.jinsom-chat-windows-right').css('height',right_height);
$('.jinsom-chat-message-group-list').css('height',content_height);
},
full: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
right_height=459+add_height;
$('.jinsom-chat-windows-right').css('height',right_height);
$('.jinsom-chat-message-group-list').css('height',content_height);	
},
restore: function(layero){
$('.jinsom-chat-group-window').css({"top":"0","bottom":"0","margin":"auto","height":540});
$('.jinsom-chat-message-group-list').css('height',250);
$('.jinsom-chat-windows-right').css('height',459);
},
end: function(layero){
jinsom_stop_group_Ajax();//关闭窗口时，终止前一个ajax；
},
content: '<div class="jinsom-chat-windows-left"><div class="jinsom-chat-message-group-list"></div><div class="jinsom-chat-windows-footer"><div class="jinsom-chat-windows-footer-bar clear"><span class="jinsom-icon" onclick="jinsom_test()">&#xe62a;</span><span class="image group"><form id="jinsom-upload-group-img-form" method="post" enctype="multipart/form-data" action="'+ajax_url_a.module_url+'/upload/group-img.php"><input id="jinsom-upload-group-img" type="file" name="file" title="点击上传图片"><input type="hidden" name="bbs_id" id="jinsom-upload-group-bbs-id" value="'+bbs_id+'"></form></span><span class="redbag" onclick="jinsom_test()"></span><span class="touzi" onclick="jinsom_test()"></span><span class="jinsom-upload-group-img-loading"></span>	</div><textarea class="jinsom-chat-textarea-group"></textarea><div class="jinsom-chat-windows-footer-send clear"><div class="jinsom-chat-send-message-btn-group opacity">发送</div></div></div></div><div class="jinsom-chat-windows-right"><div class="jinsom-chat-group-notice"><div class="jinsom-chat-group-notice-title">群公告</div><div class="jinsom-chat-group-notice-desc"></div></div><div class="jinsom-chat-group-user"><div class="jinsom-chat-group-user-number">群成员 <span></span></div><div class="jinsom-chat-group-user-list"></div></div></div>'
});  
}else{
jinsom_stop_group_Ajax();//打开另外一个群组时，终止前一个ajax；
}


$('.jinsom-chat-group-window .layui-layer-title').html('<div class="jinsom-chat-windows-user-header" bbs-id="'+bbs_id+'"><div class="jinsom-chat-windows-user-avatar">'+avatar+'</div><div class="jinsom-chat-windows-user-info"><div class="jinsom-chat-windows-user-name">'+name+'</div><div class="jinsom-chat-windows-user-desc">'+desc+'</div>	</div></div>');
$('.jinsom-chat-group-notice-desc').html(notice);
$('.jinsom-chat-group-user-number span').html('（'+number+'人）');
$('.jinsom-chat-message-group-list').empty();//群组记录
$('.jinsom-chat-group-user-list').empty();//群组成员
$('.jinsom-chat-message-group-list').append('<div class="jinsom-chat-windows-group-loading"></div>');
$('.jinsom-chat-group-user-list').append('<div class="jinsom-chat-group-user-list-loading"></div>');
$('#jinsom-upload-group-bbs-id').val(bbs_id);

//获取群组消息
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-chat-message-group-list.php",
data: {bbs_id:bbs_id},
dataType: 'json',
success: function(msg){
$('.jinsom-chat-group-window .jinsom-chat-windows-user-header').attr('count',msg.count);
$('.jinsom-chat-message-group-list').empty();
$('.jinsom-chat-message-group-list').append(msg.msg); 
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);

//图片加载完毕执行
$(".jinsom-chat-message-list-content img").load( function(){
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
} );

}
});

//获取群组侧栏成员
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-chat-group-user-list.php",
data: {bbs_id:bbs_id},
success: function(msg){
$('.jinsom-chat-group-user-list').empty();
$('.jinsom-chat-group-user-list').append(msg); 
}
});

jinsom_ajax_get_messages_group();//发起长轮询

}

//访问密码论坛，输入密码
function jinsom_bbs_visit_password(){
bbs_id=$('.jinsom-bbs-visit').attr('data');
pass=$('#jinsom-bbs-visit-psssword').val();
if(pass==''){
layer.msg('请输入访问密码！');
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-bbs-visit-password.php",
data: {bbs_id:bbs_id,pass:pass,visit:1},
success: function(msg){
layer.closeAll('loading');
if(msg==1){
layer.msg('密码正确，正在进入....');	
function d(){window.location.reload();}setTimeout(d,2000);
}else if(msg==2){
layer.msg('密码错误！请重新输入！');
}else if(msg==3){
jinsom_pop_login_style();
}
}
});
}
//删除已经输入的访问密码
function jinsom_delete_bbs_visit_password(bbs_id){
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/jinsom-bbs-visit-password.php",
data: {bbs_id:bbs_id,delete:1},
success: function(msg){
layer.closeAll('loading');
layer.msg('清除成功！');	
}
});
}

//自定义菜单排序（首页）
function jinsom_index_menu_sort(){
li_num=$('.jinsom-index-menu-list li').length;
// if(li_num<2){1个菜单不能排序
// return false;
// }
box_height=(li_num-1)*51+75+43;
// alert(box_height);
layer.open({
type: 1,
title:'拖动菜单进行排序',
resize:false,
skin: 'jinsom-index-menu-sort-form',
area: ['250px', '520px'],
content: '<div class="jinsom-index-menu-sort-conetnt"></div><div class="jinsom-index-menu-sort-btn opacity"><i class="jinsom-icon">&#xe68d;</i> 完成</div>',
success: function(layero,index){
$('.jinsom-index-menu-sort-form').css('height',box_height);
$('.jinsom-index-menu-sort-form .layui-layer-content').css('height',box_height-43);
$('.jinsom-index-menu-sort-conetnt').prepend($('.jinsom-index-menu-list').html());
$( ".jinsom-index-menu-sort-conetnt" ).sortable();
$( ".jinsom-index-menu-sort-conetnt" ).disableSelection();
$('.jinsom-index-menu-sort-btn').click(function(){
$('.jinsom-index-menu-list').html($('.jinsom-index-menu-sort-conetnt').html()); 
var menu_arr=[];
for (var i=0; i < li_num; i++) {
var menu_li_text=$(".jinsom-index-menu-sort-conetnt").children('li').eq(i).attr('type');
menu_arr.push(menu_li_text);
}
menu_data=menu_arr.join(",");
var expdate=new Date();
expdate.setTime(expdate.getTime()+(24*60*60*1000*30));//一个月过期
SetCookie('jinsom-index-menu-list',menu_data,expdate,"/",null,false);  
layer.close(index);
}); 
}
});   
}


//弹窗发表视频表单
function jinsom_publish_video_js(){
layer.closeAll(); 
layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/publish/video-form.php",
data: {video:1},
success: function(msg){
layer.closeAll('loading');
layer.open({
type: 1,
title:false,
resize:false,
closeBtn: 0,
shade:0.75,
fixed: false,
move: '.jinsom-pop-publish-form-title',
offset: '100px',
skin: 'jinsom-pop-publish-form',
area: ['600px', 'auto'],
content: msg,
success: function(layero,index){
$('#jinsom-video-url').focus();
$('.jinsom-pop-publish-views-btn').click(function(){
video_url=$('#jinsom-video-url').val();
if(video_url==''){
layer.msg('请添加视频！');  
return false;  
}
url_ret=/^((https|http)?:\/\/)[^\s]+/;
if (!url_ret.test(video_url)){
layer.msg('视频地址要以http://或https://开头！'); 
return false;
}   


qq_ret = /^.*?v\.qq\.com.*?$/;
youku_ret = /^.*?v\.youku\.com.*?$/;
if(qq_ret.test(video_url)){
//腾讯视频
var reg = /.*\/(.*?)\.html/;
var arr=video_url.match(reg);
$('.jinsom-pop-publish-demo').html('<iframe frameborder="0" src="https://v.qq.com/iframe/player.html?vid='+arr[1]+'&tiny=0&auto=0" allowfullscreen></iframe>');
$('.jinsom-pop-publish-views-btn').addClass('no');
$('.jinsom-pop-publish-action-bar m').html('<div class="jinsom-pop-publish-publishl-btn a opacity"><i class="jinsom-icon">&#xe68d;</i> 发布</div>');
$('#jinsom-pop-publish-video-type').val(1);
$('#jinsom-pop-publish-video-url').val(arr[1]);
}else if(youku_ret.test(video_url)){
//优酷视频
var reg = /id_([^=]+)(?=\=\=)/;
var arr=video_url.match(reg);
$('.jinsom-pop-publish-demo').html('<iframe src="https://player.youku.com/embed/'+arr[1]+'" frameborder=0 "allowfullscreen"></iframe>');
$('.jinsom-pop-publish-views-btn').addClass('no');
$('.jinsom-pop-publish-action-bar m').html('<div class="jinsom-pop-publish-publishl-btn a opacity"><i class="jinsom-icon">&#xe68d;</i> 发布</div>');
$('#jinsom-pop-publish-video-type').val(2);
$('#jinsom-pop-publish-video-url').val(arr[1]);
}else{
video_ret=/^https?:\/\/\S+\.mp4|m3u8$/;
if (!video_ret.test(video_url)){
layer.msg('非优酷腾讯的视频外链必须要以.mp4/.m3u8结尾！'); 
return false;
}  
$('.jinsom-pop-publish-demo').html('<div id="jinsom_link_video"></div>');
var jinsom_link_video = new DPlayer({
element: document.getElementById('jinsom_link_video'),
screenshot: true,
logo: ajax_url_a.video_logo,
video: {url:video_url},
contextmenu: [ {text:ajax_url_a.site_name,link:ajax_url_a.home_url}],
});
jinsom_link_video.play();
$('.jinsom-pop-publish-views-btn').addClass('no');
$('.jinsom-pop-publish-action-bar m').html('<div class="jinsom-pop-publish-publishl-btn a opacity"><i class="jinsom-icon">&#xe68d;</i> 发布</div>');
jinsom_link_video.on("error", function(){
layer.msg('视频地址加载失败！');
$('.jinsom-pop-publish-views-btn').removeClass('no');
$('.jinsom-pop-publish-publishl-btn').remove();
$('#jinsom-pop-publish-video-url').val('');//视频无效移除值
});
$('#jinsom-pop-publish-video-type').val(3);
$('#jinsom-pop-publish-video-url').val(video_url);

}

//点击发布-01
$('.jinsom-pop-publish-publishl-btn.a').click(function(){
$('.jinsom-pop-publish-main').show();
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
form.on('switch(pop-publish)', function(data){
if(data.elem.checked){
$('#jinsom-pop-publish-title').show();
}else{
$('#jinsom-pop-publish-title').hide();    
}
});
});
$(this).off("click");//解绑事件
$(this).removeClass('a');
$(this).addClass('b');
$('#jinsom-pop-publish-content').focus();

$(".jinsom-pop-publish-power-list .open").one("click",function(){
$(this).siblings().show();
}); 

$('.jinsom-pop-publish-power-list').children('i').click(function(){
$(this).addClass('on'); 
$(this).siblings().removeClass('on');   
}); 

$('.jinsom-pop-publish-power-list i.pay').click(function(){
$('.jinsom-pop-publish-power-form').html('<input type="number" id="jinsom-pop-publish-power-price" placeholder="请输入售价"><span>用户需要付费购买才可以播放视频</span>');  
$('#jinsom-pop-publish-power').val(1);
}); 
$('.jinsom-pop-publish-power-list i.pass').click(function(){
$('.jinsom-pop-publish-power-form').html('<input type="number" id="jinsom-pop-publish-power-pass" placeholder="请输入密码"><span>用户需要输入密码购买才可以播放视频</span>');  
$('#jinsom-pop-publish-power').val(2);
});
$('.jinsom-pop-publish-power-list i.vip').click(function(){
$('.jinsom-pop-publish-power-form').html('<span>该视频需要VIP才可以播放</span>'); 
$('#jinsom-pop-publish-power').val(4); 
}); 
$('.jinsom-pop-publish-power-list i.open').click(function(){
$('.jinsom-pop-publish-power-form').html('<span>该视频公开，所有用户都可以播放</span>'); 
$('#jinsom-pop-publish-power').val(0);
}); 

//点击添加标签
$('.jinsom-pop-publish-tag-list li').live("click", function(e){
if($('.jinsom-pop-publish-tag-select li').length<=2){
$('.jinsom-pop-publish-tag-select').prepend($(this)); 
$(this).off("click");
}else{
layer.msg('最多只能添加3个标签！');    
return false;
}
});
//点击取消标签
$('.jinsom-pop-publish-tag-select li').live("click", function(e){
$('.jinsom-pop-publish-tag-list').prepend($(this)); 
$(this).off("click");
});
//点击完成标签
$('.jinsom-pop-publish-tag-ok-btn').live("click", function(e){
var tag_arr=[];
num=$('.jinsom-pop-publish-tag-select li').length;
if(num==0){
layer.msg('至少输入一个标签！');    
return false;    
}else{
for (var i=0; i < num; i++) {
tag_text=$('.jinsom-pop-publish-tag-select li').eq(i).html();
tag_arr.push(tag_text);
tag_data=tag_arr.join(",");
$('#jinsom-pop-publish-tag').val(tag_data);
$('.jinsom-pop-publish-power-list span').children('m').html('<i class="jinsom-icon tag">&#xe895;</i>'+tag_data);
$('.jinsom-pop-publish-tag-list-pop').hide();
}    
}

});

//发布-02
$('.jinsom-pop-publish-publishl-btn.b').click(function(){
title=$('#jinsom-pop-publish-title').val();
content=$('#jinsom-pop-publish-content').val();
video_type=$('#jinsom-pop-publish-video-type').val();
video_url=$('#jinsom-pop-publish-video-url').val();
power=$('#jinsom-pop-publish-power').val();
tag=$('#jinsom-pop-publish-tag').val();
pass=$('#jinsom-pop-publish-power-pass').val();
price=$('#jinsom-pop-publish-power-price').val();

if(content==''){
layer.msg('内容不能为空！');    
return false; 
}
if(video_url==''){
layer.msg('请添加视频！');    
return false; 
}
if(tag==''){
layer.msg('至少输入一个标签！');    
return false; 
}


layer.load(1);
$.ajax({
type: "POST",
url:ajax_url_a.module_url+"/publish/video.php",
data: {title:title,content:content,video_type:video_type,video_url:video_url,power:power,tag:tag,pass:pass,price:price},
success: function(msg){
layer.closeAll('loading');
if(msg==1){
layer.msg('标题字数不能'+ajax_url_a.video_title_words+'字！');    
}else if(msg==2){
layer.msg('内容字数不能'+ajax_url_a.video_cnt_words+'字！');      
}else if(msg==3){
layer.msg('售价范围为'+ajax_url_a.publish_price_mini+'-'+ajax_url_a.publish_price_max+'之间！');   
}else if(msg==4){

$('#jinsom-pop-publish-content').val('');

if(ajax_url_a.user_publish_post_times<ajax_url_a.publish_post_times){
if(ajax_url_a.publish_post_credit>0){   
layer.msg('发表成功，<span class="jinsom-gold-icon"></span> +'+ajax_url_a.publish_post_credit+'，<span class="jinsom-exp-icon"></span> +5');
}else{
layer.msg('发表成功，<span class="jinsom-gold-icon"></span> '+ajax_url_a.publish_post_credit+'，<span class="jinsom-exp-icon"></span> +5');   
}
}else{
layer.msg('发表成功！');
}
function d(){window.location.reload();}setTimeout(d,2500);
}




   
}
});



   
});

}); 


}); //点击预览


//取消
$('.jinsom-pop-publish-cancel-btn').click(function(){
layer.confirm('确定要关闭么', {
  btn: ['确定','取消']
}, function(){
layer.closeAll();
});
}); 


}
}); 
}
});


}



//cookies
function SetCookie(name,value){
     var argv=SetCookie.arguments;
     var argc=SetCookie.arguments.length;
     var expires=(2<argc)?argv[2]:null;
     var path=(3<argc)?argv[3]:null;
     var domain=(4<argc)?argv[4]:null;
     var secure=(5<argc)?argv[5]:false;
     document.cookie=name+"="+escape(value)+((expires==null)?"":("; expires="+expires.toGMTString()))+((path==null)?"":("; path="+path))+((domain==null)?"":("; domain="+domain))+((secure==true)?"; secure":"");
}
function GetCookie(Name) {
     var search = Name + "=";
     var returnvalue = "";
     if (document.cookie.length > 0) {
           offset = document.cookie.indexOf(search);
           if (offset != -1) {      
                 offset += search.length;
                 end = document.cookie.indexOf(";", offset);                        
                 if (end == -1)
                       end = document.cookie.length;
                 returnvalue=unescape(document.cookie.substring(offset,end));
           }
     }
     return returnvalue;
}



//测试提示
function jinsom_test(){
    layer.msg('该功能开发中，即将开启。');
}
function jinsom_test_video(){
    layer.msg('视频功能开发中，即将开启。');
}
