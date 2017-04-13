// preparing language file
var aLangKeys=new Array();
aLangKeys['en']=new Array();
aLangKeys['es']=new Array();

var getString = function(index){
	if (aLangKeys[localStorage.getItem("lang")]){
		return aLangKeys[localStorage.getItem("lang")][index];
	} else {
		return aLangKeys["es"][index];
	}
}