$(function(){function m(){var e=$("#editArea");return e.autosize(),o.focus(),e}function g(e){$(e.join(",")).hide()}function y(e){$(e.join(",")).show()}function b(){return C.val()}function w(e){return e.split(/\s+\b/).length}function E(e){h.text("words: "+w(e)),i.html(markdown.toHTML(e))}function S(){i.text(i.html())}function x(){i.html(i.text())}function T(e){return e.match(/\d+/)[0]}function N(){var e=o.text().trim()==="",n=t.val()==="",r=!e&&!n;return r}function k(){return Object.keys(localStorage)}function L(e){return e.sort(function(e,t){return e=new Date(e.trueDate),t=new Date(t.trueDate),e<t?-1:e>t?1:0}).reverse()}function A(e){var t=[];for(var n=0;n<e.length;n++){var r=JSON.parse(localStorage[e[n]]),i=new p(r,e[n]);t.push(i)}return L(t)}function O(){var e=A(k());v.drafts(e)}function M(){var e=o.text(),t={};t.time=new Date,t.text=b(),t.wordCount=T(h.text()),localStorage.setItem(e,JSON.stringify(t))}function _(e){return localStorage.getItem(e)}function D(e){localStorage.removeItem(e)}var e=$("#previewContainer"),t=$("#editArea"),n=$("#drafts"),r=$("#editContainer"),i=$("#previewPane"),s=$("#drafts"),o=$("#title"),u=$("#saveStatus"),a=$("#rawHtml"),f=$("#plain"),l=$("#createNew"),c=$("#renderSavedDrafts"),h=$("#wordCount"),p=function(e,t){var n=this,r=e.wordCount;n.date=(new Date(e.time)).toDateString(),n.count=r,n.title=t,n.plural=r>1,n.trueDate=new Date(e.time)},d=function(t){var r=this;r.drafts=ko.observableArray(t),r.showEditor=ko.observable(!0),r.showTitle=ko.observable(!0),r.raw=ko.observable(!0),r.deleteDraft=function(e,t){t.stopPropagation(),D(e.title),r.drafts.remove(e)},r.showDrafts=function(){r.showEditor(!1),r.showTitle(!1),O(),e.hide(),n.show()},r.newDraft=function(){g(["#previewContainer","#drafts"]),r.showTitle(!0),r.showEditor(!0),C.focus(),C.val(""),$("#title").text("")},r.showPreview=function(){N()&&(E(b()),f.hide(),r.showEditor(!1),r.showTitle(!0),y(["#rawHtml","#previewContainer"]),M(),u.fadeIn().show().delay(1e3).fadeOut())},r.hidePreview=function(){e.hide(),r.showEditor(!0),C.trigger("autosize"),C.focus()},r.editDraft=function(e){var t=e.title,i=_(t),s=JSON.parse(i);n.hide(),C.val(s.text).trigger("autosize"),o.text(t),h.text(s.wordCount),r.showEditor(!0),r.showTitle(!0)},r.rawHtml=function(e,t){S(),t.stopPropagation(),r.raw(!1)},r.plain=function(e,t){x(),t.stopPropagation(),r.raw(!0)}},v=new d;ko.applyBindings(v);var C=m()})