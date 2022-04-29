import './style.css';

const Map = () => {
    return (
        <div id="map">
            <div id="mapTitle">
                <h4>Onde você vai estar?</h4>
            </div>
            <div className="mapFrame">
            <iframe className="frame" title="frame" width="100%" height="450" style={{border:0}} loading="lazy" allowFullScreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ0WGkg4FEzpQRrlsz_whLqZs&key=AIzaSyAhmLAv-HUgGmzCYKpmR5q_5F9LFrUuVZU"></iframe>
            </div>
        </div>
    )
}

export default Map;