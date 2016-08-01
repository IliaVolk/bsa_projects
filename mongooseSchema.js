
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name:  {type: String, required: true},
    description: String,
    timeBegin:   {type: Date, default: Date.now},//always default
    timeEnd: {
        type: Date,
        required: true
    },
    attachment: {
        type: String, //or Number
        data: Buffer //binary type
        //can be stored on special services
    },
    stage: String, // or Number
    tags: [String],
    technologies: {
        value: [{
            name: String,
            id: ObjectId // reference to image, other
        }
        ],
        required: true}
    ,
    users: {
        value: [{
                name: String,//urgent(срочынй) info
                rights: [String],
                id: ObjectId //reference to other information
            }
    ],
        required: true},
    estimate:{//оценка
        value: Number,//средняя оценка
        count: Number,//число оценок
        //urgent info
        estimates:[/*can contain more info*/]
    },
    features: [{
            name: String,
            description: String,//other data
            //will contain references to data in attachment
            //if possible, can be in special binary format
            attachment: [{
                id: Number,
                type: String,//or Number
                data: Buffer
            }],
            subFeatures:[/*Feature*/]//not required
        }
    ]
});
var requestedProjectSchema = new Schema({
    _id: ObjectId,
    name: String,
    description: String,
    tags:[String],
    technologies:[{
            name: String,
            image: Buffer
        }
    ]
});
var userSchema = new Schema({
    _id: ObjectId,
    name: String,
    hash: Number,//or String
    salt: Number,//password information
    image: Buffer,
    projects: [{
            name: String,//urgent info
            rights: [String],
            id: ObjectId//reference to project
        }
    ],
    technologies:[{
            name: String,//urgent info
            id: ObjectId//reference
        }
    ],
    rights: [String]
});

var technologySchema = new Schema({
    _id: ObjectId,
    name: String,
    color: Color,
    image: Buffer
});