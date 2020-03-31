import React, {Component} from 'react';
import { JsonToTable } from "react-json-to-table";
import './index.css'

class App extends Component {

  constructor() {
    super();
    this.state={
      selectionstate: [localStorage.getItem('newstate')],
      projectionstate: [localStorage.getItem('projectstate')],
      aggregationstate:[localStorage.getItem('aggregationstate')],
      divisionstate: [localStorage.getItem('divisionstate')]
    }
  }



// componentDidMount() {
//   fetch('http://localhost:5000/select')
//   .then(response => response.json())
//   .then(data =>{
//     this.setState({
//       data: data
//     })
//   })
// // }
//  componentDidMount(){
//   const newdata = localStorage.getItem('newstate')
//   console.log(newdata)
//   console.log(this.state.data)
//   this.setState({data: newdata})
// }

handleSubmitInsert = event =>{
  const data = new FormData(event.target)
  fetch('http://localhost:5000/insert',{
    method: "POST",
    body: data
  })
}

handleSubmitUpdate = event =>{
  const data = new FormData(event.target)
  fetch('http://localhost:5000/insert',{
    method: 'PUT',
    body: data
  })
}

handleDelete = event =>{
  const data = new FormData(event.target)
  fetch('http://localhost:5000/delete',{
    method: 'POST',
    body: data
  })
}

handleSelection = event =>{
  // const data = new FormData(event.target)
  const data = document.getElementById('selection_username').value
  fetch('http://localhost:5000/select/'+data ,{
    method: 'POST',
  })
  .then(data=>data.json())
  .then(response=>{
    localStorage.setItem('newstate',JSON.stringify(response));
  localStorage.setItem('selectionDefaultState',1)
  })
}

clearSelectionResult = () =>{
  localStorage.setItem('selectionDefaultState',0)
}

//LIST ALL USERS'NAME OF A GROUP
handleProjection = event =>{
  const data = new FormData(event.target)
  fetch('http://localhost:5000/project', {
    method: 'POST',
    body: data
  }).then(data=>data.json())
  .then(response => {
    localStorage.setItem('projectstate', JSON.stringify(response))
    localStorage.setItem('projectiondefault',1)
  })
}

clearProjectionResult = () =>{
  localStorage.setItem('selectionDefaultState',0)
}

//Handle aggreagation
handleAggregation = event =>{
  const data = new FormData(event.target)
  fetch('http://localhost:5000/aggregate',{
    method: 'POST',
    body: data
  }).then(data=>data.json())
  .then(response => {
    localStorage.setItem('aggregationstate', JSON.stringify(response))
    localStorage.setItem('aggregationdefault',1)
  })
}
clearAggregationResult = () =>{
  localStorage.setItem('aggregationdefault',0)
  window.location.reload()
}


//handle division
handleDivision = event =>{
  fetch('http://localhost:5000/division',{
    method: 'GET'
  }).then(data=>data.json())
  .then(response =>{
    localStorage.setItem('divisionstate', JSON.stringify(response))
    localStorage.setItem('divisiondefault', 1)
  })
}

clearDivisionTable = () =>{
  localStorage.setItem('divisiondefault', 0)
  window.location.reload()

}

  render() {
    return (
      <div>
      <form style={{'display': 'inline-block'}} >
      <h2>Add New Users</h2>
      <br/>
      <input type="text" placeholder='Username' name='username'/>
      <br/>
      <input type="text" placeholder='Page ID' name='id'/>
      <br/>
      <input type="text" placeholder='Email' name='email'/>
      <br/>
      <input type="password" placeholder="Password" name='password'/>
      <br/>
      <input type="text" placeholder="Name" name='name'/>
      <br/>
      <input type='date' placeholder='Birthday' name='birthday' />
      <br/>
      <input type='text' placeholder='Page Descrption' name='description'/>
      <br/>
      <input type='text' placeholder='Profile Picture URL' name='picture'/>
      <br/>
      <button>Submit</button>
      </form>

      <form onSubmit={this.handleSubmitUpdate}>
      <h2>Update User Info</h2>
      <br/>
      <input type="text" placeholder='Username' name='username'/>
      <br/>
      <input type="text" placeholder='Page ID' name='id'/>
      <br/>
      <input type="text" placeholder='Email' name='email'/>
      <br/>
      <input type="password" placeholder="Password" name='password'/>
      <br/>
      <input type="text" placeholder="Name" name='name'/>
      <br/>
      <input type='date' placeholder='Birthday' name='birthday' />
      <br/>
      <input type='text' placeholder='Page Descrption' name='description'/>
      <br/>
      <input type='text' placeholder='Profile Picture URL' name='picture'/>
      <br/>
      <button>Submit</button>
      </form>
      
      <form onSubmit={this.handleDelete}>
      <h2>Delete Users</h2>
      <br/>
      <input name='username' placeholder='Please enter username' type='text'/>
      <br/>
      <button>Submit</button>
      </form>

      <form onSubmit={this.handleSelection}>
      <h2>Select User</h2>
      <br/>
      <input id='selection_username' name='username' placeholder='Please enter username' type='text'/>
      <br/>
      <button>Submit</button>
      <button onClick={this.clearSelectionResult} >Clear Table</button>
      </form>
      <br/>

      <form onSubmit={this.handleProjection}>
      <h2>List names of a group'users</h2>
      <br/>
      <input name='name' placeholder='Please Enter Group Name' type='text' />
      <br/>
      <button>Submit</button>
      <button onClick={this.clearProjectionResult}>Clear Table</button>
      </form>
      <br/>


      <form onSubmit={this.handleAggregation}>
      <h2>Average age of a user's followers</h2>
      <br/>
      <input name ='username' placeholder='Please Enter Username' type='text' />
      <button>Submit</button>
      <button onClick={this.clearAggregationResult}>Clear</button>
      </form>
      <br/>


      <form onSubmit={this.handleDivision}>
        <h2>Get the name of events that all public users attend</h2>
        <br/>
        <button>Query</button>
        <br/>
        <button onClick={this.clearDivisionTable}>Clear Table</button>
      </form>
      <br/>
      {localStorage.getItem('selectionDefaultState') == 1 ? <JsonToTable json={JSON.parse(this.state.selectionstate)} /> : null}
      {localStorage.getItem('projectiondefault') == 1 ? <JsonToTable json={JSON.parse(this.state.projectionstate)} /> : null}
      {localStorage.getItem('aggregationdefault') == 1 ? <JsonToTable json={JSON.parse(this.state.aggregationstate)} /> : null}
      {localStorage.getItem('divisiondefault') == 1 ? <JsonToTable json={JSON.parse(this.state.divisionstate)} /> : null}

      </div>
    )
  }
}

export default App;
