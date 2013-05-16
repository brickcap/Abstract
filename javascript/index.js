$(function(){
    
    function hideThis(element){
        $(element).hide();
    }
    
    $("#editArea").focusout(function(){
        $("#previewContainer").show();
        hideThis(this);
    });
    
    $("#previewContainer").click(function(){
        hideThis(this);
        $("#editArea").show();
    });
}); 