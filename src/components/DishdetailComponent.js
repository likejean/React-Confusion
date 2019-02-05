import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderDish ({dish}){       
    return (
        <div className="col-sm-12 col-md-5 m-1">
            <Card>                       
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />                    
                <CardTitle style={{margin : '15px'}}>{dish.name}</CardTitle>
                <CardText style={{margin : '15px'}}>{dish.description}</CardText>
            </Card>
        </div>
    )
}

function RenderComments({comments, addComment, dishId}) {
    
    if(comments != null){
        return (
            <div className="col-sm-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled"> 
                    {comments.map(item => {
                        return (                               
                            <div key={item.id}>
                                <li>--{item.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</li>                                    
                                <li style={{
                                    marginBottom : '25px', 
                                    fontWeight: 'bold',
                                    fontStyle: 'italic'
                                }}>"{item.comment}"</li>                                
                            </div>                                                  
                        );
                    })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        )
    }else{
        return (                
            <div></div>
        );
    }
}
    
const DishDetail = (props) => {
    if (props.isLoading){
        return (
            <div className="container">
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }else if (props.errMess){
        return (
            <div className="container">
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null){            
        return (
            <div className='container'>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {props.dish.name}                
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
                <div className='row'>
                    <RenderDish dish ={props.dish} />
                    <RenderComments comments ={props.comments} 
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                    
                </div>
                
            </div>
        );
    }else{  
        return (                
            <div></div>
        );
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {           
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.message);
    }  
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }   

    render () {
        
        return (
            <React.Fragment>
                <Button onClick={this.toggleModal} outline style={{height: 45, fontSize: 20, paddingTop: 2}}><span className="fa fa-pencil"> Submit Comment</span></Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={3}>Rating</Label>
                                <Col xs={12} md={9}>
                                    <Control.select model=".rating"
                                        name='rating'
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>                                    
                                </Col>                            
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={3}>Your Name</Label>
                                <Col xs={12} md={9}>
                                    <Control.text model=".author" 
                                        id='author' 
                                        name='author'
                                        placeholder="Your Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}                                       
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model='.author'
                                        show='touched'
                                        messages={{
                                            required: 'Required.\n',
                                            minLength: 'Must be greater than 2 characters.\n',
                                            maxLength: 'Must be 15 characters or less.\n'
                                        }}
                                    />                                                                        
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={3}>Comment</Label>
                                <Col xs={12} md={9}>
                                    <Control.textarea model=".message" type='textarea' 
                                        id='message' 
                                        name='message'
                                        row='12'
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:9, offset:3}}>
                                    <Button type="submit"
                                        color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal> 
            </React.Fragment>
        );    
    }
}
        
export default DishDetail;

