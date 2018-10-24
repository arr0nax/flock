export const DEFAULT_AUTH_STATE = {
  logged_in: false,
  requested: false,
  auth: {
    token: '',
    user: {
      first_name: '',
      last_name: '',
      id: null,
      image_url: '',
    }
  },
}

export const DEFAULT_POSTS_STATE = {
  requested: false,
  posts: [],
}

export const DEFAULT_NOTIFICATIONS_STATE = {
  requested: false,
  notifications: [],
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
