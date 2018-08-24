# select2dropdown

Init bootstrap dropdown from select node
Assumed structure: 

      <div class="dropdown" id="mydropdown"> <select/> </div> 


Note: id attribute is optional, used for dLabel.id, class and style attributes will be set to button.class button.style 


Result structure structure:

      <div class="dropdown">
          <select/> 
          <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown trigger
              <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dLabel">
          ...
          </ul>
      </div>
