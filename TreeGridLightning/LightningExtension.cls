public class LightningExtension {
	@AuraEnabled
    public static String getJIRATickets(){
		return JIRAService.getJIRATickets();
    }
    
    @AuraEnabled
    public static List<Objective__c> getGrandParentObjectives(){
        return getGrandParentObjectives(null);
    }
    
    @AuraEnabled
    public static List<Objective__c> getGrandParentObjectives(String searchText){
        if(searchText != null && !String.isBlank(searchText)){
            String sosl = 'FIND \''+searchText+'*\' IN ALL FIELDS RETURNING Objective__c'; 
            List<List<Objective__c>> searchList = search.query(sosl);
            Map<Id,Objective__c> objectiveMap = new Map<Id,Objective__c>(searchList[0]);
            return [SELECT Id, Name, Objective_Code__c, Description__c, Due_Date__c, Objective_Metric__c, Objective_Owner__c, 
                Objective_Name__c, Parent_Objective__c, Quarter__c, Objective_Status__c, Type__c, Objective_Unit__c, Vertical__c, 
                (SELECT Id, Name, Objective_Code__c, Description__c, Due_Date__c, Objective_Metric__c, Objective_Owner__c, 
                Objective_Name__c, Parent_Objective__c, Quarter__c, Objective_Status__c, Type__c, Objective_Unit__c, Vertical__c 
                FROM Objectives__r ORDER BY Name) FROM Objective__c WHERE Parent_Objective__c=NULL AND ID IN :objectiveMap.keySet() ORDER BY Name];
        }
        return [SELECT Id, Name, Objective_Code__c, Description__c, Due_Date__c, Objective_Metric__c, Objective_Owner__c, 
                Objective_Name__c, Parent_Objective__c, Quarter__c, Objective_Status__c, Type__c, Objective_Unit__c, Vertical__c, 
                (SELECT Id, Name, Objective_Code__c, Description__c, Due_Date__c, Objective_Metric__c, Objective_Owner__c, 
                Objective_Name__c, Parent_Objective__c, Quarter__c, Objective_Status__c, Type__c, Objective_Unit__c, Vertical__c 
                FROM Objectives__r ORDER BY Name) FROM Objective__c WHERE Parent_Objective__c=NULL ORDER BY Name];
    }
    
    @AuraEnabled
    public static List<Objective__c> getChildObjectives(Id objectiveId){
        return getChildObjectives(objectiveId,null);
    }
    
    @AuraEnabled
    public static List<Objective__c> getChildObjectives(Id objectiveId, String searchText){
        if(searchText != null && !String.isBlank(searchText)){
            String sosl = 'FIND \''+searchText+'*\' IN ALL FIELDS RETURNING Objective__c (Id WHERE Parent_Objective__c=\''+objectiveId+'\')'; 
            List<List<Objective__c>> searchList = search.query(sosl);
            Map<Id,Objective__c> objectiveMap = new Map<Id,Objective__c>(searchList[0]);
            return [SELECT Id, Name, Objective_Code__c, Description__c, Due_Date__c, Objective_Metric__c, Objective_Owner__c, 
                    Objective_Name__c, Parent_Objective__c, Quarter__c, Objective_Status__c, Type__c, Objective_Unit__c, Vertical__c, 
                    (SELECT Id, Name, Objective_Code__c, Description__c, Due_Date__c, Objective_Metric__c, Objective_Owner__c, 
                    Objective_Name__c, Parent_Objective__c, Quarter__c, Objective_Status__c, Type__c, Objective_Unit__c, Vertical__c 
                    FROM Objectives__r ORDER BY Name) FROM Objective__c WHERE Parent_Objective__c=:objectiveId AND ID IN :objectiveMap.keySet() ORDER BY Name];
        }else{
            return [SELECT Id, Name, Objective_Code__c, Description__c, Due_Date__c, Objective_Metric__c, Objective_Owner__c, 
                    Objective_Name__c, Parent_Objective__c, Quarter__c, Objective_Status__c, Type__c, Objective_Unit__c, Vertical__c, 
                    (SELECT Id, Name, Objective_Code__c, Description__c, Due_Date__c, Objective_Metric__c, Objective_Owner__c, 
                    Objective_Name__c, Parent_Objective__c, Quarter__c, Objective_Status__c, Type__c, Objective_Unit__c, Vertical__c 
                    FROM Objectives__r ORDER BY Name) FROM Objective__c WHERE Parent_Objective__c=:objectiveId ORDER BY Name];
        }
    }
}