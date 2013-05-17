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
}); 