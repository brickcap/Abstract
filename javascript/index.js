$(function(){
    
    function loadSavedDrafts(){
        return Object.keys(localStorage);
    }
    
    function sortedArray (data){
        
        return data.sort(function(a,b){
        a = new Date(a.trueDate);
        b = new Date(b.trueDate);
        return a<b?-1:a>b?1:0;
        }).reverse();
        
    }
    
    function buildData(keys){
        
        var data = [];
        for(var i =0;i< keys.length; i++){
            var parsed = JSON.parse(localStorage[keys[i]]);
            var draft = {};
            var count = getWordCount(parsed.text);
            draft["date"] = new Date(parsed.time).toDateString();
            draft["count"] = count;
            draft["title"] = keys[i];
            draft["plural"] = count > 1 ; 
            draft["trueDate"] = parsed.time;
            data.push(draft);
        }
        
        return sortedArray(data);
        
    }
    
    function renderSavedDrafts(){
        
        
        var data = {};
        data["keys"] = buildData(loadSavedDrafts());
        var template = "{{#keys}}<li data-title='{{title}}' class='draftListItems'><p>{{title}} <span class='muted draftList'> ({{date}})</span></p> <p class='muted draftList '> {{count}} word{{#plural}}s{{/plural}}</p>  </li><hr/>{{/keys}}";
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
        
        hideThis([this,'#plain']);
       
        showThis(["#rawHtml",'#previewContainer']);
    });
    
    
    function saveCurrentDraft(){        
        var key = $("#title").text();
        var draft = {};
        draft["time"] = new Date();
        draft["text"] = getMarkdownText();
        localStorage.setItem(key, JSON.stringify(draft));
    }
    
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
        
        $(editArea).focus();
        $(editArea).val('');
        $("#title").text('');
        
        
    });
}); 