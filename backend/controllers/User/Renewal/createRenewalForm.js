export const createRenewalPostController = async(req,res)=>{
    try {
        const {id,academicYear,studyYear, specializationStatus, ReceiptNo, dateOfPayment} = req.body;
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error creating renewal post"
        })
    }
}