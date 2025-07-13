import express from 'express';
const router = express.Router()
import Member from "../model/member.js"
router.post("/getmembers", async (req, res) => {
    const { name } = req.body;
    console.log(name)
    
        try {
            if (name !== "" && name !== undefined) {
                let member = await Member.find({ name: name })
              
                res.json(member)
                // console.log("member found")
            }
            else {
                let members = await Member.find();

                // console.log(members)
                res.json(members);
                // console.log("all members found")
            }
        } catch (error) {
            console.log(error);
            res.json({ message: "Error fetching member" });
            // console.log("error fetching member")
        }  
    

})

router.post("/deletemember", async (req, res) => {
    const {id}=req.body
    try {
        user=await Member.findByIdAndDelete(id)
        
    } catch (error) {
        console.log(error)
        res.json("error deleting member")
        
    }
})

router.post("/editmember", async (req, res) => {
    const { id, name, role, description } = req.body;
    const updateFields = {};
    if (name !== undefined && name !== "") updateFields.name = name;
    if (role !== undefined && role !== "") updateFields.role = role;
    if (description !== undefined && description !== "") updateFields.description = description;
    try {
        const updatedMember = await Member.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedMember) {
            return res.json({ message: 'Member not found' });
        }
        res.json({ message: 'Member updated successfully', member: updatedMember });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Error updating member' });
    }
});

router.post("/addmember", async (req, res) => {
    const { name, role, description } = req.body;
    try {
        const member = new Member({ name, role, description });
        await member.save();
        res.json({ message: "Member added successfully", member });
    } catch (error) {
        console.log(error);
        res.json({ message: "Error adding member" });
    }
});


export default router;