import './Newsletter.css';

export function Newsletter(){
    return(
        <div className='newsletter'>
            <h2 className='newsletter__title'>Subscribe to our newsletter</h2>
            <form action='/' method='POST' className='newsletter__form'>
                <input type="email" name="email" placeholder='Your email here'/>
                <button>SUBSCRIBE</button>
            </form>
        </div>
    )
}