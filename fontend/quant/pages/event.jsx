import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Search } from 'lucide-react';
import { useState } from 'react'
import axios from 'axios'

function event() {

  const [filter, setfilter] = useState("")
  const [events, setevents] = useState([])
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: ''
  });
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: ''
  });
  const navigate=useNavigate()
    
function deleteclick(id) {
 const res= axios.post(`http://localhost:4000/api/events/eventdelete`, { id })
  alert("event deleted successfully")
  fetchEvents(); 
  console.log(res.data)
}
    const fetchEvents = async () => {
    try {
      const res = await axios.get(
        filter
          ? `http://localhost:4000/api/events?title=${filter}`
          : `http://localhost:4000/api/events`
      );
      const token = localStorage.getItem("token");

      setevents(res.data);
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchEvents();
    }
  }, []);
  //search bar
   const handleclick = () => {
    fetchEvents(); 
  }
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
    
      await axios.post('http://localhost:4000/api/events/eventadd', formData);
      alert('Event added successfully');
      setShowForm(false);
      setFormData({ title: '', description: '', date: '', venue: '' });
      fetchEvents();
    } catch (error) {
      alert('Error adding event');
    }
  };

  const openEditForm = (event) => {
    setEditId(event._id);
    setEditFormData({
      title: event.title || '',
      description: event.description || '',
      date: event.date ? event.date.slice(0, 10) : '',
      venue: event.venue || ''
    });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/api/events/eventedit', { id: editId, ...editFormData }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Event updated successfully');
      setEditId(null);
      setEditFormData({ title: '', description: '', date: '', venue: '' });
      fetchEvents();
    } catch (error) {
      alert('Error updating event');
    }
  };

  return (
   <>
  <Navbar/>
   <div className="flex items-center justify-center mt-9">
  <input
    type="text"
    onChange={(e) => setfilter(e.target.value)}
    placeholder="Search here..."
    className="px-4 font-bold w-[55vw] h-[5vh] bg-[#D9D9D9] rounded-3xl outline-none"
  />
  <Search
    size={35}
    onClick={handleclick}
    className="ml-2 cursor-pointer text-black"
  />
</div>

      <div className='backdrop-blur-sm overflow-y-scroll w-auto h-auto px-10 py- mt-5 mb-5'>
        <button className='text-purple-800 hover:p-1 font-bold cursor-pointer ' onClick={() => setShowForm(!showForm)}>Add event+</button>
        {showForm && (
          <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow-md flex flex-col gap-2 my-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Title"
              className="border p-2 rounded"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Description"
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleFormChange}
              placeholder="Venue"
              className="border p-2 rounded"
              required
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        )}


        {editId && (
          <form onSubmit={handleEditFormSubmit} className="bg-white p-4 rounded shadow-md flex flex-col gap-2 my-4">
            <input
              type="text"
              name="title"
              value={editFormData.title}
              onChange={handleEditFormChange}
              placeholder="Title"
              className="border p-2 rounded"
              required
            />
            <textarea
              name="description"
              value={editFormData.description}
              onChange={handleEditFormChange}
              placeholder="Description"
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={editFormData.date}
              onChange={handleEditFormChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="venue"
              value={editFormData.venue}
              onChange={handleEditFormChange}
              placeholder="Venue"
              className="border p-2 rounded"
              required
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
              <button type="button" onClick={() => setEditId(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        )}


        {events.map((event)=>{
          return(
            <div className='mt-0.5'>
              <div className=' text-4xl'>{event.title}</div>
              <div className='text-'>{event.description}</div>
              <div><p>Date: {new Date(event.date).toDateString()}</p></div> 
              <div>{event.venue}</div>
              <button className='text-blue-700 cursor-pointer hover:text-blue-950' onClick={() => openEditForm(event)}>edit </button>
              <button className='text-red-700 ml-1 cursor-pointer hover:text-red-950'
              onClick={()=>{
                deleteclick(event._id)
              }}>delete</button>
              

            </div>
          )
        })}
      </div>
      </>
  )
}

export default event