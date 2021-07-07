({  
    doInitOfDesc: function(component, event, helper) {
        let itemId = component.get('v.clickTaskDescr.Id');
        helper.initOfDescHelper(component, itemId);
    },

    closeDescr : function(component, event, helper) {
        let closeDescr = component.getEvent("closeDesc");
        closeDescr.fire();
    }, 

    showBigPic: function(component, event, helper) {
        let x = event.getSource().get('v.value');
        console.log(x);
        let y = x.substring(0,2) + x.substring(16, 21) + " class='hiddenBigPic'" + x.substring(33);
        console.log(y);
        component.set('v.bigPic', y);
        component.set('v.showHideBigPic', true);
    },

    hideBigPic: function(component){
        component.set('v.showHideBigPic', false);
        component.set('v.bigPic', null);
    },

    handleFilesChange: function(component, event, helper) {
        let file = event.getSource().get('v.files')[0];
        let reader  = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            let base64Url = reader.result;
            component.set('v.URL', base64Url);
            component.set('v.bool', true);
        }
    },
    insertNewScreen: function(component, event, helper) {
        let newScreen = component.get('v.URL');
        component.set('v.btnBool', true);
        helper.newScreenUpload(component, newScreen);
    }
})