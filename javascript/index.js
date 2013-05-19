    $(function(){
        
    var editArea = prepareInitialWorkSpace();
    
    
    editArea.focusout(function(){        
        
        if(validateInputOnFousOut()){            
        
        setHtmlinPreviewPane(getMarkdownText());        
        hideThis([this,'#plain']);       
        showThis(["#rawHtml",'#previewContainer']);
        saveCurrentDraft();
        $("#saveStatus").fadeIn().show().delay(1000).fadeOut();
    }
        
        
});   
    
    $("#previewContainer").click(function(){
        
        hideThis([this]);
        editArea.show();
        editArea.trigger('autosize')'
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
    
    $("#renderSavedDrafts").click(function(){
        
        renderSavedDrafts();
        hideThis(["#previewContainer","#editContainer"]);
        showThis(["#drafts"]);
    });
    
    $("#createNew").click(function(){
        hideThis(["#previewContainer","#drafts"]);
        
        showThis(["#editContainer","#editArea"]);
        
        editArea.focus();
        editArea.val('');
        $("#title").text('');     
        
    });
        
        $("ol").on('click','.draftListItems',function(){
            
        var title = $(this).data().title;
        var item = getDraftFromKey(title);
        var parsed = JSON.parse(item);
        hideThis(["#drafts"]);         
        editArea.val(parsed.text).trigger('autosize');
        $("#title").text(title);
        $("#wordCount").text(parsed.wordCount);
        showThis([editArea,"#editContainer","#title"]);
        
 }); 
        
$("ol").on('click','a',function(e){
    
    e.stopPropagation();
    var parent = $(this).parents('li');
    var key = parent.data().title;
    removeDraft(key);
    $(parent).hide();
    
});        
 
}); 