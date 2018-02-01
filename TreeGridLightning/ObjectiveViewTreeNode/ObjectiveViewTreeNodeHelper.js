({
	getChildObjectives : function(cmp, selectedObjectiveId, flag) {
        if(flag){
            var action = cmp.get('c.getChildObjectives');
            action.setParams({objectiveId:selectedObjectiveId,searchText: cmp.get('v.searchText')});
            
            action.setCallback(this, $A.getCallback(function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var childObjectives = response.getReturnValue();
                    var objectives = cmp.get("v.objectives");
                    for(var i=0; i<objectives.length; i++){
                        if(objectives[i].Id === selectedObjectiveId){
                            objectives[i].expandFlag = flag;
                            objectives[i].Objectives__r = childObjectives;
                        }else if(objectives[i].Objectives__r && objectives[i].Objectives__r.length>0){
                            this.expandObjective(objectives[i].Objectives__r,selectedObjectiveId,childObjectives,flag);
                        }
                    }
                    cmp.set("v.objectives",objectives);
                } else if (state === "ERROR") {
                    var errors = response.getError();
                    console.error(errors);
                }
            }));
            
            $A.enqueueAction(action);
        }else{
            var objectives = cmp.get("v.objectives");
            this.collapseObjectiveTree(objectives,selectedObjectiveId,false);
            cmp.set("v.objectives",objectives);
        }
	},
    
    collapseObjectiveTree: function(objectives,selectedObjectiveId,flag){
        //iterate over all the objectives to find out which objective node is selected for collapse
        for(var j=0; j<objectives.length; j++){
            //if parent level objective matched
            if(objectives[j].Id === selectedObjectiveId){
                objectives[j].expandFlag = flag;
            }
            //otherwise look for all the child objectives of this parent level objective
            else if(objectives[j].Objectives__r && objectives[j].Objectives__r.length>0){
                this.collapseObjectiveTree(objectives[j].Objectives__r,selectedObjectiveId,flag);
            }
        }        
    },
    
    expandObjective: function(objectives,selectedObjectiveId,childObjectives,flag){
        //iterate over all the objectives to find out which objective node is selected for expand
        for(var j=0; j<objectives.length; j++){
            //if parent level objective matched
            if(objectives[j].Id === selectedObjectiveId){
                objectives[j].expandFlag = flag;
                objectives[j].Objectives__r = childObjectives;
            }
            //otherwise look for all the child objectives of this parent level objective
            else if(objectives[j].Objectives__r && objectives[j].Objectives__r.length>0){
                this.expandObjective(objectives[j].Objectives__r,selectedObjectiveId,childObjectives,flag);
            }
        }
    }
})