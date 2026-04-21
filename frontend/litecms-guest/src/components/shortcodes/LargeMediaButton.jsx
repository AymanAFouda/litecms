const LargeMediaButton = ({ largeMedia, setLargeMedia }) => {
    return (
       <div className="flex w-full justify-end">
            <button className="hidden lg:block btn btn-primary px-5 mt-2 rounded-none" onClick={() => {setLargeMedia(prev => !prev)}}>
                {largeMedia? "Collapse" : "Expand"}
            </button>
        </div> 
    )
}

export default LargeMediaButton;