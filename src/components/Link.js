import React from 'react';
import { AUTH_TOKEN } from '../constants';
import { useMutation, gql } from '@apollo/client';

const VOTE_MUTATION = gql`
mutation VoteMutation($linkId: Int!) {
  createVote(linkId: $linkId) {
    link {
      id
    }
    link {
      id
      votes {
        id
        user {
          id
        }
      }
    }
    user {
      id
    }
  }
}
`;


const Link = (props) => {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);
  
 const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id
    }
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
      <span className="gray">{props.index + 1}.</span>
      {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={vote}
          >
            ▲ like
            </div>
      )}
      <div>
      
      <h2> {link.title} </h2> 
        <li> Director: {link.director} </li> 
        <li> Duration: {link.duration} </li> 
        <li> Genre: {link.genre} </li> 
        <li> Años de estreno: {link.releaseYear} </li> 
        <li> Poster: {link.imageUrl} </li> 
        </div>

        <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
          </div>
    </div>
    </div>
  );
};

export default Link;