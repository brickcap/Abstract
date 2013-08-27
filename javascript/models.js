var draft = function (parsed, key) {

        var self = this;
        var wordCount = key.count;
        self.date = new Date(key.date).toDateString();
        self.count = wordCount;
        self.title = key.title;
        self.plural = wordCount > 1;
        self.trueDate = new Date(key.date);
        self.draftKey = JSON.stringify(key);

    };

    var viewModel = function (drafts) {

        var self = this;
        self.drafts = ko.observableArray(drafts);
        self.showEditor = ko.observable(true);
        self.showTitle = ko.observable(true);
        self.raw = ko.observable(true);
        self.currentKey = '';
        
        self.clearCurrentWorkSpace = function(){
            self.currentKey = '';
            titleContainer.val('');
            editArea.val('');
        }

        self.deleteDraft = function (draft, event) {
            self.clearCurrentWorkSpace();
            event.stopPropagation();
            removeDraft(draft.key);
            self.drafts.remove(draft);

        };

        self.showDrafts = function () {
			
			self.saveAndNotify();
		    self.currentKey = titleContainer.data().key
            self.showEditor(false);
            self.showTitle(false);
            renderSavedDrafts();
			saveAndPreview.hide();
            previewContainerView.hide();
            draftsView.show();
			

        };

        self.newDraft = function () {
			
			self.saveAndNotify();
            self.clearCurrentWorkSpace();
            hideThis([previewContainerExpression,draftsExpression]);
		editArea.trigger('autosize');
            self.showTitle(true);
            self.showEditor(true);
            titleContainer.focus();
            saveAndPreview.show();
			
        };
		
		self.saveAndNotify = function(){
			if(!editArea.val() || !titleContainer.val()) return;
             saveCurrentDraft(self.currentKey);
            saveStatusNotification.fadeIn().show().delay(1000).fadeOut();
        };

        self.showPreview = function () {

            if (validateInputOnFousOut()) {

                setHtmlinPreviewPane(getMarkdownText());
				saveAndPreview.hide();
                plainViewButton.hide();
                self.showEditor(false);
                self.showTitle(true);
                showThis([rawHtmlExpression,previewContainerExpression]);
                self.saveAndNotify();
            }

        };

        self.hidePreview = function () {

            previewContainerView.hide();
            self.showEditor(true);
            editArea.trigger('autosize');
            editArea.focus();
			saveAndPreview.show();
        };

        self.editDraft = function (draft) {
            var key = draft.draftKey;
            var item = getDraftFromKey(key);
            var parsedKey = JSON.parse(key);
            var parsed = JSON.parse(item);
            draftsView.hide();
            editArea.val(parsed.text).trigger('autosize');
            titleContainer.val(parsedKey.title);
            wordCountLabel.text(parsedKey.wordCount);
            titleContainer.data("key",key);
            self.currentKey = key;            
            self.showEditor(true);
            self.showTitle(true);
			saveAndPreview.show();
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
        
          self.editTitle = function(){
            self.currentKey = titleContainer.data().key;
            previewContainerView.hide();
            self.showEditor(true);
        }
    };

    var initializeDrafts = new viewModel();
    ko.applyBindings(initializeDrafts);
