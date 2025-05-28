import mongoose, { Model, Schema } from "mongoose";
import { INote } from "./note.types";

const NoteSchema:Schema<INote> = new Schema({
    title: {type: String, required: true},
    content: {type: String, default: ''},

    createdBy: {type: Schema.Types.ObjectId, ref: "Account", required: true},
    visibleTo: [{type: Schema.Types.ObjectId, ref: "Account"}],
    isPrivat: {type: Boolean, default: false},

    linkedNotes: [{type: Schema.Types.ObjectId, ref: "Note"}],
    linkedExpenses: [{type: Schema.Types.ObjectId, ref: "Expense"}],
    linkedTasks: [{type: Schema.Types.ObjectId, ref: "Task"}],

    images: [{type: String}],
    deadline: {type: Date}
  },
  {
    timestamps: true
  }
);

export const Note:Model<INote> = mongoose.model("Note", NoteSchema);