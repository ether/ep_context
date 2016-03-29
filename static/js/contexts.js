// Before is the string before ALL items that have this context
// After is the same as above but after..
// first only applies to the first item with this context
// last only applies to the last item with this context
// second only applies to the seocnd item with this context
// beforelast only applies to the penultimate item with this context


/**********
// Suggested CSS should we go down the route of parsing CSS?

.contextresolved{
  displayName: Resolved;
  color:red;
}
.contextresolved::before{

}
.contextresolved::after{

}
// Will below work?
.contextresolved:nth-child(2):after{
  content: "foo";
}
********/

try{
  exports.generateCSSFromContexts = generateCSSFromContexts;
}catch(e){
  // no drama :)
}

function generateCSSFromContexts(contexts){
  var cssItems = []; // For all contexts
  Object.keys(contexts).forEach(function(id){
    var context = contexts[id];
    var idCssItems = []; // Specific to this context, will get squashed soon
    Object.keys(context).forEach(function(position){
      var rules = context[position];
      if(position === "displayName") return;

      // These guys provide basic CSS rules for a context
      if(position === "css" || position === "after" || position === "before"){
        if(position === "css"){
          idCssItems.push("context"+id+" { "+rules+ ";}");
          idCssItems.push("contextfirst"+id+" { "+rules+ ";}");
          idCssItems.push("contextsecond"+id+" { "+rules+ ";}");
          idCssItems.push("contextbeforelast"+id+" { "+rules+ ";}");
          idCssItems.push("contextlast"+id+" { "+rules+ ";}");
        }
        if(position === "after"){
          idCssItems.push("context"+id+"::after { content: '"+rules.content+ "';}");
          idCssItems.push("contextfirst"+id+"::after { content: '"+rules.content+ "';}");
          idCssItems.push("contextsecond"+id+"::after { content: '"+rules.content+ "';}");
          idCssItems.push("contextbeforelast"+id+"::after { content: '"+rules.content+ "';}");
          idCssItems.push("contextlast"+id+"::after { content: '"+rules.content+ "';}");
        }
        if(position === "before"){
          idCssItems.push("context"+id+"::before { content: '"+rules.content+ "';}");
          idCssItems.push("contextfirst"+id+"::before { content: '"+rules.content+ "';}");
          idCssItems.push("contextsecond"+id+"::before { content: '"+rules.content+ "';}");
          idCssItems.push("contextbeforelast"+id+"::before { content: '"+rules.content+ "';}");
          idCssItems.push("contextlast"+id+"::before { content: '"+rules.content+ "';}");
        }
      }else{
        // This is a bit more tricky due to different data structures
        // Basically these guys handle all other edge cases like first/last item styling

        Object.keys(rules).forEach(function(type){
          var rule = rules[type];
          if(type === "css"){
            idCssItems.push("context"+position+id+" { "+rule+ "; }");
          }else{
            if(type === "before"){
              idCssItems.push("context"+position+id+"::before { content: '"+rule.content+ "';}");
            }
            if(type === "after"){
              idCssItems.push("context"+position+id+"::after { content: '"+rule.content+ "';}");
            }
          }
        });

      }

    });
    // console.log("idCSSItems", idCssItems);
    idCssItems = idCssItems.join("\n");
    cssItems.push(idCssItems);
  });
  var cssString = cssItems.join("\n");
  return cssString;
}


