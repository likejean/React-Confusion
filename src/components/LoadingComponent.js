import React from 'react';

export const Loading = () => {
    return (
        <div className='col-12'>
            <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary'></span>        
            <h2>Loading...</h2>
        </div>
    );
}