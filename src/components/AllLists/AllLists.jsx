import './AllLists.css'
const AllLists=(props)=>{

    const listItems = props.lists.map((eachList) => {
       return (
           <button type="button"  className='list-item' onClick={()=>{
              props.onClickList(eachList)
           }}>{eachList.name}</button>       )
    });
    return(
        <div className='list'>
        <button className="add-list" onClick={()=>{
            props.navigate('/add-list')
           }}>CREATE LIST</button>
            <br/>
            <br/>
    <div className="list-container">
        <h1>All lists</h1>
        <div className='list-items'>
            {listItems}
            </div>
    </div>
     </div>)
}
export default AllLists;