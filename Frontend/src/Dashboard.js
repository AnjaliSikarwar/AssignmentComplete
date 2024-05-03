import React, { useEffect } from 'react'

function Dashboard() {

  const DashboardValid = async()=> {
    let token = localStorage.getItem("userDataToken")
    // console.log(token);

    const res = await fetch("/validUser",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();
    
    if(data.status === 401 || !data){
      console.log("error page redirect");
    }else{
      console.log("user verify");
    }
  }

  useEffect(()=>{
     DashboardValid()
  },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard