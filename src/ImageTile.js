function ImageTile(props) {
  const {
    url,
    title,
    date,
    explanation
  } = props.image;
  return (
    <div className="ImageTile">
      <figure>
        <img src={url} alt={title}/>
        <figcaption className="overlay">
          <p className="explanation">{explanation}</p>
        </figcaption>
      </figure>
      <h2 className="title">{title}</h2>
      <p className="date">{(new Date(date)).toDateString()}</p>
    </div>
  );
}

export default ImageTile;