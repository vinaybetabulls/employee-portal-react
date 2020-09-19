import React from 'react'
import AllowedActions from '../AllowedActions.json';
import routes from '../routes';

const CheckPageAccess = () => {
  let isUserAuthorised = false;  
  let url = path.replace(/\//g, "");  
  let allowedActions = [];
  let allowedActionsName = [];

  // If permittedPages exists
  if( Array.isArray(permittedPages) && permittedPages.length > 0) {    
    isUserAuthorised = permittedPages.find(page => page.modulePageUrl === url);  
    permittedPages.forEach(element => {      
      // If Url exists
      if(element.modulePageUrl === url){        
        // If Action exists
        if(( Array.isArray(element.actions) && element.actions.length > 0)){
          // Prepare Action List
          element.actions.forEach(item => {   
            allowedActionsName.push(item.actionUrl);
          });
        }
      }
    });
  }  

  return {
    isUserAuthorised,
    allowedActionsName,
    
  };
}

export default CheckPageAccess