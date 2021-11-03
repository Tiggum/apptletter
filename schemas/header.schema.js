import mongoose from "mongoose";

const HeaderSchema = new mongoose.Schema(
    {
        name: { type: String },
        header: {
            header1: { type: String },
            subheader1: { type: String },
            subheader2: { type: String },
            enableSFLogo: { type: Boolean }
        },
        footer: { type: String }
    }    
)

const Header = mongoose.model("Header", HeaderSchema);

export default Header;
