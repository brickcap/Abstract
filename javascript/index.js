    $(function(){    
    
    var editArea = prepareInitialWorkSpace();
    
    
    editArea.focusout(function(){
        
        setHtmlinPreviewPane(getMarkdownText());
        
        hideThis([this,'#plain']);
       
        showThis(["#rawHtml",'#previewContainer']);
    });   
    
    $("#previewContainer").click(function(){
        
        hideThis([this]);
        editArea.show();
        editArea.focus();
    });
    
    $("#rawHtml").click(function(e){
        
        setRawHtml();
        e.stopPropagation();
        hideThis([this]);
        showThis(["#plain"]);
    });
    
    $("#plain").click(function(e){
        
        setPlain();
        e.stopPropagation();
        hideThis([this]);
        showThis(["#rawHtml"]);
    });
    
    $("#saveDraft").click(function(){
        
        saveCurrentDraft();
    });
    
    $("#renderSavedDrafts").click(function(){
        
        renderSavedDrafts();
        hideThis(["#editContainer","#previewContainer","#saveDraft"]);
        showThis(["#drafts"]);
    });
    
    $("#createNew").click(function(){
        hideThis(["#previewContainer","#drafts"]);
        
        showThis(["#editContainer","#editArea","#saveDraft"]);
        
        editArea.focus();
        editArea.val('');
        $("#title").text('');     
        
    });
}); 