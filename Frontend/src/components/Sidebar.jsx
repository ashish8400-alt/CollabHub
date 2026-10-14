// function Sidebar() {
// return ( <div className="w-64 min-h-screen bg-gray-950 text-white p-5">


//   <h1 className="text-3xl font-bold mb-2">
//     CollabHub
//   </h1>

//   <p className="text-gray-400 mb-8">
//     Your Team Workspace
//   </p>


//   <p className="text-gray-500 mb-3">
//     MAIN MENU
//   </p>


//   <div className="bg-violet-600 p-3 rounded-lg mb-2">
//     🏠 Dashboard
//   </div>

//   <div className="p-3 rounded-lg mb-2 hover:bg-gray-800">
//     📁 Projects
//   </div>

//   <div className="p-3 rounded-lg mb-2 hover:bg-gray-800">
//     ✅ My Tasks
//   </div>

//   <div className="p-3 rounded-lg mb-2 hover:bg-gray-800">
//     💬 Messages
//   </div>

//   <div className="p-3 rounded-lg mb-2 hover:bg-gray-800">
//     🔔 Notifications
//   </div>


//   <div className="mt-10 border-t border-gray-800 pt-5">

//     <p className="text-gray-500 mb-3">
//       SUPPORT
//     </p>

//     <div className="p-3 rounded-lg hover:bg-gray-800">
//       ⚙️ Settings
//     </div>

//     <div className="p-3 rounded-lg hover:bg-gray-800">
//       ❓ Help
//     </div>

//   </div>


//   <div className="mt-10 rounded-xl bg-gray-900 p-4">

//     <p className="font-bold">
//       My Account
//     </p>

//     <p className="text-sm text-gray-400 mt-2">
//       Welcome to CollabHub!
//     </p>

//   </div>

// </div>


// );
// }

// export default Sidebar;


import { Link } from "react-router-dom";

function Sidebar() {
return ( <div className="w-64 min-h-screen bg-gray-950 p-5 text-white">


  <h1 className="mb-2 text-3xl font-bold">
    CollabHub
  </h1>

  <p className="mb-8 text-gray-400">
    Your Team Workspace
  </p>

  <p className="mb-3 text-gray-500">
    MAIN MENU
  </p>


  
    {/* 🏠 Dashboard */}
  <Link to="/" className="mb-2 block rounded-lg bg-violet-600 p-3">
    🏠 Dashboard
  </Link>

  <Link to="/projects" className="mb-2 block rounded-lg p-3 hover:bg-gray-800">
    📁 Projects
  </Link>


 {/* ✅ My Tasks */}

  {/* <div className="mb-2 rounded-lg p-3 hover:bg-gray-800">
    ✅ My Tasks
  </div> */}

  <Link to="/tasks" className="mb-2 block rounded-lg p-3 hover:bg-gray-800" > 
  ✅ My Tasks 
  </Link>




 {/* 💬 Messages */}
  {/* <div className="mb-2 rounded-lg p-3 hover:bg-gray-800">
    💬 Messages
  </div> */}

  <Link
  to="/messages"
  className="mb-2 block rounded-lg p-3 hover:bg-gray-800" >
  💬 Messages
</Link>


{/* 🔔 Notifications */}
  {/* <div className="mb-2 rounded-lg p-3 hover:bg-gray-800">
    🔔 Notifications
  </div> */}

  <Link to="/notifications" className="mb-2 block rounded-lg p-3 hover:bg-gray-800" > 
  🔔 Notifications
   </Link>

  <div className="mt-10 border-t border-gray-800 pt-5">

    <p className="mb-3 text-gray-500">
      SUPPORT
    </p>

    <div className="rounded-lg p-3 hover:bg-gray-800">
      ⚙️ Settings
    </div>

    <div className="rounded-lg p-3 hover:bg-gray-800">
      ❓ Help
    </div>

  </div>

  <div className="mt-10 rounded-xl bg-gray-900 p-4">

    <p className="font-bold">
      My Account
    </p>

    <p className="mt-2 text-sm text-gray-400">
      Welcome to CollabHub!
    </p>

  </div>

</div>


);
}

export default Sidebar;
