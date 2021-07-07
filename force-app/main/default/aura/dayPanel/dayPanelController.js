({  
    doInit: function(component, event, helper) {
        let dayDateAction = component.get("c.getDayAndDate");
        
        dayDateAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let arr = [];
                const week = response.getReturnValue();
                for (let i in week) {
                    arr.push({
                        key : week[i], 
                        value : i
                    });
                }
                component.set("v.dayAndDate", arr);
                
            }
        });
        $A.enqueueAction(dayDateAction);
    },

    openModal: function(component, event, helper) {
        component.set('v.isPopupOpen', true);
    },

    closeModal: function(component, event, helper) {
        component.set('v.isPopupOpen', false);
    },

    updTaskList: function(component, event, helper) {
        let dateVal = component.get('v.tabValStore');
        helper.updTaskListHelp(component, "c.getTasks", "v.tasks", dateVal);
        component.set('v.isPopupOpen', false);
    },

    updTaskListAfterDoneActiveChange: function(component, event, helper) {
        let dateVal = component.get('v.tabValStore');
        let radioBtnVal = component.get('v.radioBtnValueStore');
        console.log(radioBtnVal);
        if (radioBtnVal == 'Active' || radioBtnVal == 'Done') {
            helper.updTaskListDoneActiveHelp(component, radioBtnVal, "c.getActiveDoneTasks", "v.tasks", dateVal);
        } else {
            helper.updTaskListHelp(component, "c.getTasks", "v.tasks", dateVal);
        }
    },

    radioChange: function(component, event, helper) {
        let dateVal = component.get('v.tabValStore');
        let radioBtnLable = event.getParam('value');
        component.set('v.radioBtnValueStore', radioBtnLable);
        if (radioBtnLable == 'Active' || radioBtnLable == 'Done') {
            helper.updTaskListDoneActiveHelp(component, radioBtnLable, "c.getActiveDoneTasks", "v.tasks", dateVal);
        } else {
            helper.updTaskListHelp(component, "c.getTasks", "v.tasks", dateVal);
        }
    }, 

    changeTab: function(component, event, helper) {
        component.set('v.hideDescr', true);
        let radioBtnAll = component.get('v.value');
        console.log(radioBtnAll);
        let tabVal = event.getSource().get('v.id');
        component.set('v.tabValStore', tabVal);
        helper.updTaskListHelp(component, "c.getTasks", "v.tasks", tabVal);
    }, 

    highListShowDesc: function(component, event, helper) {
        let taskDescription = event.getParam('task');
        console.log(taskDescription);
        component.set('v.task', taskDescription);
        component.set('v.hideDescr', false);
    }, 

    highDescShowList: function(component, event, helper) {
        component.set('v.hideDescr', true);
    }, 

    getUserCred: function(component, event, helper) {
        let action = component.get('c.getUserCred');
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                console.log('SUSSESS');
            }
        });
        $A.enqueueAction(action);
    }

})