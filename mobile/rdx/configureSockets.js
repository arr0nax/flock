import sockets from './modules/sockets'

const configureSockets = (socket, store) => {
  socket.on('new_post', data => sockets.newPost(store, data))
  socket.on('new_comment', data => sockets.newComment(store, data))
  socket.on('new_reply', data => sockets.newReply(store, data))
  socket.on('new_react', data => sockets.newReact(store, data))
};

export default configureSockets;
