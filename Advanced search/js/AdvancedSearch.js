/**
 * Created by Administrator on 2016/11/11.
 */
Zepto(function($){
    $(".searchChoice").tap(function(){
        $(".choiceList").hide();
        $(this).next(".choiceList").show();
        $(document).tap(function () {
            $(".choiceList").hide();
        });
        $(".choiceList li").tap(function () {
            $(this).parent().prev(".searchChoice").html($(this).html());
        });
        return false;
    });
});