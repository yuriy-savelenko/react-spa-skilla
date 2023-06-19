import axios from "axios";
import { useEffect, useState } from "react";

function Data({ dateForRequest, callsFilter }) {

    const [post, setPost] = useState({
        isLoaded: false,
        items: []
    });
    const [audio, setAudio] = useState({
        isLoaded: false,
    })
    const [error, setError] = useState(null);
    const [callsIn, setCallsIn] = useState([{}])
 
    const baseUrl = 'https://api.skilla.ru/mango';
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = (nowDate.getMonth() + 1).toString().padStart(2, '0');
    const day = (nowDate.getDate() + 1).toString().padStart(2, '0');

    useEffect(() => {
        axios.post(`${baseUrl}/getList?date_start=${dateForRequest}&date_end=${year}-${month}-${day}`, {}, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer testtoken`,
            }
        }).then((response) => setPost({
            isLoaded: true,
            items: response.data.results
        })).catch(error => {
            setError(error);
        });
    }, [dateForRequest])

    function getAudio(id, idPartner) {
        axios.post(`${baseUrl}/getRecord?record=${id}&partnership_id=${idPartner}`, {}, {
            responseType: 'blob',
            headers: {
                'Content-type': 'audio / mpeg, audio / x - mpeg, audio / x - mpeg - 3, audio / mpeg3',
                'Content-Transfer-Encoding': 'binary',
                'Content-Disposition': 'filename = "record.mp3"',
                Authorization: `Bearer testtoken`,
            }
        }).then((response) => { setAudio({ ...audio, isLoaded: true, [id]: window.URL.createObjectURL(new Blob([response.data],)) }) }).catch(error => {
            setError(error);
        });
    }


    function showAllCalls(item) {
        if (item.in_out === 1 && item.status === 'Дозвонился') {
            return <span className="data__type_in_true"></span>
        } else if (item.in_out === 1 && item.status === 'Не дозвонился') {
            return <span className="data__type_in_false"></span>
        } else if (item.in_out === 0 && item.status === 'Дозвонился') {
            return <span className="data__type_out_true"></span>
        } else if (item.in_out === 0 && item.status === 'Не дозвонился') {
            return <span className="data__type_out_false"></span>
        }
    }

    function convertSecondsToMinutes(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        if (!seconds) {
            return;
        }
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;
        }

        return minutes + "." + remainingSeconds;
    }

    function getFilteredItems() {
        return post.items.filter((item) => {
            if (callsFilter === 'all') {
                return true;
            } else if (callsFilter === 'in') {
                return item.in_out === 1
            } else if (callsFilter === 'out') {
                return item.in_out === 0
            }
        })
    }

    return (
        <>
            {post.isLoaded ? (
                getFilteredItems().map((item) => (
                    <ul onClick={() => { if (item.record && !audio[item.record]) getAudio(item.record, item.partnership_id) }} className="data__list">
                        <li className="data__list_item data__list_item_call">
                            {showAllCalls(item)}
                        </li>
                        <li className="data__list_item data__list_item_time" ><span className="data__time">{item.date.slice(10, 16)}</span></li>
                        <li className="data__list_item data__list_item_avatar" ><span className="data__avatar"></span></li>
                        <li className="data__list_item data__list_item_number" ><span className="data__number">{'+' + item.partner_data.phone}</span></li>
                        <li className="data__list_item data__list_item_origin" ><span className="data__origin">Источник</span></li>
                        <li className="data__list_item data__list_item_rate" ><span className="data__rate">Оценка</span></li>
                        {audio[item.record] && < li className="data__list_item audio" ><audio className="data__audio" controls src={audio[item.record]}></audio>
                        </li>}
                        <li className="data__list_item data__list_item_duration" ><span className="data__duration">{convertSecondsToMinutes(item.time)}</span></li>

                    </ul >
                ))) : (<p>Loading...</p>)
            }
        </>
    )
}

export default Data;