function Header() {
    return (
        <header className="header">
            <div className="header__left">
                <span className="header__date">Среда, 13 окт</span>
            </div>
            <div className="header__center">
                <ul className="header__list">
                    <li className="header__list_item"><p className="header__result_text">Новые звонки<span className="header__result_span header__result_span_calls"> 20 из 30 шт</span></p>
                        <span className="header__range header__range_calls"></span>
                    </li>
                    <li className="header__list_item"><p className="header__result_text">Качество разговоров<span className="header__result_span header__result_span_quality"> 40%</span></p>
                        <span className="header__range header__range_quality"></span>
                    </li>
                    <li className="header__list_item"><p className="header__result_text">Новые звонки<span className="header__result_span header__result_span_order"> 67%</span></p>
                        <span className="header__range header__range_order"></span>
                    </li>
                </ul>
            </div>
            <div className="header__right">
                <svg className="header__search" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4351 10.0629H10.7124L10.4563 9.81589C11.3528 8.77301 11.8925 7.4191 11.8925 5.94625C11.8925 2.66209 9.23042 0 5.94625 0C2.66209 0 0 2.66209 0 5.94625C0 9.23042 2.66209 11.8925 5.94625 11.8925C7.4191 11.8925 8.77301 11.3528 9.81589 10.4563L10.0629 10.7124V11.4351L14.6369 16L16 14.6369L11.4351 10.0629ZM5.94625 10.0629C3.66838 10.0629 1.82962 8.22413 1.82962 5.94625C1.82962 3.66838 3.66838 1.82962 5.94625 1.82962C8.22413 1.82962 10.0629 3.66838 10.0629 5.94625C10.0629 8.22413 8.22413 10.0629 5.94625 10.0629Z" fill="#ADBFDF" />
                </svg>
                <p className="header__agent">ИП Сидорова Александра Михайловна</p>
                <span className="header__agent_span"></span>
                <div className="header__avatar">
                <span className="header__avatar_span"></span>
                </div>
            </div>
        </header>
    )
}
export default Header