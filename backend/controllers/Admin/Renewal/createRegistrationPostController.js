import adminUpdates from "../../../models/adminUpdates.js";

export const createRegistrationPostController = async(req,res)=>{
    try {
        const {adminId,updateType,updateMessage,expireDate,enrollmentDate,idCardIssueDate,academicYear} = req.body;

        if(!updateType ||!updateMessage ||!expireDate ||!enrollmentDate ||!academicYear || !idCardIssueDate){
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            })
        }else{
            if(updateType !=='Registration'){
                return res.status(400).send({
                    success: false,
                    message: "Invalid update type"
                })
            }else{
                const registrationPost = new adminUpdates({
                    adminId,
                    updateType,
                    updateMessage,
                    expireDate,
                    idCardIssueDate,
                    enrollmentDate,
                    academicYear
                });
                await registrationPost.save();
                return res.status(200).send({
                    success: true,
                    message: "Registration post created successfully",
                    registrationPost
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error creating registration post"
        })
    }

}