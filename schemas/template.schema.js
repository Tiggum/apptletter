import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
    {
        name: { type: String },
        body: {
            fontSize: { type: Number },
            font: { type: String },
            date: { type: Date },
            to: { type: String },
            from: { type: String },
            subject: { type: String },
            appointees: {
                columnHeader: [{ type: String }],
                rows: [[{ type: String }]],
                table: { type: Boolean }
            },
            paragraphs: [{ type: String }]
        }
    }
);

const Template = mongoose.model("Template", TemplateSchema);

export default Template;
