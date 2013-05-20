var draft = function(parsed,title){
    
    var self = this;
    var wordCount = parsed.wordCount;
    self.date = new Date(parsed.time).toDateString();
    self.count = wordCount;
    self.title = title;
    self.plural = wordCount > 1;
    self.trueDate = new Date(parsed.time);
    
};



var viewModel = function(){
    
     var self = this;
     
     self.drafts = ko.observableArray([]);
    
    self.deleteDraft = function(draft,event){
        event.stopPropagation();
        removeDraft(draft.title);
       self.drafts.remove(draft);        
    }
 };



