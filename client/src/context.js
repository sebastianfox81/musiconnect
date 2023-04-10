import React, { useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';
import setAuthToken from './utils/setAuthToken';
const AppContext = React.createContext();

const initialState = {
  alerts: [],
  show: false,
  loading: false,
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  profile: null,
  profiles: [],
  profileError: {},
  posts: [],
  post: {},
  postError: {}
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showAlert = (msg, type) => {
    const id = Math.random();
    dispatch({ type: 'SHOW_ALERT', payload: { msg, type, id } });
  };
  const removeAlert = (id) => {
    dispatch({ type: 'REMOVE_ALERT' });
  };

  const registerUser = async ({ name, email, password }) => {
    dispatch({ type: 'REGISTER_USER_BEGIN' });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const { data } = await axios.post('/api/users', body, config);
      console.log(data);
      dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data.token });
      getUser();
    } catch (err) {
      console.log(err.response.data.errors);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => showAlert(err.msg, 'danger'));
      }
      dispatch({ type: 'REGISTER_USER_ERROR' });
    }
  };

  const getUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await axios.get('/api/auth');
      dispatch({ type: 'LOAD_USER', payload: data });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  const loginUser = async (email, password) => {
    dispatch({ type: 'LOGIN_USER_BEGIN' });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ email, password });
    try {
      const { data } = await axios.post('/api/auth', body, config);
      dispatch({ type: 'LOGIN_USER_SUCCESS', payload: data.token });
      getUser();
    } catch (err) {
      console.log(err.response.data.errors);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => showAlert(err.msg, 'danger'));
      }
      dispatch({ type: 'LOGIN_USER_ERROR' });
    }
  };
  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' });
    dispatch({ type: 'CLEAR_PROFILE' });
  };

  const getProfile = async () => {
    try {
      const { data } = await axios.get('api/profile/me');

      dispatch({
        type: 'GET_PROFILE',
        payload: data
      });
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  const getAllProfiles = async () => {
    dispatch({ type: 'CLEAR_PROFILE' });
    try {
      const { data } = await axios.get('api/profile');
      dispatch({
        type: 'GET_ALL_PROFILES',
        payload: data
      });
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  const createUserProfile = async (formData, navigate, edit = false) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post('/api/profile', formData, config);
      dispatch({ type: 'GET_USER_PROFILE', payload: data });
      showAlert(edit ? 'Profile Updated' : 'Profile Created', 'success');

      if (!edit) {
        navigate('/dashboard');
      }
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });

      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => showAlert(error.msg, 'danger'));
      }
    }
  };

  const getUserProfileById = async (userId) => {
    try {
      const { data } = await axios.get(`/api/profile/user/${userId}`);
      dispatch({
        type: 'GET_PROFILE',
        payload: data
      });
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  const addProfileExperience = async (formData, navigate) => {
    try {
      const { data } = await axios.put('/api/profile/experience', formData);

      dispatch({
        type: 'UPDATE_PROFILE',
        payload: data
      });

      showAlert('Experience Added', 'success');

      navigate('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => showAlert(error.msg, 'danger'));
      }

      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  const addProfileEducation = async (formData, navigate) => {
    try {
      const { data } = await axios.put('/api/profile/education', formData);

      dispatch({
        type: 'UPDATE_PROFILE',
        payload: data
      });

      showAlert('Education Added', 'success');

      navigate('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => showAlert(error.msg, 'danger'));
      }

      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  const deleteProfileExperience = async (id) => {
    try {
      const { data } = await axios.delete(`api/profile/experience/${id}`);

      dispatch({
        type: 'UPDATE_PROFILE',
        payload: data
      });

      showAlert('Experience Removed', 'success');
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  const deleteProfileEducation = async (id) => {
    try {
      const { data } = await axios.delete(`api/profile/education/${id}`);

      dispatch({
        type: 'UPDATE_PROFILE',
        payload: data
      });

      showAlert('Education Removed', 'success');
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  const deleteUserAccount = async () => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await axios.delete('/api/profile');

        dispatch({ type: 'CLEAR_PROFILE' });
        dispatch({ type: 'ACCOUNT_DELETED' });

        showAlert('Your account has been permanently deleted');
      } catch (err) {
        dispatch({
          type: 'PROFILE_ERROR',
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };

  const getAllPosts = async () => {
    try {
      const { data } = await axios.get('/api/posts');
      dispatch({
        type: 'GET_ALL_POSTS',
        payload: data
      });
    } catch (err) {
      dispatch({
        type: 'POST_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  const addUserPost = async (formData) => {
    try {
      const { data } = await axios.post('/api/posts', formData);
      console.log(data);
      dispatch({
        type: 'ADD_USER_POST',
        payload: data
      });

      showAlert('Post Created', 'success');
      getAllPosts();
    } catch (err) {
      dispatch({
        type: 'POST_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Delete post
  const deleteUserPost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: 'DELETE_POST',
        payload: id
      });

      showAlert('Post Removed', 'success');
    } catch (err) {
      dispatch({
        type: 'POST_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
    // Add like
  const addUserLike = async (id) => {
    try {
      const { data } = await axios.put(`/api/posts/like/${id}`);

      dispatch({
        type: 'UPDATE_LIKES',
        payload: { id, likes: data }
      });
    } catch (err) {
      dispatch({
        type: 'POST_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Remove like
const removeUserLike = async (id) => {
  try {
    const { data } = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: 'UPDATE_LIKES',
      payload: { id, likes: data }
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get single post
const getSinglePost = async (id) => {
  // dispatch({ type: 'LOADING_BEGIN'})
  try {
    const { data } = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: 'GET_SINGLE_POST',
      payload: data
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
const addUserComment = async (postId, formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const { data } = await axios.post(`/api/posts/comment/${postId}`, formData, config);
    dispatch({
      type: 'ADD_COMMENT',
      payload: data
    });

    showAlert('Comment Added', 'success');
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
const deleteUserComment = async (postId, commentId) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: 'REMOVE_COMMENT',
      payload: commentId
    });

    showAlert('Comment Removed', 'success');
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


  return (
    <AppContext.Provider
      value={{
        ...state,
        showAlert,
        removeAlert,
        registerUser,
        getUser,
        loginUser,
        logoutUser,
        getProfile,
        getAllProfiles,
        getUserProfileById,
        createUserProfile,
        addProfileExperience,
        addProfileEducation,
        deleteProfileExperience,
        deleteProfileEducation,
        deleteUserAccount,
        getAllPosts,
        addUserPost,
        addUserLike,
        removeUserLike,
        deleteUserPost,
        getSinglePost,
        addUserComment,
        deleteUserComment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
