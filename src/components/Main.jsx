import Data from './Data';
import { useState } from 'react';

function Main() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const [daysForRequest, setDaysForRequest] = useState(3);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openCalls, setOpenCalls] = useState(false);
    const [inputValueSearch, setInputValueSearch] = useState('');
    const [dateForRequest, setDateForRequest] = useState(`${year}-${month}-${day - daysForRequest}`)
    const [callsFilter, setCallsFilter] = useState('all')

    function getCallsValue(event) {
        setCallsFilter(event.target.dataset.value)
    }

    function calculateDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function changeDateByCalendar(value) {
        setDaysForRequest(() => value)
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - value);
        setDateForRequest(calculateDate(currentDate));
    }

    function changeDatePlus() {
        setDaysForRequest((prevDate) => prevDate + 1)
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - daysForRequest - 1);
        setDateForRequest(calculateDate(currentDate));
    }

    function changeDateMinus() {
        if (daysForRequest > 1) {
            setDaysForRequest(daysForRequest - 1)
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - daysForRequest + 1);
            setDateForRequest(calculateDate(currentDate));
        }
    }

    function showModalDate() {
        setOpenCalendar((prevOpenCalendar) => !prevOpenCalendar)
    }

    function showModalCalls() {
        setOpenCalls((prevOpenCalls) => !prevOpenCalls)
    }

    function cleanSearchInput() {
        setInputValueSearch('');
    }

    function getInputValueSearch(event) {
        setInputValueSearch(event.target.value);
    }

    return (
        <div className='background'>
            <main className='page__content main'>
                <div className='main__container'>
                    <div className='balance'>
                        <p className='balance__text'>Баланс <span className='balance__sum'>: 272 &#8381;</span> </p>
                        <button className='balance__btn'></button>
                    </div>
                    <div className='calendar'>
                        <span onClick={changeDateMinus} className='calendar__minus'></span>
                        <svg onClick={showModalDate} className='calendar__calendar' width='16' height='18' viewBox='0 0 16 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z' fill='#ADBFDF' />
                        </svg>
                        {openCalendar &&
                            <div className={'calendar__modal'}><ul className='calendar__modal_list'>
                                <li onClick={() => changeDateByCalendar(3)} className='calendar__modal__list_item'>3 дня</li>
                                <li onClick={() => changeDateByCalendar(7)} className='calendar__modal__list_item'>Неделя</li>
                                <li onClick={() => changeDateByCalendar(30)} className='calendar__modal__list_item'>Месяц</li>
                                <li onClick={() => changeDateByCalendar(365)} className='calendar__modal__list_item'>Год</li>
                                <li className='calendar__modal__list_item_set-date'>
                                    Указать даты
                                    <input type='text' className='calendar__input' />
                                    <svg className='calendar__input_svg' width='16' height='18' viewBox='0 0 16 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path d='M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z' fill='#ADBFDF' />
                                    </svg>
                                </li>
                            </ul></div>}
                        <p onClick={showModalDate} className='calendar__date'>{daysForRequest}{daysForRequest > 4 ? ' дней' : ' дня'}</p>
                        <span onClick={changeDatePlus} className='calendar__plus'></span>
                    </div>
                </div>
                <div className='filters'>
                    <div className='filters__input_div'>
                        <input value={inputValueSearch} onChange={getInputValueSearch} placeholder='Поиск по звонкам' type='text' className='filters__input' />
                        {inputValueSearch && (
                            <button onClick={cleanSearchInput} className='filters__input_btn'></button>)}
                    </div>
                    <ul className='filters__list'>
                        <li className='filters__list_item'>Все типы
                            <svg className='filters__arrow' width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M9.90008 0.601167L9.39911 0.100235C9.33236 0.0333416 9.25546 0 9.16853 0C9.08181 0 9.00494 0.0333416 8.93819 0.100235L5.00005 4.03816L1.06209 0.100341C0.995301 0.033447 0.918439 0.000105232 0.831611 0.000105232C0.744747 0.000105232 0.667886 0.033447 0.601132 0.100341L0.100235 0.601308C0.0333416 0.668061 0 0.744922 0 0.831786C0 0.91858 0.0334469 0.995441 0.100235 1.06219L4.76957 5.73164C4.83633 5.79843 4.91322 5.8318 5.00005 5.8318C5.08688 5.8318 5.16364 5.79843 5.23036 5.73164L9.90008 1.06219C9.96683 0.995406 10 0.918545 10 0.831786C10 0.744922 9.96683 0.668061 9.90008 0.601167Z' fill='#ADBFDF' />
                            </svg>
                        </li>
                        <li className='filters__list_item'>Все сотрудники
                            <svg className='filters__arrow' width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M9.90008 0.601167L9.39911 0.100235C9.33236 0.0333416 9.25546 0 9.16853 0C9.08181 0 9.00494 0.0333416 8.93819 0.100235L5.00005 4.03816L1.06209 0.100341C0.995301 0.033447 0.918439 0.000105232 0.831611 0.000105232C0.744747 0.000105232 0.667886 0.033447 0.601132 0.100341L0.100235 0.601308C0.0333416 0.668061 0 0.744922 0 0.831786C0 0.91858 0.0334469 0.995441 0.100235 1.06219L4.76957 5.73164C4.83633 5.79843 4.91322 5.8318 5.00005 5.8318C5.08688 5.8318 5.16364 5.79843 5.23036 5.73164L9.90008 1.06219C9.96683 0.995406 10 0.918545 10 0.831786C10 0.744922 9.96683 0.668061 9.90008 0.601167Z' fill='#ADBFDF' />
                            </svg>
                        </li>
                        <li onClick={showModalCalls} className='filters__list_item'>Все звонки
                            <svg className={`filters__arrow ${openCalls ? 'arrow-active' + ' ' + 'arrow-colored' : ''}`} width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M9.90008 0.601167L9.39911 0.100235C9.33236 0.0333416 9.25546 0 9.16853 0C9.08181 0 9.00494 0.0333416 8.93819 0.100235L5.00005 4.03816L1.06209 0.100341C0.995301 0.033447 0.918439 0.000105232 0.831611 0.000105232C0.744747 0.000105232 0.667886 0.033447 0.601132 0.100341L0.100235 0.601308C0.0333416 0.668061 0 0.744922 0 0.831786C0 0.91858 0.0334469 0.995441 0.100235 1.06219L4.76957 5.73164C4.83633 5.79843 4.91322 5.8318 5.00005 5.8318C5.08688 5.8318 5.16364 5.79843 5.23036 5.73164L9.90008 1.06219C9.96683 0.995406 10 0.918545 10 0.831786C10 0.744922 9.96683 0.668061 9.90008 0.601167Z' fill='#ADBFDF' />
                            </svg>
                            {openCalls &&
                                <div className={`calls__modal`}>
                                    <ul className='calls__modal_list'>
                                        <li onClick={getCallsValue} data-value='all' className={`calls__modal__list_item ${callsFilter === 'all' ? 'active-calls-filter' : ''}`}>Все звонки</li>
                                        <li onClick={getCallsValue} data-value='in' className={`calls__modal__list_item ${callsFilter === 'in' ? 'active-calls-filter' : ''}`}>Входящие</li>
                                        <li onClick={getCallsValue} data-value='out' className={`calls__modal__list_item ${callsFilter === 'out' ? 'active-calls-filter' : ''}`}>Исходяшие</li>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className='filters__list_item'>Все источники
                            <svg className='filters__arrow' width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M9.90008 0.601167L9.39911 0.100235C9.33236 0.0333416 9.25546 0 9.16853 0C9.08181 0 9.00494 0.0333416 8.93819 0.100235L5.00005 4.03816L1.06209 0.100341C0.995301 0.033447 0.918439 0.000105232 0.831611 0.000105232C0.744747 0.000105232 0.667886 0.033447 0.601132 0.100341L0.100235 0.601308C0.0333416 0.668061 0 0.744922 0 0.831786C0 0.91858 0.0334469 0.995441 0.100235 1.06219L4.76957 5.73164C4.83633 5.79843 4.91322 5.8318 5.00005 5.8318C5.08688 5.8318 5.16364 5.79843 5.23036 5.73164L9.90008 1.06219C9.96683 0.995406 10 0.918545 10 0.831786C10 0.744922 9.96683 0.668061 9.90008 0.601167Z' fill='#ADBFDF' />
                            </svg>
                        </li>
                        <li className='filters__list_item'>Все оценки
                            <svg className='filters__arrow' width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M9.90008 0.601167L9.39911 0.100235C9.33236 0.0333416 9.25546 0 9.16853 0C9.08181 0 9.00494 0.0333416 8.93819 0.100235L5.00005 4.03816L1.06209 0.100341C0.995301 0.033447 0.918439 0.000105232 0.831611 0.000105232C0.744747 0.000105232 0.667886 0.033447 0.601132 0.100341L0.100235 0.601308C0.0333416 0.668061 0 0.744922 0 0.831786C0 0.91858 0.0334469 0.995441 0.100235 1.06219L4.76957 5.73164C4.83633 5.79843 4.91322 5.8318 5.00005 5.8318C5.08688 5.8318 5.16364 5.79843 5.23036 5.73164L9.90008 1.06219C9.96683 0.995406 10 0.918545 10 0.831786C10 0.744922 9.96683 0.668061 9.90008 0.601167Z' fill='#ADBFDF' />
                            </svg>
                        </li>
                        <li className='filters__list_item'>Все ошибки
                            <svg className='filters__arrow' width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M9.90008 0.601167L9.39911 0.100235C9.33236 0.0333416 9.25546 0 9.16853 0C9.08181 0 9.00494 0.0333416 8.93819 0.100235L5.00005 4.03816L1.06209 0.100341C0.995301 0.033447 0.918439 0.000105232 0.831611 0.000105232C0.744747 0.000105232 0.667886 0.033447 0.601132 0.100341L0.100235 0.601308C0.0333416 0.668061 0 0.744922 0 0.831786C0 0.91858 0.0334469 0.995441 0.100235 1.06219L4.76957 5.73164C4.83633 5.79843 4.91322 5.8318 5.00005 5.8318C5.08688 5.8318 5.16364 5.79843 5.23036 5.73164L9.90008 1.06219C9.96683 0.995406 10 0.918545 10 0.831786C10 0.744922 9.96683 0.668061 9.90008 0.601167Z' fill='#ADBFDF' />
                            </svg>
                        </li>
                    </ul>
                </div>
                <div className='table'>
                    <div className='table__top'>
                        <ul className='table__top__list'>
                            <li className='table__top__list_item table__top__list_item1'>Тип</li>
                            <li className='table__top__list_item table__top__list_item2'>Время</li>
                            <li className='table__top__list_item table__top__list_item3'>Сотрудник</li>
                            <li className='table__top__list_item table__top__list_item4'>Звонок</li>
                            <li className='table__top__list_item table__top__list_item5'>Источник</li>
                            <li className='table__top__list_item table__top__list_item6'>Оценка</li>
                            <li className='table__top__list_item table__top__list_item7'>Деятельность</li>
                        </ul>
                        <div className='table__bottom'>
                            <Data dateForRequest={dateForRequest} callsFilter={callsFilter} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Main;