import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Team() {
  const [type, setType] = useState("")
  const [members, setMembers] = useState([])
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [description, setDescription] = useState("")
 
  const [deleteMember, setDeleteMember] = useState("")
  const [memberAdd, setMemberAdd] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    role: '',
    description: ''
  })

  const fetchMembers = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/members/getmembers", { name })
      setMembers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleAddMember = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:4000/api/members/addmember`, {
        name,
        role,
        description
      })
    
      setName("")
      setRole("")
      setDescription("")
      setMemberAdd(false)
      fetchMembers()
      alert("Member added successfully")
      window.location.reload()
    } catch (err) {
      alert("Error adding member")
    }
  }

  const openEditForm = (member) => {
    setEditId(member._id)
    setEditFormData({
      name: member.name || '',
      role: member.role || '',
      description: member.description || ''
    })
  }

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value })
  }

  const handleEditFormSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:4000/api/members/editmember', { id: editId, ...editFormData })
      setEditId(null)
      setEditFormData({ name: '', role: '', description: '' })
      fetchMembers()
    } catch (error) {
      alert('Error updating member')
    }
  }

  const deleteClick = async (id) => {
    try {
      await axios.post(`http://localhost:4000/api/members/deletemember`, { id })
      alert("Member deleted successfully")
      setDeleteMember("")
      fetchMembers()
    } catch (error) {
      alert("Error deleting member")
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-0 m-0">
        <div className="flex items-center justify-center mt-3">
          <h1 className="text-4xl text-blue-900 font-bold text-center mt-5 p-0">
            Team Members
          </h1>
          <button
            className="bg-blue-900 font-bold text-center mt-5 absolute right-2 text-white p-2 backdrop-blur-3xl text-shadow-2xs z-30 hover:p-1 rounded-4xl cursor-pointer"
            onClick={() => setMemberAdd(!memberAdd)}
          >
            Add members+
          </button>
        </div>

        {/* Add Member Form */}
        {memberAdd && (
          <form
            onSubmit={handleAddMember}
            className="bg-white p-4 rounded shadow-md flex flex-col gap-2 my-4 w-[300px] mx-auto"
          >
            
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="bg-gray-200 p-2 rounded text-black"
              required
            />
            <input
            type='text'
             value={type}
             onChange={e => setType(e.target.value)} 
              className="bg-gray-200 p-2 rounded text-black"
            placeholder="Type" 
            required
            />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
              className="bg-gray-200 p-2 rounded text-black"
              required
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="bg-gray-200 p-2 rounded text-black"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        )}

        {/* Edit Member Form */}
        {editId && (
          <form
            onSubmit={handleEditFormSubmit}
            className="bg-white p-4 rounded shadow-md flex flex-col gap-2 my-4 w-[300px] mx-auto"
          >
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
              placeholder="Name"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="role"
              value={editFormData.role}
              onChange={handleEditFormChange}
              placeholder="Role"
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
            ></textarea>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditId(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Members List */}
        <div className="w-screen bg-black mt-4 min-h-screen p-0">
          {members.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-10 p-5">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="bg-white w-[300px] h-[400px] rounded-lg shadow-lg p-4 flex flex-col items-center justify-center gap-2"
                >
                  <h2 className="text-2xl font-bold text-blue-900">
                    {member.name}
                  </h2>
                  <p className="text-gray-700">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>

                  <button
                    className="text-blue-700 cursor-pointer hover:text-blue-950"
                    onClick={() => openEditForm(member)}
                  >
                    Edit
                  </button>

                  {deleteMember === member._id ? (
                    <>
                      <button
                        className="text-red-700 cursor-pointer hover:text-red-950"
                        onClick={() => deleteClick(member._id)}
                      >
                        Confirm
                      </button>
                      <button
                        className="text-gray-500 cursor-pointer"
                        onClick={() => setDeleteMember("")}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-red-700 cursor-pointer hover:text-red-950"
                      onClick={() => setDeleteMember(member._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center mt-10">
              <h1 className="text-2xl text-red-700 mt-8 font-bold">
                No members found
              </h1>
              <p className="text-blue-700">Add members</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Team
