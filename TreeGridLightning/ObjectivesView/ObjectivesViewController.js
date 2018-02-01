({
    init: function (cmp, event, helper) {
        helper.getGrandParentObjectives(cmp);
    },
    
    expandNode: function(cmp, event, helper){
        console.log(event);
        var currentTarget = event.currentTarget;
        var parentTRElement = currentTarget.parentElement.parentElement;
        var selectedObjectiveId;
        for(var i=0; i<parentTRElement.attributes.length; i++){
            var attrNodeElement = parentTRElement.attributes[i];
            if(attrNodeElement.nodeName === 'data-objectiveid'){
                selectedObjectiveId = attrNodeElement.nodeValue;
            }
        }
        helper.getChildObjectives(cmp,selectedObjectiveId,true);
    },
    
    collapseNode: function(cmp, event, helper){
        console.log(event);
        var currentTarget = event.currentTarget;
        var parentTRElement = currentTarget.parentElement.parentElement;
        var selectedObjectiveId;
        for(var i=0; i<parentTRElement.attributes.length; i++){
            var attrNodeElement = parentTRElement.attributes[i];
            if(attrNodeElement.nodeName === 'data-objectiveid'){
                selectedObjectiveId = attrNodeElement.nodeValue;
            }
        }
        
        helper.getChildObjectives(cmp,selectedObjectiveId,false);
    },
    
    viewObjective: function(cmp, event, helper){
        console.log(event);
        var currentTarget = event.currentTarget;
        var parentTRElement = currentTarget.parentElement.parentElement;
        var selectedObjectiveId;
        for(var i=0; i<parentTRElement.attributes.length; i++){
            var attrNodeElement = parentTRElement.attributes[i];
            if(attrNodeElement.nodeName === 'data-objectiveid'){
                selectedObjectiveId = attrNodeElement.nodeValue;
            }
        }
        
        window.location.href = '/'+selectedObjectiveId;
    },
    
    editObjective: function(cmp, event, helper){
        console.log(event);
        var currentTarget = event.currentTarget;
        var selectedObjectiveId;
        for(var i=0; i<currentTarget.attributes.length; i++){
            var attrNodeElement = currentTarget.attributes[i];
            if(attrNodeElement && attrNodeElement.nodeName === 'data-objectiveid'){
                selectedObjectiveId = attrNodeElement.nodeValue;
            }
        }
        
        window.location.href = '/'+selectedObjectiveId+'/e';
    },
    
    addObjective: function(cmp, event, helper){
        console.log(event);
        var currentTarget = event.currentTarget;
        var selectedObjectiveId, selectedObjectiveName;
        for(var i=0; i<currentTarget.attributes.length; i++){
            var attrNodeElement = currentTarget.attributes[i];
            if(attrNodeElement && attrNodeElement.nodeName === 'data-objectiveid'){
                selectedObjectiveId = attrNodeElement.nodeValue;
            }
            if(attrNodeElement && attrNodeElement.nodeName === 'data-objectivename'){
                selectedObjectiveName = attrNodeElement.nodeValue;
            }
        }
        //to populate any field of standard layout, field value should be sent 
        //as query string parameter with field id. here id can be vary per org.
        //inspect the field in standard layout to get the id
        window.location.href = '/'+selectedObjectiveId.substring(0,3)+'/e?CF00N4600000CCc8B_lkid='+selectedObjectiveId+'&CF00N4600000CCc8B='+encodeURIComponent(selectedObjectiveName);
    },
    
    search: function (cmp, event, helper) {
        cmp.set("v.spinner","show");
        var objectives = cmp.get("v.objectives");
        if(objectives && objectives.length>0){
            for(var i=0; i<objectives.length; i++){
            	objectives[i].expandFlag = false;
            }
            cmp.set("v.objectives",objectives);
        }
        helper.getGrandParentObjectives(cmp);
    },
})