({
    autoExpand: function(cmp, event, helper){
        var parentObjectiveIds = cmp.get('parentObjectiveIds');
        var level = cmp.get('level');
        var autoExpandFlag = cmp.get('autoExpandFlag');
        console.log('level#'+level);
        if(autoExpandFlag && parentObjectiveIds.length>level-2){
            helper.getChildObjectives(cmp,parentObjectiveIds[level],true);
        }
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
        
        window.location.href = '/'+selectedObjectiveId.substring(0,3)+'/e?CF00N4600000CCc8B_lkid='+selectedObjectiveId+'&CF00N4600000CCc8B='+encodeURIComponent(selectedObjectiveName);
    },
})