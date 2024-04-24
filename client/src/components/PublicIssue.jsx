/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import moment from 'moment';

const PublicIssue = (props) => {
  const { title, description, imgUrl, user, createdAt } = props;

  const firstLetter = user?.username.charAt(0).toUpperCase();
  const usernameCased =
    user?.username.charAt(0).toUpperCase() +
    user?.username.slice(1).toLowerCase();

  const formattedTime = moment(createdAt).fromNow();

  return (
    
      <><div>
      <div className='user-info'>
        <div className='profile-pic'>{firstLetter}</div>

      </div>
    </div><div className='issue-wrapper'>
        <div className='issue-div'>
          <h3 className='issue-title'>{title}</h3>
          <p className='issue-des'>{description}</p>
          <img className='issue-img' src={imgUrl} alt={title} width={300} />
        </div>
      </div></>
     
 
  );
};

export default PublicIssue;
