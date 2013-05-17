$(function(){
    
    function loadSavedDrafts(){
        return Object.keys(localStorage);
    }
    
    function renderSavedDrafts(){
        
        var data = {};
        data["keys"] = loadSavedDrafts();
        var template = "{{#keys}}<li>{{.}}</li><hr/>{{/keys}}";
        var html = Mustache.render(template,data);
        $("#draftList").html(html);
    }
    
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
    
    function showThis(element){
        
        $(element).show();
    }
    
    function getMarkdownText(){
        
        return editArea.val();
    }
    
    function getWordCount(text){
        
     return text.split(/\s+\b/).length;
    }
    
    function setHtmlinPreviewPane(markdownText){
        $("#wordCount").text('words: '+getWordCount(markdownText));
        $("#previewPane").html(markdown.toHTML(markdownText));
    }
    
    function setRawHtml(){
        var pane = $("#previewPane");
        pane.text(pane.html());
    }
    
    function setPlain(){
        
        var pane = $("#previewPane");
        pane.html(pane.text());
    }
    
    editArea.focusout(function(){
        
        setHtmlinPreviewPane(getMarkdownText());
        $("#previewContainer").show();
        hideThis(this);
        hideThis("#plain");
        showThis("#rawHtml");
    });
    
    
    function saveCurrentDraft(){        
        var key = $("#title").text();
        var draft = {};
        draft["time"] = new Date();
        draft["text"] = getMarkdownText();
        localStorage.setItem(key, JSON.stringify(draft));
    }
    
    $("#previewContainer").click(function(){
        
        hideThis(this);
        editArea.show();
        editArea.focus();
    });
    
    $("#rawHtml").click(function(e){
        
        setRawHtml();
        e.stopPropagation();
        hideThis(this);
        showThis("#plain");
    });
    
    $("#plain").click(function(e){
        
        setPlain();
        e.stopPropagation();
        hideThis(this);
        showThis("#rawHtml");
    });
    
    $("#saveDraft").click(function(){
        
        saveCurrentDraft();
    });
    
    $("#renderSavedDrafts").click(function(){
        
        renderSavedDrafts();
        hideThis("#editContainer");
        hideThis("#saveDraft");
        showThis("#drafts");
    });
}); 