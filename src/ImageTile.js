function ImageTile(props) {
  const {
    url,
    title,
    date,
    explanation
  } = props.image;
  return (
    <div className="ImageTile">
      <img src={url} alt={title}/>
      <h2 className="title">{title}</h2>
      <p className="date">{(new Date(date)).toDateString()}</p>
      <div className="overlay">
        <p className="explanation">{explanation}</p>
      </div>
    </div>
  );
}

export default ImageTile;