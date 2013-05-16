$(function(){
    
    function prepareInitialWorkSpace(){
    
    var editArea = $("#editArea");
    editArea.autosize();
    $("#title").focus();
    return editArea;
        
    }
    var editArea = prepareInitialWorkSpace();
    
    function hideThis(element){
        
        $(element).hide();
    }
    
    editArea.focusout(function(){
        
        $("#previewContainer").show();
        hideThis(this);
    });
    
    $("#previewContainer").click(function(){
        
        hideThis(this);
        editArea.show();
        editArea.focus();
    });
}); 