/**
 * Created by Administrator on 2016/11/11.
 */0
$(function () {
	var p = document.getElementsByTagName("span");
	for(var i = 0 ; i <p.length; i++){
		if(p[i].className=='zan act'){
		console.log(p[i].innerHTML);
//		p[i].siblings(".zan").css("display");
		$(".Interaction .act").siblings(".zan").hide();
		// console.log(p[i].siblings(".zan").hide());
		     }
	}
    Zepto(".zan").click(function () {
        Zepto(this).toggleClass("act");
        var userId = $("#userId").val();
    	var commentId = $(this).parents(".infobox").find("input").eq(0).val();
    	console.log(commentId);
    	
    	console.log($(this).parents(".infobox").find(".zan").html());
    	This = this;
        if($(this).hasClass("act")){
        	$.ajax({
       	        url:"likes.jhtml",
       	        data:{userId:userId,commentId:commentId},
       	        type:"get",
       	        success:function(data){
       	        	
       	         $(This).parents(".infobox").find(".zan").html(data);
       	             }
       	        }) 
        }else{
        	 $.ajax({
      	        url:"cancelLikes.jhtml",
      	        data:{userId:userId,commentId:commentId},
      	        type:"get",
      	        success:function(data){
      	        	
      	        	 $(This).parents(".infobox").find(".zan").html(data);
      	                	        }
      	        }) 
        }

    });
   
    $(".commentBtn").click(function () {
    	$(".replyText").hide();
        $(".commentText").show();
        $(".commentText").find(".text").focus();
        $(".infobox").removeClass("act");
        $(this).parents(".infobox").addClass("act");
        var replyUserName = $(".infobox.act").find("p").eq(0).html();
        document.getElementById("replyText").setAttribute("placeholder","回复"+replyUserName+":");
       
        return false;
    });
    $(".commentText").click(function () {
        $(document).click(function () {
            $(".commentText").hide()
        });
        return false;
    });
    //回复确定按钮
    Zepto(".commentText").find(".sure").tap(function () {
    	var contentId = $("#contentId").val();
    	var userId = $("#userId").val();
    	var commentId = $(".infobox.act").find("input").eq(0).val();
    	var replyContext = $(this).prev().val();
        if ($.trim($(this).prev().val())) {
        	 $.ajax({
     	        url:"replyComment.jhtml",
     	        data:{contentId:contentId,userId:userId,replyContext:replyContext,commentId:commentId},
     	        type:"get",
     	        success:function(data){
     	           alert("评论成功!");
     	           $(".infobox.act").find(".commentList").append("<li><span class='clBlue'>"+userName+"</span>:" + replyContext + "</li>");
     	        }
     	        }) 
        }
        $(this).prev().val("").blur();
        $(".commentText").hide();
        $(".replyText").show();
    });
     //评论确定按钮
    Zepto(".replyText").find(".sure").tap(function () {
    	console.log($("#contentId").val());
    	
    	var contentId = $("#contentId").val();
    	var userId = $("#userId").val();
    	var context = $(this).prev().val();
    	var zt = $("#zt").val();
    	if(zt == "已支持"){
    		if(context == ""){
        		alert("请输入评论内容");
        		return false;
        	}
        	 $.ajax({
        	        url:"pinglun.jhtml",
        	        data:{contentId:contentId,userId:userId,context:context},
        	        type:"get",
        	        success:function(data){
        	           alert("评论成功!");
        	        }
        	        }) 
    	}else{
    		alert("您未支持该项目,尚不可评论!");
    		return  false;
    	}
    	
    });

});