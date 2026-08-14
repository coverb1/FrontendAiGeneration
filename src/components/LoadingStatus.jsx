function LoadingStatus({theme}){
    return (
        <div className="">
            <p className="h-45">Generate Your {theme} Story</p>

            <div className="loading-animation">
<div className="spinner"></div>
            </div>

<p className="loading_info"></p>
please wait while we generate story
        </div>
    )
}

export default LoadingStatus
