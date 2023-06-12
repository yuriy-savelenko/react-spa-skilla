function Main() {
    return (
        <main className="main">
            <div className="main__container">
                <div className="balance">
                    <p className="balance__text">Баланс <span className="balance__sum">: 272 &#8381;</span> </p>
                    <button className="balance__btn"></button>
                </div>
                <div className="calendar">
                    <span className="calendar__minus"></span>
                    <p className="calendar__date">3 дня</p>
                    <span className="calendar__plus"></span>
                </div>
            </div>
            <div className="filters">
                <input type="text" className="filters__input" />
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </main>
    )
}

export default Main;