({
    
    updTaskListHelp: function(component, contr, atr, dateOfWeek) {
        let action = component.get(contr);
        action.setParams({"dateOfTask" : dateOfWeek});
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                component.set(atr, response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }, 

    updTaskListDoneActiveHelp: function(component, vrbl, contr, atr, dateValue) {
        console.log(vrbl);
        console.log(dateValue);
        let action = component.get(contr);
        action.setParams({'doneActive' : vrbl,
                          'dateOfTaskDoneActive' : dateValue});
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                component.set(atr, response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }, 
})