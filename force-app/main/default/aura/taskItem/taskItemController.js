({
    activeDoneChange: function(component, event, helper) {
        let updTaskItem  = component.get("v.task");
        console.log(updTaskItem);
        let action = component.get('c.doneActiveUpd');
        action.setParams({"task" : updTaskItem});
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
                console.log('СУССЕСС');
                let updDoneActive = component.getEvent('udateDoneActiveTask');
                updDoneActive.setParams({'activeDone': updTaskItem});
                updDoneActive.fire();
            }
        });
        $A.enqueueAction(action);
    },

    showDiscr: function(component, event, helper) {
        let task = component.get('v.task');
        console.log(task);
        let showDescr = component.getEvent('showDesc');
        showDescr.setParams({'task' : task});
        showDescr.fire();
    },

})