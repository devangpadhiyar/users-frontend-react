import React, { Component } from 'react';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import {fetchUserList, removeUserFromList} from './actions';
import {withRouter} from 'react-router-dom';
 
class UserListPage extends Component {
	state = { }
	
	componentDidMount() {
		this.props.getUsers();
  }
  
  onClickRemoveButton = (userId)=>{
    this.props.removeUser(userId);
  }

  onClickViewEditButton = (userId)=>{
    this.props.history.push(`/user/${userId}`);
  }

  componentWillReceiveProps(nextProps) {
    
    if(this.props.removeUserStatus !== nextProps.removeUserStatus && nextProps.removeUserStatus === "success"){
      this.props.getUsers();
    }
  }
  

  render() {
    const {users, status} = this.props;
    return (
      <Container>
        <Row style={{marginTop:'50px'}}>
          <Col>
          {status==="success"?
            (<Table responsive>
              <thead>
                <tr>
                  <th>(# Id in mongo db)</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map(u=>(
                    <tr key={u._id}>
                      <td>{u._id}</td>
                      <td>{u.firstName}</td>
                      <td>{u.lastName}</td>
                      <td>{u.age}</td>
                      <td>
                        <Button variant="danger" style={{marginLeft:'5px',marginRight:'5px'}} onClick={()=>this.onClickRemoveButton(u._id)}>Delete</Button>
                        <Button style={{marginLeft:'5px',marginRight:'5px'}} onClick={()=>this.onClickViewEditButton(u._id)}>View/Edit</Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>):(
              <h2>Loading data...</h2>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={()=>this.props.history.push('/user/add')}> Add user</Button>
          </Col>
        </Row>
      </Container>	
    )
      
  }
}


const mapStateToProps = state => ({
  users: state.userList.users,
  status: state.userList.getUserStatus,
  removeUserStatus: state.userList.removeUserStatus
})

const mapDispatchToProps = (dispatch)=>{
	return {
    getUsers: ()=>{dispatch(fetchUserList())},
    removeUser: (id)=>{dispatch(removeUserFromList(id))}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserListPage));