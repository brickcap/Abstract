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
            var count = parsed.wordCount;
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
        var template = "{{#keys}}<li data-title='{{title}}' class='draftListItems'><p>{{title}} <span class='muted draftList'> ({{date}})</span></p> <p class='muted draftList '> {{count}} word{{#plural}}s{{/plural}} <a href='#' class='text-error'>Delete</a></p>  </li><hr/>{{/keys}}";
        var html = Mustache.render(template,data);
        $("#draftList").html(html);
    }

function saveCurrentDraft(){
        
        var key = $("#title").text();
        var draft = {};
        draft["time"] = new Date();
        draft["text"] = getMarkdownText();
        draft["wordCount"] = getWordCountFromLabel($("#wordCount").text());
        localStorage.setItem(key, JSON.stringify(draft));
    }

function getDraftFromKey(key){
    
    return localStorage.getItem(key);
}