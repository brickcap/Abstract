$(function(){
    
    
var previewContainerView = $("#previewContainer");
    var editAreaView = $("#editArea");
    var draftsView = $("#drafts");
    var editContainerView = $("#editContainer");
    var previewPaneView = $("#previewPane");
    var draftsListView = $("#drafts");
    var titleContainer = $("#title");
    var saveStatusNotification = $("#saveStatus");
    var rawHtmlButton = $("#rawHtml");
    var plainViewButton = $("#plain");
    var createNewButton = $("#createNew");
    var showDraftsButton = $("#renderSavedDrafts");
    var wordCountLabel = $("#wordCount");

var draft = function (parsed, title) {

        var self = this;
        var wordCount = parsed.wordCount;
        self.date = new Date(parsed.time).toDateString();
        self.count = wordCount;
        self.title = title;
        self.plural = wordCount > 1;
        self.trueDate = new Date(parsed.time);

    };

    var viewModel = function (drafts) {

        var self = this;
        self.drafts = ko.observableArray(drafts);
        self.showEditor = ko.observable(true);
        self.showTitle = ko.observable(true);
        self.raw = ko.observable(true);

        self.deleteDraft = function (draft, event) {

            event.stopPropagation();
            removeDraft(draft.title);
            self.drafts.remove(draft);

        };

        self.showDrafts = function () {

            self.showEditor(false);
            self.showTitle(false);
            renderSavedDrafts();
            previewContainerView.hide();
            draftsView.show();

        };

        self.newDraft = function () {

            hideThis(["#previewContainer", "#drafts"]);
            self.showTitle(true);
            self.showEditor(true);
            editArea.focus();
            editArea.val('');
            $("#title").text('');

        };

        self.showPreview = function () {

            if (validateInputOnFousOut()) {

                setHtmlinPreviewPane(getMarkdownText());
                plainViewButton.hide();
                self.showEditor(false);
                self.showTitle(true);
                showThis(["#rawHtml", '#previewContainer']);
                saveCurrentDraft();
                saveStatusNotification.fadeIn().show().delay(1000).fadeOut();
            }

        };

        self.hidePreview = function () {

            previewContainerView.hide();
            self.showEditor(true);
            editArea.trigger('autosize');
            editArea.focus();

        };

        self.editDraft = function (draft) {

            var title = draft.title;
            var item = getDraftFromKey(title);
            var parsed = JSON.parse(item);
            draftsView.hide();
            editArea.val(parsed.text).trigger('autosize');
            titleContainer.text(title);
            wordCountLabel.text(parsed.wordCount);
            self.showEditor(true);
            self.showTitle(true);

        };

        self.rawHtml = function(data,event){

        setRawHtml();
        event.stopPropagation();
        self.raw(false);

        };

        self.plain = function(data,event){

        setPlain();
        event.stopPropagation();
        self.raw(true);

        };
    };

    var initializeDrafts = new viewModel();
    ko.applyBindings(initializeDrafts);

function prepareInitialWorkSpace() {

        var editArea = $("#editArea");
        editArea.autosize();
        titleContainer.focus();
        return editArea;

    }

    function hideThis(elements) {

        $(elements.join(',')).hide();
    }

    function showThis(elements) {

        $(elements.join(',')).show();
    }

    function getMarkdownText() {
        return editArea.val();
    }

    function getWordCount(text) {

        return text.split(/\s+\b/).length;
    }

    function setHtmlinPreviewPane(markdownText) {
        wordCountLabel.text('words: ' + getWordCount(markdownText));
        previewPaneView.html(markdown.toHTML(markdownText));
    }

    function setRawHtml() {

        previewPaneView.text(previewPaneView.html());
    }

    function setPlain() {
        previewPaneView.html(previewPaneView.text());
    }


    function getWordCountFromLabel(text) {

        return text.match(/\d+/)[0];
    }


    function validateInputOnFousOut() {

        var isTitleEmpty = titleContainer.text().trim() === '';
        var isDraftEmpty = editAreaView.val() === '';
        var hasTitileAndDraft = !isTitleEmpty && !isDraftEmpty;
        return hasTitileAndDraft;

    }
var editArea = prepareInitialWorkSpace();

    
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