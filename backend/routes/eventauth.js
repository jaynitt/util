import Event from "../model/event.js"
import express from "express";
 const router=express.Router();



//eventadd
router.post("/eventadd", async (req, res) => {
  const { title, description, date, venue } = req.body;
  try {
    const eventnew = new Event({ title, description, date, venue });
    await eventnew.save();
    res.json({ message: "Event registered", event: eventnew });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering event" });
  }
});

 //eventdelete
 router.post("/eventdelete",async(req,res)=>{
    const {id}=req.body
    try {
        const eventToDelete = await Event.findByIdAndDelete(id)
        if (!eventToDelete) {
            return res.json({ message: 'Event not found' });
        }
        res.json("event deleted successfully")
        
        
    } catch (error) {
        console.log(error)
        res.json("error deleting event")
        
    }
 })
 // eventedit
router.post("/eventedit", async (req, res) => {
    const { id, title, description, date, venue, tags } = req.body;
    // Only include fields that are not undefined or empty string
    const updateFields = {};
    if (title !== undefined && title !== "") updateFields.title = title;
    if (description !== undefined && description !== "") updateFields.description = description;
    if (date !== undefined && date !== "") updateFields.date = date;
    if (venue !== undefined && venue !== "") updateFields.venue = venue;
    if (tags !== undefined && tags !== "") updateFields.tags = tags;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );
        if (!updatedEvent) {
            return res.json({ message: 'Event not found' });
        }
        res.json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Error updating event' });
    }
});
 router.get('/', async (req, res) => {
   const title = req.query.title;

    try {
        let events;
        if (title) {
            events = await Event.find({ title });
        } else {
            events = await Event.find();
            
        }
        res.json(events);
    } catch (error) {
        console.log(error,"in route")
        res.json({ message: 'Error fetching events' });
    }
});

 export default router;