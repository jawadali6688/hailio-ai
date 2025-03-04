import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHome = () => {
  const [allUsers, setAllUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState({
    fullName: "",
    email: "",
    verified: false,
    username: "",
    voiceAccess: false
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/v1/admin/all_users');
        setAllUsers(data.data)
        console.log(data.data)
      } catch (error) {
        console.error('Failed to fetch stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1   gap-5">
      <div className="card  bg-base-100 card-xs drop-shadow-xl border-2 p-2">
  <div className="card-body">
    <h2 className="card-title text-2xl">All Users</h2>
    <p className='text-4xl font-bold mt-5 text-orange-500'>{allUsers?.length}</p>
    {/* <div className="justify-end card-actions">
      <button className="btn btn-primary">View</button>
    </div> */}
  </div>
</div>

<div className="hidden card  bg-base-100 card-xs shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-2xl">All Cloned Voices</h2>
    <p className='text-xl font-bold'>20</p>
    <div className="justify-end card-actions">
      <button className="btn btn-primary">View</button>
    </div>
  </div>
</div>
       </div>


       {/* Some users */}
       <div className="overflow-x-auto py-8">
       <h1 className='text-4xl text-center font-bold my-4'>Users</h1>
  <table className="table">
   
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Voice Access</th>
        <th>Type</th>
        <th>Verified</th>
        <th>Cloned Voices</th>
        <th>Actions</th>


      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        allUsers?.slice()?.reverse()?.map((user, index) => (
<tr className='hover:bg-gray-200'>
        <th>{index + 1}</th>
        <td>{user.fullName}</td>
        <td>{user.email}</td>
        <td>{user.voiceAccess ? "Yes" : "No"}</td>
        <td>{user.accountType}</td>
        <td>{user.verified ? "Yes" : "No"}</td>
        <td>{user.clonedVoices.length}</td>
        <td className='flex gap-2'>
            <button className='btn px-4 btn-primary'
             onClick={()=> {
                setSelectedUser(user)
                document.getElementById('user_edit_model').showModal()

             }}
            >Edit</button>
            <button className='btn px-2 btn-error'>Delete</button>
        </td>
      </tr>
        ))
      }
      
     
    </tbody>
  </table>
</div>
// User Edit Model
<dialog id="user_edit_model" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Edit User</h3>
    <div className='my-4'>
        <form action="" className='flex flex-col gap-4'>
            <input type="text" className='input input-borderd input-info w-full ' value={selectedUser?.fullName} />
            <input type="text" className='input input-borderd input-info w-full ' value={selectedUser?.username} />
            <input type="text" className='input input-borderd input-info w-full ' value={selectedUser?.email} />
        </form>
    </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>



    </div>







  );
};

export default AdminHome;
