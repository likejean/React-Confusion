import React from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';

function RenderDish ({dish}){       
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

function RenderComments({comments}) {
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
    
const DishDetail = (props) => {
    if (props.dish != null){            
        return (
            <div className='container'>
                <div className='row'>
                    <RenderDish dish ={props.dish} />
                    <RenderComments comments ={props.dish.comments} />
                </div>
            </div>
        );
    }else{  
        return (                
            <div></div>
        );
    }
}
        
export default DishDetail;

