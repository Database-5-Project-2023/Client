import { useNavigate } from "react-router-dom";
import "../styles.css";


export default function AdminBikeAdd() {
    const movePage = useNavigate();

    return (
        <div className="wrap">
            <div className="mainContainer">
                <form>
                    <input type="text" placeholder="따릉이 ID"></input>

                    <input type="text" placeholder="따릉이 최초 등록 station"></input>

                    <input type="text" placeholder="따릉이 type"></input>

                    <button type="submit">등록하기</button>
                </form>
            </div>
        </div>
    );
}