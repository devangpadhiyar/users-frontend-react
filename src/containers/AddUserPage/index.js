/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {addUserForm} from './actions';

export class AddUserPage extends Component {

	state = {
    firstName:'',
    lastName:'',
    age:'',
    errors:{}
	}


  
  onSubmit = (e)=>{
    e.preventDefault();
    const {firstName, lastName, age} = this.state;
    this.props.addUser({firstName,lastName,age});
  }

  onChangeInput = (e)=>{
    const {name,value} = e.target;

    let errors = {...this.state.errors};
    delete errors[name];

    this.setState({
      [name]:value,
      errors
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.status !== nextProps.status && nextProps.status==="success"){
      this.props.history.push('/');
    }

    if(this.props.status !== nextProps.status && nextProps.status==="error"){
      const errors = {}
      if(nextProps.data){
         Object.keys(nextProps.data).map((k)=>{
           errors[k] = nextProps.data[k].message
         }) 
      }
      this.setState({
        errors,
      })
    }
  }
  

  render() {
    const {data, status} = this.props;
    const {errors} = this.state;
    return (
      <Container>
        <Row>
          <Col>
          <h2>Create User</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control name="firstName" type="text" placeholder="Enter firstname" onChange={this.onChangeInput}/>
                {errors.firstName && (
                <Form.Text variant="" className="text-danger">
                  {errors.firstName}
                </Form.Text>)}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Last name</Form.Label>
                <Form.Control name="lastName" type="text" placeholder="Enter last name" onChange={this.onChangeInput}/>
                {errors.lastName && (
                <Form.Text className="text-danger">
                  {errors.lastName}
                </Form.Text>)}
              </Form.Group>

              
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Age</Form.Label>
                <Form.Control name="age" type="number" placeholder="Enter age" onChange={this.onChangeInput}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.addUser.status,
  data: state.addUser.data,
});

const mapDispatchToProps = (dispatch)=>{
  return {
    addUser:(payload)=>{dispatch(addUserForm(payload))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddUserPage));
