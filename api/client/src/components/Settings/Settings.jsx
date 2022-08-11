import './Settings.css';

export function Settings(){
    return(
        <div className="settings">
            <h1 className='settings__title'>SETTINGS</h1>
            <form className="settings__form">
                <label className="settings__input">Avatar:</label>
                <input className="settings__input" type="file"/>
                <img src="https://picsum.photos/100"/>
                <label className="settings__input">Username:</label>
                <input className="settings__input" type="text"/>
                <label className="settings__input">Email:</label>
                <input className="settings__input" type="email"/>
                <label className="settings__input">Password:</label>
                <input className="settings__input" type="password"/>
                <button className='settings__submit'>Save</button>
            </form>
        </div>
    )
}