import dva from 'dva';
import 'antd/dist/antd.less';
import './index.html';
import './index.less';
import { errorHandle } from './utils/auth';

// 1. Initialize
const app = dva({
  onError(error) {
    // console.log(error);
    errorHandle(error);
  },
});

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/users'));

app.model(require('./models/roles'));

app.model(require('./models/auth'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
