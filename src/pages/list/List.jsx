import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const List = ({user,setuser,handlesignout}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar user={user} setuser={setuser} handlesignout={handlesignout}/>
        <Datatable user={user} setuser={setuser} handlesignout={handlesignout}/>
      </div>
    </div>
  )
}

export default List