import logo from './logo.svg';
import './App.css';
import TodoList from './component/todo_list';
import PhotoList from './component/photo_list';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/"> {/* path값으로 시작되는 url을 처리할 route를 생성하자. */}
          <Route index element={<TodoList/>}/> {/* index : 부모 route의 path값을 자신의 path로 사용한다. */}
          <Route path="photoList" element={<PhotoList/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
