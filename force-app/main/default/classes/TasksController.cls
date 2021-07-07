public with sharing class TasksController {
    @AuraEnabled
    public static List<Todo_List__c> getTasks(String dateOfTask){
        System.debug(dateOfTask);
        Date dateFromString = Date.parse(dateOfTask);
        return [SELECT Id, Name, Status__c, Description__c, Task_Date__c
                FROM Todo_List__c WHERE Task_Date__c =: dateFromString];
    }

    @AuraEnabled
    public static List<Todo_List__c> getActiveDoneTasks(String doneActive, String dateOfTaskDoneActive){
        Date dateFromString2 = Date.parse(dateOfTaskDoneActive);
        return [SELECT Id, Name, Status__c, Description__c, Task_Date__c
                FROM Todo_List__c WHERE Status__c =: doneActive AND Task_Date__c =: dateFromString2];
    }

    @AuraEnabled
    public static Todo_List__c saveTask(Todo_List__c task) {
        System.debug(task);
        upsert task;
        return task;
    }

    @AuraEnabled
    public static Todo_List__c doneActiveUpd(Todo_List__c task) {
        if(task.Status__c == 'Active') {
            task.Status__c = 'Done';
        } else {
            task.Status__c = 'Active';
        }
        update task;
        return task;
    }

    @AuraEnabled 
    public static Map<String,String> getDayAndDate() {
        List<String> days = new List<String> {'lolo', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'};
        Map<String,String> dayAndDate = new Map<String,String>();
        Date dateToday = System.Today(); 
        Date startOfWeek = dateToday.toStartOfWeek();
        for (Integer i = 1; i<6; i++) {
            dayAndDate.put(startOfWeek.addDays(i).format(), days.get(i));
        }
        return dayAndDate;
    }

    @AuraEnabled 
    public static Picture__c insertNewScreenshots(String itemName, Id itemId, String file) {
        Picture__c newPic = new Picture__c();
        newPic.Name = itemName + 'screenshoot';
        newPic.Todo_List__c = itemId;
        newPic.Screenshot__c = '<p><img src="' + file + '" ></p>'; 
        insert newPic;  
        return newPic;
    }

    @AuraEnabled 
    public static List<Picture__c> getScreenshots(Id itemId) {
        List<Picture__c> pictures = [SELECT Name, Todo_List__c, Screenshot__c FROM Picture__c WHERE Todo_List__c =: itemId];
        System.debug(pictures);
        return pictures;
    }

    @AuraEnabled
    public static void getUserCred() {
        String endpoint = 'https://graph.facebook.com/v2.6/device/login';
        String body = 'access_token=<1424940791219913|2dbe894f78dec5957d9c912dc210c64c>';
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        req.setbody(body);
        req.setHeader('Authorization', 'username:password');
        Http http = new Http();
        HTTPResponse response = http.send(req);
        System.debug(response.getBody());
    } 

}