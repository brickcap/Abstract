//Contains helper methods that are used by other script files.  
    
    
    function prepareInitialWorkSpace(){
    
    var editArea = $("#editArea");
    editArea.autosize();
    $("#title").focus();    
    return editArea;
        
    }

    function hideThis(elements){
        
        for(var i = 0; i<elements.length; i++){
            
        $(elements[i]).hide();
    }
}
    
    function showThis(elements){
        
        for(var i = 0; i<elements.length; i++){
            
        $(elements[i]).show();
}
    }
    
    function getMarkdownText(){
        
        return $("#editArea").val();
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

        
    function getWordCountFromLabel(text){
        
        return text.match(/\d+/)[0];
    }


function validateInputOnFousOut(){
    
  var isTitleEmpty = $("#title").text().trim()=== '';
  var isDraftEmpty = $("#editArea").val() === '';
  var hasTitileAndDraft = !isTitleEmpty && !isDraftEmpty;
  return hasTitileAndDraft();    
           
}