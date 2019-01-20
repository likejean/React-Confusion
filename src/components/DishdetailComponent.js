import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';


class DishDetail extends Component {
    
    renderDish(dish){       
        return (
            <div className="col-sm-12 col-md-5 m-1">
                <Card>                       
                    <CardImg width='100%' src={dish.image} alt={dish.name} />                    
                    <CardTitle style={{margin : '15px'}}>{dish.name}</CardTitle>
                    <CardText style={{margin : '15px'}}>{dish.description}</CardText>                            
                 
                </Card>
            </div>
        )
    }

    renderComments(comments) {
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
                </div>
            )
        }else{
            return (                
                <div></div>
            );
        }
    }
    render(){        
        if (this.props.dish != null){            
            return (
                <div className='container'>
                    <div className='row'>
                        {this.renderDish(this.props.dish)}
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            );
        }else{  
            return (                
                <div></div>
            );
        }
    } 
}

export default DishDetail;