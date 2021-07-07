({
    doInit: function(component, event, helper) {
        let myAction = component.get('c.getMyMap');
        myAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                console.log('SUCCESS');
                console.log(response.getReturnValue());
                const recievedMap = response.getReturnValue();

                let result = [];
                for (var key in recievedMap) {
                    result.push({
                        key: key,
                        value: recievedMap[key],
                    });
                }
                console.log(result)
                component.set("v.myMap", result);
            } else {
                console.log('ERROR');
            }
        });
        $A.enqueueAction(myAction);
    },
    doAction: function (component, event, helper) {
        console.log('action')
        console.log(event.getSource())
        console.log(event.getSource().get('v.id'))
    }
})