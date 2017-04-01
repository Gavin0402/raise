/**
 * Created by Administrator on 2016/11/11.
 */0
$(function () {
    Zepto(".zan").tap(function () {
        Zepto(this).toggleClass("act");
    });
    $(".commentBtn").click(function () {
        $(".commentText").show();
        $(".commentText").find(".text").focus();
        $(".infobox").removeClass("act");
        $(this).parents(".infobox").addClass("act");
        $(document).click(function () {
            $(".commentText").hide()
        });
        return false;
    });
    Zepto(".commentText").find(".sure").tap(function () {
        if ($.trim($(this).prev().val())) {
            $(".infobox.act").find(".commentList").append("<li><span class='clBlue'>fdjsk</span>：" + $(this).prev().val() + "</li>");
        }
        $(this).prev().val("").blur();
        $(".commentText").hide();
    });


});