function ImageTile(props) {
  const {
    url,
    title,
    date,
    explanation
  } = props.image;
  const { toggleLike } = props;
  return (
    <a className="ImageTile" href={url} target="_blank" rel="noreferrer">
      <figure>
        <img src={url} alt={title}/>
        <figcaption className="overlay">
          <p className="explanation">{explanation}</p>
        </figcaption>
      </figure>
      <div className="description">
        <button className="like" onClick={toggleLike}><i className="far fa-heart"></i> like</button>
        <h2 className="title">{title}</h2>
        <p className="date">{(new Date(date)).toDateString()}</p>
      </div>
    </a>
  );
}

export default ImageTile;