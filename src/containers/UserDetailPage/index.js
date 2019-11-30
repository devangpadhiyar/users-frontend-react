/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {fetchUser, updateUserForm} from './actions';

export class UserDetailPAge extends Component {

	state = {
    isEdit: false,
    userId: null,
		form:{
      firstName:'',
      lastName:'',
      age:''
    },
    errors:{
    }
	}

  onSubmit = (e)=>{
    e.preventDefault();
    const {form} = this.state;
    const payload ={
      ...form
    }
    this.props.updateUser(this.state.userId,payload)
  }
  

  onChangeInput = (e)=>{
    const {name,value} = e.target;
    
    let errors = {...this.state.errors};
    delete errors[name];

    this.setState((prevState)=>({
      form:{
        ...prevState.form,
        [name]:value
      },
      errors
    }))
  }

  onClickEdit = ()=>{
    const {firstName, lastName, age} = this.props.data;
    this.setState({
      isEdit:true,
      form:{
       firstName,
       lastName,
       age
      }
    })
  }

  onClickCancel = ()=>{
    this.setState({isEdit:false});
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.setState({userId:id},()=>{
      this.props.fetchUser(id);
    })
    
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.updateStatus !== nextProps.updateStatus && nextProps.updateStatus === "success"){
      this.setState({isEdit:false});
      this.props.fetchUser(this.state.userId)
    }

    // If error in update API
    if(this.props.updateStatus !== nextProps.updateStatus && nextProps.updateStatus==="error"){
      const errors = {}
      if(nextProps.updateData){
         Object.keys(nextProps.updateData).map((k)=>{
           errors[k] = nextProps.updateData[k].message
         }) 
      }
      this.setState({
        errors,
      })
    }
  }
  

  render() {
    const {status, data} = this.props;
    const {isEdit, form, errors} = this.state;

    let component = null;

    if(isEdit){
      component = (
        <Container>
          <Row>
            <Col><h2>Edit User</h2></Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>First name</Form.Label>
                  <Form.Control name="firstName" type="text" placeholder="Enter firstname" onChange={this.onChangeInput} value={form.firstName}/>
                  {errors.firstName && (
                  <Form.Text className="text-danger">
                    {errors.firstName}
                  </Form.Text>)}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control name="lastName" type="text" placeholder="Enter last name" onChange={this.onChangeInput} value={form.lastName}/>
                  {errors.lastName && (
                  <Form.Text className="text-danger">
                    {errors.lastName}
                  </Form.Text>)}
                </Form.Group>

                
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Age</Form.Label>
                  <Form.Control name="age" type="number" placeholder="Enter age" onChange={this.onChangeInput} value={form.age}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )
    } else {
      component =(
        <Container>
          {status === 'error' && (
            <Row>
              <Col style={{textAlign: 'center'}}><h1>User is not found</h1></Col>
            </Row>
          )
          }
          {status==='success' && (
            <React.Fragment>
              <Row>
                <Col>
                  <h2>User details</h2>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>First name: {data.firstName}</Col>
                <Col xs={12}>Last name: {data.lastName}</Col>
                <Col xs={12}>Age: {data.age}</Col>
              </Row>
              <Row>
                <Col>
                  <Button onClick={this.onClickEdit} style={{marginLeft:'5px',marginRight:'5px'}}>Edit</Button>
                  <Button style={{marginLeft:'5px',marginRight:'5px'}} onClick={()=>this.props.history.push('/')}>Return to list</Button>
                </Col>
              </Row>
            </React.Fragment>
          )}
  
        </Container>
      )
    }
    


    return component;
  }
}


const mapStateToProps = (state) => ({
  status: state.userDetail.userStatus,
  data: state.userDetail.userData,
  updateStatus: state.userDetail.updateStatus,
  updateData: state.userDetail.updateData
});

const mapDispatchToProps =(dispatch)=>{
  return  {
    fetchUser: (userId)=>{dispatch(fetchUser(userId))},
    updateUser: (userId, payload)=>{dispatch(updateUserForm(userId, payload))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetailPAge));
