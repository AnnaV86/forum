import { IPost } from '..';

const GET_POST = 'GET_POST';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';

export function getPostAction(postsArray: Array<IPost>) {
  return {
    type: GET_POST,
    payload: postsArray,
  };
}

export function addPostAction(newPost: Array<IPost>) {
  return {
    type: ADD_POST,
    payload: newPost,
  };
}

export function deletePostAction(id: string) {
  return {
    type: DELETE_POST,
    payload: id,
  };
}

const initialState = { posts: [] };

export const postsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_POST': {
      return { ...state, posts: action.payload };
    }
    case 'ADD_POST': {
      return { ...state, posts: state.posts.concat(action.payload) };
    }
    case 'DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter((el: any) => el.id !== action.payload),
      };
    }

    default:
      return state;
  }
};
