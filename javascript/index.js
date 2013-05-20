    $(function () {



        function prepareInitialWorkSpace() {

            var editArea = $("#editArea");
            editArea.autosize();
            $("#title").focus();
            return editArea;

        }

        function hideThis(elements) {

            for (var i = 0; i < elements.length; i++) {

                $(elements[i]).hide();
            }
        }

        function showThis(elements) {

            for (var i = 0; i < elements.length; i++) {

                $(elements[i]).show();
            }
        }

        function getMarkdownText() {

            return $("#editArea").val();
        }

        function getWordCount(text) {

            return text.split(/\s+\b/).length;
        }

        function setHtmlinPreviewPane(markdownText) {
            $("#wordCount").text('words: ' + getWordCount(markdownText));
            $("#previewPane").html(markdown.toHTML(markdownText));
        }

        function setRawHtml() {
            var pane = $("#previewPane");
            pane.text(pane.html());
        }

        function setPlain() {

            var pane = $("#previewPane");
            pane.html(pane.text());
        }


        function getWordCountFromLabel(text) {

            return text.match(/\d+/)[0];
        }


        function validateInputOnFousOut() {

            var isTitleEmpty = $("#title").text().trim() === '';
            var isDraftEmpty = $("#editArea").val() === '';
            var hasTitileAndDraft = !isTitleEmpty && !isDraftEmpty;
            return hasTitileAndDraft;

        }

        var initializeDrafts = new viewModel();
        ko.applyBindings(initializeDrafts);

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

            var key = $("#title").text();
            var draft = {};
            draft["time"] = new Date();
            draft["text"] = getMarkdownText();
            draft["wordCount"] = getWordCountFromLabel($("#wordCount").text());
            localStorage.setItem(key, JSON.stringify(draft));
        }

        function getDraftFromKey(key) {

            return localStorage.getItem(key);
        }

        function removeDraft(key) {

            localStorage.removeItem(key);
        }

        var editArea = prepareInitialWorkSpace();


        editArea.focusout(function () {

            if (validateInputOnFousOut()) {

                setHtmlinPreviewPane(getMarkdownText());
                hideThis([this, '#plain']);
                showThis(["#rawHtml", '#previewContainer']);
                saveCurrentDraft();
                $("#saveStatus").fadeIn().show().delay(1000).fadeOut();
            }


        });

        $("#previewContainer").click(function () {

            hideThis([this]);
            editArea.show();
            editArea.trigger('autosize');
            editArea.focus();
        });

        $("ol").on('click', '.draftListItems', function () {

            var title = $(this).data().title;
            var item = getDraftFromKey(title);
            var parsed = JSON.parse(item);
            hideThis(["#drafts"]);
            editArea.val(parsed.text).trigger('autosize');
            $("#title").text(title);
            $("#wordCount").text(parsed.wordCount);
            showThis([editArea, "#editContainer", "#title"]);
        });


        $("#rawHtml").click(function (e) {

            setRawHtml();
            e.stopPropagation();
            hideThis([this]);
            showThis(["#plain"]);
        });

        $("#plain").click(function (e) {

            setPlain();
            e.stopPropagation();
            hideThis([this]);
            showThis(["#rawHtml"]);
        });

        $("#renderSavedDrafts").click(function () {

            renderSavedDrafts();
            hideThis(["#previewContainer", "#editContainer"]);
            showThis(["#drafts"]);
        });

        $("#createNew").click(function () {
            hideThis(["#previewContainer", "#drafts"]);

            showThis(["#editContainer", "#editArea"]);

            editArea.focus();
            editArea.val('');
            $("#title").text('');

        });

    });