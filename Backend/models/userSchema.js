const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const keysecret = "anjalisikarwarsoniasikarwarsonal"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: "Invalid email"
        }
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Hash password before saving
userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
    }
    next();
    
    
});

// Generate authentication token
userSchema.methods.generateAuthToken = async function() {
    try {
        const token23 = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d" // Set expiration time for one day
        });
        this.tokens = this.tokens.concat({ token : token23 });
        await this.save();
        return token23;
    } catch (error) {
        res.status(422).json(error) // Return error object for handling
    }
};
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
