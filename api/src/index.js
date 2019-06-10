import Glue from 'glue';
import Manifest from '../config/manifest';
import Config from '../config/config';


const composeOptions = {
  relativeTo: __dirname,
};

const startServer = async () => {
  try {
    const server = await Glue.compose(Manifest.get('/'), composeOptions);

    await server.start();
    const name = Config.get('projectName');
    console.log('server is running at ' + server.info.uri)
    const io = server.plugins.hapio.io;
    io.on('connection', function(socket) {
        console.log(`${socket.id} connected !`);
    });
    return server;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};



module.exports = startServer();
