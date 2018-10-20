export const DEFAULT_AUTH_STATE = {
  name: "",
  id: null,
  logged_in: false,
  requested: false,
  auth: {

  }
}

export const DEFAULT_POSTS_STATE = {
  requested: false,
  posts: [],
}

export const DEFAULT_USERS_STATE = {
  requested: false,
  users: [],
}

export const DEFAULT_COMMENTS_STATE = {
  requested: false,
  comments: {},
}

export const DEFAULT_REPLIES_STATE = {
  requested: false,
  replies: {},
}

export const DEFAULT_REACTS_STATE = {
  requested: false,
  post_reacts: {},
  comment_reacts: {},
  reply_reacts: {},
}
