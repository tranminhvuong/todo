import { http } from './app';
const server = http.listen(5000, '0.0.0.0', () => {
    console.log('Server listening on:','http://' + 'localhost' + ':5000');
});
