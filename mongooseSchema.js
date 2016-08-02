var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectEntity = new Schema({
    users: {//owners
        users:[{                            // Related to ‘UsersCollection’
            userNameLink: Schema.UsersCollection._id
        }],
        required: true//front end?
    },
    owners: {//owners
        users:[{                            // Related to ‘UsersCollection’
            userNameLink: Schema.UsersCollection._id
        }],
        required: true//front end?
    },

    technologies: [{                    // Related to ‘TechnologiesCollection’
        techNameLink: Schema.TechnologiesCollection._id,
        required: true
    }],

    projectName: {type: String, required: true},            // Unique

    isCompleted: Boolean,                               //020816 Updated

    description: [{                                     //020816 Updated
        date: {type: Date, default: Date.now},
        descrText: String,
        attachments: [{
            name: String,
            date: {type: Date, default: Date.now},
            att: Buffer
        }]
    }],

    screenShots: [{
        internal: Boolean,                          //Internal: true, External: false
        linkToSource: String,                       // if ‘internal’ == false
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

    tags: [{                                            // Related to ‘TagsCollection’
        tagNameLink: Schema.TagsCollection._id,     // if ‘fromCollection’ is ‘true’
        tagName: String
    }],

    stage: {                                            // Related to ‘StagesCollection’
        stageNameLink: Schema.StagesCollection._id
    },

    condition: {                        // Related to ‘ConditionCollection’
        name: String,                   // InProgress, Estimated
        conditionNameLink: Schema.ConditionCollection._id,   //Updated
        required: true
    },

    sections: [{
        name: String,
        description: String,
        features: [Schema.FeaturesCollection._id]       //021816 Updated  ask Alex???
        // features:[{
        //     name: String,
        //     description: String,
        //     estimation: {
        //         amount: Number,
        //         description: String//optional
        //     },
        //     subFeatures: [{
        //         name: String,
        //         description: String,
        //         estimation: {
        //             amount: Number,
        //             description: String//optional
        //         }
        //     }]
        //}]
    }],
    questions:[{
        question:{
            author: Schema.UserCollection._id,          //020816 Updated
            text: String
        },
        answer: [{
            author: Schema.UserCollection._id,          //020816 Updated
            text: String
        }],
        isPrivate: Boolean
    }]

    rating: [{
        value: Number,
        date: {type: Date, default: Date.now},
        description: String
    }],

    features: [Feature]
});

var User = new Schema({
    _id: ObjectId,
    login: String,
    userName: String,
    userSurname: String,
    avatar: Buffer,
    authHash: String,               //020816 ????
    rights: [String]
});


var Technology = new Schema({
    _id: ObjectId,
    techName: String,
    techAvatar: Buffer,
    techDescription: String
});


var Tag = new Schema({                  //020816 Updated
    _id: ObjectId,
    tagName: String
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


var Feature = new Schema({
        _id: ObjectId,
        featureName: String,
        featureOrder: String,
        isNecessary: Boolean,                           // 'true' == Necessary, 'false' == Desirable
        featureDescription: {
            images: [{shortName: String, binBody: Buffer}],
            extImagesLinks: [String],
            attachments: [{fileName: String, binBody: Buffer}],
            extLinks: [String],
            lists: [[String]]
        },
        created: {type: Date, default: Date.now},
        isImplemented: Boolean,
        childFeatures: [SubFeature]
})


var SubFeature = new Schema({
        _id: ObjectId,
        subFeatureName: String,
        subFeatureOrder: String,
        isNecessary: Boolean,                           // 'true' == Necessary, 'false' == Desirable
        subFeatureDescription: {
            images: [{shortName: String, binBody: Buffer}],
            extImagesLinks: [String],
            attachments: [{fileName: String, binBody: Buffer}],
            extLinks: [String],
            lists: [[String]]
        },
        created: {type: Date, default: Date.now},
        isImplemented: Boolean
})