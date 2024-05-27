
const UserModel = require("../../models/Users");
 

const getGangs = async (req, res) => {
    const { substation_id } = req.body;

    try {

        // console.log("substation_id",substation_id);

        if (!substation_id) {
            return res.status(404).json({ message: "Sub Station Id is required", status: 400 })
        }
                 const gangs = await UserModel.find({substation_id:substation_id})
                            .select('_id username ')
                                .catch((error) => {
                                    console.error("Error finding user:", error);
                                    return res.status(400).json({ message: 'Internal server error. ', status: 400 });
                                });


        if (!gangs) {
            return res.status(404).json({ message: "No Gang found In Sub Station", status: 400 })
        }
        return res.status(200).json({ gangs, message: "Gangs fetched Successfully", status: 200 });
       
    } catch (error) {
        return res.status(500).json({ error: error, message: "Internal Server Error" ,status: 500 });
        
    }
   
};

module.exports = getGangs;
