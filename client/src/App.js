import React, {Component} from 'react';
import { JsonToTable } from "react-json-to-table";


class App extends Component {

  constructor() {
    super();
    this.state={
      data: []
    }
  }

getHeader = () => {
  const entities = Object.keys(this.state.data[0]);
  entities.forEach(e => {
    return (
      <th>{e}</th>
    )
  })
  console.log(entities)
}


componentDidMount() {
  fetch('http://localhost:5000/select')
  .then(response => response.json())
  .then(data =>{
    this.setState({
      data: data
    })
  })
}

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

  render() {
    return (
      <div>
      <JsonToTable json={this.state.data} />
      <h2>Add New Users</h2>
      <form onSubmit={this.handleSubmitInsert} style={{'display': 'inline-block'}}>
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

      <h2>Update User Info</h2>
      <form onSubmit={this.handleSubmitUpdate}>
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
      </div>
    )
  }
}

export default App;
