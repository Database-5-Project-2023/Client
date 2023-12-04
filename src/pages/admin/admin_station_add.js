import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useState } from "react";
import axios from "axios";


export default function AdminStationAdd() {
    const movePage = useNavigate();

    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prevState => ({...prevState, [name]: value}));
        console.log(formData);
    };
    
    const handleSubmit = async(event) =>{
        event.preventDefault();
        try{
            const response = await axios.post('/admin/station/add', formData);
            alert(`${response.data}`);
        }catch(error){
            alert(`${error.message}`)
            console.error('Error:',error);
        }
        window.close();
    };
    

    return (
        <div className="wrap">
            <div className="mainContainer">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="station_id" onChange={handleChange} placeholder="대여소 ID"></input>

                    <input type="text" name="station_addr1" onChange={handleChange} placeholder="대여소 지번 주소"></input>

                    <input type="text" name="station_addr2" onChange={handleChange} placeholder="대여소 장소 명칭"></input>

                    <input type="text" name="borough" onChange={handleChange} placeholder="자치구"></input>

                    <input type="text" name="holder_num" onChange={handleChange} placeholder="거치대 수"></input>

                    <button type="submit">등록하기</button>
                </form>
            </div>
        </div>
    );
}