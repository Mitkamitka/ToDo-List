({
    saveNewTask : function(component, event, helper) {
        let newTask = component.get("v.newTask");
        console.log(newTask)
        let action = component.get("c.saveTask");
        action.setParams({
            "task" : newTask
        });

        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let newTaskEvent = component.getEvent("saveNewTask");
                newTaskEvent.setParams({'task':newTask});
                newTaskEvent.fire();
                console.log('SUSUSSUSUSUS');
            }
        });
        $A.enqueueAction(action);
    },
    
    closeModel: function(component, event) {
        let closeMod = component.getEvent("closeModal");
        closeMod.fire();
    }
})