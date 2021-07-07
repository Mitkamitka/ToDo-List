({
    initOfDescHelper : function(component, itemId) {
        let action = component.get('c.getScreenshots');
        action.setParams({
            'itemId': itemId,
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let records = response.getReturnValue();
                let screnUrlArr = component.get('v.URLs');
                for (let record in records) {
                    let screenUrl = records[record].Screenshot__c;
                    let substrScreenUrl =screenUrl.substr(0, 2) + " class='pImg' " +  screenUrl.substr(2, 6) + "class='pic' " + screenUrl.substr(8);
                    screnUrlArr.push(substrScreenUrl);
                }
                component.set('v.URLs', screnUrlArr);
                console.log(component.get('v.URLs'))
            }
        });
        $A.enqueueAction(action);
    }, 

    newScreenUpload: function(component, newScreen) {
        let itemId = component.get('v.clickTaskDescr.Id');
        let itemName = component.get('v.clickTaskDescr.Name');
        let action = component.get('c.insertNewScreenshots');
        action.setParams({
            'itemName': itemName,
            'itemId': itemId,
            'file': newScreen
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let records = response.getReturnValue();
                let screnUrlArr = component.get('v.URLs');
                let screenUrl = records.Screenshot__c;
                let substrScreenUrl = screenUrl.substr(0, 2) + " class='pImg'" +  screenUrl.substr(2, 6) + "class='pic' " + screenUrl.substr(8);
                component.set('v.bool', false);
                component.set('v.btnBool', false);
                screnUrlArr.push(substrScreenUrl);
                component.set('v.URLs', screnUrlArr);
                console.log(screnUrlArr);
            }
        });
        $A.enqueueAction(action);
    }
})