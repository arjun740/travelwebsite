import classes from "./Hero.module.css"
const Hero = () =>{
    return <div className={classes["hero-container"]} id={"home"}>
    {/*    Text container*/}
        <div className={classes.textContainer} >
            <h1>Explore the World, One<br/> Destination at a Time</h1>
            <p>Craft your perfect travel journey, one destination at a time.<br/>The world is your oyster. Start exploring!</p>
        </div>
    {/*    Image Container*/}
        <div className={classes.subscribeContainer}>
            <h2>Explore More: Subscribe to Get Travel News!</h2>
            <div className={classes.inputButton}>
                <input type={"email"} required placeholder={"Email"}/>
                <button>Subscribe</button>
            </div>
        </div>
    </div>
}
export default Hero;