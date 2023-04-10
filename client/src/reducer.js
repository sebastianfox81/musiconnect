const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_BEGIN':
      return {
        ...state,
        loading: true
      }
    case 'SHOW_ALERT':
      const { id, msg, type } = action.payload;
      const newAlert = { id, msg, type };
      return {
        ...state,
        show: true,
        alerts: [...state.alerts, newAlert]
      };
    case 'REMOVE_ALERT':
      return {
        ...state,
        alerts: [],
        show: false
      };
    case 'REGISTER_USER_BEGIN':
    case 'LOGIN_USER_BEGIN':
      return {
        ...state,
        loading: true
      };
    case 'REGISTER_USER_SUCCESS':
    case 'LOGIN_USER_SUCCESS':
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true
      };
    case 'REGISTER_USER_ERROR':
    case 'LOGIN_USER_ERROR':
    case 'LOGOUT_USER':
    case 'ACCOUNT_DELETED':
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false
      };
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case 'GET_PROFILE':
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case 'GET_ALL_PROFILES':
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case 'PROFILE_ERROR':
      return {
        ...state,
        profileError: action.payload,
        loading: false,
        profile: null
      };
    case 'CLEAR_PROFILE':
      return {
        ...state,
        profile: null
      };
    case 'CREATE_USER_PROFILE':
      return {
        ...state,
        profile: action.payload
      };
    case 'GET_ALL_POSTS':
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case 'POST_ERROR':
      return {
        ...state,
        postError: action.payload,
        loading: false
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
      case 'DELETE_POST':
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== action.payload),
          loading: false
        };
    case 'UPDATE_LIKES':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id ? { ...post, likes:  action.payload.likes } : post
        ),
        loading: false
      };
      case 'GET_SINGLE_POST':
        return {
          ...state,
          loading: false,
          post: action.payload
        };
        case 'ADD_COMMENT':
          return {
            ...state,
            post: { ...state.post, comments: action.payload },
            loading: false
          };
        case 'REMOVE_COMMENT':
          return {
            ...state,
            post: {
              ...state.post,
              comments: state.post.comments.filter(
                (comment) => comment._id !== action.payload
              )
            },
            loading: false
          };
    default:
      return state;
  }
};

export default reducer;
