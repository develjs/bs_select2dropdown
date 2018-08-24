/**
 * Init bootstrap dropdown on select node
 * Assumed structure: 
 *      <div class="dropdown"> <select/> </div> <!-- id attribute used for dLabel.id, class and style attributes will be set to button.class button.style -->
 *
 * Create structure:
 *      <div class="dropdown">
 *          <select/> 
 *          <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
 *              Dropdown trigger
 *              <span class="caret"></span>
 *          </button>
 *          <ul class="dropdown-menu" aria-labelledby="dLabel">
 *          ...
 *          </ul>
 *      </div>
 */
jQuery(function($) {
    var SELECTOR = '.dropdown > select'; // apply for this selectors
    
    // init
    var select = $(SELECTOR);
    var id = 'dLabel' + (select.attr('id')||Math.random());
    
    // init button
    var button = $('<button id="' + id + '" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">').insertAfter(select);
    button.attr('class', select.attr('class')||''); // copy style
    button.attr('style', select.attr('style')||'');
    var text = $('<span>').appendTo(button);
    button.append('<span class="caret arrow-div"></span>');
    select.hide();
    
    // init list
    var ul = $('<ul class="dropdown-menu" aria-labelledby="' + id + '">').insertAfter(button);
    select.find('option').each(function(i, option) {
        addOption(option);
    })
   
    // observe for 
    if (window.MutationObserver) {
        new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach(function(node){
                        if (node.tagName=='OPTION')
                            addOption(node);
                    })
                }
                if (mutation.removedNodes) {
                    mutation.removedNodes.forEach(function(node){
                        if (node.tagName=='OPTION')
                            delOption(node);
                    })
                }
            });    
        })
        .observe(select.get(0), {childList: true});
    }
    else { // use old event types
        select.on('DOMNodeInserted', function(e) {
            if (e.target.tagName=='OPTION')
                addOption(e.target);
        });
        select.on('DOMNodeRemoved', function(e) {
            if (e.target.tagName=='OPTION')
                delOption(e.target);
        });
    }
    
    
    // -------------
    function setActive(option) {
        ul.find('li.active').removeClass('active');
        ul.find('a[data-value="' + option.getAttribute('value') + '"]').parent().addClass('active');
        
        var sel = select.find('option[selected]').get(0);
        if (option != sel) {
            if (sel) sel.removeAttribute('selected');
            option.setAttribute('selected', 'selected');
        }
        
        text.html(option.innerHTML);
    }
    
    function addOption(option) {
        var li = $('<li><a href="#" data-value="' + option.getAttribute('value') + '">' + option.innerHTML + '</a></li>'); // class="' + (active? 'active': '') + '"
        ul.append(li);
        li.on('click', function(e){
            setActive(option);
        })
        if (option.hasAttribute('selected'))
            setActive(option);
    }
    
    function delOption(option) {
        ul.find('a[data-value="' + option.getAttribute('value') + '"]').parent().remove();
    }
    
    
    // init selection
    setActive(select.find('option[selected]').get(0));
});