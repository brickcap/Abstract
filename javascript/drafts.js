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
            var initializeDraft = new draft(parsed, keys[i]);
            data.push(initializeDraft);
        }

        return sortedArray(data);

    }

    function renderSavedDrafts() {
        var array = buildData(loadSavedDrafts());
        initializeDrafts.drafts(array);
    }

    function saveCurrentDraft() {

        var key = titleContainer.text();
        var draft = {};
        draft["time"] = new Date();
        draft["text"] = getMarkdownText();
        draft["wordCount"] = getWordCountFromLabel(wordCountLabel.text());
        localStorage.setItem(key, JSON.stringify(draft));
    }

    function getDraftFromKey(key) {

        return localStorage.getItem(key);
    }

    function removeDraft(key) {

        localStorage.removeItem(key);
    }


});
