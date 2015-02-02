var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/******************************************************************
Home content Schema
******************************************************************/
 var homeModel = new Schema ({
		playbook:{type: String, default: '', trim : true},
        globalSuccess:{type: String, default: '', trim : true},
        globalTools:{type: String, default: '', trim : true},
        globalLearning:{type: String, default: '', trim : true},
        globalNews:{type: String, default: '', trim : true}
	});
/******************************************************************
Header content Schema
******************************************************************/
var headerModel = new Schema ({

			languageCode:{type: String, default: 'English', trim : true},
 			signoutText:{type: String, default: '', trim : true},
			homeTextTitle:{type: String, default: '', trim : true},
			globalTextTitle:{type: String, default: '', trim : true},
			globalSuccessTitle:{type: String, default: '', trim : true},
			globalToolsTitle:{type: String, default: '', trim : true},
			globalSitesTitle:{type: String, default: '', trim : true},
			globalVediosTitle:{type: String, default: '', trim : true},
			globalNewsTitle:{type: String, default: '', trim : true},
			globalCalendarTitle:{type: String, default: '', trim : true},

			austinTexasTitle:{type: String, default: '', trim : true},
			draperUtahTitle:{type: String, default: '', trim : true},
			dundalkIrelandTitle:{type: String, default: '', trim : true},
			dreilindenGermanyTitle:{type: String, default: '', trim : true},
			shanghaiChinaTitle:{type: String, default: '', trim : true},
			trainingMaterialTitle:{type: String, default: '', trim : true},

			regionalContentTitle:{type: String, default: '', trim : true},
			contactUsTitle:{type: String, default: '', trim : true},
			feedbackTitle:{type: String, default: '', trim : true},
			FAQTitle:{type: String, default: '', trim : true},
	});


/******************************************************************
Add schema to Model.
******************************************************************/
mongoose.model('Home',homeModel);
mongoose.model('Header',headerModel);