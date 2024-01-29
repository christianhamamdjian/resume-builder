import Hide from './Icons/Hide'
import Show from './Icons/Show'
const [isToggled, setIsToggled] = useState(true)
{
    !isToggled ? (
        <Hide
            handleClick={() => {
                setIsToggled(true)
            }}
        />
    ) : (
        <Show
            handleClick={() => {
                setIsToggled(!isToggled)
            }}
        />
    )
}
{
    !isToggled && (
        <>

        </>
    )
}