import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
const WebSocket = require('ws');

global.WebSocket= WebSocket

configure({ adapter: new Adapter() });
