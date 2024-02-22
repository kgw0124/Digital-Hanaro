import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useEffect, useState } from 'react';
import axios from 'axios'

function TodoList(){
    /**
     * 데이터 통신 - 데이터바인딩, mount 할 때, unmount 할 때 변수값이 바뀔때 호출된다.
     * 두번째 매개변수인 배열에 내가 감시하고자 하는 변수
     * 배열의 경우에는 참조에 참조가 되어서 무한 렌더링이 되어버린다.
     */
    const [todoList, setTodoList] = useState([]);
    const [loading, setLoading] = useState(false);

    let getData = async() =>{
        let url = "https://jsonplaceholder.typicode.com/todos";
        let result = await axios.get(url);
        setTodoList(result.data);
        setLoading(true);
    }

    useEffect(()=>{ // axios 대신 async 사용
        getData();
    }, [loading])

    return(
        <div className="container" style={{marginTop:"20px"}}>
            <h2>TodoList</h2>

            <table className="table table-hover ">
                <thead className="table-secondary">
                <tr>
                    <th>userId</th>
                    <th>id</th>
                    <th>title</th>
                    <th>completed</th>
                </tr>
                </thead>
                <tbody>
                {
                loading==true?
                todoList.map((item, indx)=>{
                    return (<tr key = {indx}>
                        <td>{item.userId}</td>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.completed?"true":"false"}</td> {/* completed의 자료형이 boolean이어서 출력이 안돼서 조건 처리 */}
                    </tr>)
                }):<tr>
                    <td colSpan="4">데이터가 존재하지 않습니다.</td>
                    </tr>}
                </tbody>
            </table>
            <ul className="pagination  justify-content-center">
                <li className="page-item disabled"><a className="page-link" href="#">first</a></li>
                <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">4</a></li>
                <li className="page-item"><a className="page-link" href="#">5</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                <li className="page-item"><a className="page-link" href="#">last</a></li>
            </ul>
        </div>
    )
}

export default TodoList;