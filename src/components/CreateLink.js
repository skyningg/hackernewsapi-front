import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK_MUTATION = gql`
mutation PostMutation(
  $title: String!
  $releaseYear: Int!
  $director: String!
  $genre: String!
  $duration: Int!
  $imageUrl: String!
) {
  createLink(title: $title, releaseYear: $releaseYear, director: $director, genre: $genre, duration: $duration, imageUrl: $imageUrl) {
    id
    title
    releaseYear
    director
    genre
    duration
    imageUrl
  }
}
`
; 

const CreateLink = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    title: '',
    releaseYear: '',
    director: '',
    genre: '',
    duration: '',
    imageUrl: ''
  });
 

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      title: formState.title,
      releaseYear: formState.releaseYear,
      director: formState.director,
      genre: formState.genre,
      duration: formState.duration,
      imageUrl: formState.imageUrl
    },
    onCompleted: () => navigate('/')
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.title}
            onChange={(e) =>
              setFormState({
                ...formState,
                title: e.target.value
              })
            }
            type="text"
            placeholder="The title of the movie"
          />
          <input
            className="mb2"
            value={formState.releaseYear}
            onChange={(e) =>
              setFormState({
                ...formState,
                releaseYear: e.target.value
              })
            }
            type="number"
            placeholder="the Release Year"
          />
          <input
            className="mb2"
            value={formState.director}
            onChange={(e) =>
              setFormState({
                ...formState,
                director: e.target.value
              })
            }
            type="text"
            placeholder="the director of the movie"
          />
          <input
            className="mb2"
            value={formState.genre}
            onChange={(e) =>
              setFormState({
                ...formState,
                genre: e.target.value
              })
            }
            type="text"
            placeholder="Genre of the movie"
          />
          <input
            className="mb2"
            value={formState.duration}
            onChange={(e) =>
              setFormState({
                ...formState,
                duration: e.target.value
              })
            }
            type="number"
            placeholder="Duration of the movie"
          />
          <input
            className="mb2"
            value={formState.imageUrl}
            onChange={(e) =>
              setFormState({
                ...formState,
                imageUrl: e.target.value
              })
            }
            type="text"
            placeholder="Image URL from movie poster"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;