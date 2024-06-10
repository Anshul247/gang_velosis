// const ZoneModel = require("../../models/Zone");
// const CircleModel = require("../../models/Circle");
// const DivisionModel = require("../../models/Division");
// const SubdivisionModel = require("../../models/Subdivision");
// const SubstationModel = require("../../models/Substation");

 
 
// const getHierarchyBySubStation = async (req, res) => {
//     const { substationId } = req.body;


//         try {
//             // Step 1: Get the Substation
//             const substation = await SubstationModel.findById(substationId);
//             if (!substation) {
//                 throw new Error('Substation not found');
//             }
    
//             // Step 2: Get the Subdivision
//             const subdivision = await SubdivisionModel.findOne({ subdivisionID: substation.subdivisionID });
//             if (!subdivision) {
//                 throw new Error('Subdivision not found');
//             }
    
//             // Step 3: Get the Division
//             const division = await DivisionModel.findOne({ DIVISION_UID: subdivision.division_id });
//             if (!division) {
//                 throw new Error('Division not found');
//             }
    
//             // Step 4: Get the Circle
//             const circle = await CircleModel.findOne({ CIRCLE_UID: division.CIRCLE_UID });
//             if (!circle) {
//                 throw new Error('Circle not found');
//             }
    
//             // Step 5: Get the Zone
//             const zone = await ZoneModel.findOne({ ZONE_UID: circle.ZONE_UID });
//             if (!zone) {
//                 throw new Error('Zone not found');
//             }
    
         
            
//         return res.status(200).json({ substation:substation.sub_station,subdivision:subdivision.subdivision,division:division.DIVISION_NAME,circle:circle.CIRCLE_NAME,zone:zone.ZONE_NAME,message: 'Hierarchy fetched successfully.', status: 200 });
//     } catch (error) {
//         console.error("Error updating complaints:", error);
//         return res.status(400).json({substation:'',subdivision:'',division:'',circle:'',zone:'', message: 'Internal server error.', status: 400 });
//     }
// };

// module.exports = getHierarchyBySubStation;


const ZoneModel = require("../../models/Zone");
const CircleModel = require("../../models/Circle");
const DivisionModel = require("../../models/Division");
const SubdivisionModel = require("../../models/Subdivision");
const SubstationModel = require("../../models/Substation");

const getHierarchyBySubStation = async (req, res) => {
    const { substationId } = req.body;

    try {
        // Step 1: Get the Substation
        const substation = await SubstationModel.findById(substationId);
        if (!substation) {
            return res.status(404).json({substation:'',subdivision:'',division:'',circle:'',zone:'', message: 'Substation not found', status: 404 });
        }

        // Step 2: Get the Subdivision
        const subdivision = await SubdivisionModel.findOne({ subdivisionID: substation.subdivisionID });
        if (!subdivision) {
            return res.status(404).json({substation:'',subdivision:'',division:'',circle:'',zone:'', message: 'Subdivision not found', status: 404 });
        }

        // Step 3: Get the Division
        const division = await DivisionModel.findOne({ DIVISION_UID: subdivision.division_id });
        if (!division) {
            return res.status(404).json({substation:'',subdivision:'',division:'',circle:'',zone:'', message: 'Division not found', status: 404 });
        }

        // Step 4: Get the Circle
        const circle = await CircleModel.findOne({ CIRCLE_UID: division.CIRCLE_UID });
        if (!circle) {
            return res.status(404).json({substation:'',subdivision:'',division:'',circle:'',zone:'', message: 'Circle not found', status: 404 });
        }

        // Step 5: Get the Zone
        const zone = await ZoneModel.findOne({ ZONE_UID: circle.ZONE_UID });
        if (!zone) {
            return res.status(404).json({substation:'',subdivision:'',division:'',circle:'',zone:'', message: 'Zone not found', status: 404 });
        }

        return res.status(200).json({ 
            substation: substation.sub_station,
            subdivision: subdivision.subdivision,
            division: division.DIVISION_NAME,
            circle: circle.CIRCLE_NAME,
            zone: zone.ZONE_NAME,
            message: 'Hierarchy fetched successfully.',
            status: 200 
        });
    } catch (error) {
        console.error("Error fetching hierarchy:", error);
        // return res.status(500).json({ message: 'Internal server error.', status: 500 });
        return res.status(400).json({substation:'',subdivision:'',division:'',circle:'',zone:'', message: 'Internal server error.', status: 400 });
    }
};

module.exports = getHierarchyBySubStation;


