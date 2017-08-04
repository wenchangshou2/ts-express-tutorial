import { Schema } from "mongoose";
export var userSchema: Schema = new Schema({
    createdAt: Date,
    email: String,
    firstName: String,
    lastName: String
})
userSchema.pre("save", function (next) {
    console.log('11111111111save');
    if (!this.createdAt) {
        this.createdAt = new Date()
    }
    console.log('2222222222222');
    next();
})
userSchema.pre("find", function (next) {
    console.log('11111111111find');
    if (!this.createdAt) {
        this.createdAt = new Date()
    }
    console.log('2222222222222');
    next();
})