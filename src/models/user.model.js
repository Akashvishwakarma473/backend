import mongoose, {Schema, SchemaType} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";  // This is for Password Increption and Decription

const userSchema = new Schema(
    {
        username: 
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true      // To make field searchable in an optimize manner do index true
        },
        email: 
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: 
        {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: 
        {
            type: String, // Online URL Services eg. Cloudinary AWS
            required: true
        },
        coverImage: 
        {
            type: String, // Online URL Services eg. Cloudinary
        },
        watchHistory: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:
        {
            type: String,
            required: [true, 'Password is Required']
        },
        refreshToken: 
        {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)