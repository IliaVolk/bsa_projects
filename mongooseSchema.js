var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectEntity = new Schema({
    users: {//owners
        users:[{							// Related to ‘UsersCollection’
            userNameLink: Schema.UsersCollection._id
        }],
        required: true//front end?
    },
    owners: {//owners
        users:[{							// Related to ‘UsersCollection’
            userNameLink: Schema.UsersCollection._id
        }],
        required: true//front end?
    },

    technologies: [{					// Related to ‘TechnologiesCollection’
        techNameLink: Schema.TechnologiesCollection._id,
        required: true
    }],

    projectName: {type: String, required: true},			// Unique

    description: [{
        date: {type: Date, default: Date.now},
        text: String
    }],

    screenShots: [{
        internal: Boolean,							//Internal: true, External: false
        linkToSource: String,						// if ‘internal’ == false
        shot: Buffer
    }],

    timeBegin:{
        type: Date,
        default: Date.now,
        required: true
    },
    timeEnd:{
        type: Date,
        required: true
    },

    tags: [{											// Related to ‘TagsCollection’
        tagNameLink: Schema.TagsCollection._id,		// if ‘fromCollection’ is ‘true’
        tagName: String
    }],

    stage: {											// Related to ‘StagesCollection’
        stageNameLink: Schema.StagesCollection._id
    },

    sections: [{
        name: String,
        description: String,
        features:[{
            name: String,
            description: String,
            estimation: {
                amount: Number,
                description: String//optional
            },
            subFeatures: [{
                name: String,
                description: String,
                estimation: {
                    amount: Number,
                    description: String//optional
                }
            }]
        }]
    }],
    questions:[{
        question:{
            author: {
                name: String,
                id: ObjectId
            },
            text: String
        },
        answer: [{text: String}],
        isPrivate: Boolean
    }]
    /*estimation: [{
        value: Number,
        date: {type: Date, default: Date.now},
        description: String
    }]*/
});

var RequestedProjectEntity = new Schema({
    owners: {//optional?
        users:[{							// Related to ‘UsersCollection’
            userNameLink: Schema.UsersCollection._id
        }],
        required: true//front end?
    },
    projectName: {type: String, required: true},

    descriptions: [{
        date: {type: Date, default: Date.now},
        descrText: String
    }],

    tags: [{							// Related to ‘TagsCollection’
        tagNameLink: Schema.Tag._id,		// if ‘fromCollection’ is ‘true’
        tagName: String
    }],

    technologies: {
        techNameLinks: [Schema.TechnologiesCollection._id],
        required: true
    },

    condition: {						// Related to ‘ConditionCollection’
        name: String,//InProgress, Estimated
        //conditionNameLink: Number,
        required: true
    },

    screenShots: [{
        internal: Boolean,			//Internal: true, External: false
        linkToSource: String,		// if ‘internal’ == false
        shot: Buffer
    }],

    sections: [{
        name: String,
        description: String,
        features:[{
            name: String,
            description: String,
            estimation: {
                amount: Number,
                description: String//optional
            },
            subFeatures: [{
                name: String,
                description: String,
                estimation: {
                    amount: Number,
                    description: String//optional
                }
            }]
        }]
    }],

    questions:[{
        question:{
            author: {
                name: String,
                id: ObjectId
            },
            text: String
        },
        answer: [{text: String}],
        isPrivate: Boolean
    }]
});


var User = new Schema({
    _id: ObjectId,
    login: String,
    userName: String,
    userSurname: String,
    avatar: Buffer,
    authHash: String,
    rights: [String]
});


var Technology = new Schema({
    _id: ObjectId,
    techName: String,
    techAvatar: Buffer
});


var Tag = new Schema({
    _id: ObjectId,
    tagName: String,
    tagLinks: [Schema.TagsCollection._id]
});


var Stage = new Schema({
    _id: ObjectId,
    stageName: String,
    comissioned: {type: Date, required: true},//дополнительная фича которая позволяет пользователю
    //использовать актуальные на текущий момент stages
    decomissioned: Date
});


var Condition = new Schema({
    // ‘In Progress’ / ‘Estimated’ / ‘Discussed’
    _id: ObjectId,
    conditionName: String,
    comissioned: {type: Date, required: true, default: Date.now},
    decomissioned: Date
})


