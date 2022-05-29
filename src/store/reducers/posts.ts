import { IPost } from '..';

const GET_POST = 'GET_POST';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const EDIT_POST = 'EDIT_POST';

export function getPostsAction(postsArray: Array<IPost>) {
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

export function editPostAction(post: Array<IPost>) {
  return {
    type: EDIT_POST,
    payload: post,
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
    case 'EDIT_POST': {
      return {
        ...state,
        posts: state.posts.map((el: any) =>
          el.id === action.payload.id ? action.payload : el
        ),
      };
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
