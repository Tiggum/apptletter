import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
    {
        name: { type: String },
        header: {
            header1: { type: String },
            subheader1: { type: String },
            subheader2: { type: String },
            enableSFLogo: { type: Boolean },
        },
        body: {
            fontSize: { type: Number },
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
        },
        signature: {
            name: { type: String },
            branch: { type: String },
            rank: { type: String },
            position: { type: String }
        },
        footer: { type: String }
    }
);

const Template = mongoose.model("Template", TemplateSchema);

export default Template;
