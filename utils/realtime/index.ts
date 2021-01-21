import { redisClient } from '../../src/config/redis';
export const connectServer = (socket: any) => {
  const currentId =  socket.id;
  const userName = socket.handshake.query.q;
  redisClient.get(userName, (error, listId: any) => {
    let listIds = [];
    if (listId) {
      listIds = listId.split(',');
    }
    listIds.push(currentId);
    redisClient.set(userName, listIds.join(','), (err, res) => {
      if (err) {
        throw err;
      }
    });
  });
  socket.on('disconnect', () => {
    console.log(socket, userName, currentId)
    redisClient.get(userName, (error, list: any) => {
      const listIds = list.split(',');
      const index = listIds.indexOf(socket.id);
      listIds.splice(index, 1);
      redisClient.set(userName, listIds.join(','), (err, res) => {
        if (err) {
          throw err;
        }
      });
    });
  });
}
