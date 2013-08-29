function loadSavedDrafts() {
        return Object.keys(localStorage);
    }

    function sortedArray(data) {

        return data.sort(function (a, b) {
            a = new Date(a.trueDate);
            b = new Date(b.trueDate);
            return a < b ? -1 : a > b ? 1 : 0;
        }).reverse();

    }

    function buildData(keys) {

        var data = [];
        for (var i = 0; i < keys.length; i++) {
            var parsed = JSON.parse(localStorage[keys[i]]);
            var initializeDraft = new draft(parsed, JSON.parse(keys[i]));
            data.push(initializeDraft);
        }

        return sortedArray(data);

    }

    function renderSavedDrafts() {
        var array = buildData(loadSavedDrafts());
        initializeDrafts.drafts(array);
    }

    function saveCurrentDraft(prevKey) {

        console.log(prevKey);
        
        if(prevKey){
            
            removeDraft(prevKey);       
            
        }

       return createNewDraft();
        
    }

    function createNewDraft(){

        var markDownText = getMarkdownText();
        var key = {

         title: titleContainer.val(),
         date :new Date(),
         count:getWordCount(markDownText)
        }; 
        var stringifiedKey = JSON.stringify(key);

        var draft = {};
        draft["text"] = markDownText;
        localStorage.setItem(stringifiedKey, JSON.stringify(draft));
        return stringifiedKey;
    }

    function getDraftFromKey(key) {

        return localStorage.getItem(key);
    }

    function removeDraft(key) {

        localStorage.removeItem(key);
    }



