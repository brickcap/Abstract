    $(function(){    
    
        
    //TODO: Move all the scripts to knockout.js. Must make all of this stuff clear.        
    //Why is knockout not used in the first place? Cause I can't think in knockout.
    // Having a behaviour in front of me makes it all clearer. 
        
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
        $("#saveStatus").addClass('text-success').text('Draft Saved');
    });
    
    $("#renderSavedDrafts").click(function(){
        
        renderSavedDrafts();
        hideThis(["#previewContainer","#editContainer","#saveDraft"]);
        showThis(["#drafts"]);
    });
    
    $("#createNew").click(function(){
        hideThis(["#previewContainer","#drafts"]);
        
        showThis(["#editContainer","#editArea","#saveDraft"]);
        
        editArea.focus();
        editArea.val('');
        $("#title").text('');     
        
    });
        
        $("ol").on('click','.draftListItems',function(){
            
        var title = $(this).data().title;
        var item = getDraftFromKey(title);
        var parsed = JSON.parse(item);
        hideThis(["#drafts"]);         
        editArea.val(parsed.text);
        $("#title").text(title);
        $("#wordCount").text(parsed.wordCount);
        showThis([editArea,"#editContainer","#title",'#saveDraft']);
        
 }); 
 
}); 