const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String,
        
    },
    website: {
        type: String,
        
    },
    location: {
        type: String,
        
    },
    status: {
        type: String,
        require:true
    },
    skills: {
        type: [String],
        require:true
        
    },
    bio: {
        type: [String],
        
    },
    githubusername:{
        type: String,
    },

    experience: [
     {
         title: {
             type: String,
             require: true
         },
         Company: {
            type: String,
            require: true
        },
        location: {
            type: String,
           
        },
        from: {
            type: Date,
            require: true
        },
        to: {
            type: Date,
            require: true
        },
        current: {
            type: Boolean,
            require: true
        },
        description: {
            type: String,
            require: true
        }
     }
    ],

    education: [
        {
            school: {
                type: String,
                require: true
            },
            degree: {
               type: String,
               require: true
           },
           fieldofstudy: {
               type: String,
              
           },
           from: {
               type: Date,
               require: true
           },
           to: {
               type: Date,
               require: true
           },
           current: {
               type: Boolean,
               require: true
           },
           description: {
               type: String,
               require: true
           }
        }
       ],

       social: {
           youtube: {
               type:String
           },
           twitter: {
            type:String
           },
           facebook: {
            type:String
            },
           linkedin: {
            type:String
            },
           instagram: {
            type:String
            },
       },
    
    date: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = Profile = mongoose.model('profile', ProfileSchema );