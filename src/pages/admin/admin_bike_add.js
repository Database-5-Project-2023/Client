import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useState } from "react";
import axios from "axios";


export default function AdminBikeAdd({loginSession, setLoginSession, adminSession, setAdminSession}) {
    const movePage = useNavigate();

    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        console.log(formData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/admin/bike/add', formData);
            alert("따릉이가 정상적으로 추가되었습니다.");
        } catch (error) {
            alert(`${error.message}`)
            console.error('Error:', error);
        }
        window.close();
    };

    return (
        <div className="wrap">
            <div className="mainContainer">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="bike_id" onChange={handleChange} placeholder="따릉이 ID"></input>

                    <input type="text" name="station_id" onChange={handleChange} placeholder="대여소 ID"></input>

                    <input type="text" name="bike_type" onChange={handleChange} placeholder="따릉이 타입"></input>

                    <input type="text" name="bike_status" onChange={handleChange} placeholder="상태"></input>

                    <button type="submit">등록하기</button>
                </form>
            </div>
        </div>
    );
}