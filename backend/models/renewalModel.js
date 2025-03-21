import mongoose from "mongoose";

const renewalSchema = new mongoose.Schema({
    Enrollment_Number:{
        type: String,
        required: true,
    },
    receipt_number:{
        type: String,
        required: true,
    },
    payment_date:{
        type: String,
        required: true,
    },
    receipt:{
        Name:{
            type: String,
            required: true,
        },
        path:{
            type: String,
            required: true,
        }
    },
    current_year_of_study:{
        type: Number,
        required: false,
    },
    current_academic_year:{
        type: String,
        required: false,
    },
    renewal_approved:{
        type: Boolean,
        required: false,
    }
})

export default mongoose.model("Renewal",renewalSchema)